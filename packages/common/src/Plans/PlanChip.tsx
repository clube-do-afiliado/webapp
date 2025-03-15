import Chip from '@cda/ui/components/Chip';
import { getOpacityColor } from '@cda/ui/theme';

import type { Plan } from '@cda/services/plans';

export default function PlanChip({ name, color }: Plan) {
    return (
        <Chip
            label={name}
            style={{
                border: 'none',
                color: color,
                background: getOpacityColor(color, 0.2),
            }}
        />
    );
}