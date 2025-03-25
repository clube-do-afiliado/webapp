import { useState } from 'react';

import { joinClass } from '@cda/ui/utils';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { useControl } from '@cda/ui/components/Form';
import Typography from '@cda/ui/components/Typography';

import './ProductDrawer.scss';
import Ripple from '@cda/ui/components/Ripple';
import Avatar from '@cda/ui/components/Avatar';
import Icon from '@cda/ui/components/Icon';

import { useIntegrations } from '@cda/common/Integrations';

import type { ProductForm } from './interface';

export default function IntegrationRadio() {
    const { control, update } = useControl<ProductForm, 'integration'>('integration');

    const { integrations } = useIntegrations();

    const [value, setValue] = useState<string>(control.value);

    const handleSelect = (integration: string) => {
        setValue(integration);
        update(integration);
    };

    return (
        <Grid>
            <GridItem xl={12}>
                <Typography noMargin variant="body2" color="text.secondary">Loja</Typography>
            </GridItem>
            {
                integrations.map(i => (
                    <GridItem key={i.id}>
                        <div
                            className={joinClass([
                                'integration-radio',
                                value === i.id && 'integration-radio--active'
                            ])}
                            onClick={() => handleSelect(i.id)}
                        >
                            <Avatar src={i.image} />
                            <Ripple />
                        </div>
                    </GridItem>
                ))
            }
        </Grid>
    );
}