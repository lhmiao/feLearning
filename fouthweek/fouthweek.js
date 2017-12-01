function addNumOnclick(price, num, num_price) { //让单项商品的总价以及所有商品的总价随增加数量的input的增加而实时增加
  num_price.setAttribute("value", price.getAttribute("value")*num.value)
  num_price.innerText = "该项商品总价：￥" + num_price.getAttribute("value");
  sum();
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
  div_item.appendChild(span_name);
  div_item.appendChild(span_price);
  div_item.appendChild(label);
  div_item.appendChild(span_num_price);
  var content = document.getElementById("content");
  content.appendChild(div_item);
  input.onclick = function () {
    addNumOnclick(span_price, input, span_num_price);
  }
  var item_sum = document.getElementById("sum");
  item_sum.setAttribute("value", Number(item_sum.getAttribute("value"))+new_num_price);
  item_sum.innerText = "所有商品总价：￥" + item_sum.getAttribute("value");
}

window.onload = function () {
  var item_price = document.getElementsByClassName("item_price");
  var item_num = document.getElementsByClassName("item_num");
  var item_num_price = document.getElementsByClassName("item_num_price");
  for(let i=0;i<item_num.length;i++) {
    item_num[i].onclick = function () { //将每个增加数量的input的onclick事情绑到这个函数
      addNumOnclick(item_price[i], item_num[i], item_num_price[i]);
    }
  }
  var add_new_item = document.getElementById("add_new_item");
  add_new_item.onclick = addNewItem;
}
