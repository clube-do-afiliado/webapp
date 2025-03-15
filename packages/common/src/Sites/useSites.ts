import { useContext } from 'react';

import { SitesContext } from './SitesProvider';

export default function useRoles() {
    return useContext(SitesContext);
}