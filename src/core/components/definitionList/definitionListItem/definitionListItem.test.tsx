import { render, screen } from '@testing-library/react';
import { DefinitionList, type IDefinitionListItemProps } from '../../definitionList';
import { IconType } from '../../icon';

describe('<DefinitionList.Item /> component', () => {
    const createTestComponent = (props?: Partial<IDefinitionListItemProps>) => {
        const completeProps: IDefinitionListItemProps = {
            term: 'Default Term',
            ...props,
        };

        return <DefinitionList.Item {...completeProps} />;
    };

    it('renders the specified term', () => {
        const term = 'Custom Term';
        render(createTestComponent({ term }));
        expect(screen.queryByRole('term')).toHaveTextContent(term);
    });

    it('renders the specified definition', () => {
        const children = 'Custom Definition';
        render(createTestComponent({ children }));
        expect(screen.queryByRole('definition')).toHaveTextContent(children);
    });

    it('renders the specified description', () => {
        const description = 'Term Description';
        render(createTestComponent({ description }));
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('renders an icon to copy the defined value when copyValue is set', () => {
        render(createTestComponent({ copyValue: 'copy-test' }));
        expect(screen.getByTestId(IconType.COPY)).toBeInTheDocument();
    });
});
