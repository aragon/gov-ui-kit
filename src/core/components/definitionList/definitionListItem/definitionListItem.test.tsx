import { render, screen } from '@testing-library/react';
import { DefinitionList, type IDefinitionListItemProps } from '../../definitionList';
import { IconType } from '../../icon';

describe('<DefinitionList.Item /> component', () => {
    const createTestComponent = (props?: Partial<IDefinitionListItemProps>) => {
        const completeProps: IDefinitionListItemProps = {
            term: 'Default Term',
            ...props,
        };

        return <DefinitionList.Item {...completeProps} />;
    };

    it('renders the specified term', () => {
        const term = 'Custom Term';
        render(createTestComponent({ term }));
        expect(screen.queryByRole('term')).toHaveTextContent(term);
    });

    it('renders the specified definition', () => {
        const children = 'Custom Definition';
        render(createTestComponent({ children }));
        expect(screen.queryByRole('definition')).toHaveTextContent(children);
    });

    it('renders the specified description', () => {
        const description = 'Term Description';
        render(createTestComponent({ description }));
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('renders an icon to copy the defined value when copyValue is set', () => {
        render(createTestComponent({ copyValue: 'copy-test' }));
        expect(screen.getByTestId(IconType.COPY)).toBeInTheDocument();
    });

    it('renders a string value as an address output owning link and copy controls when the link is an on-chain entity', () => {
        const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        render(
            createTestComponent({
                children: address,
                link: { href: 'https://etherscan.io', isExternal: true, isOnchainEntity: true },
            }),
        );

        expect(screen.getByRole('link', { name: '0xd8dA…6045' })).toHaveAttribute('href', 'https://etherscan.io');
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    });

    it('renders the children as label and copies the copyValue when set on an on-chain entity item', () => {
        const copyValue = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        render(
            createTestComponent({
                children: 'vitalik.eth',
                copyValue,
                link: { href: '/executor', isExternal: false, isOnchainEntity: true },
            }),
        );

        expect(screen.getByRole('link', { name: 'vitalik.eth' })).toHaveAttribute('href', '/executor');
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    });
});
