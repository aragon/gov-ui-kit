import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { useGukCoreContext } from '../../gukCoreProvider';
import { InteractiveAncestorProvider } from '../../interactiveAncestor';

export interface ILinkBaseProps extends ComponentPropsWithoutRef<'a'> {}

export const LinkBase = forwardRef<HTMLAnchorElement, ILinkBaseProps>((props, ref) => {
    const { Link } = useGukCoreContext();

    return (
        <InteractiveAncestorProvider value={true}>
            <Link ref={ref} {...props} />
        </InteractiveAncestorProvider>
    );
});

LinkBase.displayName = 'LinkBase';
