chrome.webNavigation.onDOMContentLoaded.addListener(({ tabId, url }) => {
    console.log({ url });
    if (!/https?:\/\/(.+\.)?minehut\.com\.?(\/.*)?/.test(url)) return;
    chrome.scripting.executeScript({
        target: { tabId },
        files: ["js/inject.js"],
    });
});
