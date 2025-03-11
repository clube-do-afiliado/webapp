import { useEffect, useState } from 'react';

import Box from '@cda/ui/components/Box';
import Logo from '@cda/ui/components/Logo';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';
import Input from '@cda/ui/components/Input';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Loading from '@cda/ui/components/Loading';
import Container from '@cda/ui/components/Container';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, Control, useForm, FormControl } from '@cda/ui/components/Form';

import { getParams } from '@cda/toolkit/url';

import { useAuth } from '@cda/common/Auth';

import { release } from '@/services/core';

function CreatePasswordForm() {
    const { email } = getParams<{ email: string }>();

    const { loginWithPassword } = useAuth();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'text' | 'password'>('password');

    const iconEye = type === 'text' ? 'eye-slash' : 'eye';

    const [formGroup] = useForm<{ email: string; password: string; confirmPassword: string }>({
        form: {
            email: new FormControl({ defaultValue: email, type: 'email', required: true }),
            password: new FormControl({ defaultValue: '', type: 'password', required: true }),
            confirmPassword: new FormControl({ defaultValue: '', type: 'password', required: true }),
        },
        handle: {
            submit: (form) => {
                setLoading(true);
                const { email, password } = form.values;

                loginWithPassword({ email, password })
                    .finally(() => setLoading(false));
            }
        }
    }, []);

    const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

    return (
        <Form formGroup={formGroup}>
            <Stack spacing="small">
                <Control
                    controlName="email"
                    field={(control) => <Input
                        disabled
                        fullWidth
                        gutterBottom
                        label="Email"
                        data-cy="email-input"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                    />}
                />
                <Control
                    controlName="password"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        type={type}
                        label="Senha"
                        data-cy="password-input"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                        endIcon={
                            <ButtonIcon type="button" onClick={toggleType}>
                                <Icon name={iconEye} />
                            </ButtonIcon>
                        }
                    />}
                />
                <Control
                    controlName="confirmPassword"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        type={type}
                        label="Confirmar senha"
                        data-cy="password-input"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                        endIcon={
                            <ButtonIcon type="button" onClick={toggleType}>
                                <Icon name={iconEye} />
                            </ButtonIcon>
                        }
                    />}
                />
                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    data-cy="signin-submit"
                    disabled={loading}
                    loading={loading && <Loading />}
                >
                    Salvar
                </Button>
            </Stack>
        </Form>
    );
}

export default function CreatePassword() {
    const { confirmPassword } = useAuth();

    useEffect(() => {
        confirmPassword('Testando4');
    }, []);

    return (
        <Slide enter direction="top">
            <Stack
                justifyContent="center"
                style={{ height: '100vh' }}
                sx={{ backgroundColor: ({ primary }) => primary.main }}
            >
                <Container sm="100%" md={500} lg={500}>
                    <Box sx={{ mb: 2 }} textAlign="center">
                        <Logo
                            width={200}
                            color="primary.contrastText"
                            style={{ margin: 'auto' }}
                        />
                    </Box>
                    <Card sx={{ backgroundColor: ({ background }) => background.default }}>
                        <CardContent>
                            <Typography variant="subtitle1" noMargin gutterBottom>
                                Criar senha
                            </Typography>

                            <Stack spacing="small">
                                <CreatePasswordForm />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Box>
                        <Typography
                            variant="body2"
                            color="primary.contrastText"
                            style={{ textAlign: 'center' }}
                        >
                            © 2025 - Clube do afiliado
                        </Typography>
                        <Typography
                            variant="body2"
                            color="primary.contrastText"
                            style={{ textAlign: 'center' }}
                        >
                            Versão: {release}
                        </Typography>
                    </Box>
                </Container>
            </Stack>
        </Slide>
    );
}