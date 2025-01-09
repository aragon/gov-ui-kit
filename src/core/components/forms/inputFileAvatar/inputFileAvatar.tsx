import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { ErrorCode, useDropzone, type FileRejection } from 'react-dropzone';
import { useRandomId } from '../../../hooks';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { InputContainer, type InputVariant } from '../inputContainer';
import { InputFileAvatarError, type IInputFileAvatarProps } from './inputFileAvatar.api';

const stateToClassNames: Record<InputVariant | 'disabled', { containerClasses: string[]; addIconClasses: string[] }> = {
    default: {
        containerClasses: [
            'border-[1px] border-neutral-100 hover:border-neutral-200 border-dashed cursor-pointer focus-visible:ring-primary',
        ],
        addIconClasses: ['text-neutral-400 group-hover:text-neutral-600'],
    },
    warning: {
        containerClasses: [
            'border-[1px] border-warning-300 hover:border-warning-400 border-dashed cursor-pointer focus-visible:ring-warning',
        ],
        addIconClasses: ['text-warning-500 group-hover:text-warning-600'],
    },
    critical: {
        containerClasses: [
            'border-[1px] border-critical-500 hover:border-critical-600 border-dashed cursor-pointer focus-visible:ring-critical',
        ],
        addIconClasses: ['text-critical-500 group-hover:text-critical-600'],
    },
    disabled: {
        containerClasses: ['border-[1px] border-neutral-200'],
        addIconClasses: ['text-neutral-200'],
    },
};

const dropzoneErrorToError: Record<string, InputFileAvatarError | undefined> = {
    [ErrorCode.FileInvalidType]: InputFileAvatarError.FILE_INVALID_TYPE,
    [ErrorCode.FileTooLarge]: InputFileAvatarError.FILE_TOO_LARGE,
    [ErrorCode.TooManyFiles]: InputFileAvatarError.TOO_MANY_FILES,
};

export const InputFileAvatar: React.FC<IInputFileAvatarProps> = (props) => {
    const {
        onFileSelect,
        onFileError,
        maxFileSize,
        minDimension,
        maxDimension,
        acceptedFileTypes = { 'image/png': [], 'image/gif': [], 'image/jpeg': ['.jpg', '.jpeg'] },
        onlySquare,
        variant = 'default',
        disabled,
        initialValue,
        onCancel,
        ...otherProps
    } = props;

    const { id, ...containerProps } = otherProps;
    const randomId = useRandomId(id);

    const [imagePreview, setImagePreview] = useState<string | null>(initialValue ?? null);
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (rejectedFiles.length > 0) {
                const dropzoneError = rejectedFiles[0].errors[0].code;
                const internalError = dropzoneErrorToError[dropzoneError] ?? InputFileAvatarError.UNKNOWN_ERROR;
                onFileError?.(internalError);

                return;
            }

            const file = acceptedFiles[0];
            const image = new Image();
            setIsLoading(true);

            const onImageLoad = () => {
                const isBelowMinDimension = minDimension && (image.width < minDimension || image.height < minDimension);
                const isAboveMaxDimension = maxDimension && (image.width > maxDimension || image.height > maxDimension);

                if (onlySquare && image.height !== image.width) {
                    onFileError?.(InputFileAvatarError.SQUARE_ONLY);
                } else if (isBelowMinDimension ?? isAboveMaxDimension) {
                    onFileError?.(InputFileAvatarError.WRONG_DIMENSION);
                } else {
                    setImagePreview(image.src);
                    onFileSelect?.(file);
                }

                setIsLoading(false);
            };

            image.addEventListener('load', onImageLoad);
            image.addEventListener('error', () => {
                setIsLoading(false);
                onFileError?.(InputFileAvatarError.UNKNOWN_ERROR);
            });

            image.src = URL.createObjectURL(file);
        },
        [maxDimension, minDimension, onFileError, onFileSelect, onlySquare],
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: acceptedFileTypes,
        maxSize: maxFileSize,
        disabled: disabled,
        onDrop,
        multiple: false,
    });

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onCancel?.();
        setImagePreview(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    const processedVariant = disabled ? 'disabled' : variant;
    const { containerClasses, addIconClasses } = stateToClassNames[processedVariant];

    const inputAvatarClassNames = classNames(
        'group flex size-16 items-center justify-center rounded-full bg-neutral-0 hover:shadow-neutral',
        'focus:outline-none focus-visible:ring focus-visible:ring-offset',
        containerClasses,
    );

    return (
        <InputContainer id={randomId} useCustomWrapper={true} {...containerProps}>
            <div {...getRootProps()} className={inputAvatarClassNames}>
                <input {...getInputProps()} id={randomId} />
                {imagePreview ? (
                    <div className="relative">
                        <Avatar src={imagePreview} size="lg" className="cursor-pointer" data-testid="avatar" />
                        <button
                            onClick={handleCancel}
                            className={classNames(
                                'absolute -right-1 -top-1 cursor-pointer rounded-full bg-neutral-0 p-1 shadow-neutral',
                                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
                            )}
                            aria-label="Cancel Selection"
                        >
                            <Icon icon={IconType.CLOSE} size="sm" />
                        </button>
                    </div>
                ) : (
                    <>
                        {isLoading && <Spinner size="lg" variant="neutral" />}
                        {!imagePreview && !isLoading && (
                            <Icon icon={IconType.PLUS} size="lg" className={classNames(addIconClasses)} />
                        )}
                    </>
                )}
            </div>
        </InputContainer>
    );
};
