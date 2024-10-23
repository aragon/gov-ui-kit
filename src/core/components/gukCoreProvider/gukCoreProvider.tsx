import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { coreCopy, type CoreCopy } from '../../assets';

export interface IGukCoreContext {
    /**
     * Image component to be used for images.
     * @default 'img'
     */
    Img: React.FC | 'img';
    /**
     * Link component to be used for links.
     * @default 'a'
     */
    Link: React.FC | 'a';
    /**
     * Copy for the core components.
     */
    copy: CoreCopy;
}

export interface IGukCoreProviderProps {
    /**
     * Context provider values.
     */
    values?: Partial<IGukCoreContext>;
    /**
     * Children of the context provider.
     */
    children?: ReactNode;
}

const gukCoreContextDefaults: IGukCoreContext = {
    Img: 'img',
    Link: 'a',
    copy: coreCopy,
};

const gukCoreContext = createContext<IGukCoreContext>(gukCoreContextDefaults);

export const GukCoreProvider: React.FC<IGukCoreProviderProps> = (props) => {
    const { values, children } = props;

    const contextValues = useMemo(
        () => ({
            Img: values?.Img ?? gukCoreContextDefaults.Img,
            Link: values?.Link ?? gukCoreContextDefaults.Link,
            copy: values?.copy ?? gukCoreContextDefaults.copy,
        }),
        [values],
    );

    return <gukCoreContext.Provider value={contextValues}>{children}</gukCoreContext.Provider>;
};

export const useGukCoreContext = (): Required<IGukCoreContext> => {
    const values = useContext(gukCoreContext);

    return values;
};
