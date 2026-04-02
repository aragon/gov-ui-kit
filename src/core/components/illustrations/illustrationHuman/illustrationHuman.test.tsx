import { render, screen } from '@testing-library/react';
import { type IIllustrationHumanProps, IllustrationHuman } from './illustrationHuman';

describe('<IllustrationHuman /> component', () => {
    const createTestComponent = (props?: Partial<IIllustrationHumanProps>) => {
        const completeProps: IIllustrationHumanProps = {
            body: 'ARAGON',
            expression: 'ANGRY',
            ...props,
        };

        return <IllustrationHuman {...completeProps} />;
    };

    it('renders the specified body and expression', () => {
        const body = 'ARAGON';
        const expression = 'ANGRY';
        render(createTestComponent({ body, expression }));
        expect(screen.getByTestId(body));
        expect(screen.getByTestId(expression));
    });

    it('renders the hairs when defined', () => {
        const hairs = 'BUN';
        render(createTestComponent({ hairs }));
        expect(screen.getByTestId(hairs)).toBeInTheDocument();
    });

    it('renders the sunglasses when defined', () => {
        const sunglasses = 'THUGLIFE_ROUNDED';
        render(createTestComponent({ sunglasses }));
        expect(screen.getByTestId(sunglasses)).toBeInTheDocument();
    });

    it('renders the accessory when defined', () => {
        const accessory = 'FLUSHED';
        render(createTestComponent({ accessory }));
        expect(screen.getByTestId(accessory)).toBeInTheDocument();
    });

    it('renders the object when defined', () => {
        const object = 'WAGMI';
        render(createTestComponent({ object }));
        expect(screen.getByTestId(object)).toBeInTheDocument();
    });
});
