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

    it('uses default collapsedSize on collapsible content', () => {
        const children = 'Default Children';
        render(createTestComponent({ children }));

        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('256px');
    });

    it('applies customCollapsedHeight correctly', () => {
        const children = 'Default Children';
        const customCollapsedHeight = 150;
        render(createTestComponent({ children, customCollapsedHeight }));

        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('150px');
    });

    it('computes collapsed height based on collapsedLines', () => {
        const children = 'Default Children';
        const mockStyles = { lineHeight: '20px' } as unknown as CSSStyleDeclaration;
        jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockStyles);
        render(createTestComponent({ children, collapsedLines: 3, collapsedSize: 'lg', customCollapsedHeight: 300 }));

        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('60px');
    });

    it('handles non-overflowing content correctly', () => {
        const children = 'Default Children';
        const customCollapsedHeight = 300;
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(200);
        render(createTestComponent({ children, customCollapsedHeight, buttonLabelClosed, buttonLabelOpened }));
        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('300px');
        expect(screen.queryByText(buttonLabelOpened)).not.toBeInTheDocument();
        expect(screen.queryByText(buttonLabelClosed)).not.toBeInTheDocument();
    });

    it('toggles opened/closed state when button is clicked', async () => {
        const user = userEvent.setup();
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';

        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByText('Closed');
        await user.click(button);
        expect(button.textContent).toBe('Open');
        await user.click(button);
        expect(button.textContent).toBe('Closed');
    });

    it('renders open when defaultOpen is true', () => {
        const children = 'Default Children';
        const defaultOpen = true;
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        render(createTestComponent({ children, buttonLabelOpened, buttonLabelClosed, defaultOpen }));
        const button = screen.getByRole('button');
        expect(button.textContent).toBe(buttonLabelOpened);
        expect(button.textContent).not.toBe(buttonLabelClosed);
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
        await user.click(screen.getByText('Expand'));
        expect(screen.getByText('Collapse')).toBeInTheDocument();
    });

    it('handles absence of buttonVariant using default button styles', async () => {
        const user = userEvent.setup();
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByRole('button');

        await user.click(button);
        expect(button).toHaveTextContent('Collapse');
    });

    it('renders an overlay with proper button when showOverlay prop is set to true', () => {
        const showOverlay = true;
        render(createTestComponent({ showOverlay }));
        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-neutral-0');
    });
});
