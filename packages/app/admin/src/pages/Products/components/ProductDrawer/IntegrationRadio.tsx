import { useState } from 'react';

import { joinClass } from '@cda/ui/utils';
import Ripple from '@cda/ui/components/Ripple';
import Avatar from '@cda/ui/components/Avatar';
import Tooltip from '@cda/ui/components/Tooltip';
import Typography from '@cda/ui/components/Typography';
import { useControl } from '@cda/ui/components/Form';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import { useIntegrations } from '@cda/common/Integrations';
import './ProductDrawer.scss';

import type { ProductForm } from './interface';

export default function IntegrationRadio() {
    const { control, update } = useControl<ProductForm, 'integration'>('integration');

    const { integrations } = useIntegrations();

    const [value, setValue] = useState<string>(control.value);

    const handleSelect = (integration: string) => {
        console.log(integration);
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
                        <Tooltip label={i.name} direction="bottom">
                            <div
                                style={{ position: 'relative', cursor: 'pointer' }}
                                onMouseUp={() => handleSelect(i.id)}
                            >
                                <Avatar
                                    src={i.image}
                                    className={joinClass([
                                        'integration-radio',
                                        value === i.id && 'integration-radio--active'
                                    ])}

                                />
                                <Ripple />
                            </div>
                        </Tooltip>
                    </GridItem>
                ))
            }
        </Grid>
    );
}