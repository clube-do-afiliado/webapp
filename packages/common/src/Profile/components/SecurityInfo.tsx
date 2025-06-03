import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

export default function SecurityInfo() {
    return (
        <Card>
            <CardContent>
                <Stack>
                    <Stack spacing="small" orientation="row" alignItems="center">
                        <Avatar
                            icon={<Icon name="shield" color="warning.main" />}
                            sx={{ backgroundColor: ({ warning }) => warning.opacity }}
                            style={{ border: 'none' }}
                        />
                        <Typography variant="h6">
                            Segurança
                        </Typography>
                    </Stack>
                    <Card>
                        <CardContent>
                            <Stack spacing="small" orientation="row" justifyContent="space-between" alignItems="center">
                                <Typography>Senha</Typography>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    startIcon={<Icon name="key-skeleton-alt" />}
                                >
                                    Alterar senha
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </CardContent>
        </Card>
    );
}