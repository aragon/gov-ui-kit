import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import type { IllustrationObjectType } from '../illustrationObject';
import { illustrationObjectList } from '../illustrationObject/illustrationObjectList';
import {
    illustrationHumanAccessoryList,
    illustrationHumanBodyList,
    illustrationHumanExpressionList,
    illustrationHumanHairsList,
    illustrationHumanSunglassesList,
} from './illustrationHumanList';
import type {
    IllustrationHumanAccessory,
    IllustrationHumanBody,
    IllustrationHumanExpression,
    IllustrationHumanHairs,
    IllustrationHumanSunglasses,
} from './illustrationHumanType';

export interface IIllustrationHumanProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Body of the illustration human.
     */
    body: IllustrationHumanBody;
    /**
     * Expression of the illustration human.
     */
    expression: IllustrationHumanExpression;
    /**
     * Hairs of the illustration human.
     */
    hairs?: IllustrationHumanHairs;
    /**
     * Sunglasses of the illustration human.
     */
    sunglasses?: IllustrationHumanSunglasses;
    /**
     * Accessory of the illustration human.
     */
    accessory?: IllustrationHumanAccessory;
    /**
     * Object to be displayed.
     */
    object?: IllustrationObjectType;
    /**
     * Position of the object.
     * @default left
     */
    objectPosition?: 'right' | 'left';
}

export const IllustrationHuman: React.FC<IIllustrationHumanProps> = (props) => {
    const {
        body,
        expression,
        hairs,
        sunglasses,
        accessory,
        className,
        style,
        object,
        objectPosition = 'left',
        ...otherProps
    } = props;

    const Body = illustrationHumanBodyList[body];
    const Expression = illustrationHumanExpressionList[expression];

    const Hairs = hairs ? illustrationHumanHairsList[hairs] : undefined;
    const Sunglasses = sunglasses ? illustrationHumanSunglassesList[sunglasses] : undefined;
    const Accessory = accessory ? illustrationHumanAccessoryList[accessory] : undefined;
    const ObjectIllustration = object ? illustrationObjectList[object] : undefined;

    const computedStyle = { width: '100%', ...style };
    const commonProps = { className: 'absolute top-0 right-0' };

    return (
        <div className={classNames('relative', className)} style={computedStyle} {...otherProps}>
            <Body data-testid={body} />
            <Expression data-testid={expression} {...commonProps} />
            {Hairs && <Hairs data-testid={hairs} {...commonProps} />}
            {Sunglasses && <Sunglasses data-testid={sunglasses} {...commonProps} />}
            {Accessory && <Accessory data-testid={accessory} {...commonProps} />}
            {ObjectIllustration && (
                <ObjectIllustration
                    className={classNames(
                        'absolute top-0 h-[70%]',
                        { 'left-0': objectPosition === 'left' },
                        { 'right-0': objectPosition === 'right' },
                    )}
                    data-testid={object}
                />
            )}
        </div>
    );
};
