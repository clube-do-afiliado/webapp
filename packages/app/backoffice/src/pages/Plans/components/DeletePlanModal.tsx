import { useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@cda/ui/components/Modal';

import type { Plan } from '@cda/services/plans';

import { usePlans } from '@cda/common/Plans';

interface DeletePlanModalProps { integration?: Plan; onToggleDrawer: () => void; }

export default function DeletePlanModal({
    integration,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<DeletePlanModalProps>) {
    const { deletePlan } = usePlans();

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deletePlan(integration?.id || '')
            .then(onToggleModal)
            .then(onToggleDrawer)
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>Deletar integration</Typography>
            }
            onClose={onToggleModal}
        >
            <Typography>
                Tem certeza que deseja deletar a integration <strong>&quot;{integration?.name}&quot;</strong>?
            </Typography>
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