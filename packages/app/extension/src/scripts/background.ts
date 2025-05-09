chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === 'getCookie') {
        chrome.cookies.get({ url: message.url, name: message.name }, (cookie) => {
            sendResponse(cookie);
        });
        return true; // Indicate that the response will be sent asynchronously
    }
    return false;
});