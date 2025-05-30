import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';

import './BenefitCard.scss';

interface BenefitCardProps {
    title: string;
    description: string;
    icon: React.JSX.Element;
}
export default function BenefitCard({ title, description, icon }: BenefitCardProps) {
    return (
        <Stack orientation="row" className="benefit-card">
            <Avatar
                variant="rounded"
                icon={icon}
                style={{ border: 'none', width: 48, height: 48 }}
                sx={{ background: ({ primary }) => primary.main }}
            />
            <Stack spacing="small">
                <Typography noMargin variant="subtitle1">{title}</Typography>
                <Typography noMargin variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </Stack>
        </Stack>
    );
}