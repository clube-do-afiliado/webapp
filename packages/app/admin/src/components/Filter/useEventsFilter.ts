import { FormControl, useForm } from '@cda/ui/components/Form';

import { subMonths } from '@cda/toolkit/date';

import type { EventFilter } from '@cda/services/events';

import { FormFilter, Interval, INTERVAL_MAP } from '@/utils/interval';

export default function useEventsFilter(onSearch: (options: EventFilter) => void) {
    const getFinalDate = (date: Date, interval: Interval) => {
        return subMonths(date, INTERVAL_MAP[interval]);
    };

    const [formGroup] = useForm<FormFilter>({
        form: {
            interval: new FormControl({ defaultValue: 'last30days' }),
            unique: new FormControl({ defaultValue: false })
        },
        handle: {
            change: ({ values }) => {
                const endDate = new Date();
                const startDate = getFinalDate(endDate, values.interval);
                const { unique } = values;

                onSearch({ startDate, endDate, unique });
            }
        }
    }, []);

    return formGroup;
}