import { render, screen } from '@testing-library/react';
import { Avatar, type IAvatarProps } from './avatar';

describe('<Avatar /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarProps>) => {
        const completeProps: IAvatarProps = { ...props };

        return <Avatar {...completeProps} />;
    };

    // need to mock global Image as radix-ui only renders
    // an <img/> once it has been loaded therefore the usual
    // img events can't be fired with testing-library.
    const originalGlobalImage = global.Image;

    beforeAll(() => {
        (window.Image as unknown) = class MockImage {
            onload = jest.fn();
            src = '';
            constructor() {
                setTimeout(() => {
                    this.onload();
                }, 100);
            }
        };
    });

    afterAll(() => {
        global.Image = originalGlobalImage;
    });

    it('renders fallback when no image provided', () => {
        const fallbackContent = 'fallback content';
        render(createTestComponent({ fallback: fallbackContent }));

        const fallback = screen.getByText(fallbackContent);

        expect(fallback).toBeInTheDocument();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('does not render fallback when valid image provided', () => {
        const fallbackContent = 'fallback content';
        render(createTestComponent({ fallback: fallbackContent, src: 'img.jpg' }));

        expect(screen.queryByText(fallbackContent)).not.toBeInTheDocument();
    });

    it('renders loading animation while image is loading', () => {
        render(createTestComponent({ src: 'img.jpg' }));

        const fallback = screen.getByTestId('fallback');
        expect(fallback).toHaveClass('animate-pulse');
    });

    it('renders the image with provided alt text after it has loaded', async () => {
        const altText = 'test';
        render(createTestComponent({ alt: altText, src: 'img.jpg' }));

        const image = await screen.findByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', altText);
    });

    it('renders the image with a default alt text', async () => {
        render(createTestComponent({ src: 'img.jpg' }));

        const image = await screen.findByRole('img');
        expect(image).toHaveAttribute('alt');
    });
});
