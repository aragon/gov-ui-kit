#!/usr/bin/env node
// Guards against AGENTS.md rot. Fails when the instruction file references a
// pnpm script that no longer exists, a repo path that is gone, or an agent
// entry point that does not resolve to the real AGENTS.md content (the case a
// broken symlink produces on a checkout without symlink support).
//
// Usage: node scripts/check-agents-md.mjs [path-to-AGENTS.md]

import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const agentsPath = resolve(repoRoot, process.argv[2] ?? 'AGENTS.md');

const pkg = JSON.parse(readFileSync(resolve(repoRoot, 'package.json'), 'utf8'));
const scripts = new Set(Object.keys(pkg.scripts ?? {}));
// pnpm resolves these without a package.json script entry.
const pnpmBuiltins = new Set(['install', 'add', 'run', 'dlx', 'exec']);
if (pkg.devDependencies?.['@changesets/cli'] || pkg.dependencies?.['@changesets/cli']) {
    pnpmBuiltins.add('changeset');
}

const text = readFileSync(agentsPath, 'utf8');
const problems = [];

// 1. Every `pnpm <script>` named in the doc must be runnable.
for (const match of text.matchAll(/`pnpm ([^`]+)`/g)) {
    for (const segment of match[1].split('&&')) {
        const bits = segment.trim().split(/\s+/).filter(Boolean);
        if (bits[0] === 'pnpm') {
            bits.shift();
        }
        if (bits[0] === 'run') {
            bits.shift();
        }
        const name = bits[0];
        if (!name) {
            continue;
        }
        if (!scripts.has(name) && !pnpmBuiltins.has(name)) {
            problems.push(`pnpm script not found in package.json: "${name}"`);
        }
    }
}

// 2. Every backticked directory-qualified path (contains "/") must exist,
//    excluding globs and generated output the repo does not commit.
const generated = ['dist/', 'dist', 'build.css', 'storybook-static', 'node_modules/'];
const seen = new Set();
for (const match of text.matchAll(/`([^`]+)`/g)) {
    const token = match[1].trim();
    if (!token.includes('/')) {
        continue; // skip bare filenames + prose
    }
    if (/[*?[\]\s…]|:\/\//.test(token)) {
        continue; // skip globs, ranges, URLs
    }
    if (token.startsWith('@')) {
        continue; // skip scoped package names
    }
    if (token.startsWith('./')) {
        continue; // skip module specifiers / export entries
    }
    if (!/^[.\w]/.test(token)) {
        continue;
    }
    const clean = token.replace(/\/$/, '');
    if (generated.some((g) => clean === g.replace(/\/$/, '') || clean.startsWith(g))) {
        continue;
    }
    if (seen.has(clean)) {
        continue;
    }
    seen.add(clean);
    if (!existsSync(resolve(repoRoot, clean))) {
        problems.push(`referenced path does not exist: "${token}"`);
    }
}

// 3. Agent entry points must carry the canonical AGENTS.md content. Copilot code
//    review does not follow symlinks, so .github/copilot-instructions.md is a real
//    file kept byte-identical to AGENTS.md (regenerate with `pnpm agents:sync`).
const canonical = readFileSync(resolve(repoRoot, 'AGENTS.md'), 'utf8');

const claude = resolve(repoRoot, 'CLAUDE.md');
if (!existsSync(claude) || !readFileSync(claude, 'utf8').includes('@AGENTS.md')) {
    problems.push('CLAUDE.md must import AGENTS.md via "@AGENTS.md"');
}

const copilot = resolve(repoRoot, '.github/copilot-instructions.md');
if (!existsSync(copilot)) {
    problems.push('.github/copilot-instructions.md is missing (run `pnpm agents:sync`)');
} else if (lstatSync(copilot).isSymbolicLink()) {
    problems.push(
        '.github/copilot-instructions.md is a symlink; Copilot code review does not follow ' +
            'symlinks — use a real file (`pnpm agents:sync`)',
    );
} else if (readFileSync(copilot, 'utf8') !== canonical) {
    problems.push('.github/copilot-instructions.md is out of sync with AGENTS.md (run `pnpm agents:sync`)');
}

// 4. Keep the file inside the Codex 32 KiB / ~200-line budget.
const lineCount = text.split('\n').length;
if (lineCount > 200) {
    problems.push(`AGENTS.md is ${lineCount} lines (limit 200)`);
}

if (problems.length) {
    console.error(`check-agents-md: ${problems.length} problem(s) in ${agentsPath}`);
    for (const p of problems) {
        console.error(`  - ${p}`);
    }
    process.exit(1);
}
console.log(`check-agents-md: ok (${lineCount} lines, entry points resolve)`);
