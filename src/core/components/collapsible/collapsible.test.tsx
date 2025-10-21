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

    it('applies collapsedPixels correctly', () => {
        const children = 'Default Children';
        const collapsedPixels = 150;
        render(createTestComponent({ children, collapsedPixels }));

        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('150px');
    });

    it('handles non-overflowing content correctly', () => {
        const children = 'Default Children';
        const collapsedPixels = 300;
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(200);
        render(createTestComponent({ children, collapsedPixels, buttonLabelClosed, buttonLabelOpened }));
        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('300px');
        expect(screen.queryByText(buttonLabelOpened)).not.toBeInTheDocument();
        expect(screen.queryByText(buttonLabelClosed)).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
        expect(button).toBeInTheDocument();
    });

    it('overlay has gradient classes when shown and collapsed', () => {
        const showOverlay = true;
        render(createTestComponent({ showOverlay }));
        const overlay = screen.getByTestId('collapsible-overlay');
        expect(overlay).toHaveClass('bg-gradient-to-t');
        expect(overlay).toHaveClass('from-neutral-0/98');
        expect(overlay).toHaveClass('via-neutral-0/85');
        expect(overlay).toHaveClass('to-neutral-0/30');
    });

    it('applies CSS line-clamp when using collapsedLines (no collapsedPixels)', () => {
        const children = 'Default Children';
        const collapsedLines = 3;
        const lineHeight = 20;
        jest.spyOn(window, 'getComputedStyle').mockReturnValue({ lineHeight } as unknown as CSSStyleDeclaration);
        render(createTestComponent({ children, collapsedLines, showOverlay: true }));

        const contentEl = screen.getByTestId('collapsible-content');
        expect(contentEl).toBeInTheDocument();

        const styleAttr = contentEl.getAttribute('style') ?? '';
        expect(styleAttr).toContain('-webkit-line-clamp: 3');
        expect(styleAttr).toContain('display: -webkit-box');
        expect(styleAttr).toContain('overflow: hidden');
        // max-height should not be applied when using clamp
        expect(contentEl.style.maxHeight).toBe('');
    });

    it('computes overlay height from overlayLines and lineHeight', () => {
        const children = 'Default Children';
        const collapsedLines = 5;
        const overlayLines = 2;
        const lineHeight = 18;
        const mockStyles = { lineHeight } as unknown as CSSStyleDeclaration;
        jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockStyles);

        render(createTestComponent({ children, collapsedLines, overlayLines, showOverlay: true }));
        const overlay = screen.getByTestId('collapsible-overlay');
        const expectedHeight = overlayLines * lineHeight;
        expect(overlay.style.height).toBe(`${expectedHeight.toString()}px`);
    });

    it('uses clamp styles for collapsedLines and no max-height when collapsedPixels is undefined', () => {
        const children = 'Default Children';
        const collapsedLines = 5;
        jest.spyOn(window, 'getComputedStyle').mockReturnValue({ lineHeight: 16 } as unknown as CSSStyleDeclaration);
        render(createTestComponent({ children, collapsedLines }));

        const contentEl = screen.getByTestId('collapsible-content');
        expect(contentEl).toBeInTheDocument();
        const styleAttr = contentEl.getAttribute('style') ?? '';
        expect(styleAttr).toContain(`-webkit-line-clamp: ${collapsedLines.toString()}`);
        expect(contentEl.style.maxHeight).toBe('');
    });
});
