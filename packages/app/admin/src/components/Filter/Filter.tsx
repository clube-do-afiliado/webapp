import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import { Select, Option } from '@cda/ui/components/Select';
import Chip, { type ChipProps } from '@cda/ui/components/Chip';
import { Control, Form, FormGroup, useControl } from '@cda/ui/components/Form';

import type { FormFilter } from '@/utils/interval';

type ChipStateProps = Pick<ChipProps, 'variant' | 'color'>;

interface UsersFilterProps { compact: boolean; }
function UsersFilter({ compact }: UsersFilterProps) {
    const { control, update } = useControl<FormFilter, 'unique'>('unique');

    const activeProps: ChipStateProps = { color: 'primary', variant: 'contained' };
    const deactiveProps: ChipStateProps = { color: 'default', variant: 'outlined' };

    const handleUpdate = (state: boolean) => { update(state); };

    return (
        <>
            <Chip
                label={!compact ? 'Todas as visitas' : ''}
                size="large"
                icon={<Icon name="users-alt" />}
                onClick={() => handleUpdate(false)}
                {...(!control.value ? activeProps : deactiveProps)}
            />
            <Chip
                label={!compact ? 'Usuários únicos' : ''}
                size="large"
                icon={<Icon name="user" />}
                onClick={() => handleUpdate(true)}
                {...(control.value ? activeProps : deactiveProps)}
            />
        </>
    );
}

interface FilterProps { formGroup: FormGroup<FormFilter>; compact?: boolean; }
export default function Filter({ formGroup, compact = false }: FilterProps) {

    return (
        <Form formGroup={formGroup}>
            <Stack orientation="row" alignItems="center" justifyContent="flex-end">
                <UsersFilter compact={compact} />
                <Control
                    controlName="interval"
                    action="onChange"
                    field={(control) => (
                        <Select
                            autoClose
                            value={control.value}
                            style={{ minWidth: 200 }}
                            startIcon={
                                <Icon name="calendar-alt" color="text.secondary" />
                            }
                        >
                            <Option value="last30days">Últimos 30 dias</Option>
                            <Option value="last60days">Último 60 dias</Option>
                            <Option value="last90days">Último 90 dias</Option>
                        </Select>
                    )}
                />
            </Stack>
        </Form >
    );
}