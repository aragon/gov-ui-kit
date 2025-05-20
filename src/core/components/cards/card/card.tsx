import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<ICardProps> = (props) => {
    const { className, ...otherProps } = props;

    return <div className={classNames('bg-neutral-0 shadow-neutral rounded-xl', className)} {...otherProps} />;
};
