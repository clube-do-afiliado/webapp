export function sanitizeCurrency(value: string) {
    if (!value) { return 0; }

    return Number(value.split('R$')[1]
        .replace('.', '')
        .replace(',', '.'));
}