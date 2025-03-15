import { forwardRef } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import { useControl } from '@cda/ui/components/Form';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';

import { capitalize } from '@cda/toolkit/string';

import { Site } from '@cda/services/sites';

export default forwardRef<HTMLDivElement>((_, ref) => {
    const { control, update } = useControl<Site, 'socials'>('socials');

    const handleValue = (key: keyof Site['socials'], value: string) => {
        update({ ...control.value, [key]: value });
    };

    return (
        <Card ref={ref}>
            <CardContent>
                <Stack>
                    <Typography noMargin variant="subtitle1">Redes sociais</Typography>

                    <Grid xl={6} lg={6} md={6} sm={12}>
                        {
                            Object.keys(control.value)
                                .map(key => (
                                    <GridItem key={key}>
                                        <Input
                                            fullWidth
                                            gutterBottom
                                            label={capitalize(key)}
                                            placeholder={key}
                                            data-cy={`${key}-social`}
                                            value={control.value.facebook}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                            startIcon={
                                                <Icon name={key} />
                                            }
                                            onChange={(e) => handleValue(
                                                key as keyof Site['socials'],
                                                e.target.value
                                            )}
                                        />
                                    </GridItem>
                                ))
                        }
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
});