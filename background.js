let portFromCS;
let portFromExt;

function connected(p) {
  if (p.name === "port-from-cs") {
    portFromCS = p;

    portFromCS.onMessage.addListener(function(m) {
      console.log(m.action + ": " + m.data);
      if (m.action === "sendProjectIDsAndNames") {
        if (portFromExt !== undefined) {
          portFromExt.postMessage({action: "sendProjectIDsAndNames", data: m.data});
        }
      } else if (m.action === "getProjectKeys") {
        if (portFromExt !== undefined) {
          portFromExt.postMessage({action: "getProjectKeys"});
        }
      }
    });
  } else { // Port is from Extension
    portFromExt = p;

    portFromExt.onMessage.addListener(function(m) {
      console.log(m.action + ": " + m.data);
      if (m.action === "getProjectKeysAnswer") {
        if (portFromExt !== undefined) {
          portFromCS.postMessage({action: "getProjectKeysAnswer", data: m.data});
        }
      }
    });
  }
}

chrome.runtime.onConnect.addListener(connected);
