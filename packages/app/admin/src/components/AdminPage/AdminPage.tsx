import Page, { type BaseProps } from '@cda/ui/layout/Page';
import Stack from '@cda/ui/components/Stack';

import { AccessControl } from '@cda/common/AccessControl';

import UpgradeCopy from '../UpgradeCopy';

export default function AdminPage({ children, ...props }: BaseProps) {
    return (
        <Page {...props}>
            <Stack spacing="large">
                <AccessControl
                    permissions={['cta:*']}
                    component={(showCopy) => (
                        showCopy && <UpgradeCopy />
                    )}
                />
                {children}
            </Stack>
        </Page>
    );
}