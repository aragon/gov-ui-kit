import { render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { modulesCopy, type ModulesCopy } from '../../assets';
import {
    GukModulesProvider,
    useGukModulesContext,
    type IGukModulesContext,
    type IGukModulesProviderProps,
} from './gukModulesProvider';

jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    QueryClientProvider: (props: { children: ReactNode }) => (
        <div data-testid="query-client-mock">{props.children}</div>
    ),
}));

jest.mock('wagmi', () => ({
    ...jest.requireActual('wagmi'),
    WagmiProvider: (props: { children: ReactNode }) => <div data-testid="wagmi-mock">{props.children}</div>,
}));

describe('<GukModulesProvider /> component', () => {
    const createTestComponent = (props?: Partial<IGukModulesProviderProps>) => {
        const completeProps = {
            ...props,
        };

        return <GukModulesProvider {...completeProps} />;
    };

    const createHookWrapper = (context?: Partial<IGukModulesContext>) =>
        function hookWrapper(props: { children: ReactNode }) {
            return <GukModulesProvider values={context}>{props.children}</GukModulesProvider>;
        };

    it('renders the wagmi and react-query providers with default configs', () => {
        const children = 'test-children';
        render(createTestComponent({ children }));
        expect(screen.getByTestId('query-client-mock')).toBeInTheDocument();
        expect(screen.getByTestId('wagmi-mock')).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('correctly sets the context values', () => {
        const customCopy: ModulesCopy = {
            ...modulesCopy,
            addressInput: {
                ...modulesCopy.addressInput,
                clear: 'Remove',
            },
        };
        const context = { copy: customCopy };
        const { result } = renderHook(() => useGukModulesContext(), { wrapper: createHookWrapper(context) });
        expect(result.current).toEqual(context);
    });
});
