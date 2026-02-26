import classNames from 'classnames';
import { Collapsible, type ICollapsibleProps } from '../../collapsible';
import { Card } from '../card';

export interface ICardCollapsibleProps
    extends Omit<ICollapsibleProps, 'buttonVariant' | 'className' | 'showOverlay' | 'collapsedLines'> {
    /**
     * Additional class names to apply to the card.
     */
    className?: string;
    /**
     * The collapsed height in pixels. CardCollapsible always uses overlay mode (showOverlay=true),
     * which requires pixel-based height measurement instead of line-based counting.
     * @default 180
     */
    collapsedPixels?: number;
}

export const CardCollapsible: React.FC<ICardCollapsibleProps> = (props) => {
    const { children, className, collapsedPixels = 180, ...otherProps } = props;

    return (
        <Card className={classNames('p-4 md:p-6', className)}>
            <Collapsible showOverlay={true} collapsedPixels={collapsedPixels} {...otherProps}>
                {children}
            </Collapsible>
        </Card>
    );
};
