let port;
let projectNames = [];

function listPublicKeys() {
  let keys = Object.keys(localStorage);
  var publicKeysListSelect = document.getElementById("publicKeysList");

  removeOptions("publicKeysList");

  for (let key of keys) {
    if (key !== "private_key") {
      if (key.startsWith("public_key_")) {
        var option = document.createElement("option");
        option.text = key;
        publicKeysListSelect.add(option);
      }
    }
  }
}

function showPublicKeyDetails() {
  let publicKeysListSelect = document.getElementById("publicKeysList");
  let publicKeyDetailsTextArea = document.getElementById("publicKeyTextArea");

  publicKeyTextArea.value = localStorage.getItem(publicKeysListSelect.value);
}

// Clears the select element on the HTML page
function removeOptions(selectID) {
  var selectToClear = document.getElementById(selectID);

  // Source: https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box
  // ----------------
  var i, L = selectToClear.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectToClear.remove(i);
   }
   // ----------------
}

function addPublicKey() {
  var identifier = "public_key_" + document.getElementById("addPublicKeyIdentifier").value;
  var publicKey = document.getElementById("addPublicKeyInput").value;

  localStorage.setItem(identifier, publicKey);

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

function generateKeypair() {
  // Source: https://travistidwell.com/jsencrypt/demo/index.html
  // ----------------
  var keySize = 4096;
  var crypt = new JSEncrypt({default_key_size: keySize});

  crypt.getKey();

  localStorage.setItem("private_key", crypt.getPrivateKey());

  localStorage.setItem("public_key_me", crypt.getPublicKey());
  // ----------------

  document.getElementById("generatedPublicKeyTextarea").value = localStorage.getItem("public_key_me");

  generateKeypairStatusDivSuccessMessage();
  listPublicKeys();
  setTimeout(generateKeypairStatusDivRemoveSuccessMessage, 5000);
}

function generateKeypairStatusDivSuccessMessage() {
  document.getElementById("generateKeypairStatusDiv").innerHTML = "Private key has been saved!";
}

function generateKeypairStatusDivRemoveSuccessMessage() {
  document.getElementById("generateKeypairStatusDiv").innerHTML = "";
}

function generateProjectEncryptionKey() {
  // Source: https://attacomsian.com/blog/javascript-generate-random-string#generate-large-random-strings
  // ----------------
  let length = 32;
  let randomKey = "";
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    randomKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // ----------------

  document.getElementById("projectEncryptionKeyInput").value = randomKey;
}

function saveProjectEncryptionKey() {
  let projectNamesListSelect = document.getElementById("projectNamesList");
  let projectEncryptionKeyInput = document.getElementById("projectEncryptionKeyInput");

  // Get selected option id and name
  let selectionID = projectNamesListSelect.options[projectNamesListSelect.selectedIndex].id;
  let selectionText = projectNamesListSelect.options[projectNamesListSelect.selectedIndex].text;

  localStorage.setItem("project_key_" + selectionID + "_" + selectionText, projectEncryptionKeyInput.value);

  projectNamesListSelect.remove(projectNamesListSelect.selectedIndex);
  listSavedProjectsWithKeys();
}

function addUIFunctions() {
  $("#optionsAccordion").accordion({
    collapsible: true,
    heightStyle: "content"
  });
}

function listSavedProjectsWithKeys() {
  let items = Object.keys(localStorage);
  var projectNamesListShareSelect = document.getElementById("projectNamesListShare");

  removeOptions("projectNamesListShare");

  for (let item of items) {
    if (item !== "private_key") {
      if (item.startsWith("project_key_")) {
        var option = document.createElement("option");
        option.id = item.split("_")[2];
        option.text = item.split("_")[3];
        projectNamesListShareSelect.add(option);
      }
    }
  }
}

function encryptProjectKey() {
  let publicKeysListSelect = document.getElementById("publicKeysList");
  let projectNamesListShareSelect = document.getElementById("projectNamesListShare");
  let shareableProjectKeyTextfield = document.getElementById("shareableProjectKey");

  let selectedRecipientKey = localStorage.getItem(publicKeysListSelect.options[publicKeysListSelect.selectedIndex].text);

  let selectedProjectKey = localStorage.getItem("project_key_" + projectNamesListShareSelect.options[projectNamesListShareSelect.selectedIndex].id + "_" + projectNamesListShareSelect.options[projectNamesListShareSelect.selectedIndex].text);

  let exportedProjectNameAndKey = projectNamesListShareSelect.options[projectNamesListShareSelect.selectedIndex].text + "," + selectedProjectKey;

  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(selectedRecipientKey);

  shareableProjectKeyTextfield.value = encrypt.encrypt(exportedProjectNameAndKey);
}

function decryptProjectKey() {
  let private_key = localStorage.getItem("private_key");
  let importProjecEncryptionKeyTextfield = document.getElementById("importProjectEncryptionKey");
  let importProjectNameTextfield = document.getElementById("importProjectName");
  let importProjectEncryptionKeyTextfield = document.getElementById("importProjectEncryptionKeyTextfield");

  // Source: https://github.com/travist/jsencrypt
  // ----------------
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(private_key);

  let decryptedInput = decrypt.decrypt(importProjectEncryptionKeyTextfield.value);
  // ----------------

  importProjectNameTextfield.value = decryptedInput.split(",")[0];
  importProjecEncryptionKeyTextfield.value = decryptedInput.split(",")[1];
}

function importProjectEncryptionKey() {
  let projectNamesImportListSelect = document.getElementById("projectNamesImportList");
  let importProjectNameTextfield = document.getElementById("importProjectName");
  let importProjectEncryptionKeyInput = document.getElementById("importProjectEncryptionKey");

  // Get selected option id and name
  let selectionID = projectNamesImportListSelect.options[projectNamesImportListSelect.selectedIndex].id;
  let projectName = importProjectNameTextfield.value;

  localStorage.setItem("project_key_" + selectionID + "_" + projectName, importProjectEncryptionKeyInput.value);

  projectNamesImportListSelect.remove(projectNamesImportListSelect.selectedIndex);
  importProjectEncryptionKeyInput.value = "";
  listSavedProjectsWithKeys();
}

function addEventListeners() {
  document.getElementById("submitPublicKeyButton").addEventListener("click", addPublicKey);
  document.getElementById("generateKeypairButton").addEventListener("click", generateKeypair);
  document.getElementById("generateProjectEncryptionKeyButton").addEventListener("click", generateProjectEncryptionKey);
  document.getElementById("projectEncryptionKeyButton").addEventListener("click", saveProjectEncryptionKey);
  document.getElementById("publicKeysList").addEventListener("change", showPublicKeyDetails);
  document.getElementById("projectNamesListShare").addEventListener("change", encryptProjectKey);
  document.getElementById("decryptProjectKeyButton").addEventListener("click", decryptProjectKey);
  document.getElementById("importProjectEncryptionKeyButton").addEventListener("click", importProjectEncryptionKey);

  // Source: https://developer.chrome.com/docs/extensions/mv3/messaging/#connect
  // ----------------
  port = chrome.runtime.connect({name:"port-from-ext"});

  port.onMessage.addListener(function(m) {
    if (m.action === "sendProjectIDsAndNames") {
      var projectNamesListSelect = document.getElementById("projectNamesList");
      var projectNamesImportListSelect = document.getElementById("projectNamesImportList");

      removeOptions("projectNamesList");
      removeOptions("projectNamesListShare");
      removeOptions("projectNamesImportList");

      for (var i in m.data) {
        if (!localStorage.getItem("project_key_" + m.data[i][0] + "_" + m.data[i][1])) {
          localStorage.setItem("project_" + m.data[i][0] + "_" + m.data[i][1], "");
          projectNames.push(m.data[i][1]);
          var option = document.createElement("option");
          option.id = m.data[i][0];
          option.text = m.data[i][1];
          projectNamesListSelect.add(option);

          option = document.createElement("option");
          option.id = m.data[i][0];
          option.text = m.data[i][1];
          projectNamesImportListSelect.add(option);
        }
      }

      listSavedProjectsWithKeys();
    } else if (m.action === "getProjectKeys") {
      let items = Object.keys(localStorage);
      let aes_keys = [];

      for (let item of items) {
        if (item.startsWith("project_key_")) {
          let entry = [];

          let id = item.split("_")[2];
          let name = item.split("_")[3];
          let key = localStorage.getItem(item);

          entry.push(id);
          entry.push(name);
          entry.push(key);

          aes_keys.push(entry);
        }
      }

      port.postMessage({action: "getProjectKeysAnswer", data: aes_keys});
    }
  });
  // ----------------
}

addEventListeners();
listPublicKeys();
listSavedProjectsWithKeys();
addUIFunctions();
