chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    if (request.action === "get_public_key_list") {
      var keys = []

      chrome.runtime.sendMessage({action: "get_public_key_list_from_options"}, function(response) {
        console.log(response.public_keys);
        for (entry in response.public_keys) {
          keys.add(entry);
        }

        sendResponse({public_keys: keyList});
      });
    }
  }
);
