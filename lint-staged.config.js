'use strict';

module.exports = {
    '**/*.(ts|tsx|js|md|mdx|json|json5|yml|css|scss)': (filenames) => `pnpm prettier --write ${filenames.join(' ')}`,
};
