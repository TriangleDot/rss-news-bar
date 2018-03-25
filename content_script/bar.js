/*chrome = (function () {
  return window.chrome ||
    window.browser ||
    window.msBrowser;
})();*/
chrome.storage.sync = undefined; // Cannot deal with the whole "Am i temporary, or am I not temporary" thing, so sticking with local.
run = true;




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
    //console.log(k);
    chrome.storage.local.set(k, function() {

            });
  }
}
  _Q = function (a) {return document.querySelector(a)}
  bar = '<div id="RN-bar" style="position:fixed;width:100%;height:50px;bottom:0px;left:0px;background-color:#3301bf;border-top: 2px black solid;box-shadow: 0em 0em 0.5em;z-index:10000000;"> \
    <div style="white-space: nowrap;font-size:40px;font-family:Arial, sans-serif;position:absolute;bottom:3px;line-height:1.5;overflow: hidden;right:-1000000%;color:white;" id="RN-text"><span style="background-color:yellow">\
    </div>\
  </div>';
//_Q("body").innerHTML += bar;



  function animate() {

    __p += amount;
    __l -= amount;
    _Q("#RN-text").style.right = __p+"%"
    _Q("#RN-text").style.left = __l+"%"
    console.log(__p);
    if (run) {
      if (__p > 100) {
        console.log("Updating...");
        setTimeout(UPDATE,50)

      }
      else {
        setTimeout(animate,50);
      }
    }


  }
  feed = "<rss version='2.0'>\
<channel> \
<title>W3Schools Home Page</title>\
<link>https://www.w3schools.com</link>\
<description>Free web building tutorials</description>\
<item>\
<title>RSS Tutorial</title>\
<link>https://www.w3schools.com/xml/xml_rss.asp</link>\
<description>New RSS tutorial on W3Schools</description>\
</item>\
<item>\
<title>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</title>\
<link>https://www.w3schools.com/xml</link>\
<description>New XML tutorial on W3Schools</description>\
</item>\
</channel>\
</rss>"
  totalitems = 6
  oitems = []

  function getFeed(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        feed = this.responseText;
        commence();

      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  function parseFeed(feed) {
    item = 0
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(feed, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(feed);
    }
    citems = []
    noitems = []
    items = xmlDoc.getElementsByTagName("item")
    for (it of items) {
      item ++;
      if (item > totalitems) {
        break;
      }
      i = it.getElementsByTagName("title")[0].innerHTML;
      if (i) {

        i = i.replace("<![CDATA[","")
        i = i.replace("]]>","")
        i = i.replace(" ","&nbsp;")
        i = i.replace("<","&lt;")
        i = i.replace(">","&gt;")
        i = i.replace("\n","")
        i = i.replace("\r","")
        noitems.push(i)
        ////console.log(i);
        ////console.log(oitems);
        ////console.log(i in oitems)
        if (oitems.indexOf(i) == -1) {
          i = "<span style='background-color:rgb(28, 124, 145)'>"+i+"</span>"
        }
        else {

        }
        i = "<a style='color:white;overflow:hidden;position:relative;text-decoration: underline white;' target='_blank' href='"+it.getElementsByTagName("link")[0].innerHTML+"'>"+i+"</a>"

        citems.push(i)
      }
    }
    oitems = noitems;
    storeset("oitems",oitems);
    fulltext = citems.join("&nbsp;&#9673;&nbsp;")
    return fulltext;
  }
window.addEventListener('resize', function(event){
  var winwidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

  var winheight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

  w = _Q("#RN-text").clientWidth;
  putplace = ((w/(winwidth/100))/-1)-10
  //putplace = w/-1
  //__p = putplace
  //__l = 100;
  amount = 100/(winwidth/5)
});
  function commence() {
    text = parseFeed(feed)
    _Q("#RN-text").innerHTML = text;

    var winwidth = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;

    var winheight = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;

    w = _Q("#RN-text").clientWidth;
    putplace = ((w/(winwidth/100))/-1)
    //putplace = w/-1
    __p = putplace
    __l = 100;
    amount = 100/(winwidth/5)
    //console.log(__p);
    //console.log(w);
    //console.log(winwidth);
    run = true;
    animate();
    //_Q("#RN-bar").style.display = oldstyle;
    setTimeout(() => {storeget("toggle",function (res) {
      //console.log("Getting...");
      //console.log(res);
      if (res["toggle"] == "Off") {
        _Q("#RN-bar").style.display = "none";
        run = false;
        //storeset("toggle","Off",() => {})
      }
      else {
        _Q("#RN-bar").style.display = "block";
        run = true;

        //storeset("toggle","On",() => {})
      }
    })},100);

  }
chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "hide") {
      _Q("#RN-bar").style.display = "none";
      run = false;
    } else if (message.command === "show") {
      _Q("#RN-bar").style.display = "block";
      run = true;
      UPDATE();
    }
  });

function UPDATE() {
  //oldstyle = _Q("#RN-bar").style.display;
  //_Q("#RN-bar").style.display = "block";
  run = false;
  storeget("oitems", function (res) {
    if (res.oitems) {
      oitems = res.oitems;
    }
    storeget("feed", function (res) {
        if (res.feed) {
          feed = res.feed;
          storeget("numitems", function (res) {
            if (res.numitems) {
              totalitems = Number(res.numitems);
              getFeed(feed);
            }
          })
        }
    })
  })
}
//document.addEventListener("load", function () {
  function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

var fragment = create(bar);
// You can use native DOM methods to insert the fragment:
document.body.insertBefore(fragment, document.body.childNodes[0]);
  UPDATE();

  //https://feeds.bbci.co.uk/news/rss.xml?edition=uk
