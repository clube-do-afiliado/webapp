import { useEffect } from 'react';

import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import InputFile from '@cda/ui/components/InputFile';
import Typography from '@cda/ui/components/Typography';
import { HelperModalProps, Modal, ModalFooter } from '@cda/ui/components/Modal';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';

import { generateBytesSize } from '@cda/toolkit/file';

import { storage } from '@/services/core';

export default function ImageModal({ isOpen, onToggleModal }: HelperModalProps) {
    const [formGroup] = useForm<{ images: File[] }>({
        form: {
            images: new FormControl({ defaultValue: [], required: true }),
        },
        handle: {
            submit: (form) => {
                const { images } = form.values;

                const image = images[0];

                storage.upload({
                    file: image,
                    path: `teste/${image.name}`
                });
            }
        }
    }, []);

    useEffect(() => { if (!isOpen) { formGroup.reset(); } }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    Adicionar imagem
                </Typography>
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
                                maxSize={generateBytesSize(30, 'KB')}
                                files={control.value}
                                error={control.isInvalid}
                                helperText={control.error || 'Tamanho máximo 30BK'}
                            />
                        )}
                    />
                    <ModalFooter>
                        <Button variant="outlined">Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </ModalFooter>
                </Stack>
            </Form>

        </Modal>
    );
}