import { fireEvent, render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { InputSearch, type IInputSearchProps } from './inputSearch';

describe('<InputSearch /> component', () => {
    const createTestComponent = (props?: Partial<IInputSearchProps>) => {
        const completeProps = { ...props };

        return <InputSearch {...completeProps} />;
    };

    it('renders a input search field with a search icon', () => {
        render(createTestComponent());
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
        expect(screen.getByTestId(IconType.SEARCH)).toBeInTheDocument();
    });

    it('renders a clear icon when input length is greater than 0', () => {
        render(createTestComponent({ value: 'search' }));
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('hides the clear icon when input is empty', () => {
        render(createTestComponent({ value: '' }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('hides the clear icon when input is disabled', () => {
        render(createTestComponent({ isDisabled: true }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a loading indicator when the isLoading property is set to true', () => {
        const isLoading = true;
        render(createTestComponent({ isLoading }));
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('correctly handles styles on focus and blur and calls the onBlur and onFocus props', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        render(createTestComponent({ onFocus, onBlur }));
        const searchIcon = screen.getByTestId(IconType.SEARCH);

        fireEvent.focus(screen.getByRole('searchbox'));
        expect(searchIcon.getAttribute('class')).toContain('text-neutral-600');
        expect(onFocus).toHaveBeenCalled();

        fireEvent.blur(screen.getByRole('searchbox'));
        expect(searchIcon.getAttribute('class')).not.toContain('text-neutral-600');
        expect(onBlur).toHaveBeenCalled();
    });

    it('clears input value on clear icon click', () => {
        const initialValue = 'test';
        render(createTestComponent());
        fireEvent.change(screen.getByRole('searchbox'), { target: { value: initialValue } });
        expect(screen.getByRole<HTMLInputElement>('searchbox').value).toEqual(initialValue);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByRole<HTMLInputElement>('searchbox').value).toEqual('');
    });

    it('clears input value on clear icon enter press', () => {
        render(createTestComponent());
        fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'test' } });
        fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
        expect(screen.getByRole<HTMLInputElement>('searchbox').value).toEqual('');
    });
});
