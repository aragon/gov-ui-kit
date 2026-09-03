import { createContext } from 'react';

/**
 * Marks a subtree as living inside an interactive container (a link, a button or a clickable row). Components such as
 * AddressOutput read it to default `hasInteractiveAncestor`, so wrapper components set the flag once instead of every
 * render site passing it manually.
 */
export const InteractiveAncestorContext = createContext<boolean>(false);
