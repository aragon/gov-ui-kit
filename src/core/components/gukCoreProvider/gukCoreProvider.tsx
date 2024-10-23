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

const odsCoreContextDefaults: IGukCoreContext = {
    Img: 'img',
    Link: 'a',
    copy: coreCopy,
};

const odsCoreContext = createContext<IGukCoreContext>(odsCoreContextDefaults);

export const GukCoreProvider: React.FC<IGukCoreProviderProps> = (props) => {
    const { values, children } = props;

    const contextValues = useMemo(
        () => ({
            Img: values?.Img ?? odsCoreContextDefaults.Img,
            Link: values?.Link ?? odsCoreContextDefaults.Link,
            copy: values?.copy ?? odsCoreContextDefaults.copy,
        }),
        [values],
    );

    return <odsCoreContext.Provider value={contextValues}>{children}</odsCoreContext.Provider>;
};

export const useGukCoreContext = (): Required<IGukCoreContext> => {
    const values = useContext(odsCoreContext);

    return values;
};
