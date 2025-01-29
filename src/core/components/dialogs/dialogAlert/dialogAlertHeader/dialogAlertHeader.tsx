import { Title } from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { AvatarIcon } from '../../../avatars';
import { IconType } from '../../../icon';
import { useDialogAlertContext } from '../dialogAlertContext';
import type { DialogAlertVariant } from '../dialogAlertRoot';

export interface IDialogAlertHeaderProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Title summarizing dialog's content or purpose.
     */
    title: string;
}

const dialogAlertVariantToIcon: Record<DialogAlertVariant, IconType> = {
    critical: IconType.CRITICAL,
    info: IconType.INFO,
    success: IconType.SUCCESS,
    warning: IconType.WARNING,
};

const dialogAlertVariantToTitleClass: Record<DialogAlertVariant, string> = {
    critical: 'text-critical-600',
    info: 'text-info-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
};

export const DialogAlertHeader: React.FC<IDialogAlertHeaderProps> = (props) => {
    const { title, className, ...otherProps } = props;

    const { variant } = useDialogAlertContext();

    const headerClassNames = classNames(
        'flex w-full items-center gap-x-4 rounded-t-xl bg-modal-header px-4 pb-2 pt-4 backdrop-blur-md md:px-6 md:pt-6',
        className,
    );

    const titleClassNames = classNames(
        'flex-1 truncate text-lg leading-tight',
        dialogAlertVariantToTitleClass[variant],
    );

    return (
        <div className={headerClassNames} {...otherProps}>
            <Title className={titleClassNames}>{title}</Title>
            <AvatarIcon icon={dialogAlertVariantToIcon[variant]} variant={variant} size="lg" />
        </div>
    );
};
