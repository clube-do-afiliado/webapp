import Chip from '@cda/ui/components/Chip';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Container from '@cda/ui/components/Container';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import PlanItem from '../PlanItem';

export default function LaunchDiscount() {
    return (
        <Stack
            tag="section"
            sx={{ py: 8, backgroundColor: ({ text }) => text.primary }}
        >
            <Stack nogap justifyContent="center" alignItems="center" textAlign="center">
                <Typography
                    noMargin
                    variant="subtitle1"
                    color="primary.contrastText"
                    style={{ textTransform: 'uppercase' }}
                >
                    Oferta por Tempo Limitado
                </Typography>
                <Typography
                    noMargin
                    variant="h4"
                    weight="bold"
                    color="secondary.main"
                >
                    Desconto de Lançamento
                </Typography>
                <Typography
                    noMargin
                    variant="h6"
                    color="primary.contrastText"
                    style={{ maxWidth: '42rem' }}
                >
                    Cadastre-se agora e garanta 50% de desconto nos primeiros 3 meses!
                </Typography>
            </Stack>
            <Container display="flex" justifyContent="center" alignItems="center">
                <Card style={{ margin: 'auto' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Stack>
                            <Stack orientation="row" justifyContent="space-between" alignItems="center">
                                <Stack nogap>
                                    <Typography noMargin variant="h5">Plano Beta</Typography>
                                    <Typography noMargin variant="subtitle2" weight="light" color="text.secondary">
                                        Tudo que você precisa para escalar seus negócios de afiliados
                                    </Typography>
                                </Stack>
                                <Chip
                                    label="50% OFF"
                                    color="primary"
                                    size="large"
                                    style={{ fontWeight: 700 }}
                                />
                            </Stack>
                            <Stack nogap orientation="row" alignItems="baseline">
                                <Typography noMargin variant="h3" weight="bold">R$30</Typography>
                                <Stack orientation="row" alignItems="baseline">
                                    <Typography noMargin color="text.secondary">/mês</Typography>
                                    <Typography noMargin color="text.disabled">
                                        <s>
                                            R$60/mês
                                        </s>
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack>
                                <PlanItem />
                                <PlanItem />
                                <PlanItem />
                                <PlanItem />
                                <PlanItem />
                            </Stack>
                            <Button fullWidth color="secondary" size="large">
                                Comece agora com 50% OFF
                            </Button>
                            <Typography noMargin variant="body2" textAlign="center" color="text.secondary">
                                Oferta válida até 30/06/2025
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Stack>
    );
}