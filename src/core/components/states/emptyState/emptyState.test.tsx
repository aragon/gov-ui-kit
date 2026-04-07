import { render, screen } from '@testing-library/react';
import { EmptyState } from './emptyState';
import type { IEmptyStateProps } from './emptyState.api';

describe('<EmptyState /> component', () => {
    const createTestComponent = (props?: Partial<IEmptyStateProps>) => {
        const commonProps = {
            heading: 'test-heading',
        };

        if (props?.humanIllustration) {
            return <EmptyState humanIllustration={props.humanIllustration} {...commonProps} {...props} />;
        }
        const { humanIllustration, objectIllustration = { object: 'ACTION' }, ...otherProps } = props ?? {};

        return <EmptyState objectIllustration={objectIllustration} {...commonProps} {...otherProps} />;
    };

    it('renders the EmptyState component stacked with full props and object illustration', () => {
        const objectIllustration = { object: 'LIGHTBULB' } as const;
        const primaryButton = { label: 'Label' };
        const secondaryButton = { label: 'Label' };
        render(createTestComponent({ objectIllustration, primaryButton, secondaryButton }));

        expect(screen.getByText('test-heading')).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
        expect(screen.getByTestId('LIGHTBULB')).toBeInTheDocument();
    });

    it('renders the EmptyState component stacked with full props and human illustration', () => {
        const humanIllustration = { body: 'VOTING', expression: 'SMILE' } as const;
        const primaryButton = { label: 'Label' };
        const secondaryButton = { label: 'Label' };
        render(createTestComponent({ humanIllustration, primaryButton, secondaryButton }));

        expect(screen.getByText('test-heading')).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
        expect(screen.getByTestId('VOTING')).toBeInTheDocument();
    });

    it('renders the EmptyState component unstacked with full props and object illustration', () => {
        const objectIllustration = { object: 'LIGHTBULB' } as const;
        const primaryButton = { label: 'Label' };
        const secondaryButton = { label: 'Label' };
        const isStacked = false;
        render(createTestComponent({ isStacked, objectIllustration, primaryButton, secondaryButton }));

        expect(screen.getByText('test-heading')).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
        const objectImage = screen.getByTestId('LIGHTBULB');
        expect(objectImage).toHaveClass('order-last');
    });

    it('renders the EmptyState component unstacked with full props and human illustration', () => {
        const humanIllustration = { body: 'VOTING', expression: 'SMILE' } as const;
        const primaryButton = { label: 'Label' };
        const secondaryButton = { label: 'Label' };
        const isStacked = false;
        render(createTestComponent({ isStacked, humanIllustration, primaryButton, secondaryButton }));

        expect(screen.getByText('test-heading')).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: 'Label' });
        expect(buttons).toHaveLength(2);
        const humanImage = screen.getByTestId('VOTING');
        // eslint-disable-next-line testing-library/no-node-access  -- testid for SVG is nearest accessible attribute and reliable to the illustration
        expect(humanImage.closest('.order-last')).toBeInTheDocument();
    });
});
