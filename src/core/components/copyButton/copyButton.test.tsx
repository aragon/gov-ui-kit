import { render, screen } from '@testing-library/react';
import * as Hooks from '../../hooks';
import { IconType } from '../icon';
import { CopyButton, type ICopyButtonProps } from './copyButton';

describe('<CopyButton /> component', () => {
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

    const createTestComponent = (props?: Partial<ICopyButtonProps>) => {
        const completeProps: ICopyButtonProps = { text: 'Text to copy', ...props };

        return <CopyButton {...completeProps} />;
    };

    it('renders a copy button', () => {
        const icon = IconType.COPY;
        render(createTestComponent());
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('correctly handles the copy action', () => {
        const textToCopy = 'Text to copy';
        render(createTestComponent({ text: textToCopy }));

        const button = screen.getByRole('button');
        button.click();

        expect(handleCopySpy).toHaveBeenCalledWith(textToCopy);
    });
});
