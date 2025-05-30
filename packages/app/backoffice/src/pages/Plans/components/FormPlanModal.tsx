import { useEffect, useState } from 'react';

import Input from '@cda/ui/components/Input';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import ColorPicker from '@cda/ui/components/ColorPicker';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';
import { Modal, ModalFooter, HelperModalProps } from '@cda/ui/components/Modal';
import { useTheme } from '@cda/ui/theme';

import permissions from '@cda/services/permissions';
import type { Plan } from '@cda/services/plans';

import { usePlans } from '@cda/common/Plans';

import { PermissionsList } from '@/components';

export default function FormPlanModal({ plan, isOpen, onToggleModal }: HelperModalProps<{ plan?: Plan }>) {
    const { theme: { palette } } = useTheme();
    const { createPlan, updatePlan } = usePlans();

    const [loading, setLoading] = useState(false);

    const [formGroup] = useForm<Omit<Plan, 'id'>>({
        form: {
            name: new FormControl({ defaultValue: plan?.name || '', required: true }),
            description: new FormControl({ defaultValue: plan?.description || '', required: true }),
            permissions: new FormControl({ defaultValue: plan?.permissions || [], required: true }),
            color: new FormControl({ defaultValue: plan?.color || palette.primary.main, required: true }),
            price: new FormControl({ defaultValue: plan?.price || 0, type: 'money', required: false }),
        },
        handle: {
            submit: (form) => {
                const { name, description, permissions, price, color } = form.values;

                let promise!: Promise<void>;

                if (plan) { promise = updatePlan({ ...plan, name, description, permissions, price, color }); }
                if (!plan) { promise = createPlan({ name, description, permissions, price, color }); }

                promise
                    .then(onToggleModal)
                    .finally(() => setLoading(false));
            }
        },
    }, [plan]);

    useEffect(() => { if (!isOpen) { formGroup.reset(); } }, [isOpen]);

    const handleSelectAll = () => {
        formGroup.setValues({ permissions: permissions as any[] });
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    {
                        plan
                            ? 'Editar role'
                            : 'Criar nova role'
                    }
                </Typography>
            }
            onClose={onToggleModal}
        >
            <Form formGroup={formGroup}>
                <Stack spacing="small">
                    <Control
                        controlName="name"
                        field={(control) => (
                            <Input
                                fullWidth
                                gutterBottom
                                disabled={!plan}
                                placeholder="Nome"
                                data-cy="name-plan"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                    <Control
                        controlName="description"
                        field={(control) => (
                            <Input
                                fullWidth
                                gutterBottom
                                placeholder="Descrição"
                                data-cy="description-plan"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                    <Control
                        controlName="price"
                        field={(control) => (
                            <Input
                                fullWidth
                                gutterBottom
                                placeholder="Preço"
                                data-cy="price-plan"
                                value={control.masked}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                    <Control
                        controlName="color"
                        field={(control) => (
                            <ColorPicker
                                fullWidth
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                    <Stack orientation="row" justifyContent="space-between">
                        <Typography noMargin variant="body1" color="text.secondary">Permissões</Typography>
                        <Button
                            size="small"
                            type="button"
                            variant="text"
                            onClick={handleSelectAll}
                        >
                            Selecionar tudo
                        </Button>
                    </Stack>
                    <div style={{ maxHeight: 400, overflow: 'auto' }}>
                        <Control
                            type="object"
                            controlName="permissions"
                            field={(control) => (
                                <PermissionsList value={control.value} />
                            )}
                        />
                    </div>
                    <ModalFooter>
                        <Button
                            type="button"
                            variant="text"
                            color="primary"
                            onClick={onToggleModal}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            loading={loading && <Loading />}
                        >
                            {plan ? 'Salvar' : 'Criar'}
                        </Button>
                    </ModalFooter>
                </Stack>
            </Form>
        </Modal>
    );
}