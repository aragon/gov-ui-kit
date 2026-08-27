import { render, screen } from '@testing-library/react';

import { Icon, type IIconProps } from './icon';
import { IconType } from './iconType';

describe('<Icon /> component', () => {
    const createTestComponent = (props?: Partial<IIconProps>) => {
        const completeProps: IIconProps = {
            icon: IconType.PLUS,
            ...props,
        };

        return <Icon {...completeProps} />;
    };

    it.each(Object.values(IconType))('renders %s icon', (icon) => {
        render(createTestComponent({ icon }));
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });
});
