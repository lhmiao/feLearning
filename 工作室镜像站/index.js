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

function searchSource() { //关键字搜索函数
  var sourcelinks = document.getElementsByClassName("source-name"); //获取镜像列表中的<a>标签
  var search = document.getElementById("search"); //获取搜索input标签
  var targetSource = search.value.toLowerCase(); //获取要搜索的关键字并转化成小写

  if(targetSource==="") { //如果待搜索的关键字为空，说明用户不进行搜索，将之前搜索过滤的资源链接全部显现出来
    for(let i=0;i<sourcelinks.length;i++) {
      if(sourcelinks[i].parentElement.style.display==="none") {
        sourcelinks[i].parentElement.style.display = "";
      }
    }
  }
  else { //如果待搜索的关键字不为空，说明用户进行搜索，对每一个链接进行字符串匹配，待匹配不到的资源链接隐藏
    for(let i=0;i<sourcelinks.length;i++) {
      if(sourcelinks[i].innerText.toLowerCase().indexOf(targetSource)<0) {
        sourcelinks[i].parentElement.style.display = "none";
      }
    }
  }
}

function createNewSourceItem(url, name, time) { //根据资源链接的URL、资源链接名称、资源链接的最后更新时间（均为字符串形式）创建新的资源链接
  var newSourceItem = document.createElement("div");
  newSourceItem.className = "source-item";
  var newSourcelink = document.createElement("a");
  newSourcelink.className = "source-name";
  newSourcelink.setAttribute("href", url);
  newSourcelink.innerText = name;
  var newSourcetime = document.createElement("span");
  newSourcetime.className = "source-last-update";
  newSourcetime.innerText = time;
  newSourceItem.appendChild(newSourcelink);
  newSourceItem.appendChild(newSourcetime);
  return newSourceItem;
}

function insertNewSourceItem(NewSourceItem) { //将新的资源链接插入到页面
  var sourcelinks = document.getElementsByClassName("source-name"); //获取镜像列表中的<a>标签
  var newSourcelink = NewSourceItem.getElementsByClassName("source-name")[0]; //获取新资源链接中的<a>标签
  var sourceList = document.getElementById("source-list"); //获取页面中放置资源链接的父元素
  for(var i=0;i<sourcelinks.length;i++) { //将资源名称首字母相同的放在一组，将后更新的资源链接放在首字母相同的资源链接的前面
    if(newSourcelink.innerText.charAt(0).toLowerCase()<=sourcelinks[i].innerText.charAt(0).toLowerCase()) {
      sourceList.insertBefore(NewSourceItem, sourcelinks[i].parentElement);
      break;
    }
  }
  if(i===sourcelinks.length) { //如果i===sourcelinks.length，说明要么当前页面中没有资源链接，要么当前页面中没有与待插入资源链接首字母相同的资源链接，对于这两种情况，直接将新的资源链接放在最后
    sourceList.appendChild(NewSourceItem);
  }
}

function createNewNoticeItem(url, name) { //根据新闻的URL和新闻名称（均为字符串形式）创建新的新闻链接
  var newNoticeItem = document.createElement("a");
  newNoticeItem.setAttribute("href", url);
  newNoticeItem.innerText = name;
  return newNoticeItem;
}

function insertNewNoticeItem(newNoticeItem) { //插入新的新闻链接，将新的新闻链接放在第一个，如果除去标题链接的之外的新闻链接数大于3，则将最后一个新闻链接去掉
  var notice = document.getElementById("notice");
  if(notice.getElementsByTagName("a").length===1) {
    notice.appendChild(newNoticeItem);
  }
  else {
    notice.insertBefore(newNoticeItem, notice.firstElementChild.nextSibling);
    if(notice.getElementsByTagName("a").length===5) {
      notice.removeChild(notice.lastElementChild);
    }
  }
}

window.onload = function () {
  var search = document.getElementById("search"); //获取搜索input标签
  search.oninput = searchSource; //将搜索input标签的oninput数据绑定到搜索函数，当input文本框的内容发生变化时进行搜索关键字
  //测试创建函数与插入函数
  var newSourceItem = createNewSourceItem("#", "z", "2018-02-20 02:53");
  insertNewSourceItem(newSourceItem);
  var newNoticeItem = createNewNoticeItem("#", "新闻n");
  insertNewNoticeItem(newNoticeItem);
  //测试创建函数与插入函数

  //通过Ajax插入数据
  /*var xhr = createXHR();
  if(xhr) {
    xhr.onreadystatechange = function () {
      if(xhr.readystate===4) {
        if((xhr.status>=200&&xhr.status<300)||xhr.status===304) {
          //插入数据操作
        }
        else {
          alert("响应失败：" + xhr.status);
        }
      }
    }
  }
  else {
    alert("您浏览器版本过低，无法获取资源数据，请将浏览器更新到最新版本后重新打开本页面");
  }*/
};
