import Page from '@cda/ui/layout/Page';

import { release } from '@/services/core';

export default function Site() {
    return (
        <Page
            title="Link na bio"
            release={release}
        >

        </Page>
    );
}