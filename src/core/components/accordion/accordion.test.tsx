import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Icon, IconType } from '../icon';
import type { IAccordionProps } from './accordion';
import { Accordion } from './accordion';

describe('<Accordion /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionProps>) => {
        const completeProps: IAccordionProps = {
            items: [
                { itemHeader: 'Header 1', itemContent: 'Content 1' },
                { itemHeader: 'Header 2', itemContent: 'Content 2' },
            ],
            collapsible: false,
            ...props,
        };
        return <Accordion {...completeProps} />;
    };

    it('renders all children without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText('Header 1')).toBeInTheDocument();
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('renders additional ReactNodes as acceptable children of trigger and content without crashing', () => {
        const items = [
            { itemHeader: <Icon icon={IconType.APP_DASHBOARD} />, itemContent: <Icon icon={IconType.APP_MEMBERS} /> },
        ];
        render(createTestComponent({ items }));
        expect(screen.getByTestId(IconType.APP_DASHBOARD)).toBeInTheDocument();
        expect(screen.getByTestId(IconType.APP_MEMBERS)).toBeInTheDocument();
    });

    it('renders with the first item open and others closed', () => {
        render(createTestComponent());

        expect(screen.getByText('Content 1')).toBeVisible();
        expect(screen.queryByText('Content 2')).toBeNull();
    });

    it('opens a closed item and closes the previously open item when clicked', () => {
        render(createTestComponent());

        fireEvent.click(screen.getByText('Header 2'));

        expect(screen.getByText('Content 2')).toBeVisible();
        expect(screen.queryByText('Content 1')).toBeNull();
    });

    it('allows all items to be closed if collapsible is true', () => {
        const collapsible = true;
        render(createTestComponent({ collapsible }));

        expect(screen.getByText('Content 1')).toBeVisible();

        fireEvent.click(screen.getByText('Header 1'));

        expect(screen.queryByText('Content 1')).toBeNull();
        expect(screen.queryByText('Content 2')).toBeNull();
    });
});
