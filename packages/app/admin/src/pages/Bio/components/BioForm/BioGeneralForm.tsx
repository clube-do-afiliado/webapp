import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';
import Input from '@cda/ui/components/Input';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';

export default function BioGeneralForm() {
    const [formGroup] = useForm({
        form: {
            title: new FormControl({ defaultValue: '' }),
            presentation: new FormControl({ defaultValue: '' }),
        },
        handle: {

        }
    }, []);

    return (
        <Stack spacing="small">
            <Typography noMargin variant="subtitle1">Geral</Typography>
            <Card>
                <CardContent>
                    <Form formGroup={formGroup}>
                        <Stack spacing="small" alignItems="center">
                            <Avatar
                                icon={<Icon name="store" style={{ fontSize: 40 }} />}
                                style={{ width: 80, height: 80 }}
                            />
                            <Control
                                controlName="title"
                                field={(control) => (
                                    <Input
                                        fullWidth
                                        label="Título"
                                        value={control.value}
                                        error={control.isInvalid}
                                        helperText={control.messageError}
                                    />
                                )}
                            />
                            <Control
                                controlName="presentation"
                                field={(control) => (
                                    <Input
                                        fullWidth
                                        label="Apresentação"
                                        value={control.value}
                                        error={control.isInvalid}
                                        helperText={control.messageError || 'Cupons de desconto e ofertas'}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack orientation="row" justifyContent="flex-end">
                            <Button type="submit">Salvar</Button>
                        </Stack>
                    </Form>
                </CardContent>
            </Card>
        </Stack>
    );
}