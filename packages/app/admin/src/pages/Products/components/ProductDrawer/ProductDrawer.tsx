import { useEffect, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Tooltip from '@cda/ui/components/Tooltip';
import Loading from '@cda/ui/components/Loading';
import { useModal } from '@cda/ui/components/Modal';
import Typography from '@cda/ui/components/Typography';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { Tab, TabContent, Tabs, useTabs } from '@cda/ui/components/Tabs';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@cda/ui/components/Drawer';

import { Product } from '@cda/services/products';

import { useSites } from '@cda/common/Sites';
import { AccessControl } from '@cda/common/AccessControl';

import { url } from '@/services/core';
import SharedModal from '@/components/SharedModal';

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
    const [openSharedModal, toggleSharedModal] = useModal();

    const { userSites } = useSites();

    const [formGroup] = useProductForm(product, onToggleDrawer);

    const [loading, setLoading] = useState(false);

    const site = userSites[0];

    const productUrl = `${url.store}/${site?.slug}/produtos/${product?.slug}`;
    const shortUrl = `${url.promo}/${product?.shortUrl}`;

    useEffect(() => {
        if (isOpen) { return; }

        formGroup.reset();
        setLoading(false);
        setTab(0);
    }, [isOpen]);

    const goToStore = () => { window.open(productUrl, '_blank'); };

    const handleSubmit = () => {
        if (formGroup.isValid) { setLoading(true); }
        formGroup.submit();
    };

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
                                            <AccessControl
                                                permissions={['templates:*']}
                                                component={(allowed) => (
                                                    allowed && (
                                                        <Tooltip label="Gerar arte">
                                                            <ButtonIcon color="text.secondary">
                                                                <Icon name="palette" />
                                                            </ButtonIcon>
                                                        </Tooltip>
                                                    )
                                                )}
                                            />
                                            {
                                                product.visible && (
                                                    <Tooltip label="Compartilhar">
                                                        <ButtonIcon color="text.secondary" onClick={toggleSharedModal}>
                                                            <Icon name="share-alt" />
                                                        </ButtonIcon>
                                                    </Tooltip>
                                                )
                                            }
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
                            {
                                product && (
                                    <TabContent current={current} value={1}>
                                        <ProductStatistics product={product} site={site} />
                                    </TabContent>
                                )
                            }
                        </Stack>
                    </DrawerContent>
                }
                footer={
                    <DrawerFooter>
                        <Stack orientation="row" justifyContent="center">
                            <Button
                                startIcon={<Icon name="save" />}
                                onClick={handleSubmit}
                                loading={loading && <Loading />}
                            >
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
            <SharedModal
                url={shortUrl}
                isOpen={openSharedModal}
                onToggleModal={toggleSharedModal}
            />
        </>
    );
}