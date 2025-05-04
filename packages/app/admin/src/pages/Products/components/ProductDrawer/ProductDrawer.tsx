import { useEffect } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import { useModal } from '@cda/ui/components/Modal';
import Typography from '@cda/ui/components/Typography';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Tab, TabContent, Tabs, useTabs } from '@cda/ui/components/Tabs';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@cda/ui/components/Drawer';

import { Product } from '@cda/services/products';

import { useProducts } from '@cda/common/Products';

import useProductForm from './useProductForm';
import ProductInfoForm from './ProductInfoForm';
import DeleteProductModal from '../DeleteProductModal';

import './ProductDrawer.scss';

export default function ProductDrawer({
    isOpen,
    product,
    onToggleDrawer
}: HelperDrawerProps<{ product?: Product }>) {
    const { current, setTab } = useTabs(0);
    const [open, toggleModal] = useModal();

    const { updateProduct } = useProducts();

    const [formGroup] = useProductForm(product, onToggleDrawer);

    useEffect(() => { if (!isOpen) { formGroup.reset(); } }, [isOpen]);

    const goToStore = () => { };

    const toggleVisibility = () => {
        if (!product) { return; }

        updateProduct({ ...product, visible: !product?.visible });
    };

    const handleSubmit = () => { formGroup.submit(); };

    return (
        <>
            <Drawer
                orientation="right"
                open={isOpen}
                onClose={onToggleDrawer}
                body={
                    <DrawerContent className="product-drawer">
                        <Stack orientation="column" spacing="medium">
                            <Stack orientation="row" justifyContent="space-between" alignItems="center">
                                <Stack orientation="row" alignItems="center">
                                    <Avatar
                                        src={formGroup.values.image}
                                        icon={<Icon name="shopping-basket" color="text.secondary" />}
                                    />
                                    <Typography noMargin variant="h6" className="title">
                                        {formGroup.values.name}
                                    </Typography>
                                </Stack>
                                {
                                    product && (
                                        <>
                                            <ButtonIcon color="error.main" onClick={toggleModal}>
                                                <Icon name="trash" />
                                            </ButtonIcon>
                                            <ButtonIcon onClick={toggleVisibility} color="text.secondary">
                                                <Icon name={product.visible ? 'eye' : 'eye-slash'} />
                                            </ButtonIcon>
                                            <ButtonIcon onClick={goToStore} color="text.secondary">
                                                <Icon name="external-link-alt" />
                                            </ButtonIcon>
                                        </>
                                    )
                                }
                            </Stack>

                            <Tabs onChange={setTab} current={current}>
                                <Tab label="Informações" icon={<Icon name="notes" />} />
                                <Tab label="Análise" icon={<Icon name="chart" />} disabled={!product} />
                            </Tabs>
                            <TabContent current={current} value={0}>
                                <ProductInfoForm formGroup={formGroup} />
                            </TabContent>
                            <TabContent current={current} value={1}>
                                <p>BBBB</p>
                            </TabContent>
                        </Stack>
                    </DrawerContent>
                }
                footer={
                    <DrawerFooter>
                        <Stack orientation="row" justifyContent="center">
                            <Button startIcon={<Icon name="save" />} onClick={handleSubmit} >
                                Salvar
                            </Button>
                        </Stack>
                    </DrawerFooter>
                }
            />
            <DeleteProductModal
                isOpen={open}
                product={product}
                onToggleModal={toggleModal}
                onToggleDrawer={onToggleDrawer}
            />
        </>
    );
}