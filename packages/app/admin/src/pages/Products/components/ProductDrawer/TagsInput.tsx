import { ChangeEvent, useState } from 'react';

import { useKey } from '@cda/ui/hooks';
import Icon from '@cda/ui/components/Icon';
import Chip from '@cda/ui/components/Chip';
import Stack from '@cda/ui/components/Stack';
import Slide from '@cda/ui/animations/Slide';
import Input from '@cda/ui/components/Input';
import { useControl } from '@cda/ui/components/Form';
import ButtonIcon from '@cda/ui/components/ButtonIcon';

import { ProductForm } from './interface';

export default function TagsInput() {
    const [value, setValue] = useState<string>();

    const { control, update } = useControl<ProductForm, 'tags'>('tags');

    useKey({ Enter: () => { handleAdd(); } }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); };

    const handleAdd = () => {
        if (!value) { return; }

        if (control.value.includes(value)) { return; }

        update([...control.value, value]);

        setValue('');
    };

    const handleDelete = (chip: string) => { update(control.value.filter(v => v !== chip)); };

    return (
        <Stack>
            <Input
                fullWidth
                label="Tags"
                data-cy="tag-product"
                value={value}
                error={control.isInvalid}
                helperText={control.error}
                onChange={handleChange}
                endIcon={
                    <ButtonIcon type="button" onClick={handleAdd}>
                        <Icon name="plus" />
                    </ButtonIcon>
                }
            />
            <Stack orientation="row" spacing="small">
                {
                    control.value.map(c => (
                        <Slide key={c} enter direction="top">
                            <Chip
                                onClick={() => handleDelete(c)}
                                label={c}
                                color="primary"
                                icon={<Icon name="times" />}
                            />
                        </Slide>
                    ))
                }
            </Stack>
        </Stack>
    );
}