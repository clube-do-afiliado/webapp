import { useContext } from 'react';

import { SitesContext } from './SitesProvider';

export default function useSites() {
    return useContext(SitesContext);
}