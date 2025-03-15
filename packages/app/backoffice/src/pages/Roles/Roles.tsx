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
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, Control, FormControl, useForm } from '@cda/ui/components/Form';

import { slug } from '@cda/toolkit/string';

import { RoleConfig } from '@cda/services/roles';

import { useRoles } from '@cda/common/Roles';
import { EmptyContent } from '@cda/common/EmptyContent';

import { release } from '@/services/core';

import RoleDrawer from './components/RoleDrawer';
import FormRoleModal from './components/FormRoleModal';

export default function Roles() {
    const [open, toggle] = useModal();
    const [openDrawer, toggleDrawer] = useDrawer();

    const { roles } = useRoles();
    const { filter, filtered, reset } = useFilter(roles);

    const [loadingList, setLoadingList] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState<string>();

    const selectedRole = useMemo(() => roles.find(r => r.id === selectedRoleId), [roles, selectedRoleId]);

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

    const handleSelectRole = (role: RoleConfig) => {
        setSelectedRoleId(role.id);
        toggleDrawer();
    };

    return (
        <Page
            title="Roles"
            subtitle="Aqui você pode visualizar e gerenciar todas as roles"
            release={release}
            action={
                <Button
                    variant="contained"
                    startIcon={<Icon name="plus" />}
                    onClick={toggle}
                >
                    Nova role
                </Button>
            }
        >
            <Stack>
                <Grid xl={2} lg={3} md={4} sm={12}>
                    <GridItem>
                        <Form formGroup={formGroup}>
                            <Control
                                action="onChange"
                                controlName="name"
                                field={(control) =>
                                    <Input
                                        fullWidth
                                        type="text"
                                        placeholder="Nome da role"
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
                        <Grid xl={2} lg={3} md={4} sm={12}>
                            {
                                filtered.map((role, i) => (
                                    <GridItem key={role.id}>
                                        <Slide enter delay={(i + 1) * 100}>
                                            <Card onClick={() => handleSelectRole(role)}>
                                                <CardContent>
                                                    <Typography noMargin variant="body2" color="text.secondary">
                                                        {role.name}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
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
            </Stack>
            <FormRoleModal isOpen={open} onToggleModal={toggle} />
            <RoleDrawer
                role={selectedRole}
                isOpen={openDrawer}
                onToggleDrawer={toggleDrawer}
            />
        </Page>
    );
}