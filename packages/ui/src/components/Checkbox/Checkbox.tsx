import { joinClass } from '../../utils';
import type { Colors } from '../../theme';

import './Checkbox.scss';

export interface CheckboxProps extends Omit<React.HTMLProps<HTMLInputElement>, 'id'> {
    name: string;
    label: string;
    color?: Colors;
    isChecked?: boolean;
}
export default function Checkbox({ label, name, color = 'primary', isChecked, ...props }: CheckboxProps) {
    const classNameContainer = joinClass([
        'ui-checkbox',
        `ui-checkbox--${color}`,
        isChecked && `ui-checkbox--${color}--checked`,
    ]);

    return (
        <label htmlFor={name} className={classNameContainer}>
            <input type="checkbox" {...props} id={name} name={name} checked={isChecked} />
            {label}
        </label>
    );
}