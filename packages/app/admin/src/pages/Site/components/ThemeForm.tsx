import { forwardRef, useState } from 'react';

import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import ColorPicker from '@cda/ui/components/ColorPicker';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, FormControl, Control, useForm } from '@cda/ui/components/Form';

import { Site } from '@cda/services/sites';

import { useSites } from '@cda/common/Sites';

interface FormProps {
    site?: Site;
    defaultSite: Omit<Site, 'id'>
}

export default forwardRef<HTMLDivElement, FormProps>(({ site, defaultSite }, ref) => {
    const [loading, setLoading] = useState(false);

    const { updateSite } = useSites();

    const [formGroup] = useForm<Partial<Site['theme']>>({
        form: {
            primaryColor: new FormControl({
                defaultValue: site?.theme.primaryColor || defaultSite.theme.primaryColor,
                required: true
            }),
            secondaryColor: new FormControl({
                defaultValue: site?.theme.secondaryColor || defaultSite.theme.secondaryColor,
                required: true
            }),
            headerColor: new FormControl({
                defaultValue: site?.theme.headerColor || defaultSite.theme.headerColor,
                required: true
            }),
        },
        handle: {
            submit: (form) => {
                if (!site) { return; }
                setLoading(true);

                const newSite: Site = { ...site, theme: { ...site.theme, ...form.values } };

                updateSite(newSite)
                    .finally(() => setLoading(false));
            }
        }
    }, [site]);

    return (
        <div ref={ref}>
            <Card>
                <CardContent>
                    <Form formGroup={formGroup}>
                        <Stack>
                            <Typography noMargin variant="subtitle1">Tema</Typography>

                            <Grid xl={6} lg={6} md={6} sm={12}>
                                <GridItem>
                                    <Control
                                        controlName="primaryColor"
                                        field={(control) => (
                                            <ColorPicker
                                                fullWidth
                                                gutterBottom
                                                label="Cor primária"
                                                placeholder="Cor primária"
                                                data-cy="primary-theme"
                                                value={control.value}
                                                error={control.isInvalid}
                                                helperText={control.messageError}
                                            />
                                        )}
                                    />
                                </GridItem>
                                <GridItem>
                                    <Control
                                        controlName="secondaryColor"
                                        field={(control) => (
                                            <ColorPicker
                                                fullWidth
                                                gutterBottom
                                                label="Cor secundária"
                                                placeholder="Cor secundária"
                                                data-cy="secondary-theme"
                                                value={control.value}
                                                error={control.isInvalid}
                                                helperText={control.messageError}
                                            />
                                        )}
                                    />
                                </GridItem>
                                <GridItem>
                                    <Control
                                        controlName="secondaryColor"
                                        field={(control) => (
                                            <ColorPicker
                                                fullWidth
                                                gutterBottom
                                                label="Cor do header"
                                                placeholder="Cor do header"
                                                data-cy="header-theme"
                                                value={control.value}
                                                error={control.isInvalid}
                                                helperText={control.messageError}
                                            />
                                        )}
                                    />
                                </GridItem>
                                <GridItem xl={12} lg={12} md={12} sm={12} textAlign="right">
                                    <Button
                                        type="submit"
                                        loading={loading && <Loading />}
                                    >
                                        Salvar
                                    </Button>
                                </GridItem>
                            </Grid>
                        </Stack>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
});