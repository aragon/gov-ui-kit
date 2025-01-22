import { createContext } from 'react';
import type { IDialogRootProps } from '../../dialog/dialogRoot/dialogRoot.api';

export type DialogAlertVariant = 'critical' | 'info' | 'success' | 'warning';

export interface IDialogAlertRootProps extends Omit<IDialogRootProps, 'modal'> {
    /**
     * The visual style variant of the dialog.
     * @default info
     */
    variant?: DialogAlertVariant;
}

export interface IDialogAlertContext {
    variant: DialogAlertVariant;
}

export const DialogAlertContext = createContext<IDialogAlertContext>({ variant: 'info' });
