import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { polygon } from 'viem/chains';
import { modulesCopy } from '../../../../assets';
import { GukModulesProvider } from '../../../gukModulesProvider';
import {
    type ISmartContractFunctionDataListItemProps,
    SmartContractFunctionDataListItemStructure,
} from './smartContractFunctionDataListItemStructure';

describe('<SmartContractFunctionDataListItem.Structure /> component', () => {
    const createTestComponent = (props?: Partial<ISmartContractFunctionDataListItemProps>) => {
        const defaultProps: ISmartContractFunctionDataListItemProps = {
            contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
            ...props,
        };

        return (
            <GukModulesProvider>
                <SmartContractFunctionDataListItemStructure {...defaultProps} />
            </GukModulesProvider>
        );
    };

    it('renders the function name when smart contract is verified', () => {
        const functionName = 'mintTokens';
        render(createTestComponent({ functionName }));
        expect(screen.getByText(functionName)).toBeInTheDocument();
    });

    it('renders a not-verified label for function name and contract name when smart contract is not verified', () => {
        render(createTestComponent());
        expect(
            screen.getByText(modulesCopy.smartContractFunctionDataListItemStructure.notVerified.function),
        ).toBeInTheDocument();
        expect(
            screen.getByText(modulesCopy.smartContractFunctionDataListItemStructure.notVerified.contract),
        ).toBeInTheDocument();
    });

    it('renders the contract name when smart contract is verified', () => {
        const contractName = 'Uniswap';
        render(createTestComponent({ contractName }));
        expect(screen.getByText(contractName)).toBeInTheDocument();
    });

    it('renders the truncated address of the contract address as link', () => {
        const contractAddress = '0xF26a23f3E7B88e93A16970B74Ae6599d2993690F';
        const chainId = polygon.id;
        render(createTestComponent({ contractAddress, chainId }));
        const link = screen.getByRole<HTMLAnchorElement>('link', { name: '0xF26a…690F' });
        expect(link).toBeInTheDocument();
        expect(link.href).toEqual(`https://polygonscan.com/address/${contractAddress}`);
    });

    it('defaults chain-id to ethereum mainnet when not provided', () => {
        const contractAddress = '0x87D18Ee84e8f4f5709CBf3500179a4C601DA12cE';
        render(createTestComponent({ contractAddress }));
        const link = screen.getByRole<HTMLAnchorElement>('link', { name: '0x87D1…12cE' });
        expect(link.href).toEqual(`https://etherscan.io/address/${contractAddress}`);
    });

    it('renders a dropdown to remove the function when onRemove is provided', async () => {
        render(createTestComponent({ onRemove: () => null }));
        await userEvent.click(screen.getByRole('button'));
        expect(
            screen.getByRole('menuitem', { name: modulesCopy.smartContractFunctionDataListItemStructure.remove }),
        ).toBeInTheDocument();
    });
});
