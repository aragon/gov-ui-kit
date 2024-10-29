class TestLogger {
    private shouldSuppressErrors = false;
    private originalConsoleError = console.error;

    private testErrorLogger = jest.fn((...params) => {
        if (!this.shouldSuppressErrors) {
            this.originalConsoleError.apply(console, params);
        }
    });

    setup = () => {
        beforeEach(() => {
            console.error = this.testErrorLogger;
        });

        afterEach(() => {
            this.shouldSuppressErrors = false;
            console.error = this.originalConsoleError;
        });
    };

    suppressErrors = () => {
        this.shouldSuppressErrors = true;
    };
}

export const testLogger = new TestLogger();
