import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react';

import { uuid } from '@cda/toolkit/uuid';

import { joinClass } from '../../utils';
import createComponent from '../../core/createComponent';
import type { Colors } from '../../theme';
import './Switch.scss';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    helperText?: string;
    color?: Colors;
    auto?: boolean;
}
function Switch({ label, error, helperText, auto = false, color = 'primary', ...props }: SwitchProps) {
    const [checked, setChecked] = useState(Boolean(props.checked));

    const classNameCheckbox = joinClass([
        'ui-switch__checkbox',
        `ui-switch__checkbox--${color}`,
    ]);

    const classNameLabel = joinClass([
        'ui-switch__label',
        error && 'ui-switch__label--error',
    ]);

    const helperTextClss = joinClass([
        'ui-switch__helper-text',
        error && 'ui-switch__helper-text--error',
        helperText && 'ui-switch__helper-text--visible',
    ]);

    const id = useMemo(() => `ui-switch-${uuid()}`, []);

    useEffect(() => { setChecked(Boolean(props.checked)); }, [props.checked]);

    const handleToggle = () => {
        if (props.onChange) {
            props.onChange({ target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>);
        }

        setChecked(!checked);
    };

    return (
        <div className="ui-switch-container" style={{ margin: auto ? 'auto' : 'inherit' }}>
            <label htmlFor={id} className={classNameLabel}>
                {label}
            </label>
            <div className="ui-switch">
                <input
                    {...props}
                    type="checkbox"
                    id={id}
                    className={classNameCheckbox}
                    onChange={handleToggle}
                    checked={checked}
                />
                <label className="ui-switch__box" htmlFor={id}>
                    <span className="ui-switch__button" />
                </label>
            </div>
            <span className={helperTextClss}>{helperText}</span>
        </div>
    );
}

export default createComponent(Switch);