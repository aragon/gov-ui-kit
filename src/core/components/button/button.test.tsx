import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { testLogger } from '../../test';
import { IconType } from '../icon';
import { Button } from './button';
import type { IButtonProps } from './button.api';

describe('<Button /> component', () => {
    const createTestComponent = (props?: Partial<IButtonProps>) => {
        const completeProps: IButtonProps = { ...props };

        return <Button {...completeProps} />;
    };

    it('renders a button', () => {
        render(createTestComponent());
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders the specified button label', () => {
        const children = 'Button label';
        render(createTestComponent({ children }));
        expect(screen.getByRole('button', { name: children })).toBeInTheDocument();
    });

    it('renders the icon-right when specified', () => {
        const iconRight = IconType.RELOAD;
        const children = 'Button content';
        render(createTestComponent({ iconRight, children }));
        expect(screen.getByTestId(iconRight)).toBeInTheDocument();
    });

    it('renders the icon-left when specified', () => {
        const iconLeft = IconType.RELOAD;
        render(createTestComponent({ iconLeft }));
        expect(screen.getByTestId(iconLeft)).toBeInTheDocument();
    });

    it('only renders the icon left when button has no content (only icon)', () => {
        const iconRight = IconType.CALENDAR;
        const iconLeft = IconType.CHECKMARK;
        const children = undefined;
        render(createTestComponent({ iconLeft, iconRight, children }));
        expect(screen.getByTestId(iconLeft)).toBeInTheDocument();
        expect(screen.queryByTestId(iconRight)).not.toBeInTheDocument();
    });

    it('renders a loading indicator and hides the icon right and left on loading state', () => {
        const iconRight = IconType.CALENDAR;
        const iconLeft = IconType.CHECKMARK;
        const children = 'Button';
        render(createTestComponent({ isLoading: true, iconLeft, iconRight, children }));
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.queryByTestId(iconRight)).not.toBeInTheDocument();
        expect(screen.queryByTestId(iconLeft)).not.toBeInTheDocument();
    });

    it('renders a link when the href property is set', () => {
        const href = 'https://www.aragon.org/';
        const children = 'Link label';
        render(createTestComponent({ href, children }));
        const link = screen.getByRole<HTMLAnchorElement>('link', { name: children });
        expect(link).toBeInTheDocument();
        expect(link.href).toEqual(href);
    });

    it('disables the button on disabled state', async () => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(createTestComponent({ disabled: true, onClick }));
        const button = screen.getByRole<HTMLButtonElement>('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
        await user.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('disables the button link on disabled state', async () => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        const href = '/test';
        render(createTestComponent({ disabled: true, href, onClick }));
        const link = screen.getByRole<HTMLAnchorElement>('link');
        expect(link).toHaveAttribute('aria-disabled', 'true');
        await user.click(link);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('supports the onClick property on link variant', async () => {
        // Suppress "Not implemented: navigation" warning
        testLogger.suppressErrors();
        const user = userEvent.setup();
        const onClick = jest.fn();
        const href = '/test';
        render(createTestComponent({ onClick, href }));
        await user.click(screen.getByRole('link'));
        expect(onClick).toHaveBeenCalled();
    });

    it('does not throw error when clicking on button and onClick property is not set on link variant', async () => {
        // Suppress "Not implemented: navigation" warning
        testLogger.suppressErrors();
        const user = userEvent.setup();
        const href = '/test';
        render(createTestComponent({ href }));
        await expect(user.click(screen.getByRole('link'))).resolves.toBeUndefined();
    });

    it('sets button type by default', () => {
        render(createTestComponent());
        expect(screen.getByRole<HTMLButtonElement>('button').type).toEqual('button');
    });

    it('allows customisation of button type', () => {
        const type = 'submit';
        render(createTestComponent({ type }));
        expect(screen.getByRole<HTMLButtonElement>('button').type).toEqual(type);
    });
});
