window.onload = function () {
  var headerRightImg =  document.getElementsByClassName("header_right_img")[0];
  var allContent = document.getElementsByClassName("all_content")[0];

  headerRightImg.onclick = function () {
    if(headerRightImg.getAttribute("src")=="images/collapsed_no.gif") {
      headerRightImg.setAttribute("src", "images/collapsed_yes.gif")
      allContent.style.display = "none";
    }
    else {
      headerRightImg.setAttribute("src", "images/collapsed_no.gif")
      allContent.style.display = "";
    }
  }
}
