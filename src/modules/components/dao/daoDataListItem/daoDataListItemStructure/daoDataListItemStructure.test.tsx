import { render, screen } from '@testing-library/react';
import { IconType } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { DaoDataListItemStructure, type IDaoDataListItemStructureProps } from './daoDataListItemStructure';

describe('<DaoDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<IDaoDataListItemStructureProps>) => {
        const completeProps: IDaoDataListItemStructureProps = {
            ...props,
        };

        return <DaoDataListItemStructure {...completeProps} />;
    };

    it('renders the dao ens name and its name in uppercase as avatar fallback', () => {
        const name = 'a';
        const ens = 'a.eth';
        render(createTestComponent({ name, ens }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(ens)).toBeInTheDocument();
    });

    it('renders the dao name and its address', () => {
        const name = 'ab';
        const address = '0xc6B61B776367b236648399ACF4A0bc5aDe70708F';
        render(createTestComponent({ name, address }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(addressUtils.truncateAddress(address))).toBeInTheDocument();
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
