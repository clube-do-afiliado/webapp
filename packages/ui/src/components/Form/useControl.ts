import { useContext } from 'react';

import FormContext from './FormContext';
import debounce from '../../utils/debounce';

function sanitizeOnlyNumbers(value: string) {
    const regex = /[\D]/g;
    return value.replace(regex, '');
}

export default function useControl<T>(controlName: keyof T, delay = 0) {
    const { formGroup } = useContext(FormContext);
    const control = formGroup.controls[controlName];

    const update = (value: any) => {
        const shouldSanitize = ['tel', 'cpf', 'money'].includes(control.type);
        const sanitezeMap = {
            tel: sanitizeOnlyNumbers,
            cpf: sanitizeOnlyNumbers,
            money: sanitizeOnlyNumbers,
        };

        debounce.delay(() => {
            control.value = value;

            formGroup.update({ [controlName]: shouldSanitize ? sanitezeMap[control.type](value) : value });
        }, delay);
    };

    return { control, update };
}
