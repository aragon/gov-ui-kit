import { DateTime, Interval } from 'luxon';

export const useAdvanceable = (minAdvance?: string | number, maxAdvance?: string | number) => {
    const now = DateTime.now();

    const parseDate = (input?: string | number) =>
        !input
            ? DateTime.invalid('no input')
            : typeof input === 'string'
              ? DateTime.fromISO(input)
              : DateTime.fromMillis(input);

    const minAdvanceDate = parseDate(minAdvance);
    const maxAdvanceDate = parseDate(maxAdvance);

    const advanceWindow =
        minAdvanceDate.isValid && maxAdvanceDate.isValid
            ? Interval.fromDateTimes(minAdvanceDate, maxAdvanceDate)
            : undefined;

    const isAdvanceableNow = advanceWindow?.contains(now) ?? false;

    const nextAdvanceDateTime =
        now < minAdvanceDate ? minAdvanceDate : now <= maxAdvanceDate ? maxAdvanceDate : undefined;

    const isShortAdvanceWindow =
        nextAdvanceDateTime?.isValid === true && nextAdvanceDateTime.diff(now, 'days').days <= 90;

    return { isAdvanceableNow, nextAdvanceDateTime, isShortAdvanceWindow };
};
