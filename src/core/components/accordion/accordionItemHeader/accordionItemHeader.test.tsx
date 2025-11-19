import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AccordionContainer } from '../accordionContainer/accordionContainer';
import { AccordionItem } from '../accordionItem/accordionItem';
import { AccordionItemHeader, type IAccordionItemHeaderProps } from './accordionItemHeader';

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

        // Click on the CLOSE icon which is inside the remove button
        const closeIcon = screen.getByTestId('CLOSE');
        await user.click(closeIcon);

        expect(onClickMock).toHaveBeenCalledWith(expect.anything(), 0);
    });

    it('does not render chevron icon when removeControl is provided', () => {
        const onClickMock = jest.fn();
        const removeControl = { label: 'Remove', onClick: onClickMock, disabled: false };
        render(createTestComponent({ children: 'Test', removeControl, index: 0 }));

        expect(screen.queryByTestId('CHEVRON_DOWN')).not.toBeInTheDocument();
        expect(screen.getByTestId('CLOSE')).toBeInTheDocument();
    });
});
