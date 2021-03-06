function addNumOnclick(price, num, num_price) { //让单项商品的总价以及所有商品的总价随增加数量的input的增加而实时增加
  num_price.setAttribute("value", price.getAttribute("value")*num.value)
  num_price.innerText = "该项商品总价：￥" + num_price.getAttribute("value");
  sum();
}

function deleteOnclick(num_price) { //删除某项商品并实时更新所有商品的总价
  var delete_item = num_price.parentElement;
  var delete_num_price = num_price.getAttribute("value");
  var parent = document.getElementById("content");
  parent.removeChild(delete_item);
  var item_sum = document.getElementById("sum");
  item_sum.setAttribute("value", item_sum.getAttribute("value")-delete_num_price);
  item_sum.innerText = "所有商品总价：￥" + item_sum.getAttribute("value");
}

function sum() { //计算并显示所有商品总价
  var item_num_price = document.getElementsByClassName("item_num_price");
  var item_sum = 0;
  for(let i of item_num_price)
    item_sum += Number(i.getAttribute("value"));
  document.getElementById("sum").setAttribute("value", item_sum);
  document.getElementById("sum").innerText = "所有商品总价：￥" + document.getElementById("sum").getAttribute("value");
}

function addNewItem() { //创建并添加新的商品
  var new_name = document.getElementById("new_item_name").value;
  if(new_name=="") {
    alert("请输入待添加的商品信息后再进行添加");
    return;
  }
  var new_price = document.getElementById("new_item_price").value;
  var new_num = document.getElementById("new_item_num").value;
  var new_num_price = new_price*new_num;
  var div_item = document.createElement("div");
  var span_name = document.createElement("span");
  var span_price = document.createElement("span");
  var label = document.createElement("label");
  var label_txt = document.createTextNode("商品数量：");
  var input = document.createElement("input");
  var span_num_price = document.createElement("span");
  var button_delete = document.createElement("button");
  div_item.setAttribute("class", "item");
  span_name.setAttribute("class", "item_name");
  span_name.innerText = "商品名称：" + new_name;
  span_price.setAttribute("class", "item_price");
  span_price.setAttribute("value", new_price);
  span_price.innerText = "商品单价：￥" + new_price;
  label.appendChild(label_txt);
  input.setAttribute("type", "number");
  input.setAttribute("min", '0');
  input.setAttribute("class", "item_num");
  input.setAttribute("value", new_num);
  label.appendChild(input);
  span_num_price.setAttribute("class", "item_num_price");
  span_num_price.setAttribute("value", new_num_price);
  span_num_price.innerText = "该项商品总价：￥" + new_num_price;
  button_delete.setAttribute("type", "button");
  button_delete.setAttribute("class", "delete");
  button_delete.innerText = "删除该商品";
  div_item.appendChild(span_name);
  div_item.appendChild(span_price);
  div_item.appendChild(label);
  div_item.appendChild(span_num_price);
  div_item.appendChild(button_delete);
  var content = document.getElementById("content");
  content.appendChild(div_item);
  input.onclick = function () {
    addNumOnclick(span_price, input, span_num_price);
  }
  button_delete.onclick = function () {
    deleteOnclick(span_num_price);
  }
  var item_sum = document.getElementById("sum");
  item_sum.setAttribute("value", Number(item_sum.getAttribute("value"))+new_num_price);
  item_sum.innerText = "所有商品总价：￥" + item_sum.getAttribute("value");
}

window.onload = function () {
  var item = document.getElementsByClassName("item");
  for(let i of item) {
    i.children[2].firstElementChild.onclick = function () {
      addNumOnclick(i.children[1], i.children[2].firstElementChild, i.children[3]);
    }
    i.children[4].onclick = function () {
      deleteOnclick(i.children[3]);
    }
  }
  var add_new_item = document.getElementById("add_new_item");
  add_new_item.onclick = addNewItem;
}
