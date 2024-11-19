import type { FieldError } from 'react-hook-form';
import type { IInputComponentProps } from '../../../core';
import type { ModulesCopy } from '../../assets';
import type { IUseFormFieldReturn, UseFormFieldType } from './useFormField.api';

export interface IGetValidationRulesParams {
    value: string;
    type: UseFormFieldType;
    label: string;
    copy: ModulesCopy;
}

class FormFieldUtils {
    /*
    getValidationRules = (value: string) => {

    }

    validateValue = (value: string, type: UseFormFieldType) => {
        if (type === 'boolean') {
            return formFieldUtils.validateBoolean(value) || `${label} must be set to "true" or "false"`;
        } else if (type === 'address') {
            return addressUtils.isAddress(value) || `${label} is not a valid address`;
        }

        return undefined;
    }
        */

    validateBoolean = (value: string | boolean): boolean => ['true', 'false'].includes(value.toString());

    valueSetter = (value: string | boolean, type: UseFormFieldType): string | boolean => {
        if (type === 'boolean') {
            return this.validateBoolean(value) ? Boolean(value) : value.toString().toLocaleLowerCase();
        }

        return value;
    };

    defaultFormField = (name: string, value?: string): IUseFormFieldReturn => ({
        name,
        value,
        onChange: () => Promise.resolve(true),
        onBlur: () => Promise.resolve(true),
        ref: () => null,
    });

    fieldErrorToAlert = (error?: FieldError): IInputComponentProps['alert'] | undefined =>
        error?.message != null ? { message: error.message, variant: 'critical' } : undefined;

    parseType = (type: string): UseFormFieldType => {
        let formFieldType: UseFormFieldType = 'string';

        if (type.includes('uint')) {
            formFieldType = 'number';
        } else if (type === 'bool') {
            formFieldType = 'boolean';
        } else if (type === 'address') {
            formFieldType = 'address';
        }

        return formFieldType;
    };
}

export const formFieldUtils = new FormFieldUtils();
