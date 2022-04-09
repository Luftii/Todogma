console.log("Injected script is running!");
var projectIDsAndNames = [];
var commentIDs = [];
var publicKeys = [];

function addDecryptButton() {
  var $input = $('<a href="#" onclick=\"performDecryption()\"><span class="_1f20c88a">Decrypt</span></button>');
  $input.appendTo($(".comments_textarea_buttons"));
}

function findCommentIDs() {
  commentIDs = [];
  $(".comments_list_container").find('div[id^="comment"]').each(function(index) {
  	// console.log($(this).attr("id"));
    commentIDs.push($(this).attr("id"));
  });

  console.log("IDs are:");
  for (var i = 0; i < commentIDs.length; i++) {
  	console.log(i + ": " + commentIDs[i]);
  }
}

function findProjectNames() {
  var projectNames = [];
  projectNames.length = $("#projects_list").find('li').length;

  $("#projects_list").find('li').each(function(index) {
    projectNames[index] = [];
    projectNames[index].push($(this).attr("data-id"));
    projectNames[index].push($(this).find('a').attr("aria-label").split(",")[0]);
  });

  console.log(projectNames);
}

function getPublicKeys() {
  // The following opens a channel for long-lived communication (see: https://developer.chrome.com/docs/extensions/mv3/messaging/)

  // // Get public keys from local extension storage
  // chrome.runtime.sendMessage({action: "get_public_key_list"}, function(response) {
  //   console.log(response.public_keys);
  // });
}

function performDecryption() {
  console.log("Hello is me decryptor");
  // Try to decrypt every comment
}

function addEventListeners() {
  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      console.log(msg);
    });
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(msg);
  });
}

function runRegularly() {
  addDecryptButton();
  findCommentIDs();
  findProjectNames();
  getPublicKeys();
}

addEventListeners();
setTimeout(runRegularly, 5000); // Runs once
// setInterval(runRegularly, 10000); // Runs repeatedly
