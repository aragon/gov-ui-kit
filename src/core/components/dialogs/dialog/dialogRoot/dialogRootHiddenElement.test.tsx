import { render, screen } from '@testing-library/react';
import { testLogger } from '../../../../test';
import { DialogRoot } from './dialogRoot';
import { DialogRootHiddenElement, type IDialogRootHiddenElementProps } from './dialogRootHiddenElement';

describe('<DialogRootHiddenElement /> component', () => {
    const createTestComponent = (props?: Partial<IDialogRootHiddenElementProps>) => {
        const completeProps: IDialogRootHiddenElementProps = {
            type: 'title',
            ...props,
        };

        return (
            <DialogRoot open={true}>
                <DialogRootHiddenElement {...completeProps} />
            </DialogRoot>
        );
    };

    it('renders empty container when label is not defined', () => {
        testLogger.suppressErrors(); // Suppress missing title/description warnings
        const { container } = render(createTestComponent({ label: undefined }));
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the specified title', () => {
        testLogger.suppressErrors(); // Suppress missing description warning
        const label = 'test-title';
        const type = 'title';
        render(createTestComponent({ label, type }));
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it('renders the specified description', () => {
        testLogger.suppressErrors(); // Suppress missing title warning
        const label = 'test-description';
        const type = 'description';
        render(createTestComponent({ label, type }));
        expect(screen.getByText(label)).toBeInTheDocument();
    });
});
