import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DocumentParser, type IDocumentParserProps } from './documentParser';

describe('<DocumentParser /> component', () => {
    const createTestComponent = (props?: Partial<IDocumentParserProps>) => {
        const completeProps: IDocumentParserProps = {
            document: '<p>Hello World</p>',
            ...props,
        };

        return <DocumentParser {...completeProps} />;
    };

    it('renders without crashing', () => {
        const document = '<p>Hello World</p>';
        render(createTestComponent({ document }));
        expect(screen.getByTestId('doc-parser')).toBeInTheDocument();
    });

    it('correctly sanitizes and sets content', async () => {
        const document = '<script>alert("xss");</script><p>Valid Content</p>';
        render(createTestComponent({ document }));
        const content = await screen.findByText('Valid Content');
        expect(content).toBeInTheDocument();
        expect(screen.queryByText('alert("xss");')).not.toBeInTheDocument();
    });

    it('renders images when included in document prop', async () => {
        const document = '<img src="test.jpg" alt="test image">';
        render(createTestComponent({ document }));
        const image = await screen.findByAltText('test image');
        expect(image).toBeInTheDocument();
    });

    it('applies passed className to root element', () => {
        const className = 'test-class';
        render(createTestComponent({ className }));
        const rootElement = screen.getByTestId('doc-parser');
        expect(rootElement).toHaveClass('test-class');
    });

    it('does not fail when immediatelyRender is set to false', () => {
        expect(() => render(createTestComponent({ immediatelyRender: false }))).not.toThrow();
    });
});
