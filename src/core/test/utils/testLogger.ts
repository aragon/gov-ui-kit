/* eslint-disable no-console */

class TestLogger {
    private shouldSuppressErrors = false;

    private originalConsoleError = console.error;
    private originalConsoleWarn = console.warn;

    private testErrorLogger = jest.fn((...params) => {
        if (!this.shouldSuppressErrors) {
            this.originalConsoleError.apply(console, params);
        }
    });

    private testWarnLogger = jest.fn((...params) => {
        if (!this.shouldSuppressErrors) {
            this.originalConsoleWarn.apply(console, params);
        }
    });

    setup = () => {
        beforeEach(() => {
            console.error = this.testErrorLogger;
            console.warn = this.testWarnLogger;
        });

        afterEach(() => {
            this.shouldSuppressErrors = false;
            console.error = this.originalConsoleError;
            console.warn = this.originalConsoleWarn;
        });
    };

    suppressErrors = () => {
        this.shouldSuppressErrors = true;
    };
}

export const testLogger = new TestLogger();
