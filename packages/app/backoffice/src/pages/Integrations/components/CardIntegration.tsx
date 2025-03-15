import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import { Integration } from '@cda/services/integrations';

interface CardIntegrationProps { integration: Integration; onClick: (integration: Integration) => void; }
export default function CardIntegration({ integration, onClick }: CardIntegrationProps) {
    return (
        <Card onClick={onClick}>
            <CardContent>
                <Stack orientation="row" alignItems="center">
                    <Avatar src={integration.image} />
                    <Typography noMargin variant="h6">{integration.name}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}