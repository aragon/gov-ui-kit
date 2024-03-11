import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState, type ChangeEvent, type FocusEvent } from 'react';
import { getAddress, isAddress, type Address } from 'viem';
import { normalize } from 'viem/ens';
import { useConfig, useEnsAddress, useEnsName, type UseEnsAddressParameters, type UseEnsNameParameters } from 'wagmi';
import {
    Avatar,
    Button,
    IconType,
    InputContainer,
    Spinner,
    clipboardUtils,
    mergeRefs,
    useDebouncedValue,
    useInputProps,
    type IInputComponentProps,
} from '../../../../core';
import type { IWeb3ComponentProps } from '../../../types';
import { addressUtils } from '../../../utils';

export interface IAddressInputResolvedValue {
    /**
     * Address value.
     */
    address?: string;
    /**
     * ENS name linked to the given address.
     */
    name?: string;
}

export interface IAddressInputProps
    extends Omit<IInputComponentProps<HTMLTextAreaElement>, 'maxLength' | 'value' | 'onChange'>,
        IWeb3ComponentProps {
    /**
     * Current value of the address input.
     */
    value?: string;
    /**
     * Callback called on address input change.
     */
    onChange?: (value?: string) => void;
    /**
     * Callback called with the address value object when the user input is valid. The component will output the address
     * in checksum format and the ENS name normalised. The value will be set to undefined when the user input is not a
     * valid address nor a valid ens name.
     */
    onAccept?: (value?: IAddressInputResolvedValue) => void;
}

const isEnsName = (value?: string) => value != null && value.length > 6 && value.endsWith('.eth');

export const AddressInput = forwardRef<HTMLTextAreaElement, IAddressInputProps>((props, ref) => {
    const { value = '', onChange, onAccept, wagmiConfig: wagmiConfigProps, chainId, ...otherProps } = props;

    const { containerProps, inputProps } = useInputProps(otherProps);
    const { onFocus, onBlur, className: inputClassName, ...otherInputProps } = inputProps;

    const queryClient = useQueryClient();
    const wagmiConfigProvider = useConfig();

    const wagmiConfig = wagmiConfigProps ?? wagmiConfigProvider;
    const processedChainId = chainId ?? wagmiConfig.chains[0].id;

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [debouncedValue, setDebouncedValue] = useDebouncedValue(value, { delay: 500 });
    const [isFocused, setIsFocused] = useState(false);

    const {
        data: ensAddress,
        isFetching: isEnsAddressLoading,
        queryKey: ensAddressQueryKey,
    } = useEnsAddress({
        name: normalize(debouncedValue),
        config: wagmiConfig,
        chainId,
        query: { enabled: isEnsName(debouncedValue) },
    });

    const {
        data: ensName,
        isFetching: isEnsNameLoading,
        queryKey: ensNameQueryKey,
    } = useEnsName({
        address: debouncedValue as Address,
        config: wagmiConfig,
        chainId,
        query: { enabled: isAddress(debouncedValue, { strict: false }) },
    });

    const displayMode = isEnsName(value) ? 'ens' : 'address';

    const isLoading = isEnsAddressLoading || isEnsNameLoading;

    const currentChain = wagmiConfig.chains.find(({ id }) => id === processedChainId);
    const blockExplorerUrl = `${currentChain?.blockExplorers?.default.url}/address/${value}`;

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => onChange?.(event.target.value);

    const toggleDisplayMode = () => {
        const newInputValue = displayMode === 'address' ? ensAddress : ensName;
        onChange?.(newInputValue ?? '');

        // Update the debounced value without waiting for the debounce timeout to avoid delays on displaying the
        // ENS/Address buttons because of delayed queries
        setDebouncedValue(newInputValue ?? '');
    };

    const handlePasteClick = async () => {
        const text = await clipboardUtils.paste();
        onChange?.(text);
    };

    const handleClearClick = () => onChange?.(undefined);

    const handleInputFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus?.(event);
    };

    const handleInputBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(event);
    };

    // Trigger onChange property when value is a valid address or ENS
    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (ensAddress) {
            // User input is a valid ENS name
            const normalizedEns = normalize(debouncedValue);
            onAccept?.({ address: ensAddress, name: normalizedEns });
        } else if (isAddress(debouncedValue, { strict: false })) {
            // User input is a valid address with or without a ENS name linked to it
            const checksumAddress = getAddress(debouncedValue);
            onAccept?.({ address: checksumAddress, name: ensName ?? undefined });
        } else {
            // User input is not a valid address nor ENS name
            onAccept?.(undefined);
        }
    }, [ensAddress, ensName, debouncedValue, isLoading, onAccept]);

    // Update react-query cache to avoid fetching the ENS address when the ENS name has been successfully resolved.
    // E.g. user types 0x..123 which is resolved into test.eth, therefore set test.eth as resolved ENS name of 0x..123
    useEffect(() => {
        if (ensName) {
            const queryKey = [...ensAddressQueryKey];
            (queryKey[1] as UseEnsAddressParameters).name = ensName;
            queryClient.setQueryData(queryKey, debouncedValue);
        }
    }, [queryClient, ensName, debouncedValue, ensAddressQueryKey]);

    // Update react-query cache to avoid fetching the ENS name when the ENS address has been successfully resolved.
    // E.g. user types test.eth which is resolved into 0x..123, therefore set 0x..123 as resolved ENS address of test.eth
    useEffect(() => {
        if (ensAddress) {
            const queryKey = [...ensNameQueryKey];
            (queryKey[1] as UseEnsNameParameters).address = ensAddress;
            queryClient.setQueryData(queryKey, debouncedValue);
        }
    }, [queryClient, ensAddress, debouncedValue, ensNameQueryKey]);

    // Resize textarea element on user input depending on the focus state of the textarea
    useEffect(() => {
        if (inputRef.current) {
            // Needed to trigger a calculation for the new scrollHeight of the textarea
            inputRef.current.style.height = 'auto';

            const newHeight = `${inputRef.current.scrollHeight}px`;
            inputRef.current.style.height = newHeight;
        }
    }, [value, isFocused]);

    // Display the address as truncated when the value is a valid address and input is not focused
    const displayTruncatedAddress = value != null && isAddress(value, { strict: false }) && !isFocused;

    const processedValue = displayTruncatedAddress ? addressUtils.truncateAddress(value) : value;

    return (
        <InputContainer {...containerProps}>
            <div className="ml-3 shrink-0">
                {isLoading && <Spinner variant="neutral" size="lg" />}
                {!isLoading && <Avatar />}
            </div>
            <textarea
                type="text"
                ref={mergeRefs([ref, inputRef])}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                rows={1}
                className={classNames(
                    'resize-none whitespace-normal',
                    { 'whitespace-normal': isFocused },
                    inputClassName,
                )}
                {...otherInputProps}
                value={processedValue}
                onChange={handleInputChange}
            />
            <div className="mr-2 flex flex-row gap-2">
                {(ensName != null || ensAddress != null) && !isFocused && (
                    <Button variant="tertiary" size="sm" onMouseDown={toggleDisplayMode} className="min-w-min">
                        {displayMode === 'ens' ? '0x...' : 'ENS'}
                    </Button>
                )}
                {(ensAddress != null || isAddress(value, { strict: false })) && !isFocused && (
                    <Button
                        variant="tertiary"
                        size="sm"
                        href={blockExplorerUrl}
                        target="_blank"
                        iconLeft={IconType.LINK_EXTERNAL}
                    />
                )}
                {value.length > 0 && !isFocused && (
                    <Button
                        variant="tertiary"
                        size="sm"
                        onMouseDown={() => clipboardUtils.copy(value)}
                        iconLeft={IconType.COPY}
                    />
                )}
                {value.length === 0 && (
                    <Button variant="tertiary" size="sm" onClick={handlePasteClick}>
                        Paste
                    </Button>
                )}
                {value.length > 0 && isFocused && (
                    <Button variant="tertiary" size="sm" onMouseDown={handleClearClick}>
                        Clear
                    </Button>
                )}
            </div>
        </InputContainer>
    );
});

AddressInput.displayName = 'AddressInput';
