import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Colors } from '@cda/ui/theme';
import Chip from '@cda/ui/components/Chip';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';
import Alert from '@cda/ui/components/Alert';

import { formatDate } from '@cda/toolkit/date';

import { MAP_PERMISSION } from '@cda/services/permissions';
import type { UserData } from '@cda/services/user';
import type { Signature, SignatureStatus } from '@cda/services/signatures';

import { usePlans } from '@cda/common/Plans';

const MAP_SIGNATURE_STATUS: { [x in SignatureStatus]: { label: string; color: Colors; icon: string; } } = {
    active: { label: 'Ativo', color: 'success', icon: 'star' },
    expired: { label: 'Expirado', color: 'warning', icon: 'exclamation-triangle' },
    inactive: { label: 'Inativo', color: 'error', icon: 'exclamation-octagon' },
};

interface PlanInfoProps {
    user: UserData;
    signature: Signature;
}
export default function PlanInfo({ user, signature }: PlanInfoProps) {
    const navigate = useNavigate();

    const { plans } = usePlans();

    const plan = useMemo(() => {
        return plans.find((plan) => user.plans.includes(plan.id));
    }, []);

    const goToPlans = () => { navigate('/plans'); };

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
                    {
                        signature.status === 'expired' && (
                            <Alert
                                fullWidth
                                variant="opacity"
                                color="warning"
                                icon={<Icon name="exclamation-triangle" />}
                            >
                                Seu plano expirou. Renove para continuar usando todos os recursos da plataforma.
                            </Alert>
                        )
                    }
                    {
                        signature.status === 'inactive' && (
                            <Alert
                                fullWidth
                                variant="opacity"
                                color="error"
                                icon={<Icon name="exclamation-octagon" />}
                            >
                                Seu plano está inativo. Ative-o para liberar todas as funcionalidades da plataforma.
                            </Alert>
                        )
                    }
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
                                        Plano {plan?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cobrança mensal • Contratado em: {
                                            formatDate(signature.updatedAt.toDate(), {
                                                separator: '/'
                                            })
                                        }
                                    </Typography>
                                </Stack>
                                <Chip
                                    label={MAP_SIGNATURE_STATUS[signature.status].label}
                                    color={MAP_SIGNATURE_STATUS[signature.status].color}
                                    icon={<Icon name={MAP_SIGNATURE_STATUS[signature.status].icon} />}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Stack>
                        <Typography style={{ fontWeight: 600 }}>
                            Benefícios do Plano
                        </Typography>
                        <Grid xl={6} lg={6} md={6} sm={12}>
                            {
                                plan?.permissions.map(i => (
                                    <GridItem key={i}>
                                        <Stack spacing="small" orientation="row" alignItems="center">
                                            <Icon name="check-circle" color="success.main" />
                                            <Typography variant="body2">
                                                {MAP_PERMISSION[i]}
                                            </Typography>
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
                                onClick={goToPlans}
                            >
                                {signature.status === 'active' && 'Alterar plano'}
                                {signature.status === 'expired' && 'Renovar agora'}
                                {signature.status === 'inactive' && 'Ativar plano'}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}