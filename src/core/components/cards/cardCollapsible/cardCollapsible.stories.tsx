import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardCollapsible } from './cardCollapsible';

/**
 * CardCollapsible component that can wrap any content and visually collapse it for space-saving purposes.
 */
const meta: Meta<typeof CardCollapsible> = {
    title: 'Core/Components/Cards/CardCollapsible',
    component: CardCollapsible,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=10157-27011&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof CardCollapsible>;

/**
 * Default usage example of the CardCollapsible component.
 */
export const Default: Story = {
    args: { buttonLabelClosed: 'Read more', buttonLabelOpened: 'Read less' },
    render: (args) => (
        <CardCollapsible {...args}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec
                sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien nec turpis tincidunt
                scelerisque.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec
                sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien nec turpis tincidunt
                scelerisque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur
                tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam
                nec sapien nec turpis tincidunt scelerisque.
            </p>
        </CardCollapsible>
    ),
};

/**
 * CardCollapsible component with an image as the content.
 */
export const WithImage: Story = {
    args: {
        buttonLabelClosed: 'See more',
        buttonLabelOpened: 'See less',
    },
    render: (args) => (
        <CardCollapsible {...args}>
            <img src="https://source.unsplash.com/800x600/?landscape" alt="A beautiful landscape" />
        </CardCollapsible>
    ),
};

/**
 * Complex rich-text content mixing headings, lists, paragraphs and inline code,
 * similar to Tiptap/ProseMirror output. Used to verify clamping and overlay.
 */
export const ComplexRichText: Story = {
    args: {
        buttonLabelClosed: 'Expand',
        buttonLabelOpened: 'Collapse',
        collapsedLines: 5,
        overlayLines: 3,
        defaultOpen: false,
    },
    render: (args) => (
        <>
            <style>{`
                .tiptap.ProseMirror {
                    line-height: 1.5;
                    color: #111827; /* neutral-900 */
                }
                .tiptap.ProseMirror h1 {
                    font-size: 1.5rem; /* 24px */
                    line-height: 1.25;
                    font-weight: 700;
                    margin: 0 0 0.5rem 0;
                }
                .tiptap.ProseMirror ul {
                    list-style: disc;
                    padding-left: 1.25rem; /* 20px */
                    margin: 0.25rem 0 1rem 0;
                }
                .tiptap.ProseMirror li {
                    margin: 0.25rem 0;
                }
                .tiptap.ProseMirror p {
                    margin: 0.25rem 0;
                }
                .tiptap.ProseMirror code {
                    background: rgba(0, 0, 0, 0.05);
                    padding: 0.1rem 0.25rem;
                    border-radius: 4px;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    font-size: 0.95em;
                }
            `}</style>
            <CardCollapsible {...args}>
                <div contentEditable={false} role="textbox" translate="no" className="tiptap ProseMirror">
                    <h1>Plugin upgrade</h1>
                    <ul data-tight="true">
                        <li>
                            <p>Supporting timestamp based IVotes tokens</p>
                        </li>
                        <li>
                            <p>Allowing to freeze token minting</p>
                        </li>
                        <li>
                            <p>Allowing to exclude addresses from the total token supply</p>
                        </li>
                    </ul>

                    <h1>Publish New Plugin Version</h1>
                    <ul data-tight="true">
                        <li>
                            <p>
                                Publishes the TokenVoting Plugin Setup deployed at <code>0x34e23a360b8ac1</code> as
                                <strong> v1.x</strong> in the <code>example.plugin.dao.eth</code> plugin repository at
                                <code> 0x111111130a183cABaC0b082b</code>, with release metadata
                                <code> qqQmWjZArvePnMPgGta</code> and build metadata
                                <code> qqQmfXUy5Lc4isCRc</code>.
                            </p>
                        </li>
                    </ul>
                    <p>
                        <br className="ProseMirror-trailingBreak" />
                    </p>
                </div>
            </CardCollapsible>
        </>
    ),
};

export default meta;
