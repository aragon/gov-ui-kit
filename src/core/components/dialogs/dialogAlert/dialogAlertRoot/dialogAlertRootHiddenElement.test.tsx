import { render, screen } from '@testing-library/react';
import { testLogger } from '../../../../test';
import { DialogAlertRoot } from './dialogAlertRoot';
import { DialogAlertRootHiddenElement, type IDialogAlertRootHiddenElementProps } from './dialogAlertRootHiddenElement';

describe('<DialogAlertRootHiddenElement /> component', () => {
    const createTestComponent = (props?: Partial<IDialogAlertRootHiddenElementProps>) => {
        const completeProps: IDialogAlertRootHiddenElementProps = {
            type: 'title',
            ...props,
        };

        return (
            <DialogAlertRoot open={true}>
                <DialogAlertRootHiddenElement {...completeProps} />
            </DialogAlertRoot>
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
