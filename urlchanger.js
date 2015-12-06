function isNumber(num) {
    return !isNaN(num);
}

function numberFound(number) {
    return number.length > 0;
}

function incrementNumber(number) {
    number = parseInt(number);
    number++;
    number = String(number);
    return number;
}

function createNewUrl(urlParts, number) {
    return urlParts.urlBeforeNumber + number + urlParts.urlAfterNumber;
}

function updateTabUrl(newUrl) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.update(tab.id, {url: newUrl});
            });
}

function getNumberStringFromUrl(url) {
    var number = "";
    var separatorBeforeNumber = "id=";
    var separatorAfterNumber = "&";
    var beforeNumberIndex = 1;
    var afterNumberIndex = 0;
    number = url.split(separatorBeforeNumber)[beforeNumberIndex].split(separatorAfterNumber)[afterNumberIndex];
    return number;
}

chrome.browserAction.onClicked.addListener(function(tab) {
    url = tab.url;
    var number = getNumberStringFromUrl(url);
    if (numberFound(number)) {
        urlNumSplit = url.split(number);
        var urlParts = {urlBeforeNumber: urlNumSplit[0], urlAfterNumber: urlNumSplit[1]};
        number = incrementNumber(number);
        var newUrl = createNewUrl(urlParts, number);
        updateTabUrl(newUrl);
    }
});

