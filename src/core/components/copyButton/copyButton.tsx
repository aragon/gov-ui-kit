import { useCopy } from '../../hooks/';
import { AvatarIcon } from '../avatars';
import { Button, type ButtonSize } from '../button';
import { IconType } from '../icon';
import { Tooltip } from '../tooltip';

export type CopyButtonVariant = 'button' | 'avatar' | 'avatar-no-bg';

export interface ICopyButtonProps {
    /**
     * Text to be copied to the clipboard.
     */
    text: string;
    /**
     * Size of the button.
     * @default sm
     */
    size?: ButtonSize;
    /**
     * Variant of the button.
     * @default button
     */
    variant?: CopyButtonVariant;
}

export const CopyButton: React.FC<ICopyButtonProps> = (props) => {
    const { text, size = 'sm', variant = 'button' } = props;
    const { isCopied, handleCopy } = useCopy();

    const icon = isCopied ? IconType.CHECKMARK : IconType.COPY;
    const handleCopyClick = () => handleCopy(text);

    const renderContent = () => {
        if (variant === 'avatar' || variant === 'avatar-no-bg') {
            return (
                <AvatarIcon
                    variant="primary"
                    backgroundWhite={variant === 'avatar-no-bg'}
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
        <Tooltip content="Copy" wrapsButton={true}>
            {renderContent()}
        </Tooltip>
    );
};
