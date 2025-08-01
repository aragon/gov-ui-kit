import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Markdown, type MarkdownStorage } from 'tiptap-markdown';
import { useRandomId } from '../../../hooks';
import { type IInputContainerProps, InputContainer } from '../inputContainer';
import { TextAreaRichTextActions } from './textAreaRichTextActions';

export type ValueFormat = 'html' | 'markdown' | 'text';

export interface ITextAreaRichTextProps
    extends Omit<IInputContainerProps, 'maxLength' | 'inputLength' | 'value' | 'onChange' | 'id'> {
    /**
     * Current value of the input.
     */
    value?: string;
    /**
     * Id of the input.
     */
    id?: string;
    /**
     * Callback called on value change.
     */
    onChange?: (value: string) => void;
    /**
     * Placeholder of the input.
     */
    placeholder?: string;
    /**
     * Whether to render the editor on the first render or not.
     */
    immediatelyRender?: boolean;
    /**
     * Format of the input value, which determines how content is interpreted and returned.
     * Can be serialized HTML, markdown, or plain text.
     *
     * @default 'html'
     */
    valueFormat?: ValueFormat;
}

// Classes to properly style the TipTap placeholder
// (see https://tiptap.dev/docs/editor/api/extensions/placeholder#additional-setup)
const placeholderClasses = classNames(
    'first:before:pointer-events-none first:before:absolute first:before:top-5', // General
    'first:before:text-base/tight first:before:font-normal first:before:text-neutral-300', // Typography
    'first:before:content-[attr(data-placeholder)]', // Content
);

export const TextAreaRichText: React.FC<ITextAreaRichTextProps> = (props) => {
    const {
        value,
        onChange,
        placeholder,
        disabled,
        className,
        id,
        immediatelyRender,
        valueFormat = 'html',
        ...containerProps
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const randomId = useRandomId(id);

    const extensions = [
        StarterKit,
        Placeholder.configure({
            placeholder,
            emptyNodeClass: placeholderClasses,
            showOnlyWhenEditable: false,
        }),
        Link,
        Markdown.configure({ transformPastedText: true }),
    ];

    const editor = useEditor({
        extensions,
        content: value,
        editable: !disabled,
        immediatelyRender,
        editorProps: {
            attributes: {
                class: 'outline-hidden p-4 [overflow-wrap:anywhere]! prose prose-neutral min-h-40 h-full max-w-none leading-normal',
                role: 'textbox',
                'aria-labelledby': randomId,
            },
        },
        onUpdate: ({ editor }) => {
            if (editor.getText() === '') {
                onChange?.('');
                return;
            }

            const handlers: Record<ValueFormat, () => string | undefined> = {
                html: () => editor.getHTML(),
                text: () => editor.getText(),
                markdown: () => {
                    const markdownStorage = editor.storage.markdown as MarkdownStorage | undefined;

                    if (markdownStorage) {
                        return markdownStorage.getMarkdown();
                    }

                    return editor.getHTML();
                },
            };

            const value = handlers[valueFormat]() ?? editor.getHTML();

            onChange?.(value);
        },
    });

    const toggleExpanded = () => setIsExpanded((current) => !current);

    // Hide page overflow and set pointer-event to auto (e.g. if the component is rendered inside a modal) when
    // component is expanded
    useEffect(() => {
        document.body.style.overflow = isExpanded ? 'hidden' : 'auto';

        if (isExpanded) {
            document.body.style.pointerEvents = 'auto';
        }
    }, [isExpanded]);

    // Update editable setting on Tiptap editor on disabled property change
    useEffect(() => {
        editor?.setEditable(!disabled);
    }, [editor, disabled]);

    // Add keydown listener to reset expanded state on ESC key down
    useEffect(() => {
        const handleKeyDown = ({ key }: KeyboardEvent) => {
            if (key === 'Escape') {
                setIsExpanded(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const textAreaRichText = (
        <InputContainer
            disabled={disabled}
            className={classNames(className, {
                'fixed top-0 left-0 z-[var(--guk-text-area-rich-text-expanded-z-index)] h-screen w-full [&>label]:hidden':
                    isExpanded,
            })}
            wrapperClassName={classNames('grow overflow-hidden', {
                'rounded-none!': isExpanded,
            })}
            id={randomId}
            {...containerProps}
        >
            <div className="flex h-full grow flex-col self-start overflow-auto">
                <TextAreaRichTextActions editor={editor} disabled={disabled} onExpandClick={toggleExpanded} />
                <EditorContent editor={editor} className="h-full" />
            </div>
        </InputContainer>
    );

    if (isExpanded) {
        return createPortal(textAreaRichText, document.body);
    }

    return textAreaRichText;
};
