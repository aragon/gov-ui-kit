import { render, screen } from '@testing-library/react';
import { CardCollapsible, type ICardCollapsibleProps } from './cardCollapsible';

describe('<CardCollapsible /> component', () => {
    const createTestComponent = (props?: Partial<ICardCollapsibleProps>) => {
        const completeProps = { ...props };

        return <CardCollapsible {...completeProps} />;
    };

    it('renders without crashing', () => {
        const children = 'Content of the card';
        render(createTestComponent({ children }));
        expect(screen.getByText('Content of the card')).toBeInTheDocument();
    });

    it('forwards props to the Collapsible component', () => {
        const defaultOpen = true;
        const buttonLabelOpened = 'Close';
        const buttonLabelClosed = 'Open';
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(500);

        render(createTestComponent({ buttonLabelOpened, defaultOpen }));
        expect(screen.queryByText(buttonLabelClosed)).not.toBeInTheDocument();
        expect(screen.getByText(buttonLabelOpened)).toBeInTheDocument();
    });
});
