import { createContext, useContext } from 'react';
import type { IDialogAlertRootProps } from '../dialogAlertRoot';

export interface IDialogAlertContext extends Required<Pick<IDialogAlertRootProps, 'variant'>> {}

const dialogAlertContext = createContext<IDialogAlertContext | null>(null);

export const DialogAlertContextProvider = dialogAlertContext.Provider;

export const useDialogAlertContext = (): IDialogAlertContext => {
    const values = useContext(dialogAlertContext);

    if (values == null) {
        throw new Error('useDialogAlertContext: hook must be used inside a DialogAlertContextProvider.');
    }

    return values;
};
