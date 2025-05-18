import { useState } from 'react';

import Input from '@cda/ui/components/Input';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import InputFile from '@cda/ui/components/InputFile';
import Typography from '@cda/ui/components/Typography';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';
import { Modal, ModalFooter, HelperModalProps } from '@cda/ui/components/Modal';

import { generateBytesSize } from '@cda/toolkit/file';

import Storage from '@cda/services/storage';
import type { UserData } from '@cda/services/user';

interface Form {
    images: File[];
}

interface EditProfileModalProps {
    storage: Storage;
}
export default function BioLinkModal({
    storage,
    isOpen,
    onToggleModal,
}: HelperModalProps<EditProfileModalProps>) {
    const [loading, setLoading] = useState(false);

    const [formGroup] = useForm<Form>({
        form: {
            images: new FormControl({ defaultValue: [] }),
        },
        handle: {
            submit: async (form) => {
                console.log(form.values);
            }
        }
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>Adicionar imagem</Typography>
            }
            onClose={onToggleModal}
        >
            <Form formGroup={formGroup}>
                <Stack>
                    <Control
                        controlName="images"
                        action="onChange"
                        type="object"
                        field={(control) => (
                            <InputFile
                                maxSize={generateBytesSize(100, 'KB')}
                                files={control.value}
                                error={control.isInvalid}
                                helperText={control.error || 'Tamanho máximo 30BK'}
                            />
                        )}
                    />
                    <ModalFooter>
                        <Button
                            type="button"
                            variant="text"
                            color="primary"
                            onClick={onToggleModal}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            loading={loading && <Loading />}
                        >
                            Salvar
                        </Button>
                    </ModalFooter>
                </Stack>
            </Form>
        </Modal>
    );
}