import { useMemo, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import { debounce } from '@cda/ui/utils';
import { useFilter } from '@cda/ui/hooks';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import Slide from '@cda/ui/animations/Slide';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import { useModal } from '@cda/ui/components/Modal';
import { useDrawer } from '@cda/ui/components/Drawer';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Form, Control, FormControl, useForm } from '@cda/ui/components/Form';

import { slug } from '@cda/toolkit/string';
import { orderByIndex } from '@cda/toolkit/array';

import { Plan } from '@cda/services/plans';

import { EmptyContent } from '@cda/common/EmptyContent';
import { planPriorityOrder, usePlans } from '@cda/common/Plans';

import { release } from '@/services/core';

import PlanCard from './components/PlanCard';
import PlanDrawer from './components/PlanDrawer';
import FormPlanModal from './components/FormPlanModal';

export default function Plans() {
    const [open, toggle] = useModal();
    const [openDrawer, toggleDrawer] = useDrawer();

    const { plans } = usePlans();
    const { filter, filtered, reset } = useFilter(plans);

    const [selectedPlanId, setSelectedPlanId] = useState<string>();
    const [loadingList, setLoadingList] = useState(false);

    const selectedPlan = useMemo(() => {
        return plans.find(r => r.id === selectedPlanId);
    }, [plans, selectedPlanId]);

    const [formGroup] = useForm<{ name: string; }>({
        form: {
            name: new FormControl({ defaultValue: '' }),
        },
        handle: {
            change: (form) => {
                const { name } = form.values;

                debounce.delay(() => {
                    setLoadingList(true);

                    if (name.length < 4) {
                        reset();
                    } else {
                        filter((user) => slug(user.name).includes(slug(name)));
                    }

                    setTimeout(() => { setLoadingList(false); }, 1000);
                }, 500);
            }
        }
    }, []);

    const resetForm = () => { formGroup.setValues({ name: '' }); };

    const handleSelectPlan = (plan: Plan) => {
        setSelectedPlanId(plan.id);
        toggleDrawer();
    };

    return (
        <Page
            title="Planos"
            subtitle="Aqui você pode visualizar e gerenciar todos os planos"
            release={release}
            action={
                <Button
                    variant="contained"
                    startIcon={<Icon name="plus" />}
                    onClick={toggle}
                >
                    Novo plano
                </Button>
            }
        >

            <Stack>
                <Grid xl={2} lg={3} md={8} sm={12}>
                    <GridItem>
                        <Form formGroup={formGroup}>
                            <Control
                                action="onChange"
                                controlName="name"
                                field={(control) =>
                                    <Input
                                        fullWidth
                                        type="text"
                                        placeholder="Nome do plano"
                                        startIcon={<Icon name="search" />}
                                        endIcon={
                                            control.value && (
                                                <ButtonIcon onClick={resetForm}>
                                                    <Icon name="times" />
                                                </ButtonIcon>
                                            )
                                        }
                                        value={control.value}
                                        error={control.isInvalid}
                                        helperText={control.messageError}
                                    />
                                }
                            />
                        </Form>
                    </GridItem>
                </Grid>
                {
                    loadingList && (
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            style={{ height: 100 }}
                        >
                            <Loading />
                        </Stack>
                    )
                }
                {
                    !loadingList && !filtered.length && (
                        <EmptyContent
                            icon="file-check-alt"
                            message="Nenhum plano foi encontrado"
                        />
                    )
                }
                {
                    !loadingList && Boolean(filtered.length) && (
                        <Grid xl={2} lg={3} md={4} sm={12}>
                            {
                                orderByIndex(filtered, 'id', planPriorityOrder)
                                    .map((plan, i) => (
                                        <GridItem key={plan.id}>
                                            <Slide enter delay={(i + 1) * 100}>
                                                <PlanCard
                                                    plan={plan}
                                                    onClick={() => handleSelectPlan(plan)}
                                                />
                                            </Slide>
                                        </GridItem>
                                    ))
                            }
                        </Grid>
                    )
                }
            </Stack>

            <FormPlanModal isOpen={open} onToggleModal={toggle} />

            <PlanDrawer
                plan={selectedPlan}
                isOpen={openDrawer}
                onToggleDrawer={toggleDrawer}
            />
        </Page>
    );
}