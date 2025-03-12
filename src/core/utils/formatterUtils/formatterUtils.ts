import { DateTime, Duration, type DurationUnit } from 'luxon';
import {
    DateFormat,
    NumberFormat,
    dateFormats,
    numberFormats,
    type DynamicOption,
    type INumberFormat,
} from './formatterUtilsDefinitions';

export interface IFormatNumberOptions extends INumberFormat {
    /**
     * Number format to use.
     * @default GENERIC_LONG
     */
    format?: NumberFormat;
}

export interface IFormatDateOptions {
    /**
     * Date format to use.
     * @default YEAR_MONTH_DAY_TIME
     */
    format?: DateFormat;
}

const cache: Record<string, Intl.NumberFormat | undefined> = {};

class FormatterUtils {
    numberLocale = 'en';
    dateLocale = 'en';
    currencyLocale = 'USD';

    private baseSymbolRanges = [
        { value: 1e15, symbol: (value: number) => ` x 10^${(this.getDecimalPlaces(value) - 1).toString()}` },
        { value: 1e12, symbol: () => 'T' },
        { value: 1e9, symbol: () => 'B' },
        { value: 1e6, symbol: () => 'M' },
        { value: 1e3, symbol: () => 'K' },
    ];

    private relativeDateOrder: DurationUnit[] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

    formatNumber = (value: number | string | null | undefined, options: IFormatNumberOptions = {}): string | null => {
        const { format = NumberFormat.GENERIC_LONG, ...otherOptions } = options;
        const mergedOptions = { ...numberFormats[format], ...otherOptions };
        const {
            fixedFractionDigits,
            maxFractionDigits,
            minFractionDigits,
            maxSignificantDigits,
            useBaseSymbol,
            isCurrency,
            isPercentage,
            withSign,
            fallback = null,
            displayFallback,
        } = mergedOptions;

        const parsedValue = typeof value === 'number' ? value : parseFloat(value ?? '');

        if (Boolean(displayFallback?.(parsedValue)) || isNaN(parsedValue)) {
            return fallback;
        }

        let processedValue = isPercentage ? parsedValue * 100 : parsedValue;

        const fixedFractionDigitsOption = this.getDynamicOption(processedValue, fixedFractionDigits);
        const maxSignificantDigitsOption = this.getDynamicOption(processedValue, maxSignificantDigits);

        const maxDigitsFallback = fixedFractionDigitsOption ?? maxFractionDigits;
        const maxDigits = maxSignificantDigitsOption
            ? this.significantDigitsToFractionDigits(processedValue, maxSignificantDigitsOption, maxDigitsFallback)
            : maxDigitsFallback;

        const minDigits = fixedFractionDigitsOption ?? minFractionDigits;

        const cacheKey = `number/${this.numberLocale}/${this.currencyLocale}/${isCurrency?.toString() ?? '-'}/${maxDigits?.toString() ?? '-'}/${minDigits?.toString() ?? '-'}`;

        if (!cache[cacheKey]) {
            cache[cacheKey] = new Intl.NumberFormat(this.numberLocale, {
                style: isCurrency ? 'currency' : undefined,
                currency: isCurrency ? this.currencyLocale : undefined,
                maximumFractionDigits: maxDigits,
                minimumFractionDigits: minDigits,
            });
        }

        const baseRange = this.baseSymbolRanges.find((range) => Math.abs(processedValue) >= range.value);
        const baseRangeDenominator =
            processedValue > 1e15 ? 10 ** (this.getDecimalPlaces(processedValue) - 1) : (baseRange?.value ?? 1);

        if (useBaseSymbol) {
            processedValue = processedValue / baseRangeDenominator;
        }

        let formattedValue = cache[cacheKey].format(processedValue);

        if (withSign && processedValue > 0) {
            formattedValue = `+${formattedValue}`;
        }

        if (useBaseSymbol && baseRange != null) {
            formattedValue = `${formattedValue}${baseRange.symbol(parsedValue)}`;
        }

        if (isPercentage) {
            return `${formattedValue}%`;
        }

        return formattedValue;
    };

    formatDate = (value: DateTime | number | string | undefined, options: IFormatDateOptions = {}) => {
        const { format = DateFormat.YEAR_MONTH_DAY_TIME } = options;
        const { useRelativeCalendar, useRelativeDate, isDuration, ...dateFormat } = dateFormats[format];

        if (value == null) {
            return null;
        }

        const dateObject =
            typeof value === 'string'
                ? DateTime.fromISO(value)
                : typeof value === 'number'
                  ? DateTime.fromMillis(value)
                  : value;

        const shouldUseRelativeCalendar = useRelativeCalendar && this.isYesterdayTodayTomorrow(dateObject);

        if (shouldUseRelativeCalendar) {
            const relativeCalendarDate =
                dateObject.toRelativeCalendar({ locale: this.dateLocale })!.charAt(0).toUpperCase() +
                dateObject.toRelativeCalendar({ locale: this.dateLocale })!.slice(1);
            const dateTime = dateObject.toLocaleString(
                { ...DateTime.TIME_SIMPLE, hourCycle: 'h23' },
                { locale: this.dateLocale },
            );
            const dateLiteral = this.getDateLiteral();

            return useRelativeCalendar === 'with-time'
                ? `${relativeCalendarDate}${dateLiteral}${dateTime}`
                : relativeCalendarDate;
        }

        if (useRelativeDate) {
            return dateObject.toRelative({ locale: this.dateLocale });
        }

        if (isDuration) {
            const dateDiff = dateObject.diffNow(this.relativeDateOrder);
            const nonZeroUnit = this.relativeDateOrder.find((unit) => Math.abs(dateDiff.get(unit)) > 0) ?? 'seconds';
            const roundedDiffUnit = Duration.fromObject(
                { [nonZeroUnit]: Math.floor(dateDiff.get(nonZeroUnit)) },
                { locale: this.dateLocale },
            );

            return roundedDiffUnit.valueOf() < 0 ? roundedDiffUnit.negate().toHuman() : roundedDiffUnit.toHuman();
        }

        return dateObject.toLocaleString({ ...dateFormat, hourCycle: 'h23' }, { locale: this.dateLocale });
    };

    private isYesterdayTodayTomorrow = (value: DateTime): boolean => {
        const today = DateTime.local().startOf('day');
        const datesToCheck = [today.minus({ day: 1 }), today, today.plus({ day: 1 })];

        return datesToCheck.some((date) => date.hasSame(value, 'day'));
    };

    private getDateLiteral = () => {
        const dateTimeFormat = new Intl.DateTimeFormat(this.dateLocale, DateTime.DATETIME_FULL);
        const dateTimeParts = dateTimeFormat.formatToParts();
        const hourPartIndex = dateTimeParts.findIndex((part) => part.type === 'hour');
        const timeLiteral = dateTimeParts[hourPartIndex - 1] as Intl.DateTimeFormatPart | undefined;

        return timeLiteral?.value ?? ', ';
    };

    private getDynamicOption = <TValue = number, TOptionValue extends string | number | boolean = number>(
        value: TValue,
        option?: DynamicOption<TValue, TOptionValue>,
    ): TOptionValue | undefined => (typeof option === 'function' ? option(value) : option);

    private getDecimalPlaces = (value: number) => value.toString().split('.')[0].length;

    private significantDigitsToFractionDigits = (value: number, digits: number, fallback?: number) =>
        value === 0 ? fallback : Math.floor(digits - Math.log10(Math.abs(value)));
}

export const formatterUtils = new FormatterUtils();
