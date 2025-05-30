import Stack from '@cda/ui/components/Stack';
import Input from '@cda/ui/components/Input';
import Button from '@cda/ui/components/Button';
import Container from '@cda/ui/components/Container';
import Typography from '@cda/ui/components/Typography';
import { Checkbox } from '@cda/ui/components/Checkbox';
import { Card, CardContent } from '@cda/ui/components/Card';
import { Form, FormControl, useForm, Control } from '@cda/ui/components/Form';

interface ContactForm {
    tel: string;
    name: string;
    email: string;
    term: boolean;
}

export default function LeadBox() {
    const [formGroup] = useForm<ContactForm>({
        form: {
            name: new FormControl({ defaultValue: '', required: true }),
            term: new FormControl({ defaultValue: false, required: true }),
            email: new FormControl({ defaultValue: '', type: 'email', required: true }),
            tel: new FormControl({ defaultValue: '', required: true, type: 'tel' }),
        }
    }, []);

    return (
        <Stack
            tag="section"
            spacing="large"
            sx={{
                py: 8,
                backgroundColor: ({ text }) => text.primary
            }}
        >
            <Stack nogap justifyContent="center" alignItems="center" textAlign="center">
                <Typography
                    noMargin
                    variant="subtitle1"
                    color="primary.contrastText"
                    style={{ textTransform: 'uppercase' }}
                >
                    Pré-venda
                </Typography>
                <Typography
                    noMargin
                    variant="h4"
                    weight="bold"
                    color="secondary.main"
                >
                    Pronto para levar seus resultados como afiliado para <br /> o próximo nível?
                </Typography>
                <Typography
                    noMargin
                    variant="h6"
                    color="primary.contrastText"
                    style={{ maxWidth: '42rem' }}
                >
                    A pré-venda já começou! Cadastre-se e prepare-se para vender como nunca.
                </Typography>
            </Stack>
            <Container justifyContent="center" alignItems="center">
                <Card style={{ margin: 'auto', maxWidth: 550, width: '100%' }}>
                    <CardContent>
                        <Typography noMargin textAlign="center" variant="subtitle1" sx={{ my: 2 }}>
                            Entre na lista e receba o acesso em primeira mão 🚀
                        </Typography>
                        <Form formGroup={formGroup}>
                            <Stack>
                                <Control
                                    controlName="name"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            label="Seu nome"
                                            placeholder="Digite seu nome completo"
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
                                            title="Email"
                                            label="Seu Melhor E-mail"
                                            placeholder="seu@email.com"
                                            value={control.value}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                        />
                                    )}
                                />
                                <Control
                                    controlName="tel"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            title="Telefone"
                                            label="Seu telefone"
                                            placeholder="(99) 99999-9999"
                                            maxLength={15}
                                            value={control.masked}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                        />
                                    )}
                                />
                                <Control
                                    controlName="term"
                                    field={(control) => (
                                        <Checkbox
                                            name="term"
                                            label="Me avise quando lançar!"
                                            title="Receber aviso no lançamento"
                                            isChecked={control.value}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                        />
                                    )}
                                />
                                <Button size="large">
                                    Quero participar da pré-venda
                                </Button>
                            </Stack>
                        </Form>
                    </CardContent>
                </Card>
            </Container>
        </Stack>
    );
}