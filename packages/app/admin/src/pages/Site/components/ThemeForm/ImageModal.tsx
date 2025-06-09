import { useEffect, useState } from 'react';

import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import InputFile from '@cda/ui/components/InputFile';
import Typography from '@cda/ui/components/Typography';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';
import { HelperModalProps, Modal, ModalFooter } from '@cda/ui/components/Modal';

import { generateBytesSize } from '@cda/toolkit/file';

import { storage } from '@/services/core';

type Ref = 'favicon' | 'logo';

export default function ImageModal({ isOpen, siteId, reference, onSave, onToggleModal }: HelperModalProps<{
    reference?: Ref;
    siteId: string;
    onSave: (url: string) => void;
}>) {
    const [loading, setLoading] = useState(false);

    const [formGroup] = useForm<{ images: File[] }>({
        form: {
            images: new FormControl({ defaultValue: [], required: true }),
        },
        handle: {
            submit: (form) => {
                const { images } = form.values;

                const image = images[0];

                const [extension] = image.name.split('.').reverse();
                const nameImage = `${reference}.${extension}`;

                setLoading(true);

                storage.upload({
                    file: image,
                    path: `${siteId}/${nameImage}`
                })
                    .then(onSave)
                    .finally(() => setLoading(false));
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
                                maxSize={generateBytesSize(100, 'KB')}
                                files={control.value}
                                error={control.isInvalid}
                                helperText={control.error || 'Tamanho máximo 30BK'}
                            />
                        )}
                    />
                    <ModalFooter>
                        <Button variant="outlined">Cancelar</Button>
                        <Button
                            type="submit"
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