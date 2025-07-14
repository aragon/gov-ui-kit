import type { Meta, StoryObj } from '@storybook/react-vite';
import { SmartContractFunctionDataListItem } from '../../smartContractFunctionDataListItem';

const meta: Meta<typeof SmartContractFunctionDataListItem.Skeleton> = {
    title: 'Modules/Components/SmartContract/SmartContractFunctionDataListItem/SmartContractFunctionDataListItem.Skeleton',
    component: SmartContractFunctionDataListItem.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/mnH992k1U8hHBzTHFC2W3U/Aragon-App?node-id=13248-149568',
        },
    },
};

type Story = StoryObj<typeof SmartContractFunctionDataListItem.Skeleton>;

/**
 * Default usage example of the SmartContractFunctionDataListItem.Skeleton component.
 */
export const Default: Story = {};

export default meta;
