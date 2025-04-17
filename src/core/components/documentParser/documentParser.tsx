import { Image } from '@tiptap/extension-image';
import TipTapLink from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useEffect, type ComponentPropsWithoutRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import { Markdown } from 'tiptap-markdown';

export interface IDocumentParserProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * The stringified document of Markdown or HTML to parse into a styled output.
     */
    document: string;
    /**
     * Whether to render the editor on the first render or not.
     */
    immediatelyRender?: boolean;
}

export const DocumentParser: React.FC<IDocumentParserProps> = (props) => {
    const { children, className, document, immediatelyRender, ...otherProps } = props;

    const sanitizeDocument = (document: string): string => {
        const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img', 'del']);
        const disallowedTagsMode = 'recursiveEscape';
        const allowedAttributes = {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt'],
            a: ['href', 'title'],
        };

        return sanitizeHtml(document, { allowedTags, allowedAttributes, disallowedTagsMode });
    };

    const extensions = [StarterKit, Image, Markdown, TipTapLink.configure({ openOnClick: false })];
    const parser = useEditor({ editable: false, immediatelyRender, extensions, content: sanitizeDocument(document) });

    useEffect(() => {
        parser?.commands.setContent(sanitizeDocument(document), true);
    }, [document, parser]);

    return (
        <EditorContent
            editor={parser}
            className={classNames('prose prose-neutral', className)}
            data-testid="doc-parser"
            {...otherProps}
        />
    );
};
