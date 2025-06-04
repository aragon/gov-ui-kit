import type { Preview } from '@storybook/react-vite';
import '../index.css';
import { GukModulesProvider } from '../src/modules';
import { DocsPage } from './components';
import './style.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                method: 'alphabetical',
                order: [
                    'Docs',
                    ['Documentation', 'Installation', 'Changelog'],
                    'Theme',
                    ['Documentation'],
                    'Core',
                    ['Documentation'],
                    'Modules',
                    ['Documentation'],
                ],
            },
        },
        backgrounds: {
            default: 'neutral-50',
            values: [
                {
                    name: 'neutral-50',
                    value: 'var(--color-neutral-50)',
                },
            ],
        },
        docs: {
            page: DocsPage,
        },
    },

    decorators: [
        (Story) => (
            <GukModulesProvider>
                <div className="flex">
                    <Story />
                </div>
            </GukModulesProvider>
        ),
    ],

    tags: ['autodocs'],

    // Needed to fix warning on HMR reload (see https://github.com/storybookjs/storybook-addon-pseudo-states/issues/59)
    globalTypes: {
        measureEnabled: {},
        backgrounds: {},
        outline: {},
        viewport: {},
    },
};

export default preview;
