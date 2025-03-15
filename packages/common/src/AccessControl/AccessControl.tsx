import { useMemo } from 'react';

import type { Permissions } from '@cda/services/permissions';

import useAccessControl from './useAccessControl';

interface AccessControlProps {
    permissions: Permissions[];
    component: (allowed: boolean) => React.JSX.Element | false;
}

export default function AccessControl({ component, permissions }: AccessControlProps) {
    const { permissions: _permissions } = useAccessControl();

    const allowed = useMemo(() => permissions.some(p => _permissions.includes(p)), [_permissions]);

    return component(allowed);
}