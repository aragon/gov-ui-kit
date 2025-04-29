import { render, screen } from '@testing-library/react';
import { DefinitionList, type IDefinitionListItemProps } from '../../definitionList';

describe('<DefinitionList.Item /> component', () => {
    const createTestComponent = (props?: Partial<IDefinitionListItemProps>) => {
        const completeProps: IDefinitionListItemProps = {
            term: 'Default Term',
            ...props,
        };

        return <DefinitionList.Item {...completeProps} />;
    };

    it('renders the specified term correctly', () => {
        const term = 'Custom Term';
        render(createTestComponent({ term }));

        const termLabel = screen.queryByRole('term');

        expect(termLabel).toHaveTextContent(term);
    });

    it('renders the specified description correctly', () => {
        const children = 'Custom Description';
        render(createTestComponent({ children }));

        const description = screen.queryByRole('definition');

        expect(description).toHaveTextContent(children);
    });

    it('renders a link when href is provided', () => {
        const href = 'https://example.com';
        const children = 'Click Here';
        render(createTestComponent({ link: { href }, children }));

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', href);
        expect(link).toHaveTextContent(children);
    });
});
