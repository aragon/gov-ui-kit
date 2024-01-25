import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEvent } from 'react';
import { InputTime, type IInputTimeProps } from './inputTime';

const meta: Meta<typeof InputTime> = {
    title: 'components/Input/InputTime',
    component: InputTime,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=10080-1869&mode=design&t=DMhjcmSjhuHsGH3N-0',
        },
    },
};

type Story = StoryObj<typeof InputTime>;

/**
 * Default usage example of the `InputTime` component.
 *
 * Note: The time picker is disabled by default on Firefox and can be enabled by setting the
 * `dom.forms.datetime.timepicker` preference to `true`. Please be aware that this may enable experimental features.
 *
 * More information about how to change Firefox browser preferences can be found in the
 * [Firefox documentation](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
 */

export const Default: Story = {
    args: {},
};

const ControlledComponent = (props: IInputTimeProps) => {
    const [value, setValue] = useState<string>('13:00');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return <InputTime value={value} onChange={handleChange} {...props} />;
};

/**
 * Usage example of a controlled `InputTime` component.
 */
export const Controlled: Story = {
    args: { step: 130 },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
