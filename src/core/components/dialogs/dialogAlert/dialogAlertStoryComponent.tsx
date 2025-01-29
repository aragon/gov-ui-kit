/* istanbul ignore file */

import { type ReactNode, useState } from 'react';
import { Button } from '../../button';
import { DialogAlert, type DialogAlertVariant } from './index';

export const DialogAlertStoryComponent = (
    component: 'header' | 'content' | 'footer' | 'root',
    variant?: DialogAlertVariant,
) =>
    function DialogStoryComponent(props: object) {
        const [open, setOpen] = useState(false);

        const closeDialog = () => setOpen(false);

        return (
            <>
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Open
                </Button>
                <DialogAlert.Root
                    open={open}
                    onOpenChange={setOpen}
                    hiddenDescription="Description of the dialog"
                    variant={variant}
                    {...(component === 'root' && props)}
                >
                    <DialogAlert.Header title="Title of the alert dialog" {...(component === 'header' && props)} />
                    <DialogAlert.Content {...(component === 'content' && props)}>
                        {'children' in props && props.children != null ? (
                            (props.children as ReactNode)
                        ) : (
                            <div className="flex h-60 w-full items-center justify-center border border-dashed border-info-300 bg-info-100">
                                Dialog alert content
                            </div>
                        )}
                    </DialogAlert.Content>
                    <DialogAlert.Footer
                        actionButton={{ label: 'Action', onClick: closeDialog }}
                        cancelButton={{ label: 'Close', onClick: closeDialog }}
                        {...(component === 'footer' && props)}
                    />
                </DialogAlert.Root>
            </>
        );
    };
