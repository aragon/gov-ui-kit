/* istanbul ignore file */

import { type ReactNode, useState } from 'react';
import { Button } from '../../button';
import { Dialog } from './index';

export const DialogStoryComponent = (component: 'header' | 'content' | 'footer' | 'root') =>
    function DialogStoryComponent(props: object) {
        const [open, setOpen] = useState(false);

        const closeDialog = () => setOpen(false);

        return (
            <>
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Open
                </Button>
                <Dialog.Root open={open} onOpenChange={setOpen} {...(component === 'root' && props)}>
                    <Dialog.Header
                        title="Title of the dialog"
                        onClose={closeDialog}
                        {...(component === 'header' && props)}
                    />
                    <Dialog.Content description="A description for the dialog" {...(component === 'content' && props)}>
                        {'children' in props && props.children != null ? (
                            (props.children as ReactNode)
                        ) : (
                            <div className="flex h-60 w-full items-center justify-center border border-dashed border-info-300 bg-info-100">
                                Dialog content
                            </div>
                        )}
                    </Dialog.Content>
                    <Dialog.Footer
                        primaryAction={{ label: 'Confirm', onClick: closeDialog }}
                        secondaryAction={{ label: 'Close', onClick: closeDialog }}
                        {...(component === 'footer' && props)}
                    />
                </Dialog.Root>
            </>
        );
    };
