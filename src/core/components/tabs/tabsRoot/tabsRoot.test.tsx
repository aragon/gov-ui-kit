import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { type ITabsRootProps, Tabs, TabsContext } from '../../tabs';

const TestChild: React.FC = () => {
    const context = useContext(TabsContext);
    return <div>{context.isUnderlined ? 'Underlined' : 'Not Underlined'}</div>;
};

describe('<Tabs.Root /> component', () => {
    const createTestComponent = (props?: Partial<ITabsRootProps>) => {
        const completeProps: ITabsRootProps = {
            ...props,
        };
        return <Tabs.Root {...completeProps} />;
    };

    it('should render with !isUnderlined by default', () => {
        const children = <TestChild />;
        render(createTestComponent({ children }));
        expect(screen.getByText('Not Underlined')).toBeInTheDocument();
    });

    it('should provide the correct context value', () => {
        const children = <TestChild />;
        const isUnderlined = true;

        render(createTestComponent({ isUnderlined, children }));
        expect(screen.getByText('Underlined')).toBeInTheDocument();
    });
});
