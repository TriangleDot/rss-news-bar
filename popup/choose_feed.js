chrome = (function () {
  return window.chrome ||
    window.browser ||
    window.msBrowser;
})();
Q = function (a) {return document.querySelector(a)}

chrome.storage.sync = undefined; // Cannot deal with the whole "Am i temporary, or am I not temporary" thing, so sticking with local.

function storeget(key,responce) {

  if (chrome.storage.sync) {
    chrome.storage.sync.get([key], function(result) {
              responce(result);
            });
  }
  else {
    chrome.storage.local.get([key], function(result) {
              responce(result);
            });
  }
}
function storeset(key,value) {
  k = {};
  k[key] = value;
  if (chrome.storage.sync) {

    chrome.storage.sync.set(k, function() {

            });
  }
  else {
    console.log(k);
    chrome.storage.local.set(k, function() {

            });
  }
}
storeget("feed", (res) => {
  Q("#feed").value = res.feed;
})
storeget("numitems", (res) => {
  Q("#numitems").value = res.numitems;
})
storeget("toggle",function (res) {
  button = Q("#buttontoggle")
  if (res["toggle"] == "Off") {
    button.innerHTML = "Off";
    //sendMessage("hide");
    //storeset("toggle","Off",() => {})
  }
  else {
    button.innerHTML = "On";
    //sendMessage("show");
    //storeset("toggle","On",() => {})
  }
})




function log(log) {
  Q("#error-content").innerHTML += log;
}
function sendMessage(message) {
  browser.tabs.query({active: true, currentWindow: true})
        .then(function (tabs) {
          browser.tabs.sendMessage(tabs[0].id, {
                command: message,
              });
        });
}

function toggle(button) {

  if (button.innerHTML == "On") {
    button.innerHTML = "Off";
    sendMessage("hide");
    storeset("toggle","Off")

  }
  else {
    button.innerHTML = "On";
    sendMessage("show");
    storeset("toggle","On")
  }
}
//Q("#buttontoggle").onclick=fucntion () {toggle(Q("#buttontoggle"))}
//log(JSON.stringify(document));
document.addEventListener("click", (e) => {

  if (e.target.id == "buttontoggle") {
    toggle(e.target);
  }
  else if (e.target.id == "savesettings") {
    storeset("feed",Q("#feed").value);
    storeset("numitems",Q("#numitems").value);
    sendMessage("show");
  }
});
