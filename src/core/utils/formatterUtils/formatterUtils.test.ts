import { DateTime, Settings } from 'luxon';
import { formatterUtils } from './formatterUtils';
import { DateFormat, NumberFormat } from './formatterUtilsDefinitions';

/* Using big values to fully test the formatter */
/* eslint-disable no-loss-of-precision */

describe('formatter utils', () => {
    const originalNow = Settings.now;
    const originalDateLocale = formatterUtils.dateLocale;
    const originalNumberLocale = formatterUtils.numberLocale;

    afterEach(() => {
        Settings.now = originalNow;
        Settings.defaultZone = 'utc';
        formatterUtils.dateLocale = originalDateLocale;
        formatterUtils.numberLocale = originalNumberLocale;
    });

    const setTime = (now?: string) => {
        Settings.now = () => (now != null ? new Date(now) : new Date()).valueOf();
    };

    const setLocale = (locales: { number?: string; date?: string }) => {
        formatterUtils.dateLocale = locales.date ?? originalDateLocale;
        formatterUtils.numberLocale = locales.number ?? originalNumberLocale;
    };

    describe('number formatting', () => {
        describe('generic amounts', () => {
            test.each([
                { value: -1234, result: '-1,234' },
                { value: -1234, result: '-1.234', locale: 'de' },
                { value: -123, result: '-123' },
                { value: 0, result: '0' },
                { value: 123, result: '123' },
                { value: 123, result: '+123', withSign: true },
                { value: 1234, result: '1,234' },
                { value: 1234, result: '+1,234', withSign: true },
                { value: 1234567, result: '1,234,567' },
                { value: 1234567890, result: '1,234,567,890' },
                { value: 1234567890123, result: '1,234,567,890,123' },
                { value: 1234567890123456, result: '1,234,567,890,123,456' },
            ])('formats $value as $result using long format', ({ value, result, locale, ...options }) => {
                setLocale({ number: locale });
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_LONG, ...options })).toEqual(
                    result,
                );
            });

            test.each([
                { value: -1234, result: '-1.23K' },
                { value: -1234, result: '-1,23K', locale: 'de' },
                { value: -123, result: '-123' },
                { value: 0, result: '0' },
                { value: 123, result: '123' },
                { value: 123, result: '+123', withSign: true },
                { value: 1234, result: '1.23K' },
                { value: 1234, result: '+1.23K', withSign: true },
                { value: 1234567, result: '1.23M' },
                { value: 1234567890, result: '1.23B' },
                { value: 1234567890123, result: '1.23T' },
                { value: 1234567890123456, result: '1.23 x 10^15' },
            ])('formats $value as $result using short format', ({ value, result, locale, ...options }) => {
                setLocale({ number: locale });
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_SHORT, ...options })).toEqual(
                    result,
                );
            });
        });

        describe('fiat total amounts', () => {
            test.each([
                { value: -1234.56789, result: '-$1,234.57' },
                { value: -1234.56789, result: '-1.234,57 $', locale: 'de' },
                { value: -0.012345678, result: '-$0.01' },
                { value: -0.0012345678, result: '-$0.00' },
                { value: 0, result: '$0.00' },
                { value: 0.0012345678, result: '$0.00' },
                { value: 0.0012345678, result: '+$0.00', withSign: true },
                { value: 0.012345678, result: '$0.01' },
                { value: 0.012345678, result: '+$0.01', withSign: true },
                { value: 0.12345678, result: '$0.12' },
                { value: 123.45678, result: '$123.46' },
                { value: 1234.56789, result: '$1,234.57' },
                { value: 1234.56789, result: '+$1,234.57', withSign: true },
                { value: 1234567.89012, result: '$1,234,567.89' },
                { value: 1234567890.12345, result: '$1,234,567,890.12' },
                { value: 1234567890123.45678, result: '$1,234,567,890,123.46' },
                { value: 1234567890123456.78901, result: '$1,234,567,890,123,456.80' },
            ])('formats $value as $result using long format', ({ value, result, locale, ...options }) => {
                setLocale({ number: locale });
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.FIAT_TOTAL_LONG, ...options }),
                ).toEqual(result);
            });

            test.each([
                { value: -1234.56789, result: '-$1.23K' },
                { value: -0.0012345678, result: '-$0.00' },
                { value: 0, result: '$0.00' },
                { value: 0.0012345678, result: '$0.00' },
                { value: 0.0012345678, result: '+$0.00', withSign: true },
                { value: 0.012345678, result: '$0.01' },
                { value: 0.12345678, result: '$0.12' },
                { value: 123.45678, result: '$123.46' },
                { value: 1234.56789, result: '$1.23K' },
                { value: 1234.56789, result: '+$1.23K', withSign: true },
                { value: 1234567.89012, result: '$1.23M' },
                { value: 1234567890.12345, result: '$1.23B' },
                { value: 1234567890123.45678, result: '$1.23T' },
                { value: 1234567890123456.78901, result: '$1.23 x 10^15' },
            ])('formats $value as $result using short format', ({ value, result, ...options }) => {
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.FIAT_TOTAL_SHORT, ...options }),
                ).toEqual(result);
            });
        });

        describe('token amounts', () => {
            test.each([
                { value: -1234.5678, result: '-1,234.5678' },
                { value: -1234.5678, result: '-1.234,5678', locale: 'de' },
                { value: -0.0123456789012345678, result: '-0.012345678901234568' },
                { value: 0, result: '0' },
                { value: 0.0012, result: '0.0012' },
                { value: 0.0012, result: '+0.0012', withSign: true },
                { value: 0.0123456789012345678, result: '0.012345678901234568' },
                { value: 0.12345678901234567, result: '0.12345678901234566' },
                { value: 123.4567, result: '123.4567' },
                { value: 1234, result: '1,234' },
                { value: 1234, result: '+1,234', withSign: true },
                { value: 1234.5678, result: '1,234.5678' },
                { value: 1234567.8901, result: '1,234,567.8901' },
                { value: 1234567890.1234, result: '1,234,567,890.1234' },
                { value: 1234567890123.4567, result: '1,234,567,890,123.4568' },
                { value: 1234567890123456.789, result: '1,234,567,890,123,456.8' },
            ])('formats $value as $result using long format', ({ value, result, locale, ...options }) => {
                setLocale({ number: locale });
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.TOKEN_AMOUNT_LONG, ...options }),
                ).toEqual(result);
            });

            test.each([
                { value: -1234, result: '-1.23K' },
                { value: -1234, result: '-1,23K', locale: 'de' },
                { value: -0.005, result: '-0.01' },
                { value: -0.0012, result: '-0.00' },
                { value: 0, result: '0' },
                { value: 0.0012, result: '0.00' },
                { value: 0.005, result: '0.01' },
                { value: 0.0123456789012345678, result: '0.01' },
                { value: 0.12345678901234567, result: '0.12' },
                { value: 123.4567, result: '123.46' },
                { value: 1234, result: '1.23K' },
                { value: 1234.5678, result: '1.23K' },
                { value: 1234567.8901, result: '1.23M' },
                { value: 1234567890.1234, result: '1.23B' },
                { value: 1234567890123.4567, result: '1.23T' },
                { value: 1234567890123456.789, result: '1.23 x 10^15' },
            ])('formats $value as $result using short format', ({ value, result, locale }) => {
                setLocale({ number: locale });
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.TOKEN_AMOUNT_SHORT })).toEqual(result);
            });
        });

        describe('token prices', () => {
            test.each([
                { value: -1234.56789, result: '-$1,234.57' },
                { value: -1234.56789, result: '-1.234,57 $', locale: 'de' },
                { value: -0.0012345678, result: '-$0.001235' },
                { value: 0, result: 'Unknown' },
                { value: 0.0012345678, result: '$0.001235' },
                { value: 0.0012345678, result: '+$0.001235', withSign: true },
                { value: 0.012345678, result: '$0.01235' },
                { value: 0.12345678, result: '$0.1235' },
                { value: 123.45678, result: '$123.46' },
                { value: 1234.56789, result: '$1,234.57' },
                { value: 1234.56789, result: '+$1,234.57', withSign: true },
                { value: 1234567.89012, result: '$1,234,567.89' },
                { value: 1234567890.12345, result: '$1,234,567,890.12' },
                { value: 1234567890123.45678, result: '$1,234,567,890,123.46' },
                { value: 1234567890123456.78901, result: '$1,234,567,890,123,456.80' },
            ])('formats $value as $result using token format', ({ value, result, locale, ...options }) => {
                setLocale({ number: locale });
                expect(formatterUtils.formatNumber(value, { format: NumberFormat.TOKEN_PRICE, ...options })).toEqual(
                    result,
                );
            });
        });

        describe('percentages', () => {
            test.each([
                { value: -1, result: '-100.00%' },
                { value: -1, result: '-100,00%', locale: 'it' },
                { value: -0.999001, result: '-99.90%' },
                { value: -0.00012345, result: '-0.01%' },
                { value: 0, result: '0.00%' },
                { value: 0, result: '0.00%', withSign: true },
                { value: 0.00012345, result: '0.01%' },
                { value: 0.0012345, result: '0.12%' },
                { value: 0.012345, result: '1.23%' },
                { value: 0.12345, result: '12.35%' },
                { value: 0.12345, result: '+12.35%', withSign: true },
                { value: 0.510001, result: '51.00%' },
                { value: 0.9985, result: '99.85%' },
                { value: 0.999001, result: '99.90%' },
                { value: 1, result: '100.00%' },
            ])('formats $value as $result using long format', ({ value, result, locale, ...options }) => {
                setLocale({ number: locale });
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.PERCENTAGE_LONG, ...options }),
                ).toEqual(result);
            });

            test.each([
                { value: -0.999001, result: '-99.9%' },
                { value: -0.999001, result: '-99,9%', locale: 'it' },
                { value: -0.12345, result: '-12.3%' },
                { value: -0.00012345, result: '-0%' },
                { value: 0, result: '0%' },
                { value: 0.00012345, result: '0%' },
                { value: 0.00012345, result: '+0%', withSign: true },
                { value: 0.0012345, result: '0.1%' },
                { value: 0.012345, result: '1.2%' },
                { value: 0.12345, result: '12.3%' },
                { value: 0.12345, result: '+12.3%', withSign: true },
                { value: 0.510001, result: '51%' },
                { value: 0.9985, result: '99.9%' },
                { value: 0.999001, result: '99.9%' },
                { value: 0.999001, result: '+99.9%', withSign: true },
                { value: 1, result: '100%' },
            ])('formats $value as $result using short format', ({ value, result, locale, ...options }) => {
                setLocale({ number: locale });
                expect(
                    formatterUtils.formatNumber(value, { format: NumberFormat.PERCENTAGE_SHORT, ...options }),
                ).toEqual(result);
            });
        });
    });

    describe('date formatting', () => {
        describe('date parsing', () => {
            it('supports dates in DateTime format', () => {
                const date = DateTime.fromISO('2016-05-25T09:08:34.123');
                expect(formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME })).toEqual(
                    'May 25, 2016 at 09:08',
                );
            });

            it('supports dates in ISO format', () => {
                const date = '2020-07-20T02:04:33';
                expect(formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME })).toEqual(
                    'July 20, 2020 at 02:04',
                );
            });

            it('supports dates in milliseconds format', () => {
                const date = 1613984914000;
                expect(formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME })).toEqual(
                    'February 22, 2021 at 09:08',
                );
            });

            it('returns null when date is not defined', () => {
                expect(formatterUtils.formatDate(undefined, { format: DateFormat.YEAR_MONTH_DAY_TIME })).toBeNull();
            });
        });

        describe('YEAR_MONTH_DAY_TIME format', () => {
            test.each([
                { value: '2009-01-02T10:10:41', result: 'January 2, 2009 at 10:10' },
                { value: '2009-01-02T10:10:41', result: '2 gennaio 2009 alle ore 10:10', locale: 'it' },
                { value: '2024-10-23T15:33:12', result: 'October 23, 2024 at 15:33', now: '2022-10-23T15:33:12' },
                { value: '2024-10-23T15:10:00', result: 'today at 15:10', now: '2024-10-23T15:33:12' },
                { value: '2024-10-22T00:10:12', result: 'yesterday at 00:10', now: '2024-10-23T15:33:12' },
                { value: '2024-10-24T23:59:59', result: 'tomorrow at 23:59', now: '2024-10-23T15:33:12' },
                { value: '2024-10-25T00:00:00', result: 'October 25, 2024 at 00:00', now: '2024-10-23T15:33:12' },
            ])(
                'formats $value as $result using YEAR_MONTH_DAY_TIME format (now: $now)',
                ({ now, value, result, locale }) => {
                    setLocale({ date: locale });
                    setTime(now);
                    expect(formatterUtils.formatDate(value, { format: DateFormat.YEAR_MONTH_DAY_TIME })).toEqual(
                        result,
                    );
                },
            );
        });

        describe('YEAR_MONTH_DAY format', () => {
            test.each([
                { value: '2023-06-17T13:21:24', result: 'June 17, 2023' },
                { value: '2023-06-17T13:21:24', result: '17 giugno 2023', locale: 'it' },
                { value: '2018-01-01T10:11:12', result: 'January 1, 2018' },
                { value: '2001-05-21T20:10:52', result: 'tomorrow', now: '2001-05-20T05:05:00' },
                { value: '2001-05-20T23:55:59', result: 'today', now: '2001-05-20T05:05:00' },
                { value: '2001-05-21T00:00:05', result: 'tomorrow', now: '2001-05-20T05:05:00' },
                { value: '2001-05-19T22:05:01', result: 'yesterday', now: '2001-05-20T05:05:00' },
                { value: '2001-05-18T23:05:01', result: 'May 18, 2001', now: '2001-05-20T05:05:00' },
                { value: '2001-05-22T00:00:01', result: 'May 22, 2001', now: '2001-05-20T05:05:00' },
            ])(
                'formats $value as $result using YEAR_MONTH_DAY format (now: $now)',
                ({ now, value, result, locale }) => {
                    setLocale({ date: locale });
                    setTime(now);
                    expect(formatterUtils.formatDate(value, { format: DateFormat.YEAR_MONTH_DAY })).toEqual(result);
                },
            );
        });

        describe('YEAR_MONTH format', () => {
            test.each([
                { value: '2024-08-11T11:11:00', result: 'August 2024' },
                { value: '2024-08-11T11:11:00', result: 'agosto 2024', locale: 'it' },
                { value: '2012-10-01T10:01:10', result: 'October 2012' },
                { value: '2027-01-01T09:05:10', result: 'January 2027', now: '2027-01-01T09:05:10' },
            ])('formats $value as $result using YEAR_MONTH format (now: $now)', ({ value, result, now, locale }) => {
                setLocale({ date: locale });
                setTime(now);
                expect(formatterUtils.formatDate(value, { format: DateFormat.YEAR_MONTH })).toEqual(result);
            });
        });

        describe('DURATION format', () => {
            test.each([
                { value: '2000-02-10T11:11:48', result: '7 seconds', now: '2000-02-10T11:11:55' },
                { value: '2000-02-10T11:11:48', result: '7 secondi', now: '2000-02-10T11:11:55', locale: 'it' },
                { value: '2000-02-10T11:11:48', result: '0 seconds', now: '2000-02-10T11:11:48' },
                { value: '2000-02-10T11:11:45', result: '1 second', now: '2000-02-10T11:11:44' },
                { value: '2000-02-10T11:12:59', result: '1 minute', now: '2000-02-10T11:11:10' },
                { value: '2000-02-10T12:10:55', result: '59 minutes', now: '2000-02-10T11:11:55' },
                { value: '2000-02-10T12:11:56', result: '1 hour', now: '2000-02-10T11:11:55' },
                { value: '2000-02-11T09:11:56', result: '22 hours', now: '2000-02-10T11:11:55' },
                { value: '2000-02-11T23:55:01', result: '1 day', now: '2000-02-10T11:11:55' },
                { value: '2001-04-02T11:41:11', result: '30 days', now: '2001-03-03T11:41:11' },
                { value: '2001-04-05T20:26:00', result: '1 month', now: '2001-03-03T11:41:11' },
                { value: '2002-03-03T22:12:08', result: '11 months', now: '2001-03-03T22:12:09' },
                { value: '2002-03-03T22:12:09', result: '1 year', now: '2001-03-03T22:12:09' },
                { value: '2024-06-25T22:12:09', result: '31 years', now: '1993-06-19T08:10:10' },
            ])('formats $value as $result using DURATION format (now: $now)', ({ value, result, now, locale }) => {
                setLocale({ date: locale });
                setTime(now);
                expect(formatterUtils.formatDate(value, { format: DateFormat.DURATION })).toEqual(result);
            });
        });

        describe('RELATIVE format', () => {
            test.each([
                { value: '2020-02-09T20:17:41', result: '18 hours ago', now: '2020-02-10T14:39:51' },
                { value: '2020-02-09T20:17:41', result: '18 ore fa', now: '2020-02-10T14:39:51', locale: 'it' },
                { value: '2020-02-10T13:25:42', result: '1 hour ago', now: '2020-02-10T14:39:51' },
                { value: '2020-02-10T13:58:44', result: '41 minutes ago', now: '2020-02-10T14:39:51' },
                { value: '2020-02-10T14:39:49', result: '2 seconds ago', now: '2020-02-10T14:39:51' },
                { value: '2020-02-10T14:39:51', result: 'in 0 seconds', now: '2020-02-10T14:39:51' },
                { value: '2004-10-25T20:21:33', result: 'in 10 seconds', now: '2004-10-25T20:21:23' },
                { value: '2004-10-26T20:21:22', result: 'in 23 hours', now: '2004-10-25T20:21:23' },
                { value: '2004-10-26T20:21:23', result: 'in 1 day', now: '2004-10-25T20:21:23' },
                { value: '2004-11-24T20:21:23', result: 'in 30 days', now: '2004-10-25T20:21:23' },
                { value: '2004-11-29T12:12:41', result: 'in 1 month', now: '2004-10-25T20:21:23' },
                { value: '2011-10-10T11:01:00', result: 'in 1 year', now: '2010-04-10T11:01:00' },
                { value: '2019-11-20T11:01:00', result: 'in 9 years', now: '2010-04-10T11:01:00' },
            ])('formats $value as $result using RELATIVE format (now: $now)', ({ value, result, now, locale }) => {
                setLocale({ date: locale });
                setTime(now);
                expect(formatterUtils.formatDate(value, { format: DateFormat.RELATIVE })).toEqual(result);
            });
        });
    });
});
