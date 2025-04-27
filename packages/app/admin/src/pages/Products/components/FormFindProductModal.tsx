import { useEffect, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Input from '@cda/ui/components/Input';
import Alert from '@cda/ui/components/Alert';
import Stack from '@cda/ui/components/Stack';
import Slide from '@cda/ui/animations/Slide';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';
import { Modal, HelperModalProps, ModalFooter } from '@cda/ui/components/Modal';

import { slug } from '@cda/toolkit/string';

import type { Product } from '@cda/services/products';

import { useSites } from '@cda/common/Sites';
import { useProducts } from '@cda/common/Products';

import { serverFunctions } from '@/services/core';

export default function FormFindProductModal({ isOpen, onToggleModal, onGetProduct }: HelperModalProps<{
    onGetProduct: (product: Product) => void;
}>) {
    const { userSites } = useSites();
    const { createProduct } = useProducts();

    const [loading, setLoading] = useState(false);

    const [formGroup] = useForm<{ url: string }>({
        form: {
            url: new FormControl({ defaultValue: '', required: true }),
        },
        handle: {
            submit: (form) => {
                setLoading(true);

                const { url } = form.values;

                serverFunctions.getFunction('getInfo', { url })
                    .then(res => {
                        console.log('res', res);

                        return createProduct({
                            name: res.title,
                            price: res.price,
                            slug: slug(res.title),
                            integration: res.integration,
                            originalPrice: res.originalPrice,
                            storeId: userSites[0].id,
                            images: [res.img],
                            visible: false,
                            url,
                            tags: []
                        });
                    })
                    .then(res => onGetProduct(res))
                    .finally(() => setLoading(false));
            }
        }
    }, []);

    useEffect(() => {
        if (!isOpen) { return; }
        formGroup.reset();
    }, [isOpen]);

    const handleToggle = () => {
        if (loading) { return; }

        onToggleModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    Buscar produto
                </Typography>
            }
            onClose={handleToggle}
        >
            {
                loading && (
                    <Slide enter direction="top">
                        <Stack
                            alignItems="center"
                            orientation="column"
                            justifyContent="flex-start"
                            sx={{ pb: 2 }}
                        >
                            <Typography noMargin color="text.secondary">Buscando informações do produto</Typography>
                            <Loading size={35} />
                        </Stack>
                    </Slide>
                )
            }
            {
                !loading && (
                    <Slide enter direction="top">
                        <Form formGroup={formGroup}>
                            <Stack>
                                <Alert
                                    fullWidth
                                    variant="opacity"
                                    color="info"
                                    icon={
                                        <Icon name="info-circle" />
                                    }
                                >
                                    Adicione a url do produto no seu link de afiliado
                                </Alert>
                                <Control
                                    controlName="url"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            placeholder="ex: https://produto.com.br"
                                            data-cy="url-product"
                                            value={control.value}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                        />
                                    )}
                                />
                                <ModalFooter>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        startIcon={
                                            <Icon name="search" />
                                        }
                                        loading={
                                            loading && <Loading />
                                        }
                                    >
                                        Buscar
                                    </Button>
                                </ModalFooter>
                            </Stack>
                        </Form>
                    </Slide>
                )
            }
        </Modal>
    );
}