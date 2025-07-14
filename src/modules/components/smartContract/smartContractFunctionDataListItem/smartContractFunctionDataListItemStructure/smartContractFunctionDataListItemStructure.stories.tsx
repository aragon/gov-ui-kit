import type { Meta, StoryObj } from '@storybook/react-vite';
import { SmartContractFunctionDataListItem } from '../../smartContractFunctionDataListItem';
import { type SmartContractFunctionDataListItemStructure} from './smartContractFunctionDataListItemStructure'

const meta: Meta<typeof SmartContractFunctionDataListItem.Structure> = {
    title: 'Modules/Components/SmartContract/SmartContractFunctionDataListItem/SmartContractFunctionDataListItem.Structure',
    component: SmartContractFunctionDataListItem.Structure,
     parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/mnH992k1U8hHBzTHFC2W3U/Aragon-App?node-id=13248-149568',
        },
    },
};

type Story = StoryObj<typeof SmartContractFunctionDataListItemStructure>;

/**
 * Usage example of the SmartContractFunctionDataListItem.Structure component with verified function and contract names.
 */
export const Verified: Story = {
  args: {
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    contractName: 'Uniswap V2 Router',
    functionName: 'Add liquidity',
  }
};
/**
 * Example of the SmartContractFunctionDataListItem.Structure component with unverified function and contract names.
 */
export const Unverified: Story = {
  args: {
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
  }
};

/**
 * Example of the SmartContractFunctionDataListItem.Structure component with a function signature.
 */
export const WithFunctionSignature: Story = {
  args: {
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    contractName: 'Uniswap V2 Router',
    functionName: 'Add liquidity',
    functionSignature: 'function addLiquidity(address tokenA, address tokenB)',
  }
};

/**
 * Example of the SmartContractFunctionDataListItem.Structure component with a remove button.
 */
export const WithRemoveButton: Story = {
    args: {
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        contractName: 'Uniswap V2 Router',
        functionName: 'Add liquidity',
        showRemoveButton: true,
        onRemove: () => alert('Function removed'),
    },
};

export default meta;
