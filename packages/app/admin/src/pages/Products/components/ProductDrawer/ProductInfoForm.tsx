import Input from '@cda/ui/components/Input';
import { Form, Control, FormGroup } from '@cda/ui/components/Form';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Select, Option } from '@cda/ui/components/Select';

import { useSites } from '@cda/common/Sites';

import TagsInput from './TagsInput';
import IntegrationRadio from './IntegrationRadio';
import type { ProductForm } from './interface';

interface ProductInfoProps { formGroup: FormGroup<ProductForm> }
export default function ProductInfoForm({ formGroup }: ProductInfoProps) {
    const { userSites } = useSites();

    return (
        <Form formGroup={formGroup}>
            <Grid>
                <GridItem xl={12}>
                    <Control
                        controlName="storeId"
                        field={(control) => (
                            <Select
                                fullWidth
                                disabled
                                label="Loja"
                                placeholder="Selecione um valor"
                                value={control.value}
                            >
                                {
                                    userSites.map(site => (
                                        <Option key={site.id} value={site.id}>
                                            {site.information.name}
                                        </Option>
                                    ))
                                }
                            </Select>
                        )}
                    />
                </GridItem>
                <GridItem xl={12}>
                    <Control
                        controlName="url"
                        field={(control) => (
                            <Input
                                fullWidth
                                label="Url do produto"
                                data-cy="url-product"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                </GridItem>
                <GridItem xl={12}>
                    <Control
                        controlName="name"
                        field={(control) => (
                            <Input
                                fullWidth
                                label="Nome do produto"
                                data-cy="name-product"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                </GridItem>
                <GridItem xl={12}>
                    <Control
                        controlName="image"
                        field={(control) => (
                            <Input
                                fullWidth
                                label="Imagem"
                                data-cy="name-image"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                </GridItem>
                <GridItem xl={6} md={12}>
                    <Control
                        controlName="price"
                        field={(control) => (
                            <Input
                                fullWidth
                                label="Preço com desconto"
                                data-cy="price-product"
                                value={control.masked}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                </GridItem>
                <GridItem xl={6} md={12}>
                    <Control
                        controlName="originalPrice"
                        field={(control) => (
                            <Input
                                fullWidth
                                label="Preço original"
                                data-cy="original-price-product"
                                value={control.masked}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                </GridItem>
                <GridItem xl={12}>
                    <TagsInput />
                </GridItem>
                <GridItem xl={12}>
                    <IntegrationRadio />
                </GridItem>
            </Grid>
        </Form>
    );
}