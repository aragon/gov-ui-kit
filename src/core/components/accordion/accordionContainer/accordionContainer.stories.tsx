import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '..';

const meta: Meta<typeof Accordion.Container> = {
    title: 'Core/Components/Accordion/Accordion.Container',
    component: Accordion.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?type=design&node-id=15855%3A28278&mode=design&t=ssVJeaQ2V7PqQVNj-1',
        },
    },
};

type Story = StoryObj<typeof Accordion.Container>;

const DefaultChildComponent = (childCount: number, forceMount?: true) =>
    [...Array<number>(childCount)].map((_, index) => (
        <Accordion.Item key={`item-${index.toString()}`} value={`item-${index.toString()}`}>
            <Accordion.ItemHeader>Item {index + 1} Header</Accordion.ItemHeader>
            <Accordion.ItemContent forceMount={forceMount}>
                <div className="flex h-24 w-full items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item {index + 1} Content
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    ));

/**
 * Default usage example of the Accordion component.
 */
export const Default: Story = {
    args: {
        isMulti: false,
        children: DefaultChildComponent(2),
    },
};

/**
 * Example of an Accordion component with multiple items open at the same time.
 */
export const MultiType: Story = {
    args: {
        isMulti: true,
        children: DefaultChildComponent(3),
    },
};

/**
 * Example of an Accordion component with two accordion item open by default.
 */
export const DefaultValue: Story = {
    args: {
        isMulti: true,
        children: DefaultChildComponent(3),
        defaultValue: ['item-1', 'item-2'],
    },
};

/**
 * Use the `forceMount` property to always render the accordion item content.
 */
export const ForceMount: Story = {
    args: {
        isMulti: true,
        children: DefaultChildComponent(3, true),
    },
};

export const Disabled: Story = {
    args: {
        isMulti: true,
        children: (
            <Accordion.Item value="1" disabled={true}>
                <Accordion.ItemHeader>Item 1 Header</Accordion.ItemHeader>
            </Accordion.Item>
        ),
    },
};

export default meta;
