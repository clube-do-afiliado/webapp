import { useContext } from 'react';

import { PlansContext } from './PlansProvider';

export default function usePlans() {
    return useContext(PlansContext);
}