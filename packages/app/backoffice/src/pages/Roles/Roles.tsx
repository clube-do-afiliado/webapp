import { useEffect, useMemo, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import { useModal } from '@cda/ui/components/Modal';
import Loading from '@cda/ui/components/Loading';
import Stack from '@cda/ui/components/Stack';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import Slide from '@cda/ui/animations/Slide';
import { Card, CardContent } from '@cda/ui/components/Card';
import Typography from '@cda/ui/components/Typography';
import { useDrawer } from '@cda/ui/components/Drawer';

import type { RoleConfig } from '@cda/services/roles';

import { useRoles } from '@cda/common/Roles';
import { EmptyContent } from '@cda/common/EmptyContent';

import { release } from '@/services/core';

import RoleDrawer from './components/RoleDrawer';
import FormRoleModal from './components/FormRoleModal';

export default function Roles() {
    const [open, toggle] = useModal();
    const [openDrawer, toggleDrawer] = useDrawer();

    const { roles, loading, getRoles } = useRoles();

    const [selectedRoleId, setSelectedRoleId] = useState<string>();

    const selectedRole = useMemo(() => roles.find(r => r.id === selectedRoleId), [roles, selectedRoleId]);

    useEffect(() => { getRoles(); }, []);

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
            {
                loading && (
                    <Stack justifyContent="center" alignItems="center" orientation="row" style={{ height: 250 }}>
                        <Loading size={50} />
                    </Stack>
                )
            }
            {
                !loading && Boolean(roles.length) && (
                    <Grid lg={3} md={4} sm={12}>
                        {
                            roles.map((role, i) => (
                                <GridItem key={role.id}>
                                    <Slide enter direction="left" delay={(i + 1) * 100}>
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
                !loading && !roles.length && (
                    <EmptyContent
                        icon="file-shield-alt"
                        message="Nenhuma role foi encontrada"
                    />
                )
            }
            <FormRoleModal isOpen={open} onToggleModal={toggle} />
            <RoleDrawer
                role={selectedRole}
                isOpen={openDrawer}
                onToggleDrawer={toggleDrawer}
            />
        </Page>
    );
}