export interface IStyleDocProps {
    /**
     * Name of the component.
     */
    component: string;
    /**
     * Source to parse the styles of a component.
     */
    source: string;
}

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

const parseCustomisations = (source: string): ICustomisationDoc[] => {
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

export const StyleDoc: React.FC<IStyleDocProps> = (props) => {
    const { component, source } = props;

    parseCustomisations(source);

    return (
        <div className="flex flex-col gap-10">
            <h1>{component} Customisations</h1>
            <table>
                <thead>
                    <tr>
                        <td>Variable</td>
                        <td>Documentation</td>
                        <td>Value</td>
                    </tr>
                </thead>
                <tbody>
                    {parseCustomisations(source).map(({ variable, value, documentation }) => (
                        <tr key={variable}>
                            <td>{variable}</td>
                            <td>{documentation}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
