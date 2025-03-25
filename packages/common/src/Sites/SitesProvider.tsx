import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useAlert } from '@cda/ui/components/Alert';

import type { Site } from '@cda/services/sites';
import type SitesServices from '@cda/services/sites';

export interface SitesContextConfig {
    loading: boolean;

    sites: Site[];
    userSites: Site[];

    getSites: () => Promise<void>;
    getUserSites: (ownerId: string) => Promise<void>;

    deleteSite: (id: string) => Promise<void>;

    createSite: (data: Omit<Site, 'id'>) => Promise<void>;

    updateSite: (data: Site) => Promise<void>;
}

export const SitesContext = createContext<SitesContextConfig>({
    loading: false,

    sites: [],
    userSites: [],

    getSites: () => Promise.resolve(),
    getUserSites: () => Promise.resolve(),

    deleteSite: () => Promise.resolve(),

    createSite: () => Promise.resolve(),

    updateSite: () => Promise.resolve(),
});

export default function SitesProvider({ children, sitesServices }: PropsWithChildren<{
    sitesServices: SitesServices;
}>) {
    const { addAlert } = useAlert();

    const [loading, setLoading] = useState(true);
    const [sites, setSites] = useState<Site[]>([]);
    const [userSites, setUserSites] = useState<Site[]>([]);

    const context = useMemo<SitesContextConfig>(() => ({
        loading,

        sites,
        userSites,

        getSites: () => getSites(),
        getUserSites: (ownerId) => getUserSites(ownerId),

        deleteSite: (id) => deleteSite(id),

        createSite: (data) => createSite(data),

        updateSite: (data) => updateSite(data),
    }), [sites, userSites]);

    const createSite = async (data: Omit<Site, 'id'>) => {
        return sitesServices.create(data)
            .then(res => setSites((prev) => ([...prev, res])))
            .then(() => addAlert({ color: 'success', message: `A role "${data.information.name}" foi adicionada` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível criar a role' }));
    };

    const getSites = async () => {
        return sitesServices.list()
            .then(r => setSites(r))
            .finally(() => setLoading(false));
    };

    const getUserSites = async (ownerId: string) => {
        return sitesServices.getUserStores(ownerId)
            .then(r => setUserSites(r))
            .finally(() => setLoading(false));
    };

    const deleteSite = async (id: string) => {
        return sitesServices.delete(id)
            .then(() => setSites(prev => prev.filter(r => r.id !== id)))
            .then(() => addAlert({ color: 'success', message: 'Site deletada com sucesso' }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível deletar a role' }));
    };

    const updateSite = async (data: Site) => {
        return sitesServices.update(data)
            .then(() => setSites(prev => prev.map(r => r.id === data.id ? data : r)))
            .then(() => addAlert({ color: 'success', message: `o site "${data.information.name}" foi editado` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível editar o site' }));
    };

    return (
        <SitesContext.Provider value={context}>
            {children}
        </SitesContext.Provider>
    );
}