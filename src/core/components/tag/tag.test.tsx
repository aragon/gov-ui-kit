import { render, screen } from '@testing-library/react';
import { type ITagProps, Tag } from './tag';

describe('<Tag /> component', () => {
    const createTestComponent = (props?: Partial<ITagProps>) => {
        const completeProps = {
            label: 'my-label',
            ...props,
        };

        return <Tag {...completeProps} />;
    };

    it('renders the specified label', () => {
        const label = 'label-test';
        render(createTestComponent({ label }));
        expect(screen.getByText(label)).toBeInTheDocument();
    });
});
