import { useMemo, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import { debounce } from '@cda/ui/utils';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import useFilter from '@cda/ui/hooks/useFilter';
import Loading from '@cda/ui/components/Loading';
import { useDrawer } from '@cda/ui/components/Drawer';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Form, Control, FormControl, useForm } from '@cda/ui/components/Form';

import { slug } from '@cda/toolkit/string';

import { Site } from '@cda/services/sites';

import { useSites } from '@cda/common/Sites';
import { EmptyContent } from '@cda/common/EmptyContent';

import { release } from '@/services/core';

import StoreCard from './components/StoreCard';
import StoreDrawer from './components/StoreDrawer';

export default function Stores() {
    const [openDrawer, toggleDrawer] = useDrawer();

    const { sites } = useSites();
    const { filter, filtered, reset } = useFilter(sites, []);

    const [loadingList, setLoadingList] = useState(false);
    const [currentSearch, setCurrentSearch] = useState('');
    const [selectedStoreId, setSelectedStoreId] = useState<string>();

    const selectedStore = useMemo(() => sites.find(r => r.id === selectedStoreId), [sites, selectedStoreId]);

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
                        filter((site) => slug(site.information.name).includes(slug(name)));
                    }

                    setCurrentSearch(name);

                    setTimeout(() => { setLoadingList(false); }, 1000);
                }, 500);
            }
        }
    }, []);

    const resetForm = () => { formGroup.setValues({ name: '' }); };

    const handleSelectStore = (site: Site) => {
        setSelectedStoreId(site.id);
        toggleDrawer();
    };

    return (
        <Page
            title="Sites"
            subtitle="Aqui você pode visualizar e gerenciar todas os sites"
            release={release}
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
                                        placeholder="Nome da loja"
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
                                filtered.map((site, i) => (
                                    <GridItem key={site.id}>
                                        <Slide enter delay={(i + 1) * 100}>
                                            <StoreCard site={site} onClick={handleSelectStore} />
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
                            icon="constructor"
                            message="Nenhuma role foi encontrada"
                        />
                    )
                }
                <StoreDrawer
                    site={selectedStore}
                    isOpen={openDrawer}
                    onToggleDrawer={toggleDrawer}
                />
            </Stack>
        </Page >
    );
}