import { joinClass } from '../../utils';

import './Sidebar.scss';

interface SidebarProps {
    compact?: boolean;
    upButtons: React.ReactNode;
    downButtons: React.ReactNode;
}
export default function Sidebar({ compact, upButtons, downButtons }: SidebarProps) {
    const className = joinClass(['ui-sidebar', compact && 'ui-sidebar--compact']);

    return (
        <ul className={className}>
            <div style={{ width: '100%' }}>
                {upButtons}
            </div>

            <div style={{ width: '100%' }}>
                {downButtons}
            </div>
        </ul>
    );
}