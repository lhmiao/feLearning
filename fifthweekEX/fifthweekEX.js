//将插入的内容放在span中，并存入span_arr中

function leftIn(span_arr) { //将内容从队列左侧插入
  var text = document.getElementById("text").value; //将输入在textarea的内容放入text变量(string)
  var word_start=0; //通过text的substring方法来提取内容，因此设置一个word_start来保持内容的起始位置
  var show_place = document.getElementById("show_place");
  var new_span;

  for(let i=0;i<text.length;i++) {
    if(!is_space(text[i])) { //找到的内容的起始位置
      word_start = i;
      for(++i;i<text.length;i++) { //找到内容的结束位置，但是如果输入所有内容结束后没有打间隔，则最后一个会漏插，因为找不到最后一个间隔，然后i==text.length,循环结束
        if(is_space(text[i])) {
          new_span = document.createElement("span");
          new_span.innerText = text.substring(word_start, i);
          span_arr.unshift(new_span);
          if(show_place.firstElementChild)
            show_place.insertBefore(new_span, show_place.firstElementChild);
          else
            show_place.appendChild(new_span);
          break;
        }
      }
    }
  }

  if(!is_space(text[text.length-1])&&word_start!=text.length) { //若输入所有内容结束时没打间隔，这最后一个内容会漏插，在这里补插
    new_span = document.createElement("span");
    new_span.innerText = text.substring(word_start);
    span_arr.unshift(new_span);
    if(show_place.firstElementChild)
      show_place.insertBefore(new_span, show_place.firstElementChild);
    else
      show_place.appendChild(new_span);
  }
}

function rightIn(span_arr) { //将内容从队列右侧插入，具体实现除了插入的方向之外与leftIn一致
  var text = document.getElementById("text").value;
  var word_start=0;
  var show_place = document.getElementById("show_place");
  var new_span;

  for(let i=0;i<text.length;i++) {
    if(!is_space(text[i])) {
      word_start = i;
      for(++i;i<text.length;i++) {
        if(is_space(text[i])) {
          new_span = document.createElement("span");
          new_span.innerText = text.substring(word_start, i);
          span_arr.push(new_span);
          show_place.appendChild(new_span);
          break;
        }
      }
    }
  }

  if(!is_space(text[text.length-1])&&word_start!=text.length) {
    new_span = document.createElement("span");
    new_span.innerText = text.substring(word_start);
    span_arr.push(new_span);
    show_place.appendChild(new_span);
  }
}

function leftOut(span_arr) { //输出左侧第一个内容并删除
  if(span_arr.length==0) { //判断是否有内容
    alert("当前队列为空！！！");
    return;
  }
  var show_place = document.getElementById("show_place");
  var delete_span = show_place.firstElementChild;
  alert("左侧第一个插入的内容为："+span_arr.shift().innerText); //输出并从span_arr中删除左侧第一个内容
  show_place.removeChild(delete_span); //删除左侧第一个内容
}

function rightOut(span_arr) { //输出右侧第一个内容并删除，具体实现与leftOut一致
  if(span_arr.length==0) {
    alert("当前队列为空！！！");
    return;
  }
  var show_place = document.getElementById("show_place");
  var delete_span = show_place.lastElementChild;
  alert("右侧第一个插入的内容为："+span_arr.pop().innerText);
  show_place.removeChild(delete_span);
}

function is_space(ch) { //判断ch字符是否是空格，逗号，顿号和换行
  if(ch==' '||ch==','||ch=='，'||ch=='、'||ch=='\n')
    return true;
  return false;
}

function matchSpan(span_arr) { //匹配搜索的内容
  if(span_arr.length==0) { //判断是否有内容插入
    alert("当前队列为空！！！请先插入内容，再进行搜索");
    return;
  }
  var span = document.getElementsByTagName("span");
  for(let s of span) { //清空上次查询的结果
    if(s.style.backgroundColor=="green")
      s.style.backgroundColor = "red";
  }
  var search_txt = document.getElementById("search").value; //取得待查询信息
  for(let a of span_arr) { //对插入的内容进行逐一排查
    if(a.innerText.indexOf(search_txt)!=-1) //若在某一内容中找到待查询的信息，将该内容的背景颜色改为绿色
      a.style.backgroundColor = "green";
  }
}

window.onload =function () {
  var span_arr = []; //用来存放插入的内容

  document.getElementById("left_in").onclick = function () {
    leftIn(span_arr);
  }
  document.getElementById("right_in").onclick = function () {
    rightIn(span_arr);
  }
  document.getElementById("left_out").onclick = function () {
    leftOut(span_arr);
  }
  document.getElementById("right_out").onclick = function () {
    rightOut(span_arr);
  }
  document.getElementById("match").onclick = function () {
    matchSpan(span_arr);
  }
}
