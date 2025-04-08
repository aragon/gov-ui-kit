var fs = require('fs');

module.exports = async ({ core }) => {
    const { version, path } = process.env;

    // Check if version and path are provided
    if (!version || !path) {
        core.setFailed('Missing required environment variables: version or path');
        return;
    }

    // Check if the changelog file exists
    if (!fs.existsSync(path)) {
        core.setFailed(`Changelog file not found at path: ${path}`);
        return;
    }

    try {
        core.info(`Reading changes in version ${version}.`);

        const changelog = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });

        const versionChanges = changelog
            .split(/(?=## \d+\.\d+\.\d+)/g)
            .find((changes) => changes.startsWith(`## ${version}`));

        if (!versionChanges) {
            core.warning(`No changes found for version ${version} in the changelog.`);
            core.setOutput('changes', 'No changes.');
            return;
        }

        const parsedChanges = versionChanges.replace(`## ${version}`, '').trim();

        core.info(`Setting output: ${parsedChanges}.`);
        core.setOutput('changes', parsedChanges);
    } catch (error) {
        core.setFailed(error);
    }
};
