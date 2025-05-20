import { Icon, IconType } from '../icon';
import { Link } from '../link';
import { Tag, type ITagProps } from '../tag';

export interface IBreadcrumbsLink {
    /**
     * Label to be displayed in the Breadcrumbs.
     */
    label: string;
    /**
     * Optional href to be used in the Link component for clickable navigation.
     */
    href?: string;
}

export interface IBreadcrumbsProps {
    /**
     * Array of BreadcrumbsLink objects (@see IBreadcrumbsLink).
     * The array indicates depth from the current position to be displayed in the Breadcrumbs.
     * Starting at index 0 you must define the root up to the current location.
     * The final index which will render as non-active and without separator.
     */
    links: IBreadcrumbsLink[];
    /**
     * Optional tag pill to be displayed at the end of the Breadcrumbs for extra info.
     */
    tag?: ITagProps;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = (props) => {
    const { links, tag, ...otherProps } = props;

    const currentPage = links[links.length - 1];
    const pathLinks = links.slice(0, -1);

    return (
        <nav aria-label="breadcrumbs" className="flex min-w-0 items-center gap-x-2" {...otherProps}>
            <ol className="flex min-w-0 items-center gap-x-0.5">
                {pathLinks.map((link) => (
                    <li key={link.href} className="flex items-center gap-x-1 whitespace-nowrap">
                        <Link href={link.href}>{link.label}</Link>
                        <Icon icon={IconType.SLASH} className="text-neutral-200" responsiveSize={{ md: 'lg' }} />
                    </li>
                ))}
                <li
                    aria-current="page"
                    className="truncate text-sm leading-tight font-normal text-neutral-500 md:text-base"
                >
                    {currentPage.label}
                </li>
            </ol>
            {tag && <Tag {...tag} />}
        </nav>
    );
};
