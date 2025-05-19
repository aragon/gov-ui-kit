import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Link, type ILinkProps } from '.';
import { IconType } from '../../icon';

describe('<Link /> component', () => {
    const createTestComponent = (props?: Partial<ILinkProps>) => {
        const completeProps: ILinkProps = { children: 'Default children', href: 'http://default.com', ...props };

        return <Link {...completeProps} />;
    };

    it('renders correctly with minimum props', () => {
        render(createTestComponent({ children: 'Example', href: 'http://example.com' }));
        const linkElement = screen.getByRole('link', { name: 'Example' });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'http://example.com');
    });

    it('applies correct classes based on disabled prop', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        render(createTestComponent({ children: 'TEST', disabled: true, onClick: handleClick }));

        // eslint-disable-next-line testing-library/no-node-access
        const linkElement = screen.getByText('TEST').closest('a')!;
        await user.click(linkElement);

        expect(linkElement).toHaveAttribute('aria-disabled', 'true');
        expect(linkElement).not.toHaveAttribute('href');
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders correctly with no icon', () => {
        const children = 'Link without icon';
        render(createTestComponent({ children, href: 'http://example.com' }));
        const linkElement = screen.getByRole('link', { name: 'Link without icon' });
        expect(linkElement).toHaveTextContent(children);
    });

    it('renders the URL below the link text when showUrl prop is set', () => {
        const children = 'Link with URL';
        const url = 'http://example.com';
        render(createTestComponent({ children, href: url, showUrl: true }));
        const linkElement = screen.getByRole('link');
        const urlElement = screen.getByText(url);
        expect(linkElement).toBeInTheDocument();
        expect(urlElement).toBeInTheDocument();
    });

    it('renders a link with proper target, rel attributes and icon when isExternal prop is set', () => {
        const children = 'External link';
        const icon = IconType.LINK_EXTERNAL;
        render(createTestComponent({ children, href: 'http://example.com', isExternal: true }));
        const linkElement = screen.getByRole('link', { name: 'External link' });
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer ');
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });
});
