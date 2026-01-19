import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState, type ChangeEvent, type FocusEvent } from 'react';
import { type Address } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';
import { useConfig, useEnsAddress, useEnsName, type UseEnsAddressParameters, type UseEnsNameParameters } from 'wagmi';
import {
    Button,
    Clipboard,
    clipboardUtils,
    IconType,
    InputContainer,
    mergeRefs,
    Spinner,
    useDebouncedValue,
    useInputProps,
    type IInputComponentProps,
} from '../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../hooks';
import type { IWeb3ComponentProps } from '../../../types';
import { addressUtils, ensUtils } from '../../../utils';
import { useGukModulesContext } from '../../gukModulesProvider';
import { MemberAvatar } from '../../member';

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
    extends Omit<IInputComponentProps<HTMLTextAreaElement>, 'maxLength' | 'value' | 'onChange'>, IWeb3ComponentProps {
    /**
     * Current value of the address input.
     */
    value?: string;
    /**
     * Callback called whenever the current input value (address or ens) changes.
     */
    onChange?: (value?: string) => void;
    /**
     * Callback called with the address value object when the user input is valid. The component will output the address
     * in checksum format and the ENS name normalised. The value will be set to undefined when the user input is not a
     * valid address nor a valid ens name.
     */
    onAccept?: (value?: IAddressInputResolvedValue) => void;
    /**
     * Require an address to pass EIP-55 checksum validation.
     * @default true
     */
    enforceChecksum?: boolean;
}

export const AddressInput = forwardRef<HTMLTextAreaElement, IAddressInputProps>((props, ref) => {
    const {
        value = '',
        onChange,
        onAccept,
        enforceChecksum = true,
        wagmiConfig: wagmiConfigProps,
        chainId = mainnet.id,
        ...otherProps
    } = props;

    const { containerProps, inputProps } = useInputProps(otherProps);
    const { onFocus, onBlur, className: inputClassName, ...otherInputProps } = inputProps;

    const ensChainId = mainnet.id;

    const queryClient = useQueryClient();
    const wagmiConfigProvider = useConfig();
    const onAcceptRef = useRef(onAccept);
    const appliedInitialEnsModeRef = useRef(false);

    const wagmiConfig = wagmiConfigProps ?? wagmiConfigProvider;
    const mainnetChain = wagmiConfig.chains.find(({ id }) => id === ensChainId);

    const { buildEntityUrl } = useBlockExplorer({ chainId });

    // ENS always works on mainnet, so check mainnet for ENS support, not the current chain
    const supportEnsNames = mainnetChain?.contracts?.ensUniversalResolver != null;

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [debouncedValue, setDebouncedValue] = useDebouncedValue(value, { delay: 300 });
    const [isFocused, setIsFocused] = useState(false);

    const { copy } = useGukModulesContext();

    const isDebouncedValueValidEns = ensUtils.isEnsName(debouncedValue);
    const isDebouncedValueValidAddress = addressUtils.isAddress(debouncedValue);
    const isDebouncedValueValidStrictAddress = addressUtils.isAddress(debouncedValue, { strict: true });

    const hasChecksumError = enforceChecksum && isDebouncedValueValidAddress && !isDebouncedValueValidStrictAddress;

    const {
        data: ensAddress,
        isFetching: isEnsAddressLoading,
        queryKey: ensAddressQueryKey,
    } = useEnsAddress({
        name: isDebouncedValueValidEns ? normalize(debouncedValue) : undefined,
        config: wagmiConfig,
        chainId: ensChainId,
        query: { enabled: supportEnsNames && isDebouncedValueValidEns },
    });

    const {
        data: ensName,
        isFetching: isEnsNameLoading,
        queryKey: ensNameQueryKey,
    } = useEnsName({
        address: debouncedValue as Address,
        config: wagmiConfig,
        chainId: ensChainId,
        query: { enabled: supportEnsNames && isDebouncedValueValidAddress },
    });

    const isLoading = isEnsAddressLoading || isEnsNameLoading;
    const [displayMode, setDisplayMode] = useState<'ens' | 'address'>(ensUtils.isEnsName(value) ? 'ens' : 'address');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;

        if (!enforceChecksum) {
            onChange?.(value);
            return;
        }

        // Expose input value in checksum format when enforceChecksum property is set and value is a valid address. Note
        // that the strict isAddress check returns false when the hex section of the address is all in uppercase.
        const hexValue = value.slice(2);

        const isValidAddress = addressUtils.isAddress(value, { strict: true });
        const isValidUppercaseAddress = addressUtils.isAddress(value) && hexValue === hexValue.toUpperCase();

        const processedValue = isValidAddress || isValidUppercaseAddress ? addressUtils.getChecksum(value) : value;
        onChange?.(processedValue);
    };

    const toggleDisplayMode = () => {
        appliedInitialEnsModeRef.current = true;

        const newMode = displayMode === 'ens' ? 'address' : 'ens';
        const nextValue = newMode === 'ens' ? ensName : ensAddress;

        if (!nextValue) {
            return;
        }

        setDisplayMode(newMode);
        onChange?.(nextValue);
        setDebouncedValue(nextValue);
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
        // Trim on blur to avoid false form validation due to spaces/newlines
        const trimmed = value.trim();
        if (trimmed !== value) {
            onChange?.(trimmed);
        }
        onBlur?.(event);
    };

    // Trigger onAccept callback when appropriate -- valid address and passes checksum when required
    useEffect(() => {
        if (isLoading) {
            return;
        }

        const handleAccept = onAcceptRef.current;

        if (ensAddress) {
            // User input is a valid ENS name
            const normalizedEns = normalize(debouncedValue);
            handleAccept?.({ address: ensAddress, name: normalizedEns });
        } else if (isDebouncedValueValidAddress && !hasChecksumError) {
            // User input is a valid address with or without a ENS name linked to it
            const checksumAddress = addressUtils.getChecksum(debouncedValue);
            handleAccept?.({ address: checksumAddress, name: ensName ?? undefined });
        } else {
            handleAccept?.(undefined);
        }
    }, [ensAddress, ensName, debouncedValue, isDebouncedValueValidAddress, hasChecksumError, isLoading]);

    // Sync displayMode with the current value to ensure button shows the correct toggle state
    useEffect(() => {
        const mode = ensUtils.isEnsName(value) ? 'ens' : 'address';
        setDisplayMode(mode);
    }, [value]);

    // Default to ENS mode on first render if an ENS exists for the provided address
    useEffect(() => {
        if (appliedInitialEnsModeRef.current) {
            return;
        }

        if (!isFocused && ensName && addressUtils.isAddress(value)) {
            appliedInitialEnsModeRef.current = true;
            setDisplayMode('ens');
            onChange?.(ensName);
            setDebouncedValue(ensName);
        }
    }, [ensName, value, isFocused, onChange, setDebouncedValue]);

    // Update react-query cache to avoid fetching the ENS address when the ENS name has been successfully resolved.
    // E.g. user types 0x..123 which is resolved into test.eth, therefore set test.eth as resolved ENS name of 0x..123
    useEffect(() => {
        if (ensName && isDebouncedValueValidAddress) {
            const queryKey = [...ensAddressQueryKey];
            (queryKey[1] as UseEnsAddressParameters).name = ensName;
            queryClient.setQueryData(queryKey, debouncedValue);
        }
    }, [queryClient, ensName, debouncedValue, isDebouncedValueValidAddress, ensAddressQueryKey]);

    // Update react-query cache to avoid fetching the ENS name when the ENS address has been successfully resolved.
    // E.g. user types test.eth which is resolved into 0x..123, therefore set 0x..123 as resolved ENS address of test.eth
    useEffect(() => {
        if (ensAddress && isDebouncedValueValidEns) {
            const queryKey = [...ensNameQueryKey];
            (queryKey[1] as UseEnsNameParameters).address = ensAddress;
            queryClient.setQueryData(queryKey, normalize(debouncedValue));
        }
    }, [queryClient, ensAddress, debouncedValue, isDebouncedValueValidEns, ensNameQueryKey]);

    // Resize textarea element on user input depending on the focus state of the textarea
    useEffect(() => {
        if (inputRef.current) {
            // Needed to trigger a calculation for the new scrollHeight of the textarea
            inputRef.current.style.height = 'auto';

            const newHeight = `${inputRef.current.scrollHeight.toString()}px`;
            inputRef.current.style.height = newHeight;
        }
    }, [value, isFocused]);

    const alert = hasChecksumError
        ? { message: copy.addressInput.checksum, variant: 'critical' as const }
        : containerProps.alert;

    // Display the address truncated when not focused. Do NOT truncate ENS.
    const displayTruncatedAddress = addressUtils.isAddress(value) && !isFocused;

    const addressValue = ensAddress ?? (addressUtils.isAddress(value) ? value : undefined);
    const addressUrl = addressValue
        ? buildEntityUrl({ type: ChainEntityType.ADDRESS, id: addressValue, chainId })
        : undefined;

    const processedValue = displayTruncatedAddress ? addressUtils.truncateAddress(value) : value;

    const canToggleToAddress = displayMode === 'ens' && ensAddress != null && !isFocused && !isLoading;
    const canToggleToEns = displayMode === 'address' && ensName != null && !isFocused && !isLoading;

    return (
        <InputContainer {...containerProps} alert={alert}>
            <div className="ml-3 shrink-0">
                {isLoading && <Spinner variant="neutral" size="lg" />}
                {!isLoading && <MemberAvatar address={addressValue} chainId={ensChainId} wagmiConfig={wagmiConfig} />}
            </div>
            <textarea
                type="text"
                ref={mergeRefs([ref, inputRef])}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                rows={1}
                className={classNames(
                    // min-h-11 is required to prevent placeholder displacement
                    '!md:px-4 min-h-11 resize-none px-3!',
                    { 'whitespace-normal': isFocused },
                    inputClassName,
                )}
                {...otherInputProps}
                value={processedValue}
                onChange={handleInputChange}
            />
            <div className="mr-2 flex flex-row gap-2">
                {canToggleToAddress && (
                    <Button variant="tertiary" size="sm" onClick={toggleDisplayMode} className="min-w-max">
                        0x…
                    </Button>
                )}
                {canToggleToEns && (
                    <Button variant="tertiary" size="sm" onClick={toggleDisplayMode} className="min-w-max">
                        ENS
                    </Button>
                )}
                {addressValue != null && !isFocused && (
                    <>
                        <Button
                            variant="tertiary"
                            size="sm"
                            href={addressUrl}
                            target="_blank"
                            iconLeft={IconType.LINK_EXTERNAL}
                        />
                        <Clipboard copyValue={value} variant="button" />
                    </>
                )}
                {value.length > 0 && isFocused && (
                    <Button variant="tertiary" size="sm" onMouseDown={handleClearClick}>
                        {copy.addressInput.clear}
                    </Button>
                )}
                {value.length === 0 && (
                    <Button variant="tertiary" size="sm" onClick={handlePasteClick}>
                        {copy.addressInput.paste}
                    </Button>
                )}
            </div>
        </InputContainer>
    );
});

AddressInput.displayName = 'AddressInput';
