import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Tooltip, type ITooltipProps } from './tooltip';

describe('<Tooltip/> component', () => {
    const createTestComponent = (props?: Partial<ITooltipProps>) => {
        const completeProps: ITooltipProps = { content: 'test-content', ...props };

        return <Tooltip {...completeProps} />;
    };

    it(`does not render the tooltip content by default`, () => {
        const content = 'test-content';

        render(createTestComponent({ content }));

        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        expect(screen.queryByText(content)).not.toBeInTheDocument();
    });

    it(`renders the tooltip content when the trigger is hovered on`, async () => {
        const user = userEvent.setup();
        const trigger = 'test-trigger';
        const content = 'test-content';

        render(createTestComponent({ content, children: trigger }));

        await user.hover(screen.getByText(trigger));
        const tooltip = await screen.findByRole('tooltip');

        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent(content);
    });

    it('calls onOpenChange with true on trigger hover', async () => {
        const user = userEvent.setup();
        const handleOpenChange = jest.fn();
        const trigger = 'test-trigger';

        render(createTestComponent({ children: trigger, onOpenChange: handleOpenChange }));

        await user.hover(screen.getByText(trigger));
        await waitFor(() => expect(handleOpenChange).toHaveBeenCalledWith(true));
    });
});
