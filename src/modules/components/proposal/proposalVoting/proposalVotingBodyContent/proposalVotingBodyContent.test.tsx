import { render, screen } from '@testing-library/react';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingStageContextProvider, type IProposalVotingStageContext } from '../proposalVotingStageContext';
import { ProposalVotingBodyContent, type IProposalVotingBodyContentProps } from './proposalVotingBodyContent';

jest.mock('../../../../../core/components/avatars/avatar', () => ({
    Avatar: ({ src }: { src?: string }): React.ReactElement => <div data-testid={src}>{src}</div>,
}));

describe('<ProposalVotingBodyContent /> component', () => {
    const createTestComponent = (
        props?: Partial<IProposalVotingBodyContentProps>,
        contextValues?: Partial<IProposalVotingStageContext>,
    ) => {
        const completeProps: IProposalVotingBodyContentProps = {
            status: ProposalVotingStatus.PENDING,
            name: 'Test Stage',
            bodyId: 'body1',
            ...props,
        };
        const completeContextValues: IProposalVotingStageContext = {
            startDate: 0,
            endDate: 0,
            ...contextValues,
        };

        return (
            <ProposalVotingStageContextProvider value={completeContextValues}>
                <ProposalVotingBodyContent {...completeProps} />
            </ProposalVotingStageContextProvider>
        );
    };

    it('renders the avatar component and brand label when bodyBrand is provided', () => {
        const bodyBrand = {
            label: 'Sample Label',
            logo: 'https://example.com/sample-logo.png',
        };

        const bodyId = 'sampleBodyId';
        const contextValues = {
            activeBody: bodyId,
            bodyList: [bodyId, 'bodyIdTwo'],
        };

        render(createTestComponent({ bodyId, bodyBrand }, contextValues));

        expect(screen.getByText(bodyBrand.label)).toBeInTheDocument();

        const avatar = screen.getByTestId(bodyBrand.logo);
        expect(avatar).toBeInTheDocument();
    });
});
