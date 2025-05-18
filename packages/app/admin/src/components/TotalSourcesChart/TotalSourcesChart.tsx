import { useMemo } from 'react';
import Chart, { type Props } from 'react-apexcharts';

import Box from '@cda/ui/components/Box';
import Stack from '@cda/ui/components/Stack';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import { SOURCE_MAP, type EventData, type EventSource } from '@cda/services/events';

type ChartData = Partial<{
    [S in EventSource]: {
        label: string;
        value: number;
    };
}>;

interface TotalSourcesChartProps {
    title: string;
    loading: boolean;
    events: EventData[];
}
export default function TotalSourcesChart({ title, events, loading }: TotalSourcesChartProps) {
    const data = useMemo(() => {
        return events.reduce<ChartData>((acc, event) => {
            const source = event.utmSource;
            const label = SOURCE_MAP[source].label;

            if (!acc[source]) {
                acc[source] = { label, value: 0 };
            }

            acc[source].value += 1;

            return acc;
        }, {});
    }, [events]);

    const state: Props = useMemo(() => ({
        chart: {
            id: 'visualization',
            toolbar: {
                show: false,
            },
        },
        series: Object.values(data).map(eventData => eventData.value),
        options: {
            chart: {
                type: 'donut',
            },
            legend: {
                position: 'bottom'
            },
            colors: Object.keys(data).map((key) => SOURCE_MAP[key as EventSource].color),
            labels: Object.keys(data).map((key) => SOURCE_MAP[key as EventSource].label),
        },
    }), [data]);

    return (
        <Card style={{ height: '100%' }}>
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
                        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                            <Chart
                                options={state.options}
                                series={state.series}
                                height={250}
                                type="pie"
                            />
                        </Box>
                    )
                }
                {
                    loading && (
                        <Stack justifyContent="center" alignItems="center" style={{ height: 200 }}>
                            <Loading size={30} />
                        </Stack>
                    )
                }
            </CardContent>
        </Card>
    );
}
