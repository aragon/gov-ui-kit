import classNames from 'classnames';
import { AvatarIcon } from '../../avatars';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { Card } from '../card';
import type { ICardSummaryProps } from './cardSummary.api';

export const CardSummary: React.FC<ICardSummaryProps> = (props) => {
    const { icon, value, description, action, isStacked = true, className, ...otherProps } = props;

    const containerClassNames = classNames(
        'grid grid-cols-[auto_max-content] items-center gap-4 p-4 md:px-6 md:py-5',
        { 'md:gap-5': isStacked },
        { 'md:grid-flow-col md:grid-cols-[auto_1fr_1fr_max-content] md:gap-6': !isStacked },
    );

    return (
        <Card
            className={classNames({ 'w-80 md:w-120': isStacked }, { 'w-80 md:w-160': !isStacked }, className)}
            {...otherProps}
        >
            <div className={containerClassNames}>
                <AvatarIcon
                    className="self-center"
                    icon={icon}
                    responsiveSize={{ md: 'lg' }}
                    size="md"
                    variant="neutral"
                />
                <Button
                    href={action.href}
                    iconLeft={IconType.PLUS}
                    onClick={action.onClick}
                    responsiveSize={{ md: 'lg' }}
                    size="md"
                    variant="tertiary"
                >
                    {action.label}
                </Button>
                <div
                    className={classNames(
                        'col-span-2 flex gap-x-2 gap-y-1',
                        { 'flex-col': isStacked },
                        { 'flex-col md:col-start-2 md:flex-row md:items-baseline': !isStacked },
                    )}
                >
                    <p className="font-normal text-2xl text-neutral-800 leading-tight md:text-3xl">{value}</p>
                    <p className="font-normal text-base text-neutral-500 leading-tight">{description}</p>
                </div>
            </div>
        </Card>
    );
};
