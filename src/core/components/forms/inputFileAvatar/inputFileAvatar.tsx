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
            'border-[1px] border-neutral-100 hover:border-neutral-200 border-dashed cursor-pointer focus-ring-primary',
        ],
        addIconClasses: ['text-neutral-400 group-hover:text-neutral-600'],
    },
    warning: {
        containerClasses: [
            'border-[1px] border-warning-300 hover:border-warning-400 border-dashed cursor-pointer focus-ring-warning',
        ],
        addIconClasses: ['text-warning-500 group-hover:text-warning-600'],
    },
    critical: {
        containerClasses: [
            'border-[1px] border-critical-500 hover:border-critical-600 border-dashed cursor-pointer focus-ring-critical',
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
        maxFileSize,
        minDimension,
        maxDimension,
        acceptedFileTypes = { 'image/png': [], 'image/gif': [], 'image/jpeg': ['.jpg', '.jpeg'] },
        onlySquare,
        variant = 'default',
        disabled,
        value,
        onChange,
        ...otherProps
    } = props;

    const { id, ...containerProps } = otherProps;
    const randomId = useRandomId(id);

    const [isLoading, setIsLoading] = useState(false);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (rejectedFiles.length > 0) {
                const dropzoneError = rejectedFiles[0].errors[0].code;
                const internalError = dropzoneErrorToError[dropzoneError] ?? InputFileAvatarError.UNKNOWN_ERROR;
                onChange({ error: internalError });

                return;
            }

            const file = acceptedFiles[0];
            const image = new Image();
            setIsLoading(true);

            const onImageLoad = () => {
                const isBelowMinDimension = minDimension && (image.width < minDimension || image.height < minDimension);
                const isAboveMaxDimension = maxDimension && (image.width > maxDimension || image.height > maxDimension);

                if (onlySquare && image.height !== image.width) {
                    onChange({ error: InputFileAvatarError.SQUARE_ONLY });
                } else if (isBelowMinDimension ?? isAboveMaxDimension) {
                    onChange({ error: InputFileAvatarError.WRONG_DIMENSION });
                } else {
                    onChange({ url: image.src, file });
                }

                setIsLoading(false);
            };

            image.addEventListener('load', onImageLoad);
            image.addEventListener('error', () => {
                setIsLoading(false);
                onChange({ error: InputFileAvatarError.UNKNOWN_ERROR });
            });

            image.src = URL.createObjectURL(file);
        },
        [maxDimension, minDimension, onChange, onlySquare],
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
        onChange(undefined);
        if (value?.url) {
            URL.revokeObjectURL(value.url);
        }
    };

    const processedVariant = disabled ? 'disabled' : variant;
    const { containerClasses, addIconClasses } = stateToClassNames[processedVariant];

    const inputAvatarClassNames = classNames(
        'group flex size-16 items-center justify-center rounded-full bg-neutral-0 hover:shadow-neutral',
        containerClasses,
    );

    return (
        <InputContainer id={randomId} useCustomWrapper={true} {...containerProps}>
            <div {...getRootProps()} className={inputAvatarClassNames}>
                <input {...getInputProps()} id={randomId} />

                {value?.url || value?.error ? (
                    <div className="relative">
                        <Avatar src={value.url} size="lg" className="cursor-pointer" data-testid="avatar" />
                        <button
                            onClick={handleCancel}
                            className={classNames(
                                'bg-neutral-0 shadow-neutral focus-ring-primary absolute -top-1 -right-1 cursor-pointer rounded-full p-1',
                            )}
                            type="button"
                            aria-label="Cancel Selection"
                        >
                            <Icon icon={IconType.CLOSE} size="sm" />
                        </button>
                    </div>
                ) : (
                    <>
                        {isLoading && <Spinner size="lg" variant="neutral" />}
                        {!value?.url && !isLoading && (
                            <Icon icon={IconType.PLUS} size="lg" className={classNames(addIconClasses)} />
                        )}
                    </>
                )}
            </div>
        </InputContainer>
    );
};
