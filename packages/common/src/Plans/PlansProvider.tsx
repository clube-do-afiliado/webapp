import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useAlert } from '@cda/ui/components/Alert';

import type { Plan } from '@cda/services/plans';
import type PlansServices from '@cda/services/plans';

export interface PlansContextConfig {
    loading: boolean;

    plan: Plan | undefined;
    plans: Plan[];

    getPlans: () => Promise<void>;
    getPlan: (id: string) => Promise<Plan | null>;

    deletePlan: (id: string) => Promise<void>;

    createPlan: (data: Omit<Plan, 'id'>) => Promise<void>;

    updatePlan: (data: Plan) => Promise<void>;
}

export const PlansContext = createContext<PlansContextConfig>({
    loading: true,

    plan: undefined,
    plans: [],

    getPlans: () => Promise.resolve(),
    getPlan: () => Promise.resolve({} as Plan),

    deletePlan: () => Promise.resolve(),

    createPlan: () => Promise.resolve(),

    updatePlan: () => Promise.resolve(),
});

export default function PlansProvider({ children, plansServices }: PropsWithChildren<{
    plansServices: PlansServices
}>) {
    const { addAlert } = useAlert();

    const [loading, setLoading] = useState(true);

    const [plan, setPlan] = useState<Plan>();
    const [plans, setPlans] = useState<Plan[]>([]);

    const context = useMemo<PlansContextConfig>(() => ({
        loading,

        plan,
        plans,

        getPlans: () => getPlans(),
        getPlan: (id) => getPlan(id),

        deletePlan: (id) => deletePlan(id),

        createPlan: (data) => createPlan(data),

        updatePlan: (data) => updatePlan(data),
    }), [plans, plan, loading]);

    const getPlans = async () => {
        setLoading(true);

        return plansServices.list()
            .then(res => setPlans(res))
            .finally(() => setLoading(false));
    };

    const getPlan = async (id: string) => {
        setLoading(true);

        return plansServices.details(id)
            .then(p => {
                setPlan(p as Plan);
                return p;
            })
            .finally(() => setLoading(false));
    };

    const deletePlan = async (id: string) => {
        return plansServices.delete(id)
            .then(() => setPlans(prev => prev.filter(r => r.id !== id)))
            .then(() => addAlert({ color: 'success', message: 'Plano deletado com sucesso' }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível deletar o plano' }));
    };

    const createPlan = async (data: Omit<Plan, 'id'>) => {
        return plansServices.create(data)
            .then(res => setPlans((prev) => ([...prev, res])))
            .then(() => addAlert({ color: 'success', message: `"${data.name}" foi adicionado` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível criar o plano' }));
    };

    const updatePlan = async (data: Plan) => {
        return plansServices.update(data)
            .then(() => setPlans(prev => prev.map(r => r.id === data.id ? data : r)))
            .then(() => addAlert({ color: 'success', message: `O plano "${data.name}" foi editado`, delay: 10000 }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível editar o plano' }));
    };

    return (
        <PlansContext.Provider value={context}>
            {children}
        </PlansContext.Provider>
    );
}