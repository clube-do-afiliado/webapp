import { useNavigate } from 'react-router-dom';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

import type { SignatureStatus } from '@cda/services/signatures';

import { useSignatures } from '@cda/common/Signatures';

type MapStatus = {
    [x in SignatureStatus]: {
        icon: React.JSX.Element;
        title: React.JSX.Element;
        message: React.JSX.Element;
        ctaText: string;
    }
}

const MAP_SIGNATURE_STATUS: MapStatus = {
    active: {
        title: (
            <Typography noMargin variant="h5" color="background.default">
                Eleve seus resultados!
            </Typography>
        ),
        message: (
            <Typography noMargin variant="body2" color="primary.contrastText">
                Com um plano premium, você vai mais longe. Ative agora e maximize seu potencial.
            </Typography>
        ),
        icon: <Icon name="fire" />,
        ctaText: 'Fazer upgrade'
    },
    expired: {
        title: (
            <Typography noMargin variant="h5" color="background.default">
                Renove e continue crescendo
            </Typography>
        ),
        message: (
            <Typography noMargin variant="body2" color="primary.contrastText">
                Mantenha o acesso completo à plataforma renovando seu plano agora.
            </Typography>
        ),
        icon: <Icon name="lock-open-alt" />,
        ctaText: 'Renovar plano'
    },
    inactive: {
        title: (
            <Typography noMargin variant="h5" color="background.default">
                Ative seu plano e comece agora
            </Typography>
        ),
        message: (
            <Typography noMargin variant="body2" color="primary.contrastText">
                Ative seu plano e aproveite recursos
                exclusivos que vão turbinar sua experiência.
            </Typography>
        ),
        icon: <Icon name="bolt" />,
        ctaText: 'Ativar plano'
    },
};

export default function UpgradeCopy() {
    const navigate = useNavigate();

    const { signature } = useSignatures();

    const goToPlans = () => { navigate('/plans'); };

    if (!signature) { return <></>; }

    const { icon, message, title, ctaText } = MAP_SIGNATURE_STATUS[signature.status];

    return (
        <Card sx={{ background: ({ primary }) => primary.main }}>
            <CardContent>
                <Stack orientation="row" alignItems="center">
                    <Avatar
                        icon={icon}
                        sx={{ backgroundColor: ({ background }) => background.default }}
                    />
                    <Stack spacing="small">
                        {title}
                        {message}
                    </Stack>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: ({ background }) => background.default,
                            color: ({ background }) => background.default,
                        }}
                        style={{ width: 280, minWidth: 280 }}
                        onClick={goToPlans}
                    >
                        {ctaText}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}