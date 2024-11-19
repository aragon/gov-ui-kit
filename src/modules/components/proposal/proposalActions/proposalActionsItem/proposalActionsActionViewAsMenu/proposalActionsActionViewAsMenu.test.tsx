import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionViewMode } from '../../types';
import {
    type IProposalActionsActionViewAsMenuProps,
    ProposalActionsActionViewAsMenu,
} from './proposalActionsActionViewAsMenu';

describe('<ProposalActionsActionViewAsMenu /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsActionViewAsMenuProps>) => {
        const completeProps: IProposalActionsActionViewAsMenuProps = {
            viewMode: ProposalActionViewMode.BASIC,
            disableBasic: false,
            disableDecoded: false,
            onViewModeChange: jest.fn(),
            ...props,
        };

        return <ProposalActionsActionViewAsMenu {...completeProps} />;
    };

    it('calls ViewModeChange with "basic" when basic item is clicked and not disabled', async () => {
        const onViewModeChange = jest.fn();
        render(createTestComponent({ onViewModeChange }));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const basicItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.basic);
        await userEvent.click(basicItem);
        expect(onViewModeChange).toHaveBeenCalledWith(ProposalActionViewMode.BASIC);
    });

    it('does not call ViewModeChange with "basic" when basic item is clicked and disabled', async () => {
        const onViewModeChange = jest.fn();
        render(createTestComponent({ disableBasic: true, onViewModeChange }));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const basicItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.basic);
        await userEvent.click(basicItem);
        expect(onViewModeChange).not.toHaveBeenCalled();
    });

    it('calls ViewModeChange with "decoded" when decoded item is clicked', async () => {
        const onViewModeChange = jest.fn();
        render(createTestComponent({ onViewModeChange }));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const decodedItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.decoded);
        await userEvent.click(decodedItem);
        expect(onViewModeChange).toHaveBeenCalledWith(ProposalActionViewMode.DECODED);
    });

    it('calls ViewModeChange with "raw" when raw item is clicked', async () => {
        const onViewModeChange = jest.fn();
        render(createTestComponent({ onViewModeChange }));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const rawItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.raw);
        await userEvent.click(rawItem);
        expect(onViewModeChange).toHaveBeenCalledWith(ProposalActionViewMode.RAW);
    });
});
