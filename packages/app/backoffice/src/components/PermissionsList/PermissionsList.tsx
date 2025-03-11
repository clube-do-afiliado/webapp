import { useEffect, useState } from 'react';

import Stack from '@cda/ui/components/Stack';
import Switch from '@cda/ui/components/Switch';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import permissions, { type Permission } from '@cda/services/permissions';

interface PermissionsListProps { onChange?: (data: Permission[]) => void; value: Permission[] }
export default function PermissionsList({ value, onChange }: PermissionsListProps) {
    const [data, setData] = useState<Permission[]>(value);

    useEffect(() => { if (onChange) { onChange(data); } }, [data]);

    const handleSelectPermission = (permission: Permission) => {
        const shouldRemove = data.includes(permission);

        if (shouldRemove) {
            setData(prev => prev.filter(p => p !== permission));
        } else {
            setData(prev => [...prev, permission]);
        }
    };

    return (
        <Grid lg={6} md={6} sm={12} gap={0}>
            {
                permissions.map((permission) => (
                    <GridItem key={permission}>
                        <Stack orientation="row" alignItems="center">
                            <Switch
                                checked={data.includes(permission)}
                                onChange={() => handleSelectPermission(permission)}
                            />
                            <Typography variant="body2" color="text.secondary">{permission}</Typography>
                        </Stack>
                    </GridItem>
                ))
            }
        </Grid>
    );
}