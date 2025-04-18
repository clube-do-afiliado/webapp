import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import Icon from '@cda/ui/components/Icon';
import Ripple from '@cda/ui/components/Ripple';

import './ThemeForm.scss';

interface ImageBoxProps { title: string; imageUrl?: string; onClick: () => void; }
export default function ImageBox({ title, imageUrl, onClick }: ImageBoxProps) {
    return (
        <Stack className="image-box-container" spacing="small" onMouseDown={onClick}>
            <Typography noMargin textAlign="center">{title}</Typography>
            {
                imageUrl && (
                    <div className="image-box-content" style={{
                        backgroundImage: `url('${imageUrl}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                    }}>
                        <Ripple />
                    </div>
                )
            }
            {
                !imageUrl && (
                    <div className="image-box-content">
                        <Icon name="image-plus" color="text.disabled" style={{ fontSize: 60 }} />
                        <Ripple />
                    </div>
                )
            }
        </Stack>
    );
}