import { isLocal } from './core';

export const cookie = async (type: string, name: string) => {
    const cookie = await chrome.runtime.sendMessage({
        name,
        type,
        url: isLocal ? 'http://localhost' : 'https://clubedoafiliado.com',
    });

    return cookie ? cookie.value : '';
};