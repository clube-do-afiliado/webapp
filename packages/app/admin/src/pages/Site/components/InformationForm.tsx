import { forwardRef } from 'react';

import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Control, useControl } from '@cda/ui/components/Form';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import Icon from '@cda/ui/components/Icon';

import { Site } from '@cda/services/sites';

export default forwardRef<HTMLDivElement>((_, ref) => {
    const { control, update } = useControl<Site, 'information'>('information');

    const handleValue = (key: keyof Site['information'], value: string) => {
        update({ ...control.value, [key]: value });
    };

    const handleGoToSite = () => {
        console.log('Ir para o site');
    };

    return (
        <Card ref={ref}>
            <CardContent>
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
                                value="https://divulgador.app/promodoleozin"
                                endIcon={
                                    <ButtonIcon onClick={handleGoToSite}>
                                        <Icon name="external-link-alt" />
                                    </ButtonIcon>
                                }
                                onChange={(e) => handleValue('title', e.target.value)}
                            />
                        </GridItem>
                        <GridItem xl={6} lg={6} md={6} sm={12}>
                            <Input
                                fullWidth
                                gutterBottom
                                label="Título"
                                placeholder="Título do site"
                                data-cy="title-information"
                                value={control.value.title}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                onChange={(e) => handleValue('title', e.target.value)}
                            />
                        </GridItem>
                        <GridItem xl={6} lg={6} md={6} sm={12}>
                            <Input
                                fullWidth
                                gutterBottom
                                label="Descrição"
                                placeholder="Descrição do site"
                                data-cy="description-information"
                                value={control.value.description}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                onChange={(e) => handleValue('description', e.target.value)}
                            />
                        </GridItem>
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
});