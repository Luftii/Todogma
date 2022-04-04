function listPublicKeys() {
  let keys = Object.keys(localStorage);
  var publicKeysListSelect = document.getElementById("publicKeysList");

  removeOptions();

  for (let key of keys) {
    if (key !== "private_key") {
      var option = document.createElement("option");
      option.text = key;
      publicKeysListSelect.add(option);
    }
  }
}

function showPublicKeyDetails() {
  let publicKeysListSelect = document.getElementById("publicKeysList");
  let publicKeyDetailsTextArea = document.getElementById("publicKeyTextArea");

  publicKeyTextArea.value = localStorage.getItem(publicKeysListSelect.value);
}

// Clears the select element on the HTML page
function removeOptions() {
  var publicKeysListSelect = document.getElementById("publicKeysList");

  var i, L = publicKeysListSelect.options.length - 1;
   for(i = L; i >= 0; i--) {
      publicKeysListSelect.remove(i);
   }
}

function addPublicKey() {
  var identifier = document.getElementById("addPublicKeyIdentifier").value;
  var publicKey = document.getElementById("addPublicKeyInput").value;
  console.log("Hello is me lufti.");

  localStorage.setItem(identifier, publicKey);

  console.log("Public key saved!" + identifier + " " + publicKey);
  addPublicKeyDisplaySuccessMessage();
  listPublicKeys();
  document.getElementById("addPublicKeyIdentifier").value = "";
  document.getElementById("addPublicKeyInput").value = "";
  setTimeout(addPublicKeyRemoveSuccessMessage, 5000);
}

function addPublicKeyDisplaySuccessMessage() {
  document.getElementById("addPublicKeyStatusDiv").innerHTML = "Public key has been saved!";
}

function addPublicKeyRemoveSuccessMessage() {
  document.getElementById("addPublicKeyStatusDiv").innerHTML = "";
}

function addPrivateKey() {
  var privateKey = document.getElementById("addPrivateKeyInput").value;
  console.log("Hello is me lufti.");

  localStorage.setItem("private_key", privateKey);

  console.log("Public key saved! private_key " + privateKey);
  addPrivateKeyDisplaySuccessMessage();
  document.getElementById("addPrivateKeyInput").value = "";
  setTimeout(addPrivateKeyRemoveSuccessMessage, 5000);
}

function addPrivateKeyDisplaySuccessMessage() {
  document.getElementById("addPrivateKeyStatusDiv").innerHTML = "Private key has been saved!";
}

function addPrivateKeyRemoveSuccessMessage() {
  document.getElementById("addPrivateKeyStatusDiv").innerHTML = "";
}

// sends the public keys to the content script in Todoist
function sendPublicKeys(){
  let keys = Object.keys(localStorage);
  var publicKeys = [];

  for (let key of keys) {
    if (key !== "private_key") {
      publicKeys.push(key);
    }
  }

  console.log("Sending public keys now!");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    let keys = Object.keys(localStorage);
    chrome.tabs.sendMessage(tab.id, {publicKeys: keys}, function handler(response) {
        // only for debugging
        console.log(response);
      });
    });
}

function addEventListeners() {
  document.getElementById("submitPublicKeyButton").addEventListener("click", addPublicKey);
  document.getElementById("submitPrivateKeyButton").addEventListener("click", addPrivateKey);
  document.getElementById("publicKeysList").addEventListener("change", showPublicKeyDetails);
}

addEventListeners();
listPublicKeys();
setTimeout(sendPublicKeys, 5000);
