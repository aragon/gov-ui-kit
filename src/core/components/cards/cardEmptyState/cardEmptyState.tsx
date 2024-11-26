import classNames from 'classnames';
import { EmptyState, type IEmptyStateProps } from '../../states/emptyState';
import { Card } from '../card';

export const CardEmptyState: React.FC<IEmptyStateProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <Card className={classNames('mx-auto flex w-full justify-center', className)}>
            <EmptyState {...otherProps} />
        </Card>
    );
};
