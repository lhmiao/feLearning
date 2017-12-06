function leftIn(input, show_place, arr) { //将输入的数字从左侧插入队列和arr数组
  if(!is_in_range(input.value)) {
    alert("请输入10-100的数字");
    return;
  }
  if(arr.length==60) {
    alert("超过60组数据了，老子不干了！！！");
    return;
  }
  var new_span = document.createElement("span");
  new_span.style.height = input.value+"px";
  new_span.setAttribute("value", input.value);
  if(show_place.firstElementChild!=null)
    show_place.insertBefore(new_span, show_place.firstElementChild);
  else
    show_place.appendChild(new_span);
  arr.unshift(new_span);
}

function rightIn(input, show_place, arr) { //将输入的数字从右侧插入队列和arr数组
  if(!is_in_range(input.value)) {
    alert("请输入10-100的数字");
    return;
  }
  if(arr.length==60) {
    alert("超过60组数据了，老子不干了！！！");
    return;
  }
  var new_span = document.createElement("span");
  new_span.style.height = input.value+"px";
  new_span.setAttribute("value", input.value);
  show_place.appendChild(new_span);
  arr.push(new_span);
}

function leftOut(input, show_place, arr) { //将输入的数字从队列和arr数组左侧输出
  var left_first_span = show_place.firstElementChild;
  if(left_first_span==null) {
    alert("当前队列为空！！！");
    return;
  }
  else {
    alert("队列左侧数字为："+left_first_span.getAttribute("value"));
  }
  show_place.removeChild(left_first_span);
  arr.shift();
}

function rightOut(input, show_place, arr) { //将输入的数字从队列和arr数组右侧输出
  var right_last_span = show_place.lastElementChild;
  if(right_last_span==null) {
    alert("当前队列为空！！！");
    return;
  }
  else {
    alert("队列右侧数字为："+right_last_span.getAttribute("value"));
  }
  show_place.removeChild(right_last_span);
  arr.pop();
}

function is_in_range(value) { //判断输入的数字是否在10-100范围内
  return value>=10&&value<=100?true:false;
}

function sort_number(show_place, arr) { //对arr数组和队列进行排序
  arr.sort(function (x, y) {
    var x_value = x.getAttribute("value");
    var y_value = y.getAttribute("value");
    if(x_value>y_value)
      return 1;
    else if(x_value<y_value)
      return -1;
    else
      return 0;
  });
  for(let a of arr)
    show_place.removeChild(a);
  for(let a of arr)
    show_place.appendChild(a);
}


window.onload = function () {
  var input = document.getElementById("input");
  var show_place = document.getElementById("show_place");
  var arr = []; //将输入的数字的span存在arr数组中，并在该数组上进行排序

  document.getElementById("left_in").onclick = function () {
    leftIn(input, show_place, arr);
  };
  document.getElementById("right_in").onclick = function () {
    rightIn(input, show_place, arr);
  };
  document.getElementById("left_out").onclick = function () {
    leftOut(input, show_place, arr)
  };
  document.getElementById("right_out").onclick = function () {
    rightOut(input, show_place, arr);
  };
  document.getElementById("sort").onclick = function () {
    sort_number(show_place, arr)
  };
}
