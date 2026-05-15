export const createRangeMock = () => {
    document.createRange = () => {
        const range = new Range();

        range.getBoundingClientRect = () => ({
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            toJSON: jest.fn(),
        });

        range.getClientRects = () => ({
            item: () => ({
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                toJSON: jest.fn(),
            }),
            length: 0,
            [Symbol.iterator]: jest.fn(),
        });

        return range;
    };
};
