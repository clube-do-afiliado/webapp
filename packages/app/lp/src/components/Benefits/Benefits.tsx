import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Container from '@cda/ui/components/Container';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import BenefitCard from './BenefitCard';

export default function Benefits() {
    return (
        <Stack
            spacing="large"
            tag="section"
            sx={{
                py: 8,
                backgroundColor: ({ background }) => background.paper
            }}
        >
            <Stack nogap justifyContent="center" alignItems="center" textAlign="center">
                <Typography noMargin variant="subtitle1" color="primary.main" style={{ textTransform: 'uppercase' }}>
                    Benefícios
                </Typography>
                <Typography noMargin variant="h4" weight="bold">
                    Tudo que você precisa para ter sucesso como afiliado
                </Typography>
                <Typography noMargin variant="h6" color="text.secondary" style={{ maxWidth: '42rem' }}>
                    Ferramentas poderosas projetadas para maximizar seus ganhos e simplificar seu trabalho.
                </Typography>
            </Stack>

            <Container>
                <Grid gap={30}>
                    <GridItem xl={6} lg={6} md={6} sm={12}>
                        <BenefitCard
                            title="Análise em Tempo Real"
                            description="Acompanhe o desempenho de todos seus links de afiliados
                    em um dashboard intuitivo com dados atualizados em tempo real."
                            icon={<Icon name="chart" color="primary.contrastText" />}
                        />
                    </GridItem>
                    <GridItem xl={6} lg={6} md={6} sm={12}>
                        <BenefitCard
                            title="Artes Automáticas para Redes Sociais"
                            description="Gere artes profissionais com apenas alguns cliques e mantenha seu perfil sempre
                             atualizado com conteúdos prontos para divulgar seus produtos."
                            icon={<Icon name="brush-alt" color="primary.contrastText" />}
                        />
                    </GridItem>
                    <GridItem xl={6} lg={6} md={6} sm={12}>
                        <BenefitCard
                            title="Cadastro Rápido de Produtos"
                            description="Cadastre novos produtos em poucos passos com um processo simplificado e 
                            inteligente, pronto para colocar suas ofertas no ar em minutos."
                            icon={<Icon name="bolt" color="primary.contrastText" />}
                        />
                    </GridItem>
                    <GridItem xl={6} lg={6} md={6} sm={12}>
                        <BenefitCard
                            title="Loja Personalizada para Seus Produtos"
                            description="Crie seu próprio site de forma simples e apresente todos os seus produtos em um
                             só lugar, com visual profissional e totalmente adaptado ao seu estilo."
                            icon={<Icon name="monitor" color="primary.contrastText" />}
                        />
                    </GridItem>
                </Grid>
            </Container>
        </Stack>
    );
}