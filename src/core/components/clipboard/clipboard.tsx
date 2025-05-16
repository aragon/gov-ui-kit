import { useCopy } from '../../hooks';
import { AvatarIcon, type AvatarIconSize } from '../avatars';
import { Button, type ButtonSize } from '../button';
import { IconType } from '../icon';
import { Tooltip } from '../tooltip';

export type ClipboardVariant = 'button' | 'avatar' | 'avatar-white-bg';

export interface IClipboardProps {
    /**
     * Text value to be copied to the clipboard.
     */
    copyValue: string;
    /**
     * Size of the button or avatar.
     * @default sm
     */
    size?: ButtonSize | AvatarIconSize;
    /**
     * Variant of the button.
     * @default button
     */
    variant?: ClipboardVariant;
}

export const Clipboard: React.FC<IClipboardProps> = (props) => {
    const { copyValue, size = 'sm', variant = 'button' } = props;
    const { isCopied, handleCopy } = useCopy();

    const icon = isCopied ? IconType.CHECKMARK : IconType.COPY;
    const handleCopyClick = () => handleCopy(copyValue);

    const renderContent = () => {
        if (variant === 'avatar' || variant === 'avatar-white-bg') {
            return (
                <AvatarIcon
                    variant="primary"
                    backgroundWhite={variant === 'avatar-white-bg'}
                    icon={icon}
                    size={size}
                    onClick={handleCopyClick}
                    className="cursor-pointer"
                />
            );
        }

        return <Button variant="tertiary" iconLeft={icon} size={size} onClick={handleCopyClick} />;
    };

    return (
        <Tooltip content="Copy" triggerAsChild={true}>
            {renderContent()}
        </Tooltip>
    );
};
