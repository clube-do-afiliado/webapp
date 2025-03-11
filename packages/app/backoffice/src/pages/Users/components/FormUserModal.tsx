import { useEffect, useMemo, useState } from 'react';

import Input from '@cda/ui/components/Input';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';
import { Modal, ModalFooter, HelperModalProps } from '@cda/ui/components/Modal';

import type { UserData } from '@cda/services/user';

import { useAuth } from '@cda/common/Auth';

import RoleList from '@/components/RolesList';

import useUsers from '../useUsers';

export default function FormUserModal({
    user,
    isOpen,
    onToggleModal
}: HelperModalProps<{ user?: UserData; }>) {
    const { updateUser, getUsers } = useUsers();

    const { createByBackoffice } = useAuth();

    const [loading, setLoading] = useState(false);

    const isEdit = useMemo(() => Boolean(user), [user]);

    const [formGroup] = useForm<Pick<UserData, 'name' | 'email' | 'roles'>>({
        form: {
            name: new FormControl({ defaultValue: user?.name || 'Teste backoffice', required: true }),
            email: new FormControl({ defaultValue: user?.email || 'wacevik480@oziere.com', required: true }),
            roles: new FormControl({ defaultValue: user?.roles || ['free-plan', 'user'], required: true }),
        },
        handle: {
            submit: (form) => {
                const { name, email, roles } = form.values;

                let promise!: Promise<any>;

                if (user) { promise = updateUser({ ...user, name, email, roles }); }
                if (!user) {
                    promise = createByBackoffice({ name, email, roles })
                        .then(getUsers);
                }

                promise
                    .then(onToggleModal)
                    .finally(() => setLoading(false));
            }
        }
    }, [user]);

    useEffect(() => { if (!isOpen) { formGroup.reset(); } }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    {
                        isEdit
                            ? 'Editar usuário'
                            : 'Adicionar usuário'
                    }
                </Typography>
            }
            onClose={onToggleModal}
        >
            <Form formGroup={formGroup}>
                <Control
                    controlName="name"
                    field={(control) => (
                        <Input
                            fullWidth
                            gutterBottom
                            placeholder="Nome"
                            data-cy="name-user-backoffice"
                            value={control.value}
                            error={control.isInvalid}
                            helperText={control.messageError}
                        />
                    )}
                />
                <Control
                    controlName="email"
                    field={(control) => (
                        <Input
                            fullWidth
                            gutterBottom
                            disabled={isEdit}
                            placeholder="Email"
                            data-cy="email-user-backoffice"
                            value={control.value}
                            error={control.isInvalid}
                            helperText={control.messageError}
                        />
                    )}
                />
                <Typography noMargin variant="body1" color="text.secondary">Roles</Typography>
                <div style={{ maxHeight: 400, overflow: 'auto' }}>
                    <Control
                        type="object"
                        controlName="roles"
                        field={(control) => (
                            <RoleList value={control.value} />
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
                        Salvar
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}