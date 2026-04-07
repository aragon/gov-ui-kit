import { render, screen } from '@testing-library/react';
import { AccordionContainer } from '../accordionContainer/accordionContainer';
import { AccordionItem } from '../accordionItem/accordionItem';
import { AccordionItemContent, type IAccordionItemContentProps } from './accordionItemContent';

describe('<Accordion.ItemContent /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionItemContentProps>) => {
        const completeProps = { ...props };
        return (
            <AccordionContainer defaultValue="value-key" isMulti={false}>
                <AccordionItem value="value-key">
                    <AccordionItemContent {...completeProps} />
                </AccordionItem>
            </AccordionContainer>
        );
    };

    it('renders the children property', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });
});
