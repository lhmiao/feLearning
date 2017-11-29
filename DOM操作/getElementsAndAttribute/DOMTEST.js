//alert(document.getElementById('first').innerText);
var items = document.getElementsByClassName('items');
//for(let i of items)
    //alert(i.innerText);
//for(let i of items)
    //alert(i.getAttribute("title"));
for(let i of items) {
    i.setAttribute("title", "这是items");
    alert(i.getAttribute("title"));
}
//for(let i in items)
    //alert(i);
