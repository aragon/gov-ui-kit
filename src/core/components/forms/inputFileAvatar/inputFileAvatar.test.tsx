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
        const completeProps = { ...props };

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

    it('displays a preview and calls the onFileSelect callback when a valid file is selected', async () => {
        const user = userEvent.setup();
        const label = 'test-label';
        const fileSrc = 'https://chucknorris.com/image.png';
        const file = new File(['(⌐□_□)'], fileSrc, { type: 'image/png' });
        const onFileSelect = jest.fn();
        createObjectURLMock.mockReturnValue(fileSrc);

        render(createTestComponent({ label, onFileSelect }));
        await user.upload(screen.getByLabelText(label), file);
        const previewImg = await screen.findByRole<HTMLImageElement>('img');

        expect(previewImg).toBeInTheDocument();
        expect(previewImg.src).toEqual(fileSrc);
        expect(onFileSelect).toHaveBeenCalledWith(file);
    });

    it('clears the current file selection on close button click after an image has been selected', async () => {
        const user = userEvent.setup();
        const label = 'test-label';
        const file = new File(['something'], 'test.png', { type: 'image/png' });
        createObjectURLMock.mockReturnValue('file-src');

        render(createTestComponent({ label }));
        await user.upload(screen.getByLabelText(label), file);
        const cancelButton = await screen.findByRole('button');
        expect(cancelButton).toBeInTheDocument();

        await user.click(cancelButton);
        expect(screen.getByTestId(IconType.PLUS)).toBeInTheDocument();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('calls onFileError when file has incorrect dimensions', async () => {
        const user = userEvent.setup();
        (window.Image.prototype as HTMLImageElement).width = 800;

        const label = 'test-label';
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        const onFileError = jest.fn();
        const minDimension = 1000;

        render(createTestComponent({ label, onFileError, minDimension }));
        await user.upload(screen.getByLabelText(label), file);
        await waitFor(() => expect(onFileError).toHaveBeenCalledWith(InputFileAvatarError.WRONG_DIMENSION));
    });

    it('displays the initialValue image preview when provided', async () => {
        const initialValue = 'https://example.com/avatar.png';
        render(createTestComponent({ initialValue }));
        const previewImg = await screen.findByRole<HTMLImageElement>('img');

        expect(previewImg).toBeInTheDocument();
        expect(previewImg.src).toEqual(initialValue);
    });

    it('fires the onCancel callback when cancel button is clicked', async () => {
        const user = userEvent.setup();
        const label = 'test-label';
        const onCancel = jest.fn();

        const file = new File(['something'], 'test.png', { type: 'image/png' });
        createObjectURLMock.mockReturnValue('file-src');

        render(createTestComponent({ label, onCancel }));
        await user.upload(screen.getByLabelText(label), file);
        const cancelButton = await screen.findByRole('button');
        expect(cancelButton).toBeInTheDocument();

        await user.click(cancelButton);

        expect(onCancel).toHaveBeenCalled();
        expect(screen.getByTestId(IconType.PLUS)).toBeInTheDocument();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });


});
