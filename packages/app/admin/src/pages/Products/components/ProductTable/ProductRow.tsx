import { useMemo } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Switch from '@cda/ui/components/Switch';
import Avatar from '@cda/ui/components/Avatar';
import { useAlert } from '@cda/ui/components/Alert';
import { TableCell } from '@cda/ui/components/Table';
import ButtonIcon from '@cda/ui/components/ButtonIcon';

import { maskCurrency } from '@cda/toolkit/mask';

import type { Product } from '@cda/services/products';

import { useSites } from '@cda/common/Sites';
import { useProducts } from '@cda/common/Products';
import { useIntegrations } from '@cda/common/Integrations';

import './ProductTable.scss';

interface ProductRowProps { product: Product; onToggleDrawer: (product: Product) => void; }
export default function ProductRow({ product, onToggleDrawer }: ProductRowProps) {
    const { addAlert } = useAlert();

    const { userSites } = useSites();
    const { updateProduct } = useProducts();
    const { integrations } = useIntegrations();

    const { store, integration } = useMemo(() => ({
        store: userSites[0],
        integration: integrations.find(i => product.integration === i.id)
    }), []);

    const handleProductVisibility = () => {
        if (!product.url) {
            addAlert({
                color: 'warning',
                icon: <Icon name="exclamation-triangle" />,
                message: 'É preciso adicionar uma url para disponibilizar o produto'
            });
            return;
        }

        updateProduct({ ...product, visible: !product.visible });
    };

    return (
        <>
            <TableCell>
                <Stack orientation="row" alignItems="center" spacing="small">
                    <div className="image-container">
                        <Avatar src={product.images[0]} style={{ width: 45, height: 45 }} />
                    </div>
                    <div className="text-contaier">
                        <span>{product.name}</span>
                    </div>
                    <div className="image-integration-container">
                        <Avatar src={integration?.image} style={{ width: 22, height: 22 }} />
                    </div>
                </Stack>
            </TableCell>
            <TableCell align="center">{store.information.name}</TableCell>
            <TableCell align="center">
                <Stack orientation="row" spacing="small" justifyContent="center" className="price">
                    {
                        Boolean(product.originalPrice) && (
                            <div>
                                <span>{maskCurrency(product.originalPrice * 100)}</span>
                                ~
                            </div>
                        )
                    }
                    {maskCurrency(product.price * 100)}
                </Stack>
            </TableCell>
            <TableCell align="center">
                <Switch
                    auto
                    checked={product.visible}
                    color="secondary"
                    style={{ width: 'fit-content' }}
                    onChange={handleProductVisibility}
                />
            </TableCell>
            <TableCell align="center">
                <ButtonIcon color="text.secondary" onClick={() => onToggleDrawer(product)}>
                    <Icon name="pen" />
                </ButtonIcon>
            </TableCell>
        </>
    );
}