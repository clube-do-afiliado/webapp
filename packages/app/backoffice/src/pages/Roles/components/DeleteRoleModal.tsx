import { useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@cda/ui/components/Modal';

import type { RoleConfig } from '@cda/services/roles';

import { useRoles } from '@cda/common/Roles';

interface DeleteRoleModalProps { role?: RoleConfig; onToggleDrawer: () => void; }

export default function DeleteRoleModal({
    role,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<DeleteRoleModalProps>) {
    const { deleteRole } = useRoles();

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deleteRole(role?.id || '')
            .then(onToggleModal)
            .then(onToggleDrawer)
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>Deletar role</Typography>
            }
            onClose={onToggleModal}
        >
            <Typography>Tem certeza que deseja deletar a role <strong>&quot;{role?.name}&quot;</strong>?</Typography>
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
                    color="error"
                    variant="contained"
                    startIcon={<Icon name="trash" />}
                    loading={loading && <Loading />}
                    onClick={handleDelete}
                >
                    Deletar
                </Button>
            </ModalFooter>
        </Modal>
    );
}