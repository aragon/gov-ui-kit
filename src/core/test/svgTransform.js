const path = require('node:path');

const fileNameToComponent = (name) =>
    `${path.basename(name, '.svg')}-icon`
        .split(/\W+/)
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join('');

const transform = (src, filePath) => {
    if (path.extname(filePath) !== '.svg') {
        return src;
    }

    const componentName = fileNameToComponent(filePath);

    return {
        code: `
            const React = require('react');

            function ${componentName}(props) {
                return React.createElement('svg', props);
            }

            module.exports = ${componentName};
        `,
    };
};

module.exports = {
    process: transform,
};
