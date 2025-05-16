import { render, screen } from '@testing-library/react';
import * as Hooks from '../../hooks';
import { IconType } from '../icon';
import { Clipboard, type IClipboardProps } from './clipboard';

describe('<Clipboard /> component', () => {
    const useCopySpy = jest.spyOn(Hooks, 'useCopy');
    const handleCopySpy = jest.fn();

    beforeEach(() => {
        useCopySpy.mockReturnValue({
            isCopied: false,
            handleCopy: handleCopySpy,
        });
    });

    afterEach(() => {
        useCopySpy.mockReset();
        handleCopySpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IClipboardProps>) => {
        const completeProps: IClipboardProps = { copyValue: 'Text to copy', ...props };

        return <Clipboard {...completeProps} />;
    };

    it('renders button variant', () => {
        const icon = IconType.COPY;
        render(createTestComponent());
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('renders avatar variant', () => {
        const icon = IconType.COPY;
        render(createTestComponent({ variant: 'avatar' }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('renders avatar-white-bg variant', () => {
        const icon = IconType.COPY;
        render(createTestComponent({ variant: 'avatar-white-bg' }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('correctly handles the copy action', () => {
        const textToCopy = 'Text to copy';
        render(createTestComponent({ copyValue: textToCopy }));

        const button = screen.getByRole('button');
        button.click();

        expect(handleCopySpy).toHaveBeenCalledWith(textToCopy);
    });
});
