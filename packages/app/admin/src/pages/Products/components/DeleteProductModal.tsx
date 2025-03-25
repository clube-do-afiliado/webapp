import { useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@cda/ui/components/Modal';

import type { Product } from '@cda/services/products';

import { useProducts } from '@cda/common/Products';

interface DeleteProductModalProps { product?: Product; onToggleDrawer: () => void; }

export default function DeleteProductModal({
    product,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<DeleteProductModalProps>) {
    const { deleteProduct } = useProducts();

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deleteProduct(product?.id || '')
            .then(onToggleModal)
            .then(onToggleDrawer)
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>Deletar product</Typography>
            }
            onClose={onToggleModal}
        >
            <Typography>
                Tem certeza que deseja deletar o produto <strong>&quot;{product?.name}&quot;</strong>?
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