import type { EventSource } from './interface';

export const SOURCE_MAP: {
    [x in EventSource]: { color: string; label: string; };
} = {
    others: { label: 'Outros', color: '#282828' },
    youtube: { label: 'Youtube', color: '#E62117' },
    facebook: { label: 'Facebook', color: '#3B5998' },
    whatsapp: { label: 'Whatsapp', color: '#25D366' },
    telegram: { label: 'Telegram', color: '#24A1DE' },
    instagram: { label: 'Instagram', color: '#D62976' },
};