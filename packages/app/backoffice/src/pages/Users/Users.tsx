import { useEffect, useMemo, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import { debounce } from '@cda/ui/utils';
import { useFilter } from '@cda/ui/hooks';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';
import Input from '@cda/ui/components/Input';
import Button from '@cda/ui/components/Button';
import Skeleton from '@cda/ui/components/Skeleton';
import { useModal } from '@cda/ui/components/Modal';
import { useDrawer } from '@cda/ui/components/Drawer';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Form, Control, FormControl, useForm } from '@cda/ui/components/Form';
import Stack from '@cda/ui/components/Stack';

import { slug } from '@cda/toolkit/string';
import { getFilledArray } from '@cda/toolkit/array';

import type { UserData } from '@cda/services/user';

import { EmptyContent } from '@cda/common/EmptyContent';

import { release } from '@/services/core';

import UserDrawer from './components/UserDrawer';
import UserCard from './components/UserCard';
import useUsers from './useUsers';
import CreateUserModal from './components/FormUserModal';

type SearchForm = { name: string; }

function SkeletonCards() {
    const arr = getFilledArray(9);

    return (
        <Grid lg={4} md={6} sm={12}>
            {
                arr.map((_, i) => (
                    <GridItem key={i}>
                        <Skeleton width="100%" height={70} />
                    </GridItem>
                ))
            }
        </Grid>
    );
}

export default function Users() {
    const [open, toggle] = useModal();
    const [openUserDrawer, toggleUserDrawer] = useDrawer();

    const { users, getUsers } = useUsers();

    const { filter, filtered, reset } = useFilter(users);

    const [selectedUserId, setSelectedUserId] = useState<string>();
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);

    const selectedUser = useMemo(() => users.find(u => u.id === selectedUserId), [users, selectedUserId]);

    const [formGroup] = useForm<SearchForm>({
        form: {
            name: new FormControl({ defaultValue: '' }),
        },
        handle: {
            change: (form) => {
                const { name } = form.values;

                debounce.delay(() => {
                    setLoadingSkeleton(true);

                    if (name.length < 4) {
                        reset();
                    } else {
                        filter((user) => slug(user.name).includes(slug(name)));
                    }

                    setTimeout(() => { setLoadingSkeleton(false); }, 1000);
                }, 500);
            }
        }
    }, []);

    useEffect(() => { getUsers().then(() => setLoadingSkeleton(false)); }, []);

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
                <Grid lg={4} md={6} sm={12}>
                    <GridItem>
                        <Form formGroup={formGroup}>
                            <Control
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
                {loadingSkeleton && <SkeletonCards />}
                {
                    !loadingSkeleton && Boolean(filtered.length) && (
                        <Grid lg={4} md={6} sm={12}>
                            {
                                filtered.map((user, i) => (
                                    <GridItem key={user.id}>
                                        <Slide
                                            enter
                                            direction="left"
                                            delay={(i + 1) * 100}
                                        >
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
                !loadingSkeleton && !filtered.length && (
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