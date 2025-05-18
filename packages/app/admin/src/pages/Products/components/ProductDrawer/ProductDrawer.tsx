import { useEffect } from 'react';

import copy from 'copy-to-clipboard';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Tooltip from '@cda/ui/components/Tooltip';
import { useModal } from '@cda/ui/components/Modal';
import { useAlert } from '@cda/ui/components/Alert';
import Typography from '@cda/ui/components/Typography';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Tab, TabContent, Tabs, useTabs } from '@cda/ui/components/Tabs';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps, useDrawer } from '@cda/ui/components/Drawer';

import { Product } from '@cda/services/products';
import { SOURCE_MAP } from '@cda/services/events';

import { useSites } from '@cda/common/Sites';

import { url } from '@/services/core';

import useProductForm from './useProductForm';
import ProductInfoForm from './ProductInfoForm';
import ProductStatistics from './ProductStatistics';
import DeleteProductModal from '../DeleteProductModal';

import './ProductDrawer.scss';

export default function ProductDrawer({
    isOpen,
    product,
    onToggleDrawer
}: HelperDrawerProps<{ product?: Product }>) {
    const { current, setTab } = useTabs(0);
    const [open, toggleModal] = useModal();
    const [openShareDrawer, toggleShareDrawer] = useDrawer();
    const { addAlert } = useAlert();

    const { userSites } = useSites();

    const [formGroup] = useProductForm(product, onToggleDrawer);

    const site = userSites[0];

    const productUrl = `${url.store}/${site?.slug}/produtos/${product?.slug}`;

    useEffect(() => {
        if (isOpen) { return; }

        formGroup.reset();
        setTab(0);
    }, [isOpen]);

    const goToStore = () => {
        window.open(productUrl, '_blank');
    };

    const handleSubmit = () => { formGroup.submit(); };

    const copyUrl = (source: EventSource) => {
        addAlert({ message: 'Url copiada', color: 'success' });
        toggleShareDrawer();
        copy(`${productUrl}?utm_source=${source}`);
    };

    if (!product) { return; }
    if (!site) { return; }

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
                                        style={{ backgroundColor: 'transparent' }}
                                    />
                                    <Typography noMargin variant="h6" className="title">
                                        {formGroup.values.name}
                                    </Typography>
                                </Stack>
                                {
                                    product && (
                                        <>
                                            <Tooltip label="Excluir">
                                                <ButtonIcon color="error.main" onClick={toggleModal}>
                                                    <Icon name="trash" />
                                                </ButtonIcon>
                                            </Tooltip>
                                            <Tooltip label="Gerar arte">
                                                <ButtonIcon color="text.secondary">
                                                    <Icon name="palette" />
                                                </ButtonIcon>
                                            </Tooltip>
                                            <Tooltip label="Compartilhar">
                                                <ButtonIcon color="text.secondary" onClick={toggleShareDrawer}>
                                                    <Icon name="share-alt" />
                                                </ButtonIcon>
                                            </Tooltip>
                                            <Tooltip label="Ver na loja">
                                                <ButtonIcon onClick={goToStore} color="text.secondary">
                                                    <Icon name="external-link-alt" />
                                                </ButtonIcon>
                                            </Tooltip>
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
                                <ProductStatistics product={product} site={site} />
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
            <Drawer
                orientation="bottom"
                open={openShareDrawer}
                onClose={toggleShareDrawer}
                body={
                    <DrawerContent>
                        <Stack spacing="small">
                            {
                                Object.entries(SOURCE_MAP).map(([key, value]) => (
                                    <Button
                                        key={key}
                                        startIcon={<Icon name={key} />}
                                        style={{ background: value.color }}
                                        onClick={() => copyUrl(key as unknown as EventSource)}
                                    >
                                        {value.label}
                                    </Button>
                                ))
                            }
                        </Stack>
                    </DrawerContent>
                }
            />
        </>
    );
}