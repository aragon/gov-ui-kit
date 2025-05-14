import { useCopy } from '../../hooks/';
import { Button, type ButtonSize } from '../button';
import { IconType } from '../icon';
import { Tooltip } from '../tooltip';

export interface ICopyButtonProps {
    /**
     * Text to be copied to the clipboard.
     */
    text: string;
    /**
     * Size of the button.
     * @default lg
     */
    size?: ButtonSize;
}

export const CopyButton: React.FC<ICopyButtonProps> = (props) => {
    const { text, size } = props;
    const { isCopied, handleCopy } = useCopy();
    return (
        <Tooltip content="Copy">
            <Button
                variant="tertiary"
                iconLeft={isCopied ? IconType.CHECKMARK : IconType.COPY}
                size={size}
                onClick={() => handleCopy(text)}
            />
        </Tooltip>
    );
};
