import { forwardRef, useMemo, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, FormControl, Control, useForm } from '@cda/ui/components/Form';

import { Site } from '@cda/services/sites';

import { useSites } from '@cda/common/Sites';

import { url } from '@/services/core';

interface FormProps {
    site?: Site;
    defaultSite: Omit<Site, 'id'>
}

export default forwardRef<HTMLDivElement, FormProps>(({ site, defaultSite }, ref) => {
    const [loading, setLoading] = useState(false);

    const { updateSite } = useSites();

    const siteUrl = useMemo(() => `${url.store}/${site?.slug}`, [site]);

    const [formGroup] = useForm<Site['information']>({
        form: {
            name: new FormControl({
                defaultValue: site?.information.name || defaultSite.information.name,
                required: true
            }),
            title: new FormControl({
                defaultValue: site?.information.title || defaultSite.information.title,
                required: true
            }),
            description: new FormControl({
                defaultValue: site?.information.description || defaultSite.information.description,
                required: true
            }),
        },
        handle: {
            submit: (form) => {
                if (!site) { return; }
                setLoading(true);

                const newSite: Site = { ...site, information: { ...site.information, ...form.values } };

                updateSite(newSite)
                    .finally(() => setLoading(false));
            }
        }
    }, [site]);

    const handleGoToSite = () => { window.open(siteUrl, '_blank'); };

    return (
        <div ref={ref}>
            <Card>
                <CardContent>
                    <Form formGroup={formGroup}>
                        <Stack>
                            <Typography noMargin variant="subtitle1">Informações</Typography>

                            <Grid xl={6} lg={6} md={6} sm={12}>
                                <GridItem>
                                    <Control
                                        controlName="name"
                                        field={(control) => (
                                            <Input
                                                fullWidth
                                                gutterBottom
                                                label="Nome da loja"
                                                placeholder="Nome da loja"
                                                data-cy="name-information"
                                                value={control.value}
                                                error={control.isInvalid}
                                                helperText={control.messageError}
                                            />
                                        )}
                                    />
                                </GridItem>
                                <GridItem xl={6} lg={6} md={6} sm={12}>
                                    <Input
                                        fullWidth
                                        readOnly
                                        gutterBottom
                                        label="Link do site"
                                        data-cy="link-information"
                                        value={siteUrl}
                                        endIcon={
                                            <ButtonIcon onClick={handleGoToSite}>
                                                <Icon name="external-link-alt" />
                                            </ButtonIcon>
                                        }
                                    />
                                </GridItem>
                                <GridItem xl={6} lg={6} md={6} sm={12}>
                                    <Control
                                        controlName="title"
                                        field={(control) => (
                                            <Input
                                                fullWidth
                                                readOnly
                                                gutterBottom
                                                label="Título"
                                                data-cy="title-information"
                                                value={control.value}
                                            />
                                        )}
                                    />
                                </GridItem>
                                <GridItem xl={6} lg={6} md={6} sm={12}>
                                    <Control
                                        controlName="description"
                                        field={(control) => (
                                            <Input
                                                fullWidth
                                                gutterBottom
                                                label="Descrição"
                                                placeholder="Descrição do site"
                                                data-cy="description-information"
                                                value={control.value.description}
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