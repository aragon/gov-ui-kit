import { render, screen } from '@testing-library/react';
import { GukCoreProvider, type IGukCoreContext } from '../../gukCoreProvider';
import { AvatarBase, type IAvatarBaseProps } from './avatarBase';

describe('<AvatarBase /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarBaseProps>, context?: Partial<IGukCoreContext>) => {
        const completeProps: IAvatarBaseProps = { ...props };

        return (
            <GukCoreProvider values={context}>
                <AvatarBase {...completeProps} />
            </GukCoreProvider>
        );
    };

    it('renders the image component set on the GukCoreProvider', () => {
        const Img = (props: object) => <img data-testid="my-image-component" alt="test" {...props} />;
        const context = { Img };
        const props = { src: 'https://test.com/' };
        render(createTestComponent(props, context));
        const image = screen.getByRole<HTMLImageElement>('img');
        expect(image.src).toEqual(props.src);
        expect(screen.getByTestId('my-image-component')).toBeInTheDocument();
    });
});
