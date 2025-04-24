import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import { Site } from '@cda/services/sites';

interface CardIntegrationProps { site: Site; onClick: (site: Site) => void; }
export default function StoreCard({ site, onClick }: CardIntegrationProps) {
    return (
        <Card onClick={() => onClick(site)}>
            <CardContent>
                <Stack orientation="row" alignItems="center" spacing="small">
                    <Avatar src={site.theme.logo} />
                    <Stack spacing="small">
                        <Typography noMargin variant="body1">{site.information.name}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}