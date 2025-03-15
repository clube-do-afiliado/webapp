import { useEffect, useState } from 'react';

import Stack from '@cda/ui/components/Stack';
import Switch from '@cda/ui/components/Switch';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import { usePlans } from '@cda/common/Plans';

interface PlansListProps { onChange?: (data: string[]) => void; value: string[] }
export default function PlansList({ value, onChange }: PlansListProps) {
    const [data, setData] = useState<string[]>(value);

    const { plans, loading, getPlans } = usePlans();

    useEffect(() => { getPlans(); }, []);

    useEffect(() => { if (onChange) { onChange(data); } }, [data]);

    const handleSelectPermission = (plan: string) => {
        const shouldRemove = data.includes(plan);

        if (shouldRemove) {
            setData(prev => prev.filter(p => p !== plan));
        } else {
            setData(prev => [...prev, plan]);
        }
    };

    return (
        <>
            {
                loading && (
                    <div>carregando...</div>
                )
            }
            {
                !loading && (
                    <Grid xl={4} lg={6} md={6} sm={12} gap={0}>
                        {
                            plans.map((plan) => (
                                <GridItem key={plan.id}>
                                    <Stack orientation="row" alignItems="center">
                                        <Switch
                                            checked={data.includes(plan.id)}
                                            onChange={() => handleSelectPermission(plan.id)}
                                        />
                                        <Typography variant="body2" color="text.secondary">{plan.name}</Typography>
                                    </Stack>
                                </GridItem>
                            ))
                        }
                    </Grid>
                )
            }
        </>
    );
};