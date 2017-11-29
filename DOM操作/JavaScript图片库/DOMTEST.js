/*function changePicture(element) {
  var pictureHolder = document.getElementsByTagName("img")[0];
  pictureHolder.setAttribute("src", element.getAttribute("value"));
  var text = document.getElementsByTagName("p")[0];
  text.innerText = element.getAttribute("title");
}button时的changePicture函数*/

function changePicture(element) {
  var pictureHolder = document.getElementsByTagName("img")[0];
  pictureHolder.setAttribute("src", element.getAttribute("href"));
  var text = document.getElementsByTagName("p")[0];
  text.innerText = element.getAttribute("title");
  /*alert(document.getElementsByTagName("body")[0].childNodes.length);*/
}

/*function bodyNodesCount() {
  alert(document.getElementsByTagName("body")[0].childNodes.length);
}

window.onload = bodyNodesCount();*/


function showPicture() {
  if(!document.getElementsByTagName)
      return false;
  if(!document.getElementById)
      return false;
  if(!document.getElementById("picture"))
      return false;
  var picture = document.getElementById("picture");
  var links = picture.getElementsByTagName("a");
  for(let i of links)
      i.onclick = function() {
        changePicture(this);
        return false;
      }
}

window.onload = showPicture();
