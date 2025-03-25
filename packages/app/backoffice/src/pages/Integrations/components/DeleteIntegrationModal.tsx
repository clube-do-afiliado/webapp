import { useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@cda/ui/components/Modal';

import type { Integration } from '@cda/services/integrations';

import { useIntegrations } from '@cda/common/Integrations';

interface DeleteIntegrationModalProps { integration?: Integration; onToggleDrawer: () => void; }

export default function DeleteIntegrationModal({
    integration,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<DeleteIntegrationModalProps>) {
    const { deleteIntegration } = useIntegrations();

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deleteIntegration(integration?.id || '')
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
                Tem certeza que deseja deletar a integração <strong>&quot;{integration?.name}&quot;</strong>?
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