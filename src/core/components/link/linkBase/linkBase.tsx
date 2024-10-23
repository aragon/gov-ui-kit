import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useGukCoreContext } from '../../gukCoreProvider';

export interface ILinkBaseProps extends ComponentPropsWithoutRef<'a'> {}

export const LinkBase = forwardRef<HTMLAnchorElement, ILinkBaseProps>((props, ref) => {
    const { Link } = useGukCoreContext();

    return <Link ref={ref} {...props} />;
});

LinkBase.displayName = 'LinkBase';
