export const getCookie = async (type: string, name: string) => {
    const cookie = await chrome.runtime.sendMessage({
        name,
        type,
        url: 'http://localhost',
    });

    return cookie ? cookie.value : '';
};