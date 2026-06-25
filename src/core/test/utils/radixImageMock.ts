// Image mocked class to simulate the image loading event required by the radix-ui avatar component
export class RadixImageMock {
    complete = false;
    naturalWidth = 0;
    naturalHeight = 0;
    src = '';
    removeEventListener = jest.fn();
    addEventListener = (event: string, callback: (event: { currentTarget: RadixImageMock }) => void) => {
        if (event === 'load') {
            setTimeout(() => {
                this.complete = true;
                const element = this as unknown as HTMLImageElement;
                this.naturalWidth = element.width || 1;
                this.naturalHeight = element.height || 1;
                callback({ currentTarget: this });
            }, 100);
        }
    };
}
