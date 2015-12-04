function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });

}
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function isNumber(num) {
  return !isNaN(num)
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var splittedUrl = url.split("&");
    var firstPart = splittedUrl[0];
    length = firstPart.length;
    var episodeNumber = "";
    for (var i = length - 1; i >=0; i--) {
        if(isNumber(firstPart[i])) {
            episodeNumber = episodeNumber.concat(firstPart[i]) 
        } else {
            break;
        }
    }
    episodeNumber = episodeNumber.split("").reverse().join("");
    epNumUrlSplit = url.split(episodeNumber);
    episodeNumber = parseInt(episodeNumber);
    episodeNumber++;
    episodeNumber = String(episodeNumber);
    newUrl = ""
    newUrl = newUrl.concat(epNumUrlSplit[0]);
    newUrl = newUrl.concat(episodeNumber);
    newUrl = newUrl.concat(epNumUrlSplit[1]);
    renderStatus(newUrl);

    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
      chrome.tabs.update(tab.id, {url: newUrl});
    });
  });
});

