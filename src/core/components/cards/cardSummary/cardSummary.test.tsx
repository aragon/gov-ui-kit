import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../icon';
import { CardSummary } from './cardSummary';
import type { ICardSummaryProps } from './cardSummary.api';

describe('<CardSummary /> component', () => {
    const createTestComponent = (props?: Partial<ICardSummaryProps>) => {
        const completeProps: ICardSummaryProps = {
            value: '1',
            description: 'description-test',
            action: { label: 'action' },
            icon: IconType.PLUS,
            ...props,
        };

        return <CardSummary {...completeProps} />;
    };

    it('renders the summary value and description', () => {
        const value = '22';
        const description = 'Proposals created';
        render(createTestComponent({ value, description }));
        expect(screen.getByText(value)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('renders the specified icon', () => {
        const icon = IconType.BLOCKCHAIN_BLOCKCHAIN;
        render(createTestComponent({ icon }));
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('renders the specified action', async () => {
        const user = userEvent.setup();
        const label = 'action-test';
        const onClick = jest.fn();
        const action = { label, onClick };
        render(createTestComponent({ action, isStacked: false }));

        const button = screen.getByRole('button', { name: label });
        expect(button).toBeInTheDocument();

        await user.click(button);
        expect(onClick).toHaveBeenCalled();
    });
});
