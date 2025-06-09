import { useCallback, useMemo, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import Chip from '@cda/ui/components/Chip';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { useTheme } from '@cda/ui/theme';
import { Card } from '@cda/ui/components/Card';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Tab, Tabs, useTabs } from '@cda/ui/components/Tabs';

import { maskCurrency } from '@cda/toolkit/mask';

import { MAP_PERMISSION } from '@cda/services/permissions';

import { usePlans } from '@cda/common/Plans';

import PlanCard from './components/PlanCard';
import PlanPermissionItem from './components/PlanPermissionItem';

type Period = 'monthly' | 'annually';

export default function Plans() {
    const { theme: { palette } } = useTheme();
    const { current } = useTabs(0);

    const { plans } = usePlans();

    const [period, setPeriod] = useState<Period>('monthly');

    const DISCOUNT_PERCENTAGE = 0.7;

    const { beta, standard } = useMemo(() => ({
        beta: plans.find(p => p.id === 'beta'),
        standard: plans.find(p => p.id === 'basico'),
    }), [plans]);

    const handleChange = () => {
        setPeriod(prev => prev === 'annually' ? 'monthly' : 'annually');
    };

    const getPrice = useCallback((value: number) => {
        return period === 'annually'
            ? (value * 12) * DISCOUNT_PERCENTAGE
            : value;
    }, [period]);

    return (
        <Page>
            <Stack>
                <Stack alignItems="flex-start">
                    <Stack alignItems="flex-start" spacing="small">
                        <Chip label="Beta" color="primary" variant="outlined" icon={<Icon name="flask" />} />
                        <Typography variant="h6">
                            Comece agora com 15 dias grátis
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" style={{ fontWeight: 300 }}>
                            Teste todos os recursos da plataforma sem pagar nada por 15 dias.
                            Basta assinar com seu cartão de crédito
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" style={{ fontWeight: 300 }}>
                            Você só será cobrado após o período de avaliação.
                        </Typography>
                        <Stack orientation="row" justifyContent="center">
                            <Stack alignItems="center">
                                <Typography color="primary.main">
                                    {/* eslint-disable-next-line */}
                                    Economize {((1 - DISCOUNT_PERCENTAGE) * 100).toFixed(0)}% <span style={{ color: palette.text.secondary }}>
                                        com plano anual
                                    </span>
                                </Typography>
                                <Card sx={{ p: 1 }}>
                                    <Tabs variant="rounded" current={current} onChange={handleChange}>
                                        <Tab label="Mensal" style={{ width: 200, height: 40 }} />
                                        <Tab label="Anual" style={{ width: 200, height: 40 }} />
                                    </Tabs>
                                </Card>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Grid xl={6} lg={6} md={6} sm={12}>
                        {
                            beta && standard && (
                                <GridItem>
                                    <PlanCard
                                        highlight
                                        name="Beta"
                                        description={`
                                            Aproveite para testar tudo e, se quiser garantir ainda mais vantagens,
                                            futuramente você pode fazer upgrade para planos superiores.
                                        `}
                                        value={
                                            <Stack nogap>
                                                {
                                                    period === 'annually' && (
                                                        <Typography color="primary.contrastText">
                                                            {maskCurrency(beta.price * DISCOUNT_PERCENTAGE)}/mês
                                                        </Typography>
                                                    )
                                                }
                                                <Typography variant="h4" color="primary.contrastText">
                                                    {maskCurrency(getPrice(beta.price))}
                                                </Typography>
                                            </Stack>
                                        }
                                        chip={
                                            <Chip
                                                size="small"
                                                label={`${((1 - (beta.price / standard.price)) * 100).toFixed(0)}% off`}
                                                icon={<span>🔥</span>}
                                                sx={{ background: ({ primary }) => primary.contrastText }}
                                                style={{ fontWeight: 600 }}
                                            />
                                        }
                                        permissions={
                                            beta.permissions.map(permission => (
                                                <PlanPermissionItem
                                                    highlight
                                                    key={permission}
                                                    message={MAP_PERMISSION[permission]}
                                                />
                                            ))
                                        }
                                        button={
                                            <Button
                                                fullWidth
                                                startIcon={
                                                    <Icon name="rocket" sx={{ color: ({ primary }) => primary.main }} />
                                                }
                                                sx={{
                                                    color: ({ primary }) => primary.main,
                                                    background: ({ primary }) => primary.contrastText,
                                                }}
                                            >
                                                Começar
                                            </Button>
                                        }
                                    />
                                </GridItem>
                            )
                        }
                        {
                            standard && (
                                <GridItem>
                                    <PlanCard
                                        name="Básico"
                                        description="Lançamento em 01/11/2025"
                                        value={
                                            <Stack nogap>
                                                {
                                                    period === 'annually' && (
                                                        <Typography color="text.secondary">
                                                            {maskCurrency(standard.price * DISCOUNT_PERCENTAGE)}/mês
                                                        </Typography>
                                                    )
                                                }
                                                <Typography variant="h4" color="text.secondary">
                                                    {maskCurrency(getPrice(standard.price))}
                                                </Typography>
                                            </Stack>
                                        }
                                        chip={
                                            <Chip
                                                size="small"
                                                label="Em breve"
                                                icon={<Icon name="calendar-alt" />}
                                                sx={{ background: ({ primary }) => primary.contrastText }}
                                                style={{ fontWeight: 600 }}
                                            />
                                        }
                                        permissions={
                                            standard.permissions.map(permission => (
                                                <PlanPermissionItem
                                                    key={permission}
                                                    message={MAP_PERMISSION[permission]}
                                                />
                                            ))
                                        }
                                        button={
                                            <Button fullWidth disabled>
                                                Em breve
                                            </Button>
                                        }
                                    />
                                </GridItem>
                            )
                        }
                    </Grid>
                </Stack>
            </Stack>
        </Page>
    );
}