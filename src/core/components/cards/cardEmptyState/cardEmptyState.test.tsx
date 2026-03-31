import { render, screen } from '@testing-library/react';
import type { IEmptyStateProps } from '../../states';
import { CardEmptyState } from './cardEmptyState';

describe('<CardEmptyState /> component', () => {
    const createTestComponent = (props?: Partial<IEmptyStateProps>) => {
        const commonProps = {
            heading: 'test-heading',
        };

        if (props?.humanIllustration) {
            return <CardEmptyState humanIllustration={props.humanIllustration} {...commonProps} {...props} />;
        }
        const { humanIllustration, objectIllustration = { object: 'ACTION' }, ...otherProps } = props ?? {};

        return <CardEmptyState objectIllustration={objectIllustration} {...commonProps} {...otherProps} />;
    };

    it('renders EmptyState minimum props without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText('test-heading')).toBeInTheDocument();
        expect(screen.getByTestId('ACTION')).toBeInTheDocument();
    });
});
