import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../icon';
import { type IInputSearchProps, InputSearch } from './inputSearch';

describe('<InputSearch /> component', () => {
    const createTestComponent = (props?: Partial<IInputSearchProps>) => {
        const completeProps = { ...props };

        return <InputSearch {...completeProps} />;
    };

    it('renders an input search field with a search icon', () => {
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
        render(createTestComponent({ disabled: true }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a loading indicator when the isLoading property is set to true', () => {
        const isLoading = true;
        render(createTestComponent({ isLoading }));
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('correctly handles styles on focus and blur and calls the onBlur and onFocus props', async () => {
        const user = userEvent.setup();
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        render(createTestComponent({ onFocus, onBlur }));
        const searchbox = screen.getByRole('searchbox');
        const searchIcon = screen.getByTestId(IconType.SEARCH);

        await user.click(searchbox);
        expect(searchIcon.getAttribute('class')).toContain('text-neutral-600');
        expect(onFocus).toHaveBeenCalled();

        await user.tab();
        expect(searchIcon.getAttribute('class')).not.toContain('text-neutral-600');
        expect(onBlur).toHaveBeenCalled();
    });

    it('clears input value on clear icon click', async () => {
        const user = userEvent.setup();
        const initialValue = 'test';
        render(createTestComponent());
        const searchbox = screen.getByRole<HTMLInputElement>('searchbox');
        await user.type(searchbox, initialValue);
        expect(searchbox.value).toEqual(initialValue);
        await user.click(screen.getByRole('button'));
        expect(searchbox.value).toEqual('');
    });
});
