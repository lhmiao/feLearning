function addLoadEven (func) {
  var oldonload = window.onload;
  if(typeof window.onload!=="function")
      window.onload = func;
  else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

function insert() {
  var testDiv = document.getElementById("testDiv");
  var pBefore = document.createElement('p');
  var txtBefore = document.createTextNode("这是在指定元素前插入的p元素");
  pBefore.appendChild(txtBefore);
  var secondP = document.getElementById("second");
  secondP.parentNode.insertBefore(pBefore, secondP);
  var first = document.getElementById("first");
  var pAfter = document.createElement('p');
  var txtAfter = document.createTextNode("这是在指定元素后插入的p元素");
  pAfter.appendChild(txtAfter);
  insertAfter(first, pAfter);
}

function insertAfter(targetElement, newElement) {
  var parent = targetElement.parentNode;
  if(parent.lastChild===targetElement)
    parent.appendChild(newElement);
  else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

addLoadEven(insert);
