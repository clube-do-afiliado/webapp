import { useContext } from 'react';

import { IntegrationsContext } from './IntegrationsProvider';

export default function usePlans() {
    return useContext(IntegrationsContext);
}