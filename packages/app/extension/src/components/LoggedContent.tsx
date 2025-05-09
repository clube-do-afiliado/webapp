import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import type { Site } from '@cda/services/sites';
import type { UserData } from '@cda/services/user';

interface LoggedContentProps { user: UserData; site: Site; onGetProduct: () => void; }
export default function LoggedContent({
    user,
    site,
    onGetProduct
}: LoggedContentProps) {
    return (
        <Stack justifyContent="space-between" style={{ minHeight: 350 }}>
            <Stack spacing="small">
                <Stack orientation="row" spacing="small" alignItems="baseline">
                    <Typography noMargin variant="body1">
                        Olá,
                    </Typography>
                    <Typography noMargin variant="subtitle2">
                        {user.name}
                    </Typography>
                </Stack>
                <Card>
                    <CardContent>
                        <Stack orientation="row" spacing="small" alignItems="center">
                            <Avatar src={site.theme.logo} />
                            <Typography noMargin variant="body1">
                                {site.information.name}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
            <Button
                color="secondary"
                startIcon={<Icon name="save" />}
                onClick={onGetProduct}
            >
                Salvar produto
            </Button>
        </Stack>
    );
}