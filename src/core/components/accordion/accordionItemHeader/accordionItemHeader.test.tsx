import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AccordionContainer } from '../accordionContainer/accordionContainer';
import { AccordionItem } from '../accordionItem/accordionItem';
import { AccordionItemHeader } from './accordionItemHeader';
import type { IAccordionItemHeaderProps } from './accordionItemHeader.api';

describe('<Accordion.ItemHeader /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionItemHeaderProps>) => {
        return (
            <AccordionContainer isMulti={true}>
                <AccordionItem value="value-key">
                    <AccordionItemHeader {...props} />
                </AccordionItem>
            </AccordionContainer>
        );
    };

    it('renders the children property', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });

    it('renders with a button element', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders with the correct AvatarIcon', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const avatarIcon = screen.getByTestId('CHEVRON_DOWN');
        expect(avatarIcon).toBeInTheDocument();
    });

    it('renders remove button when removeControl and index are provided', () => {
        const onClickMock = jest.fn();
        const removeControl = { label: 'Remove', onClick: onClickMock, disabled: false };
        render(createTestComponent({ children: 'Test', removeControl, index: 0 }));

        const removeButton = screen.getByTestId('CLOSE');
        expect(removeButton).toBeInTheDocument();
    });

    it('calls onClick when remove button is clicked', async () => {
        const user = userEvent.setup();
        const onClickMock = jest.fn();
        const removeControl = { label: 'Remove', onClick: onClickMock, disabled: false };
        render(createTestComponent({ children: 'Test', removeControl, index: 0 }));

        const closeIcon = screen.getByTestId('CLOSE');
        await user.click(closeIcon);

        expect(onClickMock).toHaveBeenCalledWith(0);
    });

    it('does not render chevron icon when removeControl is provided', () => {
        const onClickMock = jest.fn();
        const removeControl = { label: 'Remove', onClick: onClickMock, disabled: false };
        render(createTestComponent({ children: 'Test', removeControl, index: 0 }));

        expect(screen.queryByTestId('CHEVRON_DOWN')).not.toBeInTheDocument();
        expect(screen.getByTestId('CLOSE')).toBeInTheDocument();
    });

    it('disables the remove button when removeControl.disabled is true', () => {
        const onClickMock = jest.fn();
        const removeControl = { label: 'Remove', onClick: onClickMock, disabled: true };
        render(createTestComponent({ children: 'Test', removeControl, index: 0 }));

        expect(screen.getByTestId('CLOSE')).toBeInTheDocument();
        const removeButton = screen
            .getAllByRole('button')
            .find((button) => within(button).queryByTestId('CLOSE') != null);
        expect(removeButton).toBeDisabled();
    });

    it('does not expand accordion when remove button is clicked (stopPropagation)', async () => {
        const user = userEvent.setup();
        const onClickMock = jest.fn();
        const removeControl = { label: 'Remove', onClick: onClickMock, disabled: false };
        render(createTestComponent({ children: 'Test', removeControl, index: 0 }));

        const closeIcon = screen.getByTestId('CLOSE');
        const accordionHeader = screen.getByRole('heading', { name: 'Test' });
        expect(accordionHeader).toHaveAttribute('data-state', 'closed');
        await user.click(closeIcon);
        expect(accordionHeader).toHaveAttribute('data-state', 'closed');
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('works with different index values', async () => {
        const user = userEvent.setup();
        const onClickMock = jest.fn();
        const removeControl = { label: 'Remove', onClick: onClickMock, disabled: false };
        render(createTestComponent({ children: 'Test', removeControl, index: 5 }));

        const closeIcon = screen.getByTestId('CLOSE');
        await user.click(closeIcon);

        expect(onClickMock).toHaveBeenCalledWith(5);
    });

    it('renders tooltip with removeControl label', async () => {
        const user = userEvent.setup();
        const removeControl = { label: 'Remove this item', onClick: jest.fn(), disabled: false };
        render(createTestComponent({ children: 'Test', removeControl, index: 0 }));

        expect(screen.getByTestId('CLOSE')).toBeInTheDocument();
        const removeButton = screen
            .getAllByRole('button')
            .find((button) => within(button).queryByTestId('CLOSE') != null);

        if (removeButton) {
            await user.hover(removeButton);
        }

        const tooltip = await screen.findByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent('Remove this item');
    });

    it('does not render remove button when only index is provided', () => {
        render(createTestComponent({ children: 'Test', index: 0 }));

        expect(screen.queryByTestId('CLOSE')).not.toBeInTheDocument();
        expect(screen.getByTestId('CHEVRON_DOWN')).toBeInTheDocument();
    });

    it('does not render remove button when only removeControl is provided', () => {
        const removeControl = { label: 'Remove', onClick: jest.fn(), disabled: false };
        render(createTestComponent({ children: 'Test', removeControl }));

        expect(screen.queryByTestId('CLOSE')).not.toBeInTheDocument();
        expect(screen.getByTestId('CHEVRON_DOWN')).toBeInTheDocument();
    });
});
