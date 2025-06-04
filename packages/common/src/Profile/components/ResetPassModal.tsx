import { useState } from 'react';

import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { Modal, HelperModalProps } from '@cda/ui/components/Modal';

export default function ResetPassModal({
    isOpen,
    onToggleModal,
}: HelperModalProps) {
    const [loading, setLoading] = useState(false);

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6">Alterar senha</Typography>
            }
            subtitle={
                <Typography variant="body2" color="text.secondary">
                    Vamos enviar um email para redefinir sua senha
                </Typography>
            }
            onClose={onToggleModal}
        >
            <Button>teste</Button>
        </Modal>
    );
}