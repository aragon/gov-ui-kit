import { render, screen } from '@testing-library/react';

import { IconType } from '../../icon';
import { AvatarIcon, type IAvatarIconProps } from './avatarIcon';

describe('<AvatarIcon /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarIconProps>) => {
        const completeProps: IAvatarIconProps = {
            icon: IconType.PLUS,
            ...props,
        };

        return <AvatarIcon {...completeProps} />;
    };

    it('renders the specified icon', () => {
        const icon = IconType.APP_DASHBOARD;
        render(createTestComponent({ icon }));
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('renders correct style for background-white variant', () => {
        const backgroundWhite = true;
        const icon = IconType.PLUS;
        render(createTestComponent({ backgroundWhite, icon }));
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByTestId(icon).parentElement?.classList).toContain('bg-neutral-0');
    });
});
