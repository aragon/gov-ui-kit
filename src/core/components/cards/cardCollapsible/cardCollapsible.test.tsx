import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CardCollapsible, type ICardCollapsibleProps } from './cardCollapsible';

describe('<CardCollapsible /> component', () => {
    const createTestComponent = (props?: Partial<ICardCollapsibleProps>) => {
        const completeProps = { ...props };

        return <CardCollapsible {...completeProps} />;
    };

    beforeEach(() => {
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(500);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders without crashing', () => {
        const children = 'Content of the card';
        render(createTestComponent({ children }));
        expect(screen.getByText('Content of the card')).toBeInTheDocument();
    });

    it('forwards defaultOpen prop to the Collapsible component', () => {
        const defaultOpen = true;
        const buttonLabelOpened = 'Close';
        const buttonLabelClosed = 'Open';

        render(createTestComponent({ defaultOpen, buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(buttonLabelOpened);
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('forwards buttonLabelOpened prop to the Collapsible component', () => {
        const defaultOpen = true;
        const buttonLabelOpened = 'Collapse content';

        render(createTestComponent({ defaultOpen, buttonLabelOpened }));

        expect(screen.getByText(buttonLabelOpened)).toBeInTheDocument();
    });

    it('forwards buttonLabelClosed prop to the Collapsible component', () => {
        const buttonLabelClosed = 'Expand content';

        render(createTestComponent({ buttonLabelClosed }));

        expect(screen.getByText(buttonLabelClosed)).toBeInTheDocument();
    });

    it('forwards onToggle callback to the Collapsible component', async () => {
        const user = userEvent.setup();
        const onToggle = jest.fn();

        render(createTestComponent({ onToggle }));

        const button = screen.getByRole('button');
        await user.click(button);

        expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('forwards isOpen prop to the Collapsible component', () => {
        const isOpen = true;
        const buttonLabelOpened = 'Close';

        render(createTestComponent({ isOpen, buttonLabelOpened }));

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders with showOverlay enabled', () => {
        const showOverlay = true;

        render(createTestComponent({ showOverlay }));

        const overlay = screen.getByTestId('collapsible-overlay');
        expect(overlay).toBeInTheDocument();
    });

    it('toggles content when button is clicked', async () => {
        const user = userEvent.setup();
        const buttonLabelOpened = 'Close';
        const buttonLabelClosed = 'Open';

        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(buttonLabelClosed);

        await user.click(button);
        expect(button).toHaveTextContent(buttonLabelOpened);
    });
});
