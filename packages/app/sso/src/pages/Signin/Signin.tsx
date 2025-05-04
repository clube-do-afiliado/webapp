import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

function EmailAndPasswordForm() {
    const { email } = getParams<{ email: string }>();

    const navigate = useNavigate();
    const { loginWithPassword, loginWithGoogle } = useAuth();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'text' | 'password'>('password');

    const iconEye = type === 'text' ? 'eye-slash' : 'eye';

    const [formGroup] = useForm<{ email: string; password: string }>({
        form: {
            email: new FormControl({ defaultValue: email || '', type: 'email', required: true }),
            password: new FormControl({ defaultValue: '', type: 'password', required: true }),
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

    const goToSignup = () => { navigate('/signup'); };

    const handleLoginWithGoogle = async () => {
        loginWithGoogle();
    };

    return (
        <Form formGroup={formGroup}>
            <Stack spacing="small">
                <Control
                    controlName="email"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        placeholder="Email"
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
                        placeholder="Senha"
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
                    Entrar
                </Button>
                <Typography
                    noMargin
                    color="text.secondary"
                    textAlign="center"
                >
                    ou
                </Typography>
                <Button
                    variant="outlined"
                    size="large"
                    type="button"
                    startIcon={
                        <img
                            src="https://cdn.clubedoafiliado.com/assets/icons/google.svg"
                            width={15}
                        />
                    }
                    sx={{ color: ({ text }) => text.secondary }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onClick={handleLoginWithGoogle}
                >
                    Entrar com o Google
                </Button>
                <Stack orientation="row" justifyContent="center">
                    <Typography variant="body2" style={{ textAlign: 'center' }}>Não possui conta?</Typography>
                    <Button
                        noHover
                        size="small"
                        type="button"
                        variant="text"
                        data-cy="signup-button"
                        onClick={goToSignup}
                    >
                        Criar conta
                    </Button>
                </Stack>
            </Stack>
        </Form>
    );
}

export default function Signin() {
    return (
        <Slide enter direction="top">
            <Stack
                justifyContent="center"
                style={{ height: '100vh' }}
                sx={{ backgroundColor: ({ background }) => background.paper }}
            >
                <Container sm="100%" md={500} lg={500}>
                    <Box sx={{ mb: 2 }} textAlign="center">
                        <Logo
                            width={150}
                            color="primary.main"
                            style={{ margin: 'auto' }}
                        />
                    </Box>
                    <Card sx={{ backgroundColor: ({ background }) => background.default }}>
                        <CardContent>
                            <Typography variant="subtitle1" noMargin gutterBottom>Login</Typography>

                            <Stack spacing="small">
                                <EmailAndPasswordForm />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ textAlign: 'center' }}
                        >
                            © 2025 - Clube do afiliado
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
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