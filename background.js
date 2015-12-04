function isNumber(num) {
  return !isNaN(num)
}

chrome.browserAction.onClicked.addListener(function(tab) {
    url = tab.url
    var stringValueToSplit = "&"
    var splittedUrl = url.split(stringValueToSplit);
    // Check if value found
    if (splittedUrl.length > 1) {
        var partWithNumAtEnd = splittedUrl[0];
        length = partWithNumAtEnd.length;
        var number = "";
        for (var i = length - 1; i >=0; i--) {
            if(isNumber(partWithNumAtEnd[i])) {
                number = partWithNumAtEnd[i].concat(number) 
            } else {
                break;
            }
        }
        if (number.length > 0) {
            urlNumSplit = url.split(number);
            number = parseInt(number);
            number++;
            number = String(number);
            newUrl = ""
            newUrl = newUrl.concat(urlNumSplit[0]);
            newUrl = newUrl.concat(number);
            newUrl = newUrl.concat(urlNumSplit[1]);

            chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.update(tab.id, {url: newUrl});
            });
        }
    }
});

