import Page from '@cda/ui/layout/Page';

import { release } from '@/services/core';

export default function Home() {
    return (
        <Page
            title="Seja bem vindo(a)"
            subtitle="Estamos felizes em ter você conosco!"
            release={release}
        >

        </Page>
    );
}