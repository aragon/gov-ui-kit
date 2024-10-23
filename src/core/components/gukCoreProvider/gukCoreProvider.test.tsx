import { render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { coreCopy, type CoreCopy } from '../../assets';
import {
    GukCoreProvider,
    useGukCoreContext,
    type IGukCoreContext,
    type IGukCoreProviderProps,
} from './gukCoreProvider';

describe('<GukCoreProvider /> component', () => {
    const createTestComponent = (props?: IGukCoreProviderProps) => {
        const completeProps: IGukCoreProviderProps = { ...props };

        return <GukCoreProvider {...completeProps} />;
    };

    const createHookWrapper = (context?: Partial<IGukCoreContext>) =>
        function hookWrapper(props: { children: ReactNode }) {
            return <GukCoreProvider values={context}>{props.children}</GukCoreProvider>;
        };

    it('renders the children property', () => {
        const children = 'test-children';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('correctly sets the context values', () => {
        const customCopy: CoreCopy = {
            ...coreCopy,
            inputContainer: {
                ...coreCopy.inputContainer,
                optionalLabel: 'Not required',
            },
        };
        const context = { Img: () => 'img', Link: () => 'link', copy: customCopy };
        const { result } = renderHook(() => useGukCoreContext(), { wrapper: createHookWrapper(context) });
        expect(result.current).toEqual(context);
    });

    it('fallbacks to the default values when some context values are not set', () => {
        const context = { Link: () => 'link' };
        const { result } = renderHook(() => useGukCoreContext(), { wrapper: createHookWrapper(context) });
        expect(result.current.Link).toEqual(context.Link);
        expect(result.current.Img).toEqual('img');
    });

    describe('useGukCoreContext', () => {
        it('returns default values when not used inside a GukCoreProvider', () => {
            const { result } = renderHook(() => useGukCoreContext());
            expect(result.current.Img).toEqual('img');
            expect(result.current.Link).toEqual('a');
        });
    });
});
