import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { StyleBlock } from '../styleBlock';

export const DocsPage: React.FC = () => (
    <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
        <Stories />
        <StyleBlock />
    </>
);
