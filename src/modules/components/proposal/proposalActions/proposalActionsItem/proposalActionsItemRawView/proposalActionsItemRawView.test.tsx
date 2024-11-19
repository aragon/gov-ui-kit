import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type * as coreModule from '../../../../../../core';
import { clipboardUtils } from '../../../../../../core';
import { modulesCopy } from '../../../../../assets';
import { generateProposalActionTokenMint } from '../../proposalActionsList';
import { ProposalActionsItemRawView, type IProposalActionsItemRawViewProps } from './proposalActionsItemRawView';

jest.mock('../../../../../../core', () => ({
    ...jest.requireActual<typeof coreModule>('../../../../../../core'),
    InputNumber: ({ value, disabled, label }: { value: number; disabled: boolean; label: string }) => (
        <div>
            <p>{label}</p>
            <input type="number" value={value} disabled={disabled} />
        </div>
    ),
}));

describe('<ProposalActionsItemRawView /> component', () => {
    const copyMock = jest.spyOn(clipboardUtils, 'copy');

    const createTestComponent = (props?: Partial<IProposalActionsItemRawViewProps>) => {
        const completeProps: IProposalActionsItemRawViewProps = {
            action: generateProposalActionTokenMint(),
            ...props,
        };

        return <ProposalActionsItemRawView {...completeProps} />;
    };

    it('renders action properties correctly', () => {
        const action = generateProposalActionTokenMint({ value: '100', to: '0x123dao', data: '0x123data' });
        render(createTestComponent({ action }));

        expect(screen.getByText(modulesCopy.proposalActionsItemRawView.value)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsItemRawView.to)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsItemRawView.data)).toBeInTheDocument();

        const valueInput = screen.getByDisplayValue('100');
        expect(valueInput).toBeInTheDocument();

        const toInput = screen.getByDisplayValue('0x123dao');
        expect(toInput).toBeInTheDocument();

        const dataTextarea = screen.getByDisplayValue('0x123data');
        expect(dataTextarea).toBeInTheDocument();
    });

    it('calls clipboardUtils.copy with the correct data when copy button is clicked', async () => {
        const action = generateProposalActionTokenMint();
        render(createTestComponent({ action }));
        const copyButton = screen.getByText(modulesCopy.proposalActionsItemRawView.copyButton);
        await userEvent.click(copyButton);
        expect(copyMock).toHaveBeenCalledWith(action.data);
    });
});
