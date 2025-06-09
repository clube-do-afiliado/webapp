import { useMemo } from 'react';
import Chart, { type Props } from 'react-apexcharts';

import Stack from '@cda/ui/components/Stack';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import { subMonths } from '@cda/toolkit/date';
import { getFilledArray } from '@cda/toolkit/array';

import { SOURCE_MAP, type EventData, type EventSource } from '@cda/services/events';

import { type Interval, INTERVAL, INTERVAL_MAP } from '@/utils/interval';

const MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

type ChartData<M extends string = string> = {
    months: Array<M>;
    events: Partial<{
        [S in EventSource]: Partial<{
            [X in M]: Array<EventData>;
        }>;
    }>;
}

function getTotalEvents(data: ChartData, source: EventSource) {
    return data.months.map(m => {
        const sourceEvents = data.events[source];

        if (!sourceEvents || !sourceEvents[m]) { return 0; };

        return sourceEvents[m].length;
    });
}

interface ResourcerChartProps {
    title: string;
    loading: boolean;
    events: EventData[];
    interval: Interval;
}
export default function ResourcerChart({ title, events, interval, loading }: ResourcerChartProps) {
    const mappedInterval = INTERVAL.find(i => i === interval) as Interval;
    const reference = INTERVAL_MAP[mappedInterval];

    const months = getFilledArray(reference)
        .reverse()
        .map((i) => MONTHS[subMonths(new Date(), i).getMonth()]);

    const data = useMemo(() => {
        return events.reduce<ChartData>((acc, event) => {
            const month = MONTHS[event.createdAt.toDate().getMonth()];
            const source = event.utmSource;

            if (!acc.months.length) { acc.months = months; }
            if (!acc.events[source]) {
                acc.events[source] = months.reduce((acc, month) => {
                    acc[month] = [];
                    return acc;
                }, {});
            }

            acc.events[source]?.[month]?.push(event);

            return acc;
        }, { months: [], events: {} });
    }, [events]);

    const state: Props = useMemo(() => ({
        series: [
            {
                name: 'Whatsapp',
                data: getTotalEvents(data, 'whatsapp')
            },
            {
                name: 'Instagram',
                data: getTotalEvents(data, 'instagram')
            },
            {
                name: 'Telegram',
                data: getTotalEvents(data, 'telegram')
            },
            {
                name: 'Facebook',
                data: getTotalEvents(data, 'facebook')
            },
            {
                name: 'Youtube',
                data: getTotalEvents(data, 'youtube')
            },
            {
                name: 'Outros',
                data: getTotalEvents(data, 'others')
            }
        ],
        options: {
            tooltip: {
                enabled: false,
            },
            chart: {
                id: title,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    hideZeroBarsWhenGrouped: true,
                    horizontal: false,
                    borderRadius: 5,
                },
            },
            colors: [
                SOURCE_MAP.whatsapp.color,
                SOURCE_MAP.instagram.color,
                SOURCE_MAP.telegram.color,
                SOURCE_MAP.facebook.color,
                SOURCE_MAP.youtube.color,
                SOURCE_MAP.others.color
            ],
            xaxis: {
                categories: data.months
            },
        }
    }), [events]);

    return (
        <Card style={{ minHeight: 315, height: 315 }}>
            <CardContent style={{ height: '100%' }}>
                <Typography
                    noMargin
                    variant="subtitle1"
                    textAlign="center"
                >
                    {title}
                </Typography>
                {
                    !loading && (
                        <Chart
                            options={state.options}
                            series={state.series}
                            height={250}
                            type="bar"
                        />
                    )
                }
                {
                    loading && (
                        <Stack justifyContent="center" alignItems="center" style={{ height: '80%' }}>
                            <Loading size={30} />
                        </Stack>
                    )
                }
            </CardContent>
        </Card>
    );
}