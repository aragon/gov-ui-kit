import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';

export interface IDefinitionListContainerProps extends ComponentPropsWithoutRef<'dl'> {}

export const DefinitionListContainer: React.FC<IDefinitionListContainerProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <dl className={classNames('w-full', className)} {...otherProps}>
            {children}
        </dl>
    );
};
