// Shared SVGO config used by the Rollup library build (rollup.config.mjs), the
// Storybook/dev Vite build (.storybook/main.ts) and the svgIds test, so icon/illustration
// SVGs are optimized identically everywhere and this file is the single source of truth
// for the id collision fix below. Authored as CommonJS so all three can import it.
/** @type {import('svgo').Config} */
module.exports = {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    // Keep the viewBox so icons scale instead of getting clipped when
                    // rendered at a size other than their intrinsic 16px (e.g. size-3 in
                    // small buttons). SVGO's preset-default removes it by default.
                    removeViewBox: false,
                },
            },
        },
        // Icons/illustrations are inlined as <svg> markup in the DOM, so `<mask id="a">`,
        // `<clipPath id="a">`, etc. resolve against the whole document's id space, not
        // per-<svg>. Without this, every source file that (independently) authors the
        // same short id collides with every other one as soon as two such components are
        // rendered on the same page, and `url(#a)` silently resolves to the wrong element.
        'prefixIds',
    ],
};
