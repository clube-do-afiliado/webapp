import { useEffect, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import Box from '@cda/ui/components/Box';
import { debounce } from '@cda/ui/utils';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import Button from '@cda/ui/components/Button';
import useFilter from '@cda/ui/hooks/useFilter';
import { useModal } from '@cda/ui/components/Modal';
import { useDrawer } from '@cda/ui/components/Drawer';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Control, Form, FormControl, useForm } from '@cda/ui/components/Form';

import { slug } from '@cda/toolkit/string';

import type { Product } from '@cda/services/products';

import { useSites } from '@cda/common/Sites';
import { useProducts } from '@cda/common/Products';
import { EmptyContent } from '@cda/common/EmptyContent';

import { release } from '@/services/core';

import ProductTable from './components/ProductTable';
import ProductDrawer from './components/ProductDrawer';
import FormFindProductModal from './components/FormFindProductModal';

interface FilterForm {
    name: string;
}

export default function Products() {
    const [openDrawer, toggleDrawer] = useDrawer();
    const [openFindModal, toggleFindModal] = useModal();

    const { userSites } = useSites();
    const { getStoreProducts, products, loading } = useProducts();

    const { filter, filtered, reset } = useFilter(products, []);

    const [currentSearch, setCurrentSearch] = useState('');
    const [selectProduct, setSelectProduct] = useState<Product>();

    const [formGroup] = useForm<FilterForm>({
        form: {
            name: new FormControl({ defaultValue: '' }),
        },
        handle: {
            change: (form) => {
                const { name } = form.values;

                if (currentSearch === name) { return; }

                debounce.delay(() => {

                    if (name.length < 4) {
                        reset();
                    } else {
                        filter((user) => slug(user.name).includes(slug(name)));
                    }

                    setCurrentSearch(name);
                }, 500);
            }
        }
    }, []);

    useEffect(() => {
        if (!userSites.length) { return; }

        getProducts();
    }, [userSites]);

    useEffect(() => { setSelectProduct(prev => products.find(p => prev?.id === p.id)); }, [products]);

    const getProducts = () => { getStoreProducts(userSites[0].id); };

    const handleToggleEmptyDrawer = () => {
        setSelectProduct(undefined);
        toggleDrawer();
    };

    const handleToggleEditDrawer = (product: Product) => {
        setSelectProduct(product);
        toggleFindModal();
        toggleDrawer();
    };

    const handleToggleDrawer = (product: Product) => {
        setSelectProduct(product);
        toggleDrawer();
    };

    const resetForm = () => { formGroup.setValues({ name: '' }); };

    return (
        <Page
            title="Produtos"
            subtitle="Essa é a lista de produtos disponíveis na sua loja"
            release={release}
            action={
                <Box>
                    <Stack orientation="row" spacing="small">
                        <Button
                            variant="outlined"
                            onClick={getProducts}
                            startIcon={<Icon name="sync" />}
                        >
                            Recarregar
                        </Button>
                        <Button
                            startIcon={<Icon name="search" />}
                            onClick={handleToggleEmptyDrawer}
                        >
                            Adicionar produto
                        </Button>
                    </Stack>
                </Box>
            }
        >
            {loading && <p>carregando</p>}
            {
                !loading && Boolean(products.length) && (
                    <Stack>
                        <Form formGroup={formGroup}>
                            <Grid sm={12} md={6} lg={5} xl={4}>
                                <GridItem>
                                    <Control
                                        action="onChange"
                                        controlName="name"
                                        field={(control) =>
                                            <Input
                                                fullWidth
                                                type="text"
                                                placeholder="Nome do produto"
                                                startIcon={<Icon name="search" />}
                                                endIcon={
                                                    control.value && (
                                                        <ButtonIcon onClick={resetForm}>
                                                            <Icon name="times" />
                                                        </ButtonIcon>
                                                    )
                                                }
                                                value={control.value}
                                                error={control.isInvalid}
                                                helperText={control.messageError}
                                            />
                                        }
                                    />
                                </GridItem>
                            </Grid>
                        </Form>
                        <ProductTable products={filtered} onToggleDrawer={handleToggleDrawer} />
                    </Stack>
                )
            }
            {
                !loading && !products.length && (
                    <EmptyContent
                        icon="box"
                        message="Nenhum produto foi encontrado"
                    />
                )
            }
            <FormFindProductModal
                isOpen={openFindModal}
                onToggleModal={toggleFindModal}
                onGetProduct={handleToggleEditDrawer}
            />
            <ProductDrawer
                product={selectProduct}
                isOpen={openDrawer}
                onToggleDrawer={toggleDrawer}
            />
        </Page>
    );
}