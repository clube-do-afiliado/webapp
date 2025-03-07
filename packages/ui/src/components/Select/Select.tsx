import {
    InputHTMLAttributes,
    ButtonHTMLAttributes,
    ReactElement,
    cloneElement,
    MouseEvent,
    Children,
    useState
} from 'react';

import Icon from '../../components/Icon';
import joinClass from '../../utils/joinClass';
import { Menu, useMenu } from '../../components/Menu';
import createComponent from '../../core/createComponent';

import type { OptionProps } from './Option';

import '../Input/Input.scss';
import './Select.scss';

export type InputType = 'text' | 'password' | 'number' | 'date';
export type ErrorState = 'show' | 'hide';

interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: boolean;
    fullWidth?: boolean;
    label?: string;
    helperText?: string;
    gutterBottom?: boolean;
    startIcon?: React.JSX.Element | boolean;
    children: React.JSX.Element | React.JSX.Element[];
}
function Select({
    error,
    label,
    fullWidth,
    helperText,
    gutterBottom,
    startIcon,
    children,
    ...props
}: SelectProps) {
    const arrayChildren = Children.toArray(children) as ReactElement<OptionProps>[];

    const [value, setValue] = useState(arrayChildren.find((child) =>
        child.props.value === props.value)?.props.children || '');

    const [open, el, ref, toggle] = useMenu();

    const containerClss = joinClass([
        'ui-input-container',
        fullWidth && 'ui-input-container--full-width',
        gutterBottom && 'ui-input-container--gutter-bottom'
    ]);

    const labelClss = joinClass([
        'ui-input-label',
        error && 'ui-input-label--error',
    ]);

    const clss = joinClass([
        'ui-input',
        'ui-select',
        error && 'ui-input--error',
        props.className
    ]);

    const helperTextClss = joinClass([
        'ui-input__helper-text',
        helperText && 'ui-input__helper-text--visible',
        error && 'ui-input__helper-text--error'
    ]);

    const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<any>>) => {
        return cloneElement(icon, {
            className: joinClass([icon.props.className, 'ui-input__icon', 'ui-input__icon--right']),
            type: 'button',
            onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
                e.stopPropagation();
                if (icon.props.onClick) { icon.props.onClick(e); };
            }
        });
    };

    const renderOption = () => {
        return arrayChildren.map((child) => {
            return cloneElement(child, {
                onClick: (e) => {
                    setValue(child.props.children);

                    if (props.onChange) { props.onChange(e as any); }
                }
            });
        });
    };

    return (
        <div className={containerClss}>
            {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
            <button type="button" className={clss} onClick={toggle}>
                {startIcon && renderIcon(startIcon as React.JSX.Element)}
                <input {...props} readOnly type="text" value={value} />
                <div ref={ref}>
                    <Icon
                        name="angle-down"
                        color="text.secondary"
                        className="ui-input__icon ui-input__icon--left"
                    />
                </div>
            </button>
            <Menu
                direction="center"
                open={open}
                anchorEl={el}
                onClose={toggle}
            >
                {renderOption()}
            </Menu>
            <span className={helperTextClss}>{helperText}</span>
        </div>
    );
};

export default createComponent(Select);