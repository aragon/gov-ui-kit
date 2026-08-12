#!/usr/bin/env node
// Smoke check for the precompiled CSS bundle that consumers import (`build.css`).
//
// The bundle is minified, and a nesting-unaware minifier merges the selector lists of rules whose bodies are nested
// blocks. Tailwind v4 emits every variant utility as a nested block, so such a merge gives dozens of unrelated
// utilities a child-targeting rule they never declared: `@aragon/gov-ui-kit@2.8.1` shipped ~140 `2xl:*` utilities that
// removed the border of their last child, and ~54 `md:*` utilities that gave every child a right border. The app and
// Storybook compile the kit from source, so only consumers of this file are affected — which is why nothing caught it.
//
// Usage: node scripts/check-build-css.mjs [path-to-build.css]

import { readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cssPath = resolve(repoRoot, process.argv[2] ?? 'build.css');
const cssName = relative(repoRoot, cssPath);

// Anything below this means the build produced a stub instead of the real bundle (the file was ~100 KB in v2.9.0).
const minimumBytes = 50_000;

let css;
try {
    css = readFileSync(cssPath, 'utf8');
} catch (error) {
    if (error.code === 'ENOENT') {
        console.error(`check-build-css: ${cssName} not found — run \`pnpm build\` first`);
        process.exit(1);
    }
    throw error;
}

const problems = [];

if (css.length < minimumBytes) {
    problems.push(`${cssName} is ${css.length} bytes, expected at least ${minimumBytes}`);
}

const root = postcss.parse(css, { from: cssPath });

// Two shapes of the same corruption, because a minifier may keep the nesting or flatten it away:
//   nested    `.md\:flex, .md\:h-4 { @media … { :is(& > *) { border-right-width: 1px } } }`
//   flattened `.md\:flex > *, .md\:h-4 > * { border-right-width: 1px }`
// Legitimate output keeps child-targeting rules on the one utility that declares them: v2.9.0 has 37 with a single
// selector and 1 with two (`.space-y-*` reverse pairs), so a list any longer than that is a merge.
const maxChildTargetingSelectors = 3;

root.walkRules((rule) => {
    if (rule.selectors.length < 2) {
        return;
    }

    const line = rule.source?.start?.line ?? '?';
    const preview = rule.selectors.slice(0, 3).join(', ');

    const leaked = [];
    rule.walkRules((nested) => {
        if (/&\s*>/.test(nested.selector)) {
            leaked.push(nested.selector);
        }
    });

    if (leaked.length) {
        problems.push(
            `${rule.selectors.length} selectors share a nested child-targeting rule (${leaked.join(' / ')}) — ` +
                `starting at "${preview}" on line ${line}`,
        );
    } else if (rule.selectors.length > maxChildTargetingSelectors && rule.selectors.some((s) => s.includes('>'))) {
        problems.push(
            `${rule.selectors.length} child-targeting selectors share one declaration block — ` +
                `starting at "${preview}" on line ${line}`,
        );
    }
});

if (problems.length) {
    console.error(`check-build-css: ${problems.length} problem(s) in ${cssName}`);
    for (const problem of problems) {
        console.error(`  - ${problem}`);
    }
    console.error(
        '  The CSS minifier merged selector lists across nested rules. Check the minifier in rollup.config.mjs.',
    );
    process.exit(1);
}

console.log(`check-build-css: ok (${cssName}, ${css.length} bytes, ${root.nodes.length} top-level nodes)`);
