import classNames from 'classnames';

export type TagVariant = 'neutral' | 'info' | 'warning' | 'critical' | 'success' | 'primary';

export interface ITagProps {
    /**
     * Defines the variant of the tag.
     * @default neutral
     */
    variant?: TagVariant;
    /**
     * Label of the tag.
     */
    label: string;
    /**
     * Classes for the component.
     */
    className?: string;
}

const variantToClassName: Record<TagVariant, string> = {
    neutral: 'bg-neutral-100 text-neutral-800',
    info: 'bg-info-200 text-info-800',
    warning: 'bg-warning-200 text-warning-800',
    critical: 'bg-critical-200 text-critical-800',
    success: 'bg-success-200 text-success-800',
    primary: 'bg-primary-50 text-primary-400',
};

export const Tag: React.FC<ITagProps> = (props) => {
    const { label, variant = 'neutral', className } = props;

    return (
        <div
            className={classNames(
                'flex h-5 items-center rounded-full px-1.5 md:h-6 md:px-2',
                variantToClassName[variant],
                className,
            )}
        >
            <p className="text-sm leading-tight font-normal md:text-base">{label}</p>
        </div>
    );
};
