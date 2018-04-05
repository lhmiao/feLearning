var search = document.querySelector("#search");
search.addEventListener("input", searchSource);

//测试创建函数与插入函数
var newSourceItem = createNewSourceItem("z", "#", "2018-02-20 02:53");
insertNewSourceItem(newSourceItem);
var NewNewsItem = createNewNewsItem("新闻n", "#");
insertNewNewsItem(NewNewsItem);

// var xhr = createXHR();
// if(xhr) {
//   xhr.onreadystatechange = function () {
//     if(xhr.readyState===4) {
//       if((xhr.status>=200&&xhr.status<300)||xhr.status===304) {
//         //处理数据
//       }
//     }
//     else {
//       alert("响应失败：" + xhr.status);
//     }
//   }
//   xhr.open("GET", , true);
//   xhr.send(null);
// }
// else {
//   alert("您浏览器版本过低，无法获取资源数据，请将浏览器更新到最新版本后重新打开本页面");
// }

function searchSource() {
  var targetSource = this.value.toLowerCase();
  var sourceNameList = document.querySelectorAll(".source-name");

  for(let i=0;i<sourceNameList.length;i++) {
    if(sourceNameList[i].innerText.toLowerCase().indexOf(targetSource)===-1) {
      sourceNameList[i].parentNode.style.display = "none";
    }
    else {
      sourceNameList[i].parentNode.style.display = "";
    }
  }
}

function createNewSourceItem(name, url, lastUpdate) {
  var newSourceItem = document.createElement("div");
  newSourceItem.className = "source-item";
  newSourceItem.innerHTML = `<a href="${url}" class="source-name">${name}</a><span class="source-last-update">${lastUpdate}</span>`;
  return newSourceItem;
}

function insertNewSourceItem(newSourceItem) {
  var newSourceNameFirstLetter = newSourceItem.firstElementChild.innerText[0].toLowerCase();
  var sourceNameList = document.querySelectorAll(".source-name");
  var sourceList = document.querySelector("#sourceList");

  for(var i=0;i<sourceNameList.length;i++) {
    if(newSourceNameFirstLetter<=sourceNameList[i].innerText[0].toLowerCase()) {
      sourceList.insertBefore(newSourceItem, sourceNameList[i].parentNode);
      break;
    }
  }
  if(i===sourceNameList.length) {
    sourceList.appendChild(newSourceItem);
  }
}

function createNewNewsItem(name, url) {
  var newNewsItem = document.createElement("a");

  newNewsItem.innerText = name;
  newNewsItem.href = url;
  return newNewsItem;
}

function insertNewNewsItem(newNewsItem) {
  var newsNotice = document.querySelector("#newsNotice");

  newsNotice.insertBefore(newNewsItem, newsNotice.firstElementChild.nextElementSibling)
  if(newsNotice.childElementCount===5) {
    newsNotice.removeChild(newsNotice.lastElementChild);
  }
}

function createXHR() {
  if(typeof XMLHttpRequest == "undefined") {
    try {
      return new ActionXObject("MSXML2.XMLHttp.6.0");
    } catch(e) {}
    try {
      return new ActionXObject("MSXML2.XMLHttp.3.0");
    } catch(e) {}
    try {
      return new ActionXObject("MSXML2.XMLHttp");
    } catch(e) {}
    return false;
  }
  return new XMLHttpRequest();
}
