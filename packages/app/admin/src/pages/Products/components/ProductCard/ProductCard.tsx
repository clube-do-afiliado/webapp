import { useMemo } from 'react';

import { Card, CardContent } from '@cda/ui/components/Card';
import Typography from '@cda/ui/components/Typography';

import './ProductCard.scss';
import Chip from '@cda/ui/components/Chip';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import ButtonIcon from '@cda/ui/components/ButtonIcon';

import { maskCurrency } from '@cda/toolkit/mask';

import type { Product } from '@cda/services/products';

import { useIntegrations } from '@cda/common/Integrations';

interface PlanCardProps { product: Product; onClick: () => void; }
export default function PlanCard({ product, onClick }: PlanCardProps) {
    const { integrations } = useIntegrations();

    const intagration = useMemo(() => integrations.find(i => product.integration === i.id), [product]);

    return (
        <Card className="product-card">
            <CardContent>
                <Stack>
                    <Stack orientation="row" justifyContent="space-between" alignItems="center">
                        <Chip label="5.4" size="small" icon={<Icon name="star" />} color="warning" />

                        <ButtonIcon color="error.main">
                            <Icon name="heart" />
                        </ButtonIcon>
                    </Stack>
                    <div className="top-container">
                        <div className="image-container">
                            <img loading="lazy" src={product.images[0]} alt={product.name} />
                        </div>
                        <div className="integration">
                            <img loading="lazy" src={intagration?.image} alt={intagration?.name} />
                        </div>
                    </div>
                    <div className="bottom-container">
                        <Typography noMargin variant="body2" className="title">{product.name}</Typography>
                        <Typography noMargin variant="h5" color="secondary.main">
                            {maskCurrency(product.price * 100)}
                        </Typography>
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
}