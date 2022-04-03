console.log("Injected script is running!");
var commentIDs = [];

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

function getPublicKeys() {
  // Get public keys from local extension storage
  chrome.runtime.sendMessage({action: "get_public_key_list"}, function(response) {
    console.log(response.public_keys);
  });
}

function performDecryption() {

  // Try to decrypt every comment
}

function runRegularly() {
  findCommentIDs();
  getPublicKeys();
  performDecryption();
}

setTimeout(runRegularly, 10000); // Runs once
// setInterval(runRegularly, 10000); // Runs repeatedly
