import { render, screen } from '@testing-library/react';
import { GukCoreProvider, type IGukCoreContext } from '../../gukCoreProvider';
import { LinkBase, type ILinkBaseProps } from './linkBase';

describe('<LinkBase /> component', () => {
    const createTestComponent = (props?: Partial<ILinkBaseProps>, context?: Partial<IGukCoreContext>) => {
        const completeProps: ILinkBaseProps = { ...props };

        return (
            <GukCoreProvider values={context}>
                <LinkBase {...completeProps} />
            </GukCoreProvider>
        );
    };

    it('renders the link component set on the GukCoreProvider', () => {
        const Link = (props: object) => (
            <a data-testid="my-link-component" {...props}>
                Link
            </a>
        );
        const context = { Link };
        const props = { href: 'https://link.com/' };
        render(createTestComponent(props, context));
        const link = screen.getByRole<HTMLAnchorElement>('link');
        expect(link.href).toEqual(props.href);
        expect(screen.getByTestId('my-link-component')).toBeInTheDocument();
    });
});
