import { hslToHex } from './hslToHex';

export function adjustLightness(h, s, l, amount) {
    l = Math.min(Math.max(l + amount, 0), 100); // Garante que o valor esteja entre 0 e 100
    return hslToHex(h, s, l);
}