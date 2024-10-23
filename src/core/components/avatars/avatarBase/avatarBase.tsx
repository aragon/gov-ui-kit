import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useGukCoreContext } from '../../gukCoreProvider';

export interface IAvatarBaseProps extends ComponentPropsWithoutRef<'img'> {}

export const AvatarBase = forwardRef<HTMLImageElement, IAvatarBaseProps>((props, ref) => {
    const { Img } = useGukCoreContext();

    return <Img ref={ref} {...props} />;
});

AvatarBase.displayName = 'AvatarBase';
