import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import { Checkbox, useControl } from '@cda/ui/components';
import MultiSelect from '@cda/ui/components/MultiSelect';
import Chip from '@cda/ui/components/Chip';

import { RoleConfig } from '@cda/services/roles';

import { useRoles } from '@cda/common/Roles';

import { FilterForm } from '../Users';

export default function RolesChip() {
    const { control, update } = useControl<FilterForm, 'roles'>('roles');

    const { roles } = useRoles();

    const handleChange = (selecteds: RoleConfig[]) => {
        update(selecteds.map(i => i.id));
    };

    return (
        <MultiSelect
            fullWidth
            data={roles}
            identifier="id"
            selecteds={roles.filter(role => control.value.includes(role.id))}
            startIcon={<Icon name="shield" />}
            onChange={handleChange}
            renderOption={(data) => (
                <Checkbox name={data.name} label={data.name} value={data.id} />
            )}
            renderValue={(data) => (
                <Chip label={data.name} />
            )}
        />
    );
}