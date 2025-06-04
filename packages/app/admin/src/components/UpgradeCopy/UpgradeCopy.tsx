import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

export default function UpgradeCopy() {
    return (
        <Card sx={{ background: ({ primary }) => primary.main }}>
            <CardContent>
                <Stack orientation="row" alignItems="center">
                    <Avatar
                        icon={<Icon name="rocket" />}
                        sx={{ backgroundColor: ({ background }) => background.default }}
                    />
                    <Stack spacing="small">
                        <Typography noMargin variant="h5" color="background.default">
                            Desbloqueie todo o potencial!
                        </Typography>
                        <Typography noMargin variant="body2" color="primary.contrastText">
                            Atualize para o plano premium e aproveite recursos
                            exclusivos que vão turbinar sua experiência.
                        </Typography>
                    </Stack>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: ({ background }) => background.default,
                            color: ({ background }) => background.default,
                        }}
                        style={{ width: 280, minWidth: 280 }}
                    >
                        Conhecer o plano premium
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}