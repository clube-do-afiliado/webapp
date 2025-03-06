export type Country = 'br';

export function sanitize(value: string) {
    const regex = /[\WA-Z]/g;
    return value.replace(regex, '');
}

export function maskPhone(value: string | undefined): string {
    if (!value) { return ''; }

    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
        .substring(0, 15);
}

export function maskCpf(value: string | undefined): string {
    if (!value) { return ''; }

    return value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .substring(0, 14);
}

export function maskcurrency(value = 0, country: Country = 'br'): string {
    const MAP = {
        br: { locale: 'pt-BR', currency: 'BRL', },
    };
    const mapped = MAP[country];

    return new Intl
        .NumberFormat(mapped.locale, { style: 'currency', currency: mapped.currency, maximumSignificantDigits: 7 })
        .format(value)
        .replace(/\s/, ' ');
}

export function maskDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
