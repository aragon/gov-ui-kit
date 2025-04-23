import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { Button } from '../../button';
import { IconType } from '../../icon';

export interface ITextAreaRichTextAction {
    /**
     * Icon of the action.
     */
    icon: IconType;
    /**
     * TipTap command or callback called on action click.
     */
    action?: () => unknown;
    /**
     * Hides the action when set to true.
     */
    hidden?: boolean;
}

export interface ITextAreaRichTextActionsProps {
    /**
     * Instance of the TipTap editor.
     */
    editor: Editor | null;
    /**
     * Renders the actions as disabled when set to true.
     */
    disabled?: boolean;
    /**
     * Callback called on expand action click.
     */
    onExpandClick?: () => void;
}

export const TextAreaRichTextActions: React.FC<ITextAreaRichTextActionsProps> = (props) => {
    const { editor, disabled, onExpandClick } = props;

    const unsetLink = () => editor?.chain().focus().extendMarkRange('link').unsetLink().run();

    const setLink = () => {
        const previousUrl = editor?.getAttributes('link').href as string;
        const url = window.prompt('URL', previousUrl);

        if (url == null || url === '') {
            unsetLink();

            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const getRichTextActions = () => {
        const actions: ITextAreaRichTextAction[] = [
            { icon: IconType.RICHTEXT_BOLD, action: () => editor?.chain().focus().toggleBold().run() },
            { icon: IconType.RICHTEXT_ITALIC, action: () => editor?.chain().focus().toggleItalic().run() },
            { icon: IconType.RICHTEXT_LINK_ADD, action: setLink, hidden: editor?.isActive('link') },
            { icon: IconType.RICHTEXT_LINK_REMOVE, action: unsetLink, hidden: !editor?.isActive('link') },
            { icon: IconType.RICHTEXT_LIST_UNORDERED, action: () => editor?.chain().focus().toggleBulletList().run() },
            { icon: IconType.RICHTEXT_LIST_ORDERED, action: () => editor?.chain().focus().toggleOrderedList().run() },
        ];

        return actions.filter((action) => !action.hidden);
    };

    return (
        <div
            className={classNames('flex flex-row justify-between gap-2 px-4 py-3 md:gap-3', {
                'gradient-neutral-50-transparent-to-b': !disabled,
            })}
        >
            <div className="flex flex-row flex-wrap gap-2 md:gap-3">
                {getRichTextActions().map(({ icon, action }) => (
                    <Button
                        key={icon}
                        variant="tertiary"
                        size="sm"
                        responsiveSize={{ md: 'md' }}
                        iconLeft={icon}
                        onClick={action}
                        disabled={disabled}
                    />
                ))}
            </div>
            <Button
                variant="tertiary"
                size="sm"
                responsiveSize={{ md: 'md' }}
                iconLeft={IconType.EXPAND}
                onClick={onExpandClick}
                disabled={disabled}
            />
        </div>
    );
};
