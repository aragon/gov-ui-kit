import { Description, Title } from '@radix-ui/react-alert-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export interface IDialogAlertRootHiddenElementProps {
    /**
     * Label to be rendered for screen readers only.
     */
    label?: string;
    /**
     * Type of element to be displayed.
     */
    type: 'title' | 'description';
}

export const DialogAlertRootHiddenElement: React.FC<IDialogAlertRootHiddenElementProps> = (props) => {
    const { label, type } = props;

    if (!label) {
        return null;
    }

    const LabelComponent = type === 'title' ? Title : Description;

    return (
        <VisuallyHidden asChild={true}>
            <LabelComponent>{label}</LabelComponent>
        </VisuallyHidden>
    );
};
