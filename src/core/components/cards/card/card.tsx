import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<ICardProps> = (props) => {
    const { className, ...otherProps } = props;

    return <div className={classNames('rounded-xl bg-neutral-0 shadow-neutral', className)} {...otherProps} />;
};
