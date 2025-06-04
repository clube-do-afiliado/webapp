import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useAlert } from '@cda/ui/components/Alert';

import type SignaturesServices from '@cda/services/signatures';
import type { Signature } from '@cda/services/signatures';

export interface SignaturesContextConfig {
    loading: boolean;

    signature?: Signature;

    getSignature: (userId: string) => Promise<void>;

    updateSignature: (data: Signature) => Promise<void>;
}

export const SignaturesContext = createContext<SignaturesContextConfig>({
    loading: false,

    signature: undefined,

    getSignature: () => Promise.resolve(),

    updateSignature: () => Promise.resolve(),
});

export default function SignaturesProvider({ children, signaturesServices }: PropsWithChildren<{
    signaturesServices: SignaturesServices;
}>) {
    const { addAlert } = useAlert();

    const [signature, setSignature] = useState<Signature>();
    const [loading, setLoading] = useState(true);

    const context = useMemo<SignaturesContextConfig>(() => ({
        loading,

        signature,

        getSignature: (userId) => getSignature(userId),

        updateSignature: (data) => updateSignature(data),
    }), [signature]);

    const getSignature = async (ownerId: string) => {
        return signaturesServices.details(ownerId)
            .then(r => setSignature(r as Signature))
            .finally(() => setLoading(false));
    };

    const updateSignature = async (data: Signature) => {
        return signaturesServices.update(data)
            .then(() => setSignature(data))
            .then(() => addAlert({ color: 'success', message: 'Assinatura editada' }))
            .then(() => addAlert({ color: 'success', message: 'Não foi possível editar sua assinatura' }));
    };

    return (
        <SignaturesContext.Provider value={context}>
            {children}
        </SignaturesContext.Provider>
    );
}