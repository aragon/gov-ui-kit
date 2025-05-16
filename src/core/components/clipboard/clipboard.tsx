import { useCopy } from '../../hooks';
import { AvatarIcon, type AvatarIconSize } from '../avatars';
import { Button, type ButtonSize } from '../button';
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

const tooltipText = 'Copy';

export const Clipboard: React.FC<IClipboardProps> = (props) => {
    const { copyValue, size = 'sm', variant = 'button' } = props;
    const { icon, handleCopy } = useCopy();

    const handleCopyClick = () => handleCopy(copyValue);

    if (variant === 'avatar' || variant === 'avatar-white-bg') {
        return (
            <Tooltip content={tooltipText} triggerAsChild={false}>
                <AvatarIcon
                    variant="primary"
                    backgroundWhite={variant === 'avatar-white-bg'}
                    icon={icon}
                    size={size}
                    onClick={handleCopyClick}
                    className="cursor-pointer"
                />
            </Tooltip>
        );
    }

    return (
        <Tooltip content={tooltipText} triggerAsChild={true}>
            <Button variant="tertiary" iconLeft={icon} size={size} onClick={handleCopyClick} />
        </Tooltip>
    );
};
