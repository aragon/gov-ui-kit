import { Subheading, useOf } from '@storybook/blocks';

export interface ICustomisationDoc {
    /**
     * Name of the variable.
     */
    variable: string;
    /**
     * Documentation about the variable.
     */
    documentation: string;
    /**
     * Default value of the variable.
     */
    value: string;
}

const parseCustomisations = (source = ''): ICustomisationDoc[] => {
    const customisations: ICustomisationDoc[] = [];
    const tokens = source.replaceAll('\n', ' ').split(' ');

    const parseDocumentation = (tokens: string[], startIndex: number) => {
        // A variable documentation ends when the next token equals "*/"
        const endIndex = startIndex + tokens.slice(startIndex).findIndex((token) => token === '*/');
        const documentation = tokens.slice(startIndex + 1, endIndex).join(' ');

        return { documentation, endIndex };
    };

    tokens.forEach((token, index) => {
        if (token === '/*') {
            const { documentation, endIndex } = parseDocumentation(tokens, index);

            // Remove the ":" end character from the CSS custom property
            const variable = tokens[endIndex + 3];
            const parsedVariable = variable.slice(0, variable.length - 1);

            // Remove the ";" end character from the variable value
            const value = tokens[endIndex + 4];
            const parsedValue = value.slice(0, value.length - 1);

            customisations.push({ documentation, value: parsedValue, variable: parsedVariable });
        }
    });

    return customisations;
};

export const StyleBlock: React.FC = () => {
    const metaInfo = useOf<'meta'>('meta');
    const source = metaInfo.preparedMeta.parameters.style as string | undefined;

    const customisations = parseCustomisations(source);

    if (!customisations.length) {
        return null;
    }

    return (
        <div className="flex flex-col">
            <Subheading>Customisations</Subheading>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Default</td>
                    </tr>
                </thead>
                <tbody>
                    {customisations.map(({ variable, value, documentation }) => (
                        <tr key={variable}>
                            <td>
                                <code>{variable}</code>
                            </td>
                            <td>{documentation}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
