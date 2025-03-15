import { useContext } from 'react';

import { AccessControlContext } from './AccessControlProvider';

export default function useAccessControl() {
    return useContext(AccessControlContext);
}