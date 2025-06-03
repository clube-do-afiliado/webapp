import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Box from '@cda/ui/components/Box';
import Icon from '@cda/ui/components/Icon';
import Logo from '@cda/ui/components/Logo';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import Button from '@cda/ui/components/Button';
import Divider from '@cda/ui/components/Divider';
import Loading from '@cda/ui/components/Loading';
import Container from '@cda/ui/components/Container';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, Control, FormControl, useForm } from '@cda/ui/components/Form';

import { useAuth } from '@cda/common/Auth';

interface SignupForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Signup() {
    const navigate = useNavigate();
    const { createByAuth } = useAuth();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'text' | 'password'>('password');

    const iconEye = type === 'text' ? 'eye-slash' : 'eye';

    const [formGroup] = useForm<SignupForm>({
        form: {
            name: new FormControl({ defaultValue: '', type: 'text', required: true }),
            email: new FormControl({ defaultValue: '', type: 'email', required: true }),
            password: new FormControl({ defaultValue: '', type: 'password', required: true }),
            confirmPassword: new FormControl({ defaultValue: '', type: 'password', required: true }),
        },
        handle: {
            submit(form) {
                setLoading(true);

                const { email, name, password } = form.values;

                createByAuth({ email, name, password })
                    .finally(() => setLoading(false));
            },
        },
        validator: {
            password: (form) => {
                const { password } = form.values;

                if (password.length < 6) {
                    return 'A senha deve ter no mínimo 6 caracteres';
                }

                return '';
            },
            confirmPassword: (form) => {
                const { password, confirmPassword } = form.values;

                if (confirmPassword && (confirmPassword !== password)) {
                    return 'As senhas devem ser iguais';
                }

                return '';
            }
        }
    }, []);

    const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

    const goToSignin = () => { navigate('/signin'); };

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
                            width={150}
                            secondary="primary.contrastText"
                            primary="secondary.main"
                            style={{ margin: 'auto' }}
                        />
                    </Box>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" noMargin gutterBottom>Criar conta</Typography>

                            <Stack spacing="small">
                                <Form formGroup={formGroup}>
                                    <Stack spacing="small">
                                        <Control
                                            controlName="name"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Name"
                                                    placeholder="ex: John Doe"
                                                    data-cy="name-input"
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="email"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Email"
                                                    placeholder="ex: john@doe.com"
                                                    data-cy="email-input"
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="password"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Senha"
                                                    data-cy="password-input"
                                                    type={type}
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                    endIcon={
                                                        <ButtonIcon onClick={toggleType}>
                                                            <Icon name={iconEye} />
                                                        </ButtonIcon>
                                                    }
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="confirmPassword"
                                            field={(control) => (
                                                <Input
                                                    required
                                                    fullWidth
                                                    gutterBottom
                                                    label="Confirmar senha"
                                                    data-cy="confirm-password-input"
                                                    type={type}
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Button
                                            fullWidth
                                            type="submit"
                                            size="large"
                                            data-cy="signup-submit"
                                            disabled={loading}
                                            loading={loading && <Loading />}
                                        >
                                            Criar conta
                                        </Button>
                                        <Divider />
                                        <Stack orientation="row" justifyContent="center" alignItems="center">
                                            <Typography variant="body2" style={{ textAlign: 'center' }}>
                                                Já possui conta?
                                            </Typography>
                                            <Button
                                                noHover
                                                size="small"
                                                type="button"
                                                variant="text"
                                                data-cy="signin-button"
                                                onClick={goToSignin}
                                            >
                                                Entrar
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Form>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Stack>
        </Slide>
    );
}