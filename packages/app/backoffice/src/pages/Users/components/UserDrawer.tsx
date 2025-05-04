import { useEffect, useMemo, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Chip from '@cda/ui/components/Chip';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Avatar from '@cda/ui/components/Avatar';
import Divider from '@cda/ui/components/Divider';
import { useModal } from '@cda/ui/components/Modal';
import Typography from '@cda/ui/components/Typography';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@cda/ui/components/Drawer';

import type { Plan } from '@cda/services/plans';
import type { UserData } from '@cda/services/user';

import { useAuth } from '@cda/common/Auth';
import { useSites } from '@cda/common/Sites';
import { PlanChip, usePlans } from '@cda/common/Plans';

import { url } from '@/services/core';

import FormUserModal from './FormUserModal';
import DeleteUserModal from './StatusUserModal';

function UserPlan({ planName }: { planName: string }) {
    const [plan, setPlan] = useState<Plan | null>();

    const { getPlan } = usePlans();

    useEffect(() => {
        getPlan(planName)
            .then(plan => setPlan(plan));
    }, [planName]);

    return (
        plan && <PlanChip {...plan} />
    );
}

export default function UserDrawer({ isOpen, user, onToggleDrawer }: HelperDrawerProps<{ user?: UserData }>) {
    const [openEditModal, toggleEditModal] = useModal();
    const [openStatusModal, toggleStatusModal] = useModal();

    const { sendMailToResetPassword } = useAuth();
    const { getUserSites, userSites } = useSites();

    const isActive = useMemo(() => user?.status === 'active', [user]);

    console.log(JSON.stringify(user, null, 2));

    useEffect(() => {
        if (!user) { return; }

        getUserSites(user.id);
    }, [user]);

    const handleResetPassword = () => {
        sendMailToResetPassword(user?.email as string)
            .then(onToggleDrawer);
    };

    const goToStore = (siteSlug: string) => {
        window.open(`${url.store}/${siteSlug}/produtos`, '_blank');
    };

    return (
        <>
            <Drawer
                orientation="right"
                open={isOpen}
                onClose={onToggleDrawer}
                body={
                    <DrawerContent>
                        <Stack orientation="column" spacing="medium">
                            <Stack>
                                <Stack orientation="row" justifyContent="space-between">
                                    <div style={{ width: '100%' }}>
                                        <Avatar
                                            src={user?.picture}
                                            name={user?.name}
                                            sx={{
                                                color: ({ text }) => text.secondary,
                                                backgroundColor: ({ background }) => background.paper
                                            }}
                                        />
                                    </div>
                                    <Stack
                                        spacing="small"
                                        orientation="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        <ButtonIcon color="text.secondary" onClick={handleResetPassword}>
                                            <Icon name="envelope-shield" />
                                        </ButtonIcon>
                                        <ButtonIcon color="text.secondary" onClick={toggleEditModal}>
                                            <Icon name="edit" />
                                        </ButtonIcon>
                                        <ButtonIcon color="text.secondary">
                                            <Icon name="cog" />
                                        </ButtonIcon>
                                    </Stack>
                                </Stack>
                                <Stack justifyContent="space-between" orientation="row" alignItems="center">
                                    <div>
                                        <Typography variant="h6" noMargin>{user?.name}</Typography>
                                        <Typography
                                            noMargin
                                            variant="subtitle1"
                                            color="text.secondary"
                                        >
                                            {user?.email}
                                        </Typography>
                                    </div>
                                    <Chip
                                        size="small"
                                        label={user?.status || ''}
                                        color={isActive ? 'success' : 'error'}
                                    />
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack orientation="row" alignItems="center">
                                <Typography noMargin>Roles:</Typography>
                                {
                                    user?.roles.map(role => (
                                        <Chip
                                            key={role}
                                            label={role}
                                            variant="contained"
                                        />
                                    ))
                                }
                            </Stack>
                            <Divider />
                            <Stack orientation="row" alignItems="center">
                                <Typography noMargin>Planos:</Typography>
                                {
                                    user?.plans && user?.plans.map(plan => (
                                        <UserPlan key={plan} planName={plan} />
                                    ))
                                }
                            </Stack>
                            <Divider />
                            <Stack spacing="small">
                                <Typography noMargin variant="body1">
                                    Sites:
                                </Typography>
                                {
                                    userSites.map(site => (
                                        <Card key={site.id}>
                                            <CardContent>
                                                <Stack orientation="row" justifyContent="space-between">
                                                    <Stack
                                                        orientation="row"
                                                        alignItems="center"
                                                        style={{ width: '80%' }}
                                                    >
                                                        <Avatar icon={<Icon name="store" />} />
                                                        <Typography noMargin variant="body1">
                                                            {site.information.name}
                                                        </Typography>
                                                    </Stack>
                                                    <Button
                                                        size="small"
                                                        variant="text"
                                                        onClick={() => goToStore(site.slug)}
                                                    >
                                                        Ver loja
                                                    </Button>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </DrawerContent>
                }
                footer={
                    <DrawerFooter>
                        <Stack orientation="row" justifyContent="center">
                            <Button
                                color={isActive ? 'error' : 'success'}
                                variant={isActive ? 'contained' : 'outlined'}
                                startIcon={
                                    <Icon name={
                                        isActive ? 'user-times' : 'user-check'
                                    } />
                                }
                                onClick={toggleStatusModal}
                            >
                                {isActive ? 'Desativar' : 'Ativar'} usuário
                            </Button>
                        </Stack>
                    </DrawerFooter>
                }
            />
            <FormUserModal
                user={user}
                isOpen={openEditModal}
                onToggleModal={toggleEditModal}
            />
            <DeleteUserModal
                user={user}
                isOpen={openStatusModal}
                onToggleModal={toggleStatusModal}
                onToggleDrawer={onToggleDrawer}
            />
        </>
    );
}