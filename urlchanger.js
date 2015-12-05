function isNumber(num) {
    return !isNaN(num)
}

function createNewUrl(urlNumSplit, number) {
    // Update number
    number = parseInt(number);
    number++;
    number = String(number);
    
    urlBeforeNumber = urlNumSplit[0];
    urlAfterNumber = urlNumSplit[1];

    var newUrl = "";
    newUrl = newUrl.concat(urlBeforeNumber);
    newUrl = newUrl.concat(number);
    newUrl = newUrl.concat(urlAfterNumber);
    return newUrl;
}

function updateTabUrl(newUrl) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.update(tab.id, {url: newUrl});
            });
}

function getNumberStringFromUrl(partWithNumAtEnd) {
    var number = "";
    for (var i = partWithNumAtEnd.length - 1; i >=0; i--) {
        if(isNumber(partWithNumAtEnd[i])) {
            number = partWithNumAtEnd[i].concat(number); 
        } else {
            break;
        }
    }
    return number;
}

chrome.browserAction.onClicked.addListener(function(tab) {
    url = tab.url
    var stringValueToSplit = "&"
    var splittedUrl = url.split(stringValueToSplit);

    // Check if could split
    if (splittedUrl.length > 1) {
        var partWithNumAtEnd = splittedUrl[0];
        var number = getNumberStringFromUrl(partWithNumAtEnd);
        if (number.length > 0) {
            urlNumSplit = url.split(number);
            var newUrlcreateNewUrl(urlNumSplit, number);
            updateTabUrl(newUrl);
        }
    }
});

