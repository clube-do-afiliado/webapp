import { cloneElement, HtmlHTMLAttributes } from 'react';

import Stack from '../Stack';
import { joinClass } from '../../utils';
import { Colors, useTheme } from '../../theme';
import ButtonIcon from '../../components/ButtonIcon';
import Typography from '../../components/Typography';
import createComponent from '../../core/createComponent';
import Icon, { type IconProps } from '../../components/Icon';

import './Alert.scss';

export interface AlertProps extends HtmlHTMLAttributes<HTMLDivElement> {
    color?: Colors;
    icon?: React.JSX.Element;
    variant?: 'opacity' | 'contained';
    fullWidth?: boolean;
    children: React.JSX.Element | string;
    onClose?: () => void;
}
function Alert({
    children,
    icon,
    fullWidth,
    color = 'primary',
    variant = 'contained',
    onClose,
    ...props
}: AlertProps) {
    const { theme } = useTheme();

    const themeRef = theme.palette.mode === 'dark' ? 'light' : 'dark';

    const className = joinClass([
        'ui-alert',
        `ui-alert--${color}`,
        `ui-alert--${color}--${variant}`,
        fullWidth && 'ui-alert--fullWidth'
    ]);

    const message = typeof children === 'string'
        ? <Typography variant="body1" color={`${color}.${themeRef}`}>{children}</Typography>
        : children;

    const renderIcon = (icon: React.JSX.Element) => {
        return cloneElement<IconProps>(icon, {
            color: `${color}.${themeRef}`
        });
    };

    return (
        <div className={className} {...props}>
            <Stack orientation="row" alignItems="center" spacing="small">
                {
                    icon && (
                        <div className="ui-alert__icon">
                            {renderIcon(icon)}
                        </div>
                    )
                }
                {message}
            </Stack>
            {
                !!onClose && (
                    <ButtonIcon onClick={onClose} color={`${color}.dark`} className="ui-alert__button">
                        <Icon name="times" />
                    </ButtonIcon>
                )
            }
        </div>
    );
}

export default createComponent(Alert);