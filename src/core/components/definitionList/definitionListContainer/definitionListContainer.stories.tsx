import type { Meta, StoryObj } from '@storybook/react';
import { DefinitionList, type IDefinitionListContainerProps } from '../index';

const meta: Meta<typeof DefinitionList.Container> = {
    title: 'Core/Components/DefinitionList/DefinitionList.Container',
    component: DefinitionList.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?m=auto&node-id=16728%3A45615&t=Q593Geqalm4meMTS-1',
        },
    },
};

type Story = StoryObj<typeof DefinitionList.Container>;

/**
 * Default usage of the DefinitionList.Container component with no definitions as children.
 */
export const Default: Story = {
    render: (props: IDefinitionListContainerProps) => (
        <DefinitionList.Container {...props}>Empty Container</DefinitionList.Container>
    ),
};
/**
 * Example usage of the DefinitionList.Container component with three definitions.
 */
export const Loaded: Story = {
    render: (props: IDefinitionListContainerProps) => (
        <DefinitionList.Container {...props}>
            <DefinitionList.Item term="Standard Definition Term">
                <div className="flex h-96 w-full items-center justify-center border border-dashed bg-success-100">
                    Any React Node Child
                </div>
            </DefinitionList.Item>
            <DefinitionList.Item term="String Definition Description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi orci magna, tempor vel malesuada
                elementum, vulputate eget lorem. Phasellus aliquam, ex et viverra imperdiet, tellus nisl tempor elit,
                sit amet vehicula neque mi sit amet sem. Duis turpis est, ultrices ut auctor id, ornare ut nibh. Cras at
                enim magna. Praesent semper auctor tortor ac placerat. Quisque sit amet ullamcorper massa. Maecenas sed
                enim pharetra, dictum turpis a, suscipit ex. Nunc nec neque quis mauris ultrices imperdiet. Nunc varius
                feugiat bibendum. Nulla suscipit in dui sed facilisis. Aliquam vel justo accumsan, dapibus lorem id,
                mollis elit. Aenean quis quam rhoncus, auctor erat sed, volutpat quam. Fusce bibendum purus massa, vitae
                blandit sem interdum in. Phasellus pharetra felis et justo faucibus sodales. Quisque metus turpis,
                condimentum sit amet velit non, iaculis egestas lacus. Maecenas hendrerit pulvinar mi, vitae lobortis
                justo egestas condimentum. Vivamus pretium bibendum eros, ornare tempor odio commodo sit amet. Cras arcu
                erat, cursus consectetur orci ut, gravida pretium augue. Morbi vel auctor mi. Sed ultrices bibendum
                mauris, sit amet placerat lacus commodo eget. Donec in posuere augue. Aliquam non tincidunt mauris, sed
                porta mi. Fusce et nisi arcu. Quisque sodales ullamcorper lacus, in varius urna interdum eget. Sed
                tempor eu libero in volutpat. Suspendisse ac magna dignissim, pulvinar justo ut, pulvinar lacus. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse at
                metus porttitor, laoreet elit eu, luctus orci. Sed volutpat elit ac mi porta facilisis.
            </DefinitionList.Item>
            <DefinitionList.Item term="Third Term (with a super duper longer label which will clamp to 6 lines high & to 1 line high when smaller than 'md' breakpoint) ">
                <div className="flex h-48 w-full items-center justify-center border border-dashed bg-warning-100">
                    Any React Node Child
                </div>
            </DefinitionList.Item>
        </DefinitionList.Container>
    ),
};

export default meta;
