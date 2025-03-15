import { useMemo } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import type { Integration } from '@cda/services/integrations';

import { PlanChip, usePlans } from '@cda/common/Plans';

interface StoreCardProps { integration: Integration; allowed: boolean; }
export default function StoreCard({ integration, allowed }: StoreCardProps) {
    const { name, image } = integration;

    const { plans } = usePlans();

    const plan = useMemo(() => plans.find(p => p.id === integration?.plan), [integration]);

    return (
        <Card>
            <CardContent>
                <Stack>
                    <Stack orientation="row" spacing="small" alignItems="center">
                        <Stack orientation="row" spacing="small" alignItems="center">
                            <Avatar src={image} />
                            <Typography noMargin>{name}</Typography>
                        </Stack>
                        {plan && <PlanChip {...plan} />}
                    </Stack>
                    <Button
                        disabled={!allowed}
                        color="secondary"
                        startIcon={
                            <Icon name="cog" />
                        }
                    >
                        Configurar
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}