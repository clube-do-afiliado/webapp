import { joinClass } from '../../utils';
import type { Colors } from '../../theme';

interface SidebarTaProps {
    label: string;
    color?: Colors
}

export default function SidebarTag({ label, color = 'primary' }: SidebarTaProps) {
    const className = joinClass([
        'ui-sidebar__button__tag',
        `ui-sidebar__button__tag--${color}`
    ]);

    return (
        <div className={className}>
            {label}
        </div>
    );
}