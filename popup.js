var aes_keys;

function performEncryption() {
  let projectKeyListSelect = document.getElementById("projectKeyList");

  let selectedKey = localStorage.getItem(projectKeyListSelect.options[projectKeyListSelect.selectedIndex].text);

  var encryption = CryptoJS.AES.encrypt($("#textInput").val(), selectedKey);

  $("#textInput").val(encryption);
}

function performDecryption() {
  let projectKeyListSelect = document.getElementById("projectKeyList");

  let selectedKey = localStorage.getItem(projectKeyListSelect.options[projectKeyListSelect.selectedIndex].text);

  var decryption = CryptoJS.AES.decrypt($("#textInput").val(), selectedKey).toString(CryptoJS.enc.Utf8);

  $("#textInput").val(decryption);
}

// Clears the select element on the HTML page
function removeOptions(selectID) {
  var selectToClear = document.getElementById(selectID);

  var i, L = selectToClear.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectToClear.remove(i);
   }
}

function addEventListeners() {
  document.getElementById("encryptButton").addEventListener("click", performEncryption);
  document.getElementById("decryptButton").addEventListener("click", performDecryption);

  let items = Object.keys(localStorage);
  var projectKeyListSelect = document.getElementById("projectKeyList");

  removeOptions("projectKeyList");

  for (let item of items) {
    if (item !== "private_key") {
      if (item.startsWith("project_key_")) {
        var option = document.createElement("option");
        option.id = item.split("_")[2];
        option.text = item;
        projectKeyListSelect.add(option);
      }
    }
  }
}

addEventListeners();
