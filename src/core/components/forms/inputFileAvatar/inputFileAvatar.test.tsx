import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../icon';
import { InputFileAvatar } from './inputFileAvatar';
import { InputFileAvatarError, type IInputFileAvatarProps } from './inputFileAvatar.api';

Object.defineProperty(URL, 'createObjectURL', { value: jest.fn(), configurable: true });
Object.defineProperty(URL, 'revokeObjectURL', { value: jest.fn(), configurable: true });

describe('<InputFileAvatar /> component', () => {
    const createObjectURLMock = jest.spyOn(URL, 'createObjectURL');
    const revokeObjectURLMock = jest.spyOn(URL, 'revokeObjectURL');

    const originalGlobalImage = window.Image;

    beforeEach(() => {
        (window.Image as unknown) = class MockImage {
            onload: () => void = jest.fn();
            onerror: () => void = jest.fn();
            src = 'test';

            removeEventListener = jest.fn();
            addEventListener = (event: string, callback: () => void) => {
                if (event === 'load') {
                    this.onload = callback;
                } else if (event === 'error') {
                    this.onerror = callback;
                }
            };

            constructor() {
                setTimeout(() => this.onload(), 100);
            }
        };
    });

    afterEach(() => {
        window.Image = originalGlobalImage;
        createObjectURLMock.mockReset();
        revokeObjectURLMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IInputFileAvatarProps>) => {
        const completeProps = {
            onChange: jest.fn(),
            ...props,
        };

        return <InputFileAvatar {...completeProps} />;
    };

    it('renders a file input and an add icon', () => {
        const label = 'input-label';
        render(createTestComponent({ label }));
        const fileInput = screen.getByLabelText<HTMLInputElement>(label);
        expect(fileInput).toBeInTheDocument();
        expect(fileInput.type).toEqual('file');
        expect(screen.getByTestId(IconType.PLUS)).toBeInTheDocument();
    });

    it('displays a preview and calls the onChange callback when a valid file is selected', async () => {
        const user = userEvent.setup();
        const label = 'test-label';
        const fileSrc = 'https://chucknorris.com/image.png';
        const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });
        const onChange = jest.fn();
        createObjectURLMock.mockReturnValue(fileSrc);

        const { rerender } = render(createTestComponent({ label, onChange }));

        const fileInput = screen.getByLabelText<HTMLInputElement>(label);
        await user.upload(fileInput, file);

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith({ url: fileSrc, file });
        });

        rerender(createTestComponent({ onChange, value: { url: fileSrc, file } }));

        const previewImg = await screen.findByTestId('avatar');
        expect(previewImg).toBeInTheDocument();
        expect(previewImg).toHaveAttribute('src', fileSrc);
    });

    it('clears the current file selection on close button click after an image has been selected', async () => {
        const user = userEvent.setup();
        const file = new File(['something'], 'test.png', { type: 'image/png' });
        const fileSrc = 'file-src';
        const onChange = jest.fn();
        createObjectURLMock.mockReturnValue(fileSrc);

        const { rerender } = render(createTestComponent({ onChange, value: { url: fileSrc, file } }));

        const cancelButton = await screen.findByRole('button');
        expect(cancelButton).toBeInTheDocument();

        await user.click(cancelButton);

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith(undefined);
        });

        rerender(createTestComponent({ onChange }));

        expect(screen.getByTestId(IconType.PLUS)).toBeInTheDocument();
        expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
        expect(revokeObjectURLMock).toHaveBeenCalledWith(fileSrc);
    });

    it('calls onChange and sets error property when file has incorrect dimensions', async () => {
        const user = userEvent.setup();
        (window.Image.prototype as HTMLImageElement).width = 800;

        const label = 'test-label';
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        const onChange = jest.fn();
        const minDimension = 1000;

        render(createTestComponent({ label, onChange, minDimension }));
        await user.upload(screen.getByLabelText(label), file);
        await waitFor(() => expect(onChange).toHaveBeenCalledWith({ error: InputFileAvatarError.WRONG_DIMENSION }));
    });

    it('displays the initialValue image preview when provided', async () => {
        const value = { url: 'https://example.com/avatar.png' };
        render(createTestComponent({ value }));
        const previewImg = await screen.findByRole<HTMLImageElement>('img');

        expect(previewImg).toBeInTheDocument();
        expect(previewImg.src).toEqual(value.url);
    });

    it('renders the cancel button when error is present and clears error on button click', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();

        const { rerender } = render(
            createTestComponent({
                onChange,
                value: { error: InputFileAvatarError.WRONG_DIMENSION },
            }),
        );

        const cancelButton = await screen.findByRole('button');
        expect(cancelButton).toBeInTheDocument();

        await user.click(cancelButton);

        expect(onChange).toHaveBeenCalledWith(undefined);

        rerender(createTestComponent({ onChange }));
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
