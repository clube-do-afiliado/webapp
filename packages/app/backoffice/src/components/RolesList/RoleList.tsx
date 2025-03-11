import { useEffect, useState } from 'react';

import Stack from '@cda/ui/components/Stack';
import Switch from '@cda/ui/components/Switch';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import { useRoles } from '@cda/common/Roles';

interface RoleListProps { onChange?: (data: string[]) => void; value: string[] }
export default function RoleList({ value, onChange }: RoleListProps) {
    const [data, setData] = useState<string[]>(value);

    const { roles, loading, getRoles } = useRoles();

    useEffect(() => { getRoles(); }, []);

    useEffect(() => { if (onChange) { onChange(data); } }, [data]);

    const handleSelectPermission = (role: string) => {
        const shouldRemove = data.includes(role);

        if (shouldRemove) {
            setData(prev => prev.filter(p => p !== role));
        } else {
            setData(prev => [...prev, role]);
        }
    };

    return (
        <>
            {
                loading && (
                    <div>carregando...</div>
                )
            }
            {
                !loading && (
                    <Grid lg={6} md={6} sm={12} gap={0}>
                        {
                            roles.map((role) => (
                                <GridItem key={role.id}>
                                    <Stack orientation="row" alignItems="center">
                                        <Switch
                                            checked={data.includes(role.id)}
                                            onChange={() => handleSelectPermission(role.id)}
                                        />
                                        <Typography variant="body2" color="text.secondary">{role.name}</Typography>
                                    </Stack>
                                </GridItem>
                            ))
                        }
                    </Grid>
                )
            }
        </>
    );
};