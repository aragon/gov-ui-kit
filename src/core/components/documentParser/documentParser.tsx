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
}

export const DocumentParser: React.FC<IDocumentParserProps> = (props) => {
    const { children, className, document, ...otherProps } = props;

    const sanitizeDocument = (document: string): string => {
        return sanitizeHtml(document, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'del']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ['src', 'alt'],
                a: ['href', 'title'],
            },
            disallowedTagsMode: 'recursiveEscape',
        });
    };

    const parser = useEditor({
        editable: false,
        extensions: [
            StarterKit,
            Image,
            Markdown,
            TipTapLink.configure({
                openOnClick: false,
            }),
        ],
        content: sanitizeDocument(document),
    });

    useEffect(() => {
        if (parser) {
            parser.commands.setContent(sanitizeDocument(document), true);
        }
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
