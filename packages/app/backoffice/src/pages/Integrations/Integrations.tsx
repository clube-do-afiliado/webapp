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

import { Integration } from '@cda/services/integrations';

import { EmptyContent } from '@cda/common/EmptyContent';
import { useIntegrations } from '@cda/common/Integrations';

import { release } from '@/services/core';

import CardIntegration from './components/CardIntegration';
import IntegrationDrawer from './components/IntegrationDrawer';
import FormIntegrationsModal from './components/FormIntegrationsModal';

export default function Plans() {
    const [open, toggle] = useModal();
    const [openDrawer, toggleDrawer] = useDrawer();

    const { integrations } = useIntegrations();
    const { filter, filtered, reset } = useFilter(integrations, []);

    const [loadingList, setLoadingList] = useState(false);
    const [currentSearch, setCurrentSearch] = useState('');
    const [selectedIntegrationId, setSelectedIntegrationId] = useState<string>();

    const selectedIntegration = useMemo(() => {
        return integrations.find(r => r.id === selectedIntegrationId);
    }, [integrations, selectedIntegrationId]);

    const [formGroup] = useForm<{ name: string; }>({
        form: {
            name: new FormControl({ defaultValue: '' }),
        },
        handle: {
            change: (form) => {
                const { name } = form.values;

                if (currentSearch === name) { return; }

                debounce.delay(() => {
                    setLoadingList(true);

                    if (name.length < 4) {
                        reset();
                    } else {
                        filter((user) => slug(user.name).includes(slug(name)));
                    }

                    setCurrentSearch(name);

                    setTimeout(() => { setLoadingList(false); }, 500);
                }, 500);
            }
        }
    }, []);

    const resetForm = () => { formGroup.setValues({ name: '' }); };

    const handleSelectIntegration = (integration: Integration) => {
        setSelectedIntegrationId(integration.id);
        toggleDrawer();
    };

    return (
        <Page
            title="Integrações"
            subtitle="Aqui você pode visualizar e gerenciar todas as integrações"
            release={release}
            action={
                <Button
                    variant="contained"
                    startIcon={<Icon name="plus" />}
                    onClick={toggle}
                >
                    Nova integração
                </Button>
            }
        >
            <Stack>
                <Grid xl={3} lg={4} md={6} sm={12}>
                    <GridItem>
                        <Form formGroup={formGroup}>
                            <Control
                                action="onChange"
                                controlName="name"
                                field={(control) =>
                                    <Input
                                        fullWidth
                                        type="text"
                                        placeholder="Nome da integração"
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
                            orientation="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ height: 250 }}
                        >
                            <Loading size={50} />
                        </Stack>
                    )
                }
                {
                    !loadingList && Boolean(filtered.length) && (
                        <Grid xl={3} lg={4} md={6} sm={12}>
                            {
                                filtered.map((integration, i) => (
                                    <GridItem key={integration.id}>
                                        <Slide enter delay={(i + 1) * 100} >
                                            <CardIntegration
                                                integration={integration}
                                                onClick={() => handleSelectIntegration(integration)}
                                            />
                                        </Slide>
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    )
                }
                {
                    !loadingList && !filtered.length && (
                        <EmptyContent
                            icon="channel"
                            message="Nenhuma integração foi encontrada"
                        />
                    )
                }
            </Stack>
            <FormIntegrationsModal isOpen={open} onToggleModal={toggle} />
            <IntegrationDrawer
                integration={selectedIntegration}
                isOpen={openDrawer}
                onToggleDrawer={toggleDrawer}
            />
        </Page>
    );
}