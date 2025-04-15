// Image mocked class to simulate the image loading event required by the radix-ui avatar component
export class RadixImageMock {
    removeEventListener = jest.fn();
    addEventListener = (event: string, callback: () => void) => {
        if (event == 'load') {
            setTimeout(() => callback(), 100);
        }
    };
}
