import { joinClass } from '@cda/ui/utils';

import type { Site } from '@cda/services/sites';

import './SocialButton.scss';

interface SocialButtonProps {
    social: keyof Site['socials'];
    value: string;
    background: string;
    color: string;
}
export default function SocialButton({ social, value, background, color }: SocialButtonProps) {
    return (
        <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            title={`Visite nosso ${social}`}
            aria-label={`Visite o perfil no ${social}`}
            style={{ background, color }}
        >
            <i
                aria-label={`Ícone do ${social}`}
                className={joinClass(['uil', `uil-${social}`])}
            />
        </a>
    );
}