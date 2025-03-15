import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import { Plan } from '@cda/services/plans';

import Dot from './Dot';

interface CardIntegrationProps { plan: Plan; onClick: (plan: Plan) => void; }
export default function CardIntegration({ plan, onClick }: CardIntegrationProps) {
    return (
        <Card onClick={onClick}>
            <CardContent>
                <Stack orientation="row" alignItems="center" spacing="small">
                    <Dot color={plan?.color || ''} />
                    <Typography noMargin variant="h6">{plan.name}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}