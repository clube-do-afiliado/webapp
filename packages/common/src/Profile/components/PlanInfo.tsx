import Chip from '@cda/ui/components/Chip';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';

import { getFilledArray } from '@cda/toolkit/array';

export default function PlanInfo() {
    return (
        <Card>
            <CardContent>
                <Stack>
                    <Stack spacing="small" orientation="row" alignItems="center">
                        <Avatar
                            icon={<Icon name="fire" />}
                            sx={{ backgroundColor: ({ primary }) => primary.opacity }}
                            style={{ border: 'none' }}
                        />
                        <Typography variant="h6">
                            Plano de assinatura
                        </Typography>
                    </Stack>
                    <Card
                        sx={{
                            background: ({ background }) => background.paper,
                            borderRadius: ({ radius }) => radius
                        }}
                    >
                        <CardContent>
                            <Stack orientation="row" alignItems="center">
                                <Stack spacing="small">
                                    <Typography variant="body1" style={{ fontWeight: 600 }}>
                                        Plano free
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cobrança mensal • Próximo pagamento: 15/06/2023
                                    </Typography>
                                </Stack>
                                <Chip label="Ativo" color="success" />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Stack>
                        <Typography style={{ fontWeight: 600 }}>
                            Benefícios do Plano
                        </Typography>
                        <Grid xl={6} lg={6} md={6} sm={12}>
                            {
                                getFilledArray(4).map(i => (
                                    <GridItem key={i}>
                                        <Stack spacing="small" orientation="row" alignItems="center">
                                            <Icon name="check-circle" color="success.main" />
                                            <Typography variant="body2">Projetos ilimitados</Typography>
                                        </Stack>
                                    </GridItem>
                                ))
                            }
                        </Grid>
                        <Stack orientation="row">
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Icon name="bill" />}
                            >
                                Detalhes da cobrança
                            </Button>
                            <Button
                                fullWidth
                                startIcon={<Icon name="sync" />}
                            >
                                Alterar plano
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}