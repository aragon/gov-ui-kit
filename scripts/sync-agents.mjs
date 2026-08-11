#!/usr/bin/env node
// Regenerates .github/copilot-instructions.md as a byte copy of AGENTS.md.
// Copilot code review does not follow symlinks, so this entry point is a real
// file kept in sync here and enforced by scripts/check-agents-md.mjs.

import { copyFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dest = resolve(repoRoot, '.github/copilot-instructions.md');

rmSync(dest, { force: true }); // drop any prior symlink before writing a real file
copyFileSync(resolve(repoRoot, 'AGENTS.md'), dest);
console.log('synced .github/copilot-instructions.md from AGENTS.md');
