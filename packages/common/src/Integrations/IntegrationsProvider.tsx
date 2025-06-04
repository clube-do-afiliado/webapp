import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useAlert } from '@cda/ui/components/Alert';

import type { Integration } from '@cda/services/integrations';
import type IntegrationsServices from '@cda/services/integrations';

export interface IntegrationsContextConfig {
    loading: boolean;

    integrations: Integration[];

    getIntegrations: () => Promise<void>;

    deleteIntegration: (id: string) => Promise<void>;

    createIntegration: (data: Omit<Integration, 'id'>) => Promise<void>;

    updateIntegration: (data: Integration) => Promise<void>;
}

export const IntegrationsContext = createContext<IntegrationsContextConfig>({
    loading: true,
    integrations: [],

    getIntegrations: () => Promise.resolve(),

    deleteIntegration: () => Promise.resolve(),

    createIntegration: () => Promise.resolve(),

    updateIntegration: () => Promise.resolve(),
});

export default function IntegrationsProvider({ children, integrationsServices }: PropsWithChildren<{
    integrationsServices: IntegrationsServices
}>) {
    const { addAlert } = useAlert();

    const [loading, setLoading] = useState(true);

    const [integrations, setIntegrations] = useState<Integration[]>([]);

    const context = useMemo<IntegrationsContextConfig>(() => ({
        loading,

        integrations,

        getIntegrations: () => getIntegrations(),

        deleteIntegration: (id) => deleteIntegration(id),

        createIntegration: (data) => createIntegration(data),

        updateIntegration: (data) => updateIntegration(data),
    }), [integrations, loading]);

    const getIntegrations = async () => {
        return integrationsServices.list()
            .then(res => setIntegrations(res))
            .finally(() => setLoading(false));
    };

    const deleteIntegration = async (id: string) => {
        integrationsServices.delete(id)
            .then(() => setIntegrations(prev => prev.filter(r => r.id !== id)))
            .then(() => addAlert({ color: 'success', message: 'Integração deletada com sucesso' }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível deletar a integração' }));
    };

    const createIntegration = async (data: Omit<Integration, 'id'>) => {
        return integrationsServices.create(data)
            .then(res => setIntegrations((prev) => ([...prev, res])))
            .then(() => addAlert({ color: 'success', message: `A integração "${data.name}" foi adicionada` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível criar a integração' }));
    };

    const updateIntegration = async (data: Integration) => {
        return integrationsServices.update(data)
            .then(() => setIntegrations(prev => prev.map(r => r.id === data.id ? data : r)))
            .then(() => addAlert({ color: 'success', message: `A integração "${data.name}" foi editada` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível editar a integração' }));
    };

    return (
        <IntegrationsContext.Provider value={context}>
            {children}
        </IntegrationsContext.Provider>
    );
}