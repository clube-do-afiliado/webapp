import { useEffect, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import { Menu, MenuButton, useMenu } from '@cda/ui/components/Menu';
import { useModal } from '@cda/ui/components/Modal';
import { useDrawer } from '@cda/ui/components/Drawer';

import type { Product } from '@cda/services/products';

import { EmptyContent } from '@cda/common/EmptyContent';
import { useProducts } from '@cda/common/Products';

import { release } from '@/services/core';

import ProductTable from './components/ProductTable';
import ProductDrawer from './components/ProductDrawer';
import FormFindProductModal from './components/FormFindProductModal';

export default function Products() {
    const [open, el, , toggle] = useMenu();
    const [openDrawer, toggleDrawer] = useDrawer();
    const [openFindModal, toggleFindModal] = useModal();

    const { getProducts, products, loading } = useProducts();

    const [selectProduct, setSelectProduct] = useState<Product>();

    useEffect(() => { getProducts(); }, []);

    useEffect(() => { setSelectProduct(prev => products.find(p => prev?.id === p.id)); }, [products]);

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

    return (
        <Page
            title="Produtos"
            subtitle="Essa é a lista de produtos disponíveis na sua loja"
            release={release}
            action={
                <div>
                    <Button
                        onClick={toggle}
                        startIcon={<Icon name="search" />}
                    >
                        Adicionar produto
                    </Button>
                    <Menu
                        autoClose
                        open={open}
                        anchorEl={el}
                        onClose={toggle}
                        direction="right"
                        width="fit-content"
                    >
                        <MenuButton
                            label="Buscar produto"
                            icon={<Icon name="search" />}
                            onClick={toggleFindModal}
                        />
                        <MenuButton
                            label="Inserir manualmente"
                            icon={<Icon name="keyboard" />}
                            onClick={handleToggleEmptyDrawer}
                        />
                    </Menu>
                </div>
            }
        >
            {loading && <p>carregando</p>}
            {
                !loading && Boolean(products.length) && (
                    <ProductTable products={products} onToggleDrawer={handleToggleDrawer} />
                )
            }
            {
                !loading && !products.length && (
                    <EmptyContent
                        icon="channel"
                        message="Nenhuma integração foi encontrada"
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