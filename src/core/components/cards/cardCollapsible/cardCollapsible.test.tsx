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

    it('renders without crashing', async () => {
        const children = 'Content of the card';
        render(createTestComponent({ children }));
        expect(screen.getByText('Content of the card')).toBeInTheDocument();
        // Wait for the initial async measurement to settle to avoid act warnings.
        await screen.findByRole('button');
    });

    it('forwards defaultOpen prop to the Collapsible component', async () => {
        const defaultOpen = true;
        const buttonLabelOpened = 'Close';
        const buttonLabelClosed = 'Open';

        render(createTestComponent({ defaultOpen, buttonLabelOpened, buttonLabelClosed }));

        const button = await screen.findByRole('button');
        expect(button).toHaveTextContent(buttonLabelOpened);
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('forwards buttonLabelOpened prop to the Collapsible component', async () => {
        const defaultOpen = true;
        const buttonLabelOpened = 'Collapse content';

        render(createTestComponent({ defaultOpen, buttonLabelOpened }));

        expect(await screen.findByText(buttonLabelOpened)).toBeInTheDocument();
    });

    it('forwards buttonLabelClosed prop to the Collapsible component', async () => {
        const buttonLabelClosed = 'Expand content';

        render(createTestComponent({ buttonLabelClosed }));

        expect(await screen.findByText(buttonLabelClosed)).toBeInTheDocument();
    });

    it('forwards onToggle callback to the Collapsible component', async () => {
        const user = userEvent.setup();
        const onToggle = jest.fn();

        render(createTestComponent({ onToggle }));

        const button = await screen.findByRole('button');
        await user.click(button);

        expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('forwards isOpen prop to the Collapsible component', async () => {
        const isOpen = true;
        const buttonLabelOpened = 'Close';

        render(createTestComponent({ isOpen, buttonLabelOpened }));

        const button = await screen.findByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders with showOverlay always', async () => {
        render(createTestComponent());

        const overlay = await screen.findByTestId('collapsible-overlay');
        expect(overlay).toBeInTheDocument();
    });

    it('toggles content when button is clicked', async () => {
        const user = userEvent.setup();
        const buttonLabelOpened = 'Close';
        const buttonLabelClosed = 'Open';

        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = await screen.findByRole('button');
        expect(button).toHaveTextContent(buttonLabelClosed);

        await user.click(button);
        expect(button).toHaveTextContent(buttonLabelOpened);
    });
});
