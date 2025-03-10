import { render, screen } from '@testing-library/react';
import { IconType } from '../../../../../core';
import { DaoDataListItemStructure, type IDaoDataListItemStructureProps } from './daoDataListItemStructure';

describe('<DaoDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<IDaoDataListItemStructureProps>) => {
        const completeProps: IDaoDataListItemStructureProps = {
            ...props,
        };

        return <DaoDataListItemStructure {...completeProps} />;
    };

    it('renders ensName and the daoName (in uppercase) as the avatar fallback', () => {
        const name = 'a';
        const ens = 'a.eth';
        render(createTestComponent({ name, ens }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(ens)).toBeInTheDocument();
    });

    it('renders name and the address', () => {
        const name = 'ab';
        const address = '0x123';
        render(createTestComponent({ name, address }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(address)).toBeInTheDocument();
    });

    it('does not render the dao ENS name if it is not provided', () => {
        const name = 'a';
        render(createTestComponent({ name }));
        expect(screen.queryByText(/.eth/)).not.toBeInTheDocument();
    });

    it('renders the description with an ellipsis if it is more than two lines', () => {
        const description =
            'This is a very long description that should be more than two lines. It should end with an ellipsis.';
        render(createTestComponent({ description }));
        const descriptionElement = screen.getByText(/This is a very long description/);
        expect(descriptionElement).toHaveClass('line-clamp-2');
    });

    it('renders the network information correctly', () => {
        const network = 'ethereum';
        render(createTestComponent({ network }));
        expect(screen.getByText(network)).toBeInTheDocument();
    });

    it('hides the DAO ens and displays an external link icon when the isExternal property is set to true', () => {
        const isExternal = true;
        const ens = 'test-dao.eth';
        render(createTestComponent({ isExternal, ens }));
        expect(screen.getByTestId(IconType.LINK_EXTERNAL)).toBeInTheDocument();
        expect(screen.queryByText(ens)).not.toBeInTheDocument();
    });
});
