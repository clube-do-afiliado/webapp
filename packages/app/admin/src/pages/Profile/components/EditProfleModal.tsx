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

import { useAuth } from '@cda/common/Auth';
import { useUser } from '@cda/common/User';

interface Form {
    name: string;
    images: File[];
}

interface EditProfileModalProps {
    user: UserData;
    storage: Storage;
}
export default function EditProfileModal({
    user,
    storage,
    isOpen,
    onToggleModal,
}: HelperModalProps<EditProfileModalProps>) {
    const [loading, setLoading] = useState(false);

    const { updateUser } = useUser();

    const { updateAuthenticatedUser } = useAuth();

    const [formGroup] = useForm<Form>({
        form: {
            name: new FormControl({ defaultValue: user.name }),
            images: new FormControl({ defaultValue: [] }),
        },
        handle: {
            submit: async (form) => {
                setLoading(true);

                let url = user.picture;

                const { name, images } = form.values;

                const image = images[0];
                const [extension] = image.name.split('.').reverse();
                const nameImage = `profile.${extension}`;

                if (image) {
                    url = await storage.upload({
                        file: image,
                        path: `${user.id}/${nameImage}`
                    });
                }

                const newUser = { ...user, name, picture: url };

                updateUser(newUser)
                    .then(() => updateAuthenticatedUser(newUser))
                    .then(onToggleModal)
                    .finally(() => setLoading(false));
            }
        }
    }, [user]);

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>Editar pefil</Typography>
            }
            onClose={onToggleModal}
        >
            <Form formGroup={formGroup}>
                <Stack>
                    <Control
                        controlName="name"
                        field={(control) => (
                            <Input
                                fullWidth
                                label="Nome"
                                data-cy="name"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
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