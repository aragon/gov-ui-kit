import { Subheading, useOf } from '@storybook/addon-docs/blocks';

export interface ICustomisationDoc {
    /**
     * Name of the variable.
     */
    name: string;
    /**
     * Description of the variable.
     */
    description?: string;
    /**
     * Default value of the variable.
     */
    value: string;
}

const parseCustomisations = (source = ''): ICustomisationDoc[] => {
    const customisationRegex = /(?:\/\*\s*(.*?)\s*\*\/\s+)?--([\w-]+):\s*(.*?);/g;
    const matches = Array.from(source.matchAll(customisationRegex));

    const customisations = matches.map(([, description, name, value]) => ({
        name: `--${name}`,
        description: description.trim(),
        value,
    }));

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
                    {customisations.map(({ name, value, description }) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{description}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
