import Page from '@cda/ui/layout/Page';
import Stack from '@cda/ui/components/Stack';

import Storage from '@cda/services/storage';
import { UserData } from '@cda/services/user';

import { useAuth } from '../Auth';
import PlanInfo from './components/PlanInfo';
import PersonalInfo from './components/PersonalInfo';
import SecurityInfo from './components/SecurityInfo';

interface ProfileProps {
    storage: Storage;
    onUpdateUser: (user: UserData) => Promise<UserData>;
}

export default function Profile({ storage, onUpdateUser }: ProfileProps) {
    const { user } = useAuth();

    if (!user) { return; }

    return (
        <Page
            title="Configurações da conta"
            subtitle="Personalize suas informações e preferências de uso."
        >
            <Stack sx={{ mb: 3 }}>
                <PersonalInfo
                    user={user}
                    storage={storage}
                    onUpdateUser={onUpdateUser}
                />
                <PlanInfo />
                <SecurityInfo />
            </Stack>
        </Page>
    );
}