import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Collapsible } from './collapsible';
import { type ICollapsibleProps } from './collapsible.api';

describe('<Collapsible /> component', () => {
    const createTestComponent = (props?: Partial<ICollapsibleProps>) => {
        const completeProps = { ...props };

        return <Collapsible {...completeProps} />;
    };

    beforeEach(() => {
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(500);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders without crashing', () => {
        const children = 'Default Children';
        render(createTestComponent({ children }));

        expect(screen.getByText('Default Children')).toBeInTheDocument();
    });

    it('renders the content element with correct data-testid', () => {
        const children = 'Default Children';
        render(createTestComponent({ children }));

        expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();
    });

    it('does not render toggle button when content does not overflow', () => {
        const children = 'Default Children';
        const collapsedPixels = 300;
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(200);
        render(createTestComponent({ children, collapsedPixels, buttonLabelClosed, buttonLabelOpened }));

        expect(screen.queryByText(buttonLabelOpened)).not.toBeInTheDocument();
        expect(screen.queryByText(buttonLabelClosed)).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders toggle button when content overflows', () => {
        const buttonLabelClosed = 'Closed';

        render(createTestComponent({ buttonLabelClosed }));

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText(buttonLabelClosed)).toBeInTheDocument();
    });

    it('toggles button label when clicked', async () => {
        const user = userEvent.setup();
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';

        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Closed');

        await user.click(button);
        expect(button).toHaveTextContent('Open');

        await user.click(button);
        expect(button).toHaveTextContent('Closed');
    });

    it('renders open when defaultOpen is true', () => {
        const children = 'Default Children';
        const defaultOpen = true;
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        render(createTestComponent({ children, buttonLabelOpened, buttonLabelClosed, defaultOpen }));

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(buttonLabelOpened);
    });

    it('calls the onToggle callback with the new state', async () => {
        const user = userEvent.setup();
        const onToggle = jest.fn();
        render(createTestComponent({ onToggle }));

        const button = screen.getByRole('button');
        await user.click(button);
        expect(onToggle).toHaveBeenCalledWith(true);

        await user.click(button);
        expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('renders custom button labels', async () => {
        const user = userEvent.setup();
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        expect(screen.getByText('Expand')).toBeInTheDocument();

        await user.click(screen.getByRole('button'));
        expect(screen.getByText('Collapse')).toBeInTheDocument();
    });

    it('renders an overlay element when showOverlay is true and content is collapsed', () => {
        const showOverlay = true;
        render(createTestComponent({ showOverlay }));

        const overlay = screen.getByTestId('collapsible-overlay');
        expect(overlay).toBeInTheDocument();
    });

    it('does not render overlay when content is open', async () => {
        const user = userEvent.setup();
        const showOverlay = true;
        render(createTestComponent({ showOverlay }));

        const button = screen.getByRole('button');
        await user.click(button);

        expect(screen.queryByTestId('collapsible-overlay')).not.toBeInTheDocument();
    });

    it('does not render overlay when showOverlay is false', () => {
        const showOverlay = false;
        render(createTestComponent({ showOverlay }));

        expect(screen.queryByTestId('collapsible-overlay')).not.toBeInTheDocument();
    });

    it('sets aria-expanded to false when collapsed', () => {
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelClosed }));

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('sets aria-expanded to true when expanded', async () => {
        const user = userEvent.setup();
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelClosed }));

        const button = screen.getByRole('button');
        await user.click(button);

        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-controls attribute linking to content element', () => {
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelClosed }));

        const button = screen.getByRole('button');
        const contentElement = screen.getByTestId('collapsible-content');

        const ariaControls = button.getAttribute('aria-controls');
        expect(ariaControls).toBeTruthy();
        expect(contentElement.id).toBe(ariaControls);
    });

    it('uses controlled isOpen prop when provided', () => {
        const isOpen = true;
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';

        render(createTestComponent({ isOpen, buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(buttonLabelOpened);
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('respects controlled state and calls onToggle', async () => {
        const user = userEvent.setup();
        const onToggle = jest.fn();
        const isOpen = false;

        render(createTestComponent({ isOpen, onToggle }));

        const button = screen.getByRole('button');
        await user.click(button);

        expect(onToggle).toHaveBeenCalledWith(true);
    });
});
