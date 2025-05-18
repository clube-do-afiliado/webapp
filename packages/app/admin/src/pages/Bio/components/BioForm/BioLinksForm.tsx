import Icon from '@cda/ui/components/Icon';
import Input from '@cda/ui/components/Input';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { useModal } from '@cda/ui/components/Modal';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';

import { storage } from '@/services/core';

import BioLinkModal from './BioLinkModal';

function LinkForm() {
    const [open, toggle] = useModal();

    const [formGroup] = useForm({
        form: {
            name: new FormControl({ defaultValue: '' }),
            link: new FormControl({ defaultValue: '' }),
        },
        handle: {

        }
    }, []);

    return (
        <div>
            <Card>
                <CardContent>
                    <Stack orientation="row" alignItems="center">
                        <ButtonIcon color="text.secondary">
                            <Icon name="draggabledots" />
                        </ButtonIcon>
                        <Form formGroup={formGroup} style={{ width: '100%' }}>
                            <Stack spacing="small">
                                <Control
                                    controlName="name"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            label="Nome do link"
                                            value={control.value}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                        />
                                    )}
                                />
                                <Control
                                    controlName="link"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            label="Url"
                                            placeholder="ex: https://meulink.com"
                                            value={control.value}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                        />
                                    )}
                                />
                                <Stack orientation="row" justifyContent="space-between">
                                    <Stack orientation="row" spacing="small">
                                        <ButtonIcon type="button" color="text.secondary">
                                            <Icon name="image-plus" />
                                        </ButtonIcon>
                                        <ButtonIcon type="button" color="text.secondary" onClick={toggle}>
                                            <Icon name="camera-plus" />
                                        </ButtonIcon>
                                    </Stack>
                                    <ButtonIcon type="button" color="error.main">
                                        <Icon name="trash" />
                                    </ButtonIcon>
                                </Stack>
                            </Stack>
                        </Form>
                    </Stack>
                </CardContent>
            </Card>

            <BioLinkModal isOpen={open} onToggleModal={toggle} storage={storage} />
        </div>
    );
}

export default function BioLinksForm() {
    return (
        <Stack spacing="small">
            <Stack orientation="row" justifyContent="space-between" alignItems="center">
                <Typography noMargin variant="subtitle1">Meus links</Typography>
                <Button
                    variant="outlined"
                    startIcon={<Icon name="plus" />}
                >
                    Adicionar link
                </Button>
            </Stack>
            <LinkForm />
        </Stack>
    );
}