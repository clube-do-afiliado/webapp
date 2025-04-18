import { forwardRef, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, FormControl, Control, useForm } from '@cda/ui/components/Form';

import { capitalize } from '@cda/toolkit/string';

import { Site } from '@cda/services/sites';

import { useSites } from '@cda/common/Sites';

interface FormProps {
    site?: Site;
    defaultSite: Omit<Site, 'id'>
}

export default forwardRef<HTMLDivElement, FormProps>(({ site, defaultSite }, ref) => {
    const [loading, setLoading] = useState(false);

    const { updateUserSite } = useSites();

    const [formGroup] = useForm<Partial<Site['socials']>>({
        form: {
            ...Object.entries(site?.socials || defaultSite.socials)
                .reduce((acc, [key, value]) => {
                    acc[key] = new FormControl({ defaultValue: value });

                    return acc;
                }, {})
        },
        handle: {
            submit: (form) => {
                if (!site) { return; }
                setLoading(true);

                const newSite: Site = { ...site, socials: { ...site.socials, ...form.values } };

                updateUserSite(newSite)
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
                            <Typography noMargin variant="subtitle1">Redes sociais</Typography>

                            <Grid xl={6} lg={6} md={6} sm={12}>
                                {
                                    Object.keys(defaultSite.socials)
                                        .map(key => (
                                            <GridItem key={key}>
                                                <Control
                                                    controlName={key}
                                                    field={(control) => (
                                                        <Input
                                                            fullWidth
                                                            gutterBottom
                                                            label={capitalize(key)}
                                                            placeholder={key}
                                                            data-cy={`${key}-social`}
                                                            value={control.value}
                                                            error={control.isInvalid}
                                                            helperText={control.messageError}
                                                            startIcon={
                                                                <Icon name={key} />
                                                            }
                                                        />
                                                    )}
                                                />
                                            </GridItem>
                                        ))
                                }
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