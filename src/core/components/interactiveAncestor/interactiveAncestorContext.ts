import { createContext, useContext } from 'react';

const interactiveAncestorContext = createContext(false);

/**
 * Marks its subtree as living inside an interactive element (a link, a button, or a row with an onClick handler).
 * Components that render their own interactive affordances read this to avoid nesting a control inside a control,
 * which is invalid markup, adds a phantom tab stop, and competes with the container for the click.
 */
export const InteractiveAncestorProvider = interactiveAncestorContext.Provider;

export const useInteractiveAncestor = (): boolean => useContext(interactiveAncestorContext);
