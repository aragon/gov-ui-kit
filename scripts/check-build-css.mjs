#!/usr/bin/env node
// The published `build.css` must be exactly what compiling `index.css` produces. It shipped corrupted in 2.8.1 and
// 2.9.0 because the bundle ran a second, nesting-unaware minifier over Tailwind's nested output, merging selector lists
// until ~330 utilities carried child styles they never declared. Nothing in the repo rendered or parsed the file, so
// nothing caught it.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(repoRoot, 'build.css');
const source = resolve(repoRoot, 'index.css');

const built = readFileSync(entry, 'utf8');
// `base` is pinned because Tailwind v4 scans for candidates from the working directory, so the output otherwise
// depends on where this runs.
const { css: expected } = await postcss([tailwindcss({ base: repoRoot, optimize: { minify: true } })]).process(
    readFileSync(source, 'utf8'),
    { from: source, to: entry },
);

if (built !== expected) {
    console.error(
        `check-build-css: build.css does not match a source compile (${built.length} vs ${expected.length} chars).\n` +
            '  Something in the CSS pipeline is rewriting Tailwind output — check the minifier in rollup.config.mjs.',
    );
    process.exit(1);
}

console.log(`check-build-css: ok (matches a source compile, ${built.length} chars)`);
