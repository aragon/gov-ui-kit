import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import * as wagmi from 'wagmi';
import { modulesCopy } from '../../../../assets';
import { addressUtils } from '../../../../utils/addressUtils';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalDataListItemStructure } from './proposalDataListItemStructure';
import { type IProposalDataListItemStructureProps } from './proposalDataListItemStructure.api';

jest.mock('wagmi', () => ({ ...jest.requireActual<typeof wagmi>('wagmi'), useAccount: jest.fn() }));

jest.mock('viem/utils', () => ({ isAddress: jest.fn().mockReturnValue(true) }));

describe('<ProposalDataListItemStructure/> component', () => {
    const useAccountMock = jest.spyOn(wagmi, 'useAccount');

    beforeEach(() => {
        useAccountMock.mockReturnValue({
            address: '0x456',
            isConnected: true,
        } as unknown as wagmi.UseAccountReturnType);
    });

    afterEach(() => {
        useAccountMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalDataListItemStructureProps>) => {
        const defaultProps = {
            publisher: { address: '0x0000000000000000000000000000000000000000', link: '#' },
            status: ProposalStatus.ACTIVE,
            summary: 'Example Summary',
            title: 'Example Title',
            type: 'approvalThreshold',
            ...props,
        } as IProposalDataListItemStructureProps;

        return <ProposalDataListItemStructure {...defaultProps} />;
    };

    it('renders the children property to support custom proposal results', () => {
        const children = 'custom-results';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it("renders 'You' as the publisher if the connected address is the publisher address", () => {
        const publisher = { address: '0x0000000000000000000000000000000000000000', link: '#' };

        useAccountMock.mockReturnValue({
            address: publisher.address,
            isConnected: true,
        } as unknown as wagmi.UseAccountReturnType);

        render(createTestComponent({ publisher }));

        expect(screen.getByRole('link', { name: 'You' })).toBeInTheDocument();
    });

    it('renders multiple publishers', () => {
        const publishers = [
            { name: 'abc', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'def', link: '#', address: '0x0000000000000000000000000000000000000000' },
        ];

        render(createTestComponent({ publisher: publishers }));

        publishers.forEach((publisher) => expect(screen.getByText(publisher.name)).toBeInTheDocument());
    });

    it(`renders '3+ creators' when the publishers are more than 3`, () => {
        const publishers = [
            { name: 'abc', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'def', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'ghi', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'jkl', link: '#', address: '0x0000000000000000000000000000000000000000' },
        ];

        render(createTestComponent({ publisher: publishers }));

        expect(screen.getByText(`3+ creators`)).toBeInTheDocument();
    });

    it('renders with the given properties', () => {
        const testProps = {
            tag: 'OSx updates',
            publisher: { address: '0x0000000000000000000000000000000000000000', link: '#' },
            status: ProposalStatus.ACTIVE,
            summary: 'Example Summary',
            title: 'Example Title',
            type: 'approvalThreshold' as const,
            id: '0x1',
        };

        render(createTestComponent(testProps));

        expect(screen.getByText(testProps.title)).toBeInTheDocument();
        expect(screen.getByText(testProps.summary)).toBeInTheDocument();
        expect(
            screen.getByText(modulesCopy.proposalDataListItemStatus.statusLabel[testProps.status]),
        ).toBeInTheDocument();
        expect(screen.getByText(testProps.id)).toBeInTheDocument();
        expect(screen.getByText(testProps.tag)).toBeInTheDocument();
        expect(screen.getByText(addressUtils.truncateAddress(testProps.publisher.address))).toBeInTheDocument();
    });

    describe('date rendering', () => {
        it('renders the correct time left', () => {
            const date = DateTime.now().plus({ hours: 5, minutes: 15 }).toMillis();
            render(createTestComponent({ date }));
            const formattedDate = '5 hours left';
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
        });

        it('renders the correct time ago', () => {
            const date = DateTime.now().minus({ hours: 5, minutes: 15 }).toMillis();
            render(createTestComponent({ date }));
            const formattedDate = '5 hours ago';
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
        });
    });

    describe("'approvalThreshold' type", () => {
        it(`renders the results when status is ongoing`, () => {
            const testProps = { approvalAmount: 10, approvalThreshold: 11 };

            render(
                createTestComponent({ result: testProps, type: 'approvalThreshold', status: ProposalStatus.ACTIVE }),
            );

            expect(screen.getByText(testProps.approvalAmount)).toBeInTheDocument();
            expect(
                screen.getByText(modulesCopy.approvalThresholdResult.outOf(testProps.approvalThreshold.toString())),
            ).toBeInTheDocument();
        });

        it('does not render the results when status is not of an ongoing type', () => {
            const testProps = { approvalAmount: 10, approvalThreshold: 11 };

            render(
                createTestComponent({ result: testProps, type: 'approvalThreshold', status: ProposalStatus.EXPIRED }),
            );

            expect(screen.queryByText(testProps.approvalAmount)).not.toBeInTheDocument();
            expect(
                screen.queryByText(modulesCopy.approvalThresholdResult.outOf(testProps.approvalThreshold.toString())),
            ).not.toBeInTheDocument();
        });
    });

    describe("'majorityVoting' type", () => {
        it(`renders the results when status is ongoing`, () => {
            const testProps = { option: 'Yes', voteAmount: '100 wAnt', votePercentage: 10 };

            render(
                createTestComponent({ result: testProps, type: 'majorityVoting', status: ProposalStatus.CHALLENGED }),
            );

            expect(screen.getByText(testProps.option)).toBeInTheDocument();
            expect(screen.getByText(testProps.voteAmount)).toBeInTheDocument();
            expect(screen.getByText(`${testProps.votePercentage.toString()}%`)).toBeInTheDocument();
        });

        it('does not render the results when status is not of an ongoing type', () => {
            const testProps = { option: 'Yes', voteAmount: '100 wAnt', votePercentage: 10 };

            render(createTestComponent({ result: testProps, type: 'majorityVoting', status: ProposalStatus.PENDING }));

            expect(screen.queryByText(testProps.option)).not.toBeInTheDocument();
            expect(screen.queryByText(testProps.voteAmount)).not.toBeInTheDocument();
            expect(screen.queryByText(`${testProps.votePercentage.toString()}%`)).not.toBeInTheDocument();
        });
    });
});
