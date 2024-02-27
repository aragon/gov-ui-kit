import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../icon';
import { DropdownContainer, type IDropdownContainerProps } from './dropdownContainer';
import { DropdownItem } from './dropdownItem';

describe('<Dropdown.Container /> component', () => {
    const createTestComponent = (props?: Partial<IDropdownContainerProps>) => {
        const completeProps = {
            ...props,
        };

        return <DropdownContainer {...completeProps} />;
    };

    it('renders the dropdown trigger with the specified label', () => {
        const label = 'test';
        render(createTestComponent({ label }));
        expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
        expect(screen.getByTestId(IconType.CHEVRON_DOWN)).toBeInTheDocument();
    });

    it('hides the dropdown trigger icon when the hideIcon property is set to true', () => {
        const hideIcon = true;
        const label = 'test';
        render(createTestComponent({ hideIcon, label }));
        expect(screen.queryByTestId(IconType.CHEVRON_DOWN)).not.toBeInTheDocument();
    });

    it('still renders the dropdown icon when the component has no label and the hideIcon property is set to true', () => {
        const hideIcon = true;
        const label = undefined;
        render(createTestComponent({ hideIcon, label }));
        expect(screen.getByTestId(IconType.CHEVRON_DOWN)).toBeInTheDocument();
    });

    it('disables the dropdown trigger when the disabled property is set to true', () => {
        const disabled = true;
        render(createTestComponent({ disabled }));
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders the correct icon when the dropdown is open', () => {
        const open = true;
        render(createTestComponent({ open }));
        expect(screen.getByTestId(IconType.CHEVRON_UP)).toBeInTheDocument();
    });

    it('correctly triggers the onOpenChange callback on dropdown trigger click', async () => {
        const onOpenChange = jest.fn();
        render(createTestComponent({ onOpenChange }));
        await userEvent.click(screen.getByRole('button'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('correctly triggers the onOpenChange callback on dropdown item click', async () => {
        const onOpenChange = jest.fn();
        const children = [<DropdownItem key="first">First</DropdownItem>];
        render(createTestComponent({ onOpenChange, children }));
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByRole('menuitem'));
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });
    
    it('renders the customTrigger instead of the default button when specified', async () => {
        const onOpenChange = jest.fn();
        const customTrigger = <button>test</button>;
        render(createTestComponent({ onOpenChange, customTrigger }));

        const trigger = screen.getByRole('button', { name: 'test' });
        expect(trigger).toBeInTheDocument();

        await userEvent.click(trigger!);
        expect(onOpenChange).toHaveBeenCalled();
    });
});
