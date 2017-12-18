window.onload = function() {
  var a_arr = document.getElementsByTagName("a");
  var underline = document.getElementsByClassName('underline')[0];
  var old_margin_left;

  for(let i=0;i<a_arr.length;i++) {
    a_arr[i].onmouseover = function() {
      old_margin_left = underline.style.marginLeft;
      underline.style.marginLeft = i*20 + '%';
    }
    a_arr[i].onmouseout = function() {
      underline.style.marginLeft = old_margin_left;
    }
  }

}
