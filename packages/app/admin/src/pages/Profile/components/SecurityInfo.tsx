import { useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { Modal, useModal } from '@cda/ui/components/Modal';
import { Card, CardContent } from '@cda/ui/components/Card';

import type { UserData } from '@cda/services/user';

import { useAuth } from '@cda/common/Auth';

interface SecurityInfoProps {
    user: UserData;
}

export default function SecurityInfo({ user }: SecurityInfoProps) {
    const [open, toggle] = useModal();

    const { sendMailToResetPassword } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleSendEmailToResetPass = async () => {
        setLoading(true);

        return sendMailToResetPassword(user.email)
            .then(toggle)
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Stack>
                        <Stack spacing="small" orientation="row" alignItems="center">
                            <Avatar
                                icon={<Icon name="shield" color="warning.main" />}
                                sx={{ backgroundColor: ({ warning }) => warning.opacity }}
                                style={{ border: 'none' }}
                            />
                            <Typography variant="h6">
                                Segurança
                            </Typography>
                        </Stack>
                        <Card>
                            <CardContent>
                                <Stack
                                    spacing="small"
                                    orientation="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography>Senha</Typography>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<Icon name="key-skeleton-alt" />}
                                        onClick={toggle}
                                    >
                                        Alterar senha
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </CardContent>
            </Card>
            <Modal
                isOpen={open}
                title={
                    <Typography variant="h6">Alterar senha</Typography>
                }
                subtitle={
                    <Typography variant="body2" color="text.secondary">
                        Vamos enviar um email para redefinir sua senha
                    </Typography>
                }
                onClose={toggle}
            >
                <Stack orientation="row" justifyContent="flex-end">
                    <Button
                        startIcon={<Icon name="envelope" />}
                        onClick={handleSendEmailToResetPass}
                        loading={loading && <Loading />}
                    >
                        Enviar email para redefinir senha
                    </Button>
                </Stack>
            </Modal>
        </>
    );
}