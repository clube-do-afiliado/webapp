import { useContext } from 'react';

import { PreferenceContext } from './PreferencesProvider';

export default function usePreference() {
    return useContext(PreferenceContext);
}