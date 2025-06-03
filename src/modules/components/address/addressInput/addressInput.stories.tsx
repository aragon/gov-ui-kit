import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AddressInput, type IAddressInputResolvedValue } from './addressInput';

const meta: Meta<typeof AddressInput> = {
    title: 'Modules/Components/Address/AddressInput',
    component: AddressInput,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8192-18146&mode=design&t=VfR81DAQucRS3iGm-4',
        },
    },
};

type Story = StoryObj<typeof AddressInput>;

/**
 * Default usage of the AddressInput component.
 */
export const Default: Story = {
    args: {
        placeholder: 'ENS or 0x …',
    },
    render: ({ onChange, onAccept, ...props }) => {
        const [value, setValue] = useState<string>();
        const [addressValue, setAddressValue] = useState<IAddressInputResolvedValue>();

        const stringAddressValue = addressValue != null ? JSON.stringify(addressValue, null, 2) : 'undefined';

        return (
            <div className="flex grow flex-col gap-2">
                <AddressInput value={value} onChange={setValue} onAccept={setAddressValue} {...props} />
                <code className="[word-break:break-word]">Address value: {stringAddressValue}</code>
            </div>
        );
    },
};

export default meta;
