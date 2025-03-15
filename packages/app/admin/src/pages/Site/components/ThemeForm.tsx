import { forwardRef } from 'react';

import Stack from '@cda/ui/components/Stack';
import { useControl } from '@cda/ui/components/Form';
import Typography from '@cda/ui/components/Typography';
import ColorPicker from '@cda/ui/components/ColorPicker';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';

import { Site } from '@cda/services/sites';

export default forwardRef<HTMLDivElement>((_, ref) => {
    const { control, update } = useControl<Site, 'theme'>('theme');

    const handleValue = (key: keyof Site['theme'], value: string) => {
        update({ ...control.value, [key]: value });
    };

    return (
        <Card ref={ref}>
            <CardContent>
                <Stack>
                    <Typography noMargin variant="subtitle1">Tema</Typography>

                    <Grid xl={6} lg={6} md={6} sm={12}>
                        <GridItem>
                            <ColorPicker
                                fullWidth
                                gutterBottom
                                label="Cor primária"
                                placeholder="Cor primária"
                                data-cy="primary-theme"
                                value={control.value.primaryColor}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                onChange={(e) => handleValue('primaryColor', e.target.value)}
                            />
                        </GridItem>
                        <GridItem>
                            <ColorPicker
                                fullWidth
                                gutterBottom
                                label="Cor secundária"
                                placeholder="Cor secundária"
                                data-cy="secondary-theme"
                                value={control.value.secondaryColor}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                onChange={(e) => handleValue('secondaryColor', e.target.value)}
                            />
                        </GridItem>
                        <GridItem>
                            <ColorPicker
                                fullWidth
                                gutterBottom
                                label="Cor do header"
                                placeholder="Cor do header"
                                data-cy="header-theme"
                                value={control.value.headerColor}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                onChange={(e) => handleValue('headerColor', e.target.value)}
                            />
                        </GridItem>
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
});