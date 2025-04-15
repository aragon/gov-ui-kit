import { render, screen } from '@testing-library/react';
import { RadixImageMock } from '../../../test';
import { Avatar, type IAvatarProps } from './avatar';

describe('<Avatar /> component', () => {
    const originalGlobalImage = global.Image;

    const createTestComponent = (props?: Partial<IAvatarProps>) => {
        const completeProps: IAvatarProps = { ...props };

        return <Avatar {...completeProps} />;
    };

    beforeEach(() => {
        (window.Image as unknown) = RadixImageMock;
    });

    afterEach(() => {
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
