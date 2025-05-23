import { render, screen } from '@testing-library/react';
import { DefinitionListItemContent, type IDefinitionListItemContentProps } from './definitionListItemContent';

describe('<DefinitionListItemContent /> component', () => {
    const createTestComponent = (props?: Partial<IDefinitionListItemContentProps>) => {
        const completeProps: IDefinitionListItemContentProps = { ...props };

        return <DefinitionListItemContent {...completeProps} />;
    };

    it('renders the children property', () => {
        const children = 'test-content';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('renders a link component when the link property is set', () => {
        const children = 'link-test';
        const link = { href: 'https://example.com' };
        render(createTestComponent({ link, children }));
        expect(screen.getByRole('link', { name: children })).toBeInTheDocument();
    });

    it('renders the link as external by default', () => {
        const link = { href: 'https://default-external.com' };
        render(createTestComponent({ link }));
        expect(screen.getByRole('link').getAttribute('target')).toEqual('_blank');
    });
});
