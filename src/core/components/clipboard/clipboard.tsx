import classNames from 'classnames';
import { useCopy } from '../../hooks';
import { AvatarIcon, type AvatarIconSize } from '../avatars';
import { Button, type ButtonSize } from '../button';
import { useGukCoreContext } from '../gukCoreProvider';
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
     * @default avatar
     */
    variant?: ClipboardVariant;
    /**
     * Class name to be applied to the wrapper.
     */
    className?: string;
    /**
     * Optional children to be rendered next to the clipboard.
     */
    children?: React.ReactNode;
}

export const Clipboard: React.FC<IClipboardProps> = (props) => {
    const { copyValue, size = 'sm', variant = 'avatar', className, children } = props;
    const { isCopied, handleCopy } = useCopy();

    const { copy: copyTexts } = useGukCoreContext();
    const tooltipText = copyTexts.clipboard.copy;

    const icon = isCopied ? IconType.CHECKMARK : IconType.COPY;
    const handleCopyClick = () => handleCopy(copyValue);

    return (
        <div className={classNames('flex items-center gap-2', className)}>
            {children}
            {(variant === 'avatar' || variant === 'avatar-white-bg') && (
                <Tooltip content={tooltipText} triggerAsChild={true}>
                    <button type="button" className="cursor-pointer" onClick={handleCopyClick}>
                        <AvatarIcon
                            variant="primary"
                            backgroundWhite={variant === 'avatar-white-bg'}
                            icon={icon}
                            size={size}
                        />
                    </button>
                </Tooltip>
            )}
            {variant === 'button' && (
                <Tooltip content={tooltipText} triggerAsChild={true}>
                    <Button variant="tertiary" iconLeft={icon} size={size} onClick={handleCopyClick} />
                </Tooltip>
            )}
        </div>
    );
};
