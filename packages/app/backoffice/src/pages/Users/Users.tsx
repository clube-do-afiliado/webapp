import { useEffect, useMemo, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import { debounce } from '@cda/ui/utils';
import { useFilter } from '@cda/ui/hooks';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';
import Input from '@cda/ui/components/Input';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import { useModal } from '@cda/ui/components/Modal';
import { useDrawer } from '@cda/ui/components/Drawer';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Form, Control, FormControl, useForm } from '@cda/ui/components/Form';

import { slug } from '@cda/toolkit/string';

import type { UserData } from '@cda/services/user';

import { EmptyContent } from '@cda/common/EmptyContent';

import { release } from '@/services/core';

import useUsers from './useUsers';
import UserCard from './components/UserCard';
import UserDrawer from './components/UserDrawer';
import CreateUserModal from './components/FormUserModal';

export default function Users() {
    const [open, toggle] = useModal();
    const [openUserDrawer, toggleUserDrawer] = useDrawer();

    const { users, getUsers } = useUsers();

    const { filter, filtered, reset } = useFilter(users);

    const [selectedUserId, setSelectedUserId] = useState<string>();
    const [loadingList, setLoadingList] = useState(true);

    const selectedUser = useMemo(() => users.find(u => u.id === selectedUserId), [users, selectedUserId]);

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

    useEffect(() => { getUsers().then(() => setLoadingList(false)); }, []);

    const resetForm = () => { formGroup.setValues({ name: '' }); };

    const handleOpenDrawer = (user: UserData) => {
        setSelectedUserId(user.id);
        toggleUserDrawer();
    };

    return (
        <Page
            title="Usuários"
            subtitle="Aqui você pode visualizar e gerenciar todos os usuários"
            release={release}
            action={
                <Button
                    variant="contained"
                    startIcon={<Icon name="plus" />}
                    onClick={toggle}
                >
                    Adicionar usuário
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
                                        placeholder="Nome do usuário"
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
                                filtered.map((user, i) => (
                                    <GridItem key={user.id}  >
                                        <Slide enter delay={(i + 1) * 100}>
                                            <UserCard
                                                key={user.id}
                                                user={user}
                                                onClick={handleOpenDrawer}
                                            />
                                        </Slide>
                                    </GridItem>
                                ))
                            }
                        </Grid>)
                }
            </Stack>
            {
                !loadingList && !filtered.length && (
                    <EmptyContent
                        message="Nenhum usuário encontrado"
                        icon="user-exclamation"
                    />
                )
            }
            <UserDrawer
                user={selectedUser}
                isOpen={openUserDrawer}
                onToggleDrawer={toggleUserDrawer}
            />
            <CreateUserModal
                isOpen={open}
                onToggleModal={toggle}
            />
        </Page>
    );
}