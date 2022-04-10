console.log("Injected script is running!");
var projectIDsAndNames = [];
var commentIDs = [];
var publicKeys = [];
var port;
var aes_keys;

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

  port.postMessage({action: "sendProjectIDsAndNames", data: projectNames});

  console.log(projectNames);
}

function getProjectKeys() {
  port.postMessage({action: "getProjectKeys"});
}

function performDecryption(text, key) {
  return "[DEC] " + CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}

function addEventListeners() {
  port = chrome.runtime.connect({name:"port-from-cs"});

  port.onMessage.addListener(function(m) {
    console.log(m.action + ": " + m.data);
    if (m.action === "getProjectKeysAnswer") {
      aes_keys = m.data;

      $(".comments_list_container").find('div[id^="comment"]').each(function(index) {
      	console.log($(this).attr("id"));
        $(this).find('p').text(performDecryption($(this).find('p').text(), aes_keys[0][2]));
      });
    }
  });
}

function runRegularly() {
  findCommentIDs();
  findProjectNames();
  getProjectKeys();
}

addEventListeners();
setTimeout(runRegularly, 5000); // Runs once
// setInterval(runRegularly, 10000); // Runs repeatedly
