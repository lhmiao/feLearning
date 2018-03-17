function Carousel(obj) {
  this.containerId = obj.containerId; //页面中轮播图容器的
  this.imgURLArray = obj.imgURLArray; //由imgURL组成的数组
  this.imgWidth = obj.imgWidth; //单张图片宽度
  this.imgHeight = obj.imgHeight; //单张图片高度
  this.direction = obj.direction; //默认移动方向
  this.interval = obj.interval; //移动间隔，以毫秒为单位
  this.oneMoveTime = obj.oneMoveTime; //一次移动花费的时间，以毫秒为单位
  this.haveArrows = obj.haveArrows; //是否要左右箭头
  this.haveButtons = obj.haveButtons; //是否要按钮（图片下方的小圆点）
  this.init(); //初始化
}

Carousel.prototype = {
  autoMove: function () { //控制img轮播
    var showPlace = document.getElementById("showPlace");
    var imgList = document.getElementsByClassName("image");
    if(showPlace.style.transition==="margin-left 0s") { //如果showPlace.style.transition==="margin-left 0s"，说明上一次移动进行了会跳操作，要将showPlace.style.transition改回去
      showPlace.style.transition = "margin-left " + (this.oneMoveTime/1000 + "s");
    }
    if(this.haveButtons) { //如果有小圆点
      this.clearCircleBackgroundColor(); //清除了所有小圆点的背景颜色
      imgList[showPlace.nextImgth].circle.style.backgroundColor = "#1a77da"; //把要显示的img对应的小圆点背景颜色设为"#1a77da"
    }
    if(showPlace.nextImgth>=1&&showPlace.nextImgth<=imgList.length-2) { //如果showPlace.nextImgth在此范围，说明这一次移动正常移动即可
      showPlace.style.marginLeft = imgList[showPlace.nextImgth].inShowPlaceDistance;
      this.direction==="right"?showPlace.nextImgth++:showPlace.nextImgth--; //根据direction的值选择待显示的下一张img
    }
    else if (showPlace.nextImgth===imgList.length-1) { //如果showPlace.nextImgth===imgList.length-1，说明这一次移动移动到了最后一张，移动完毕后要切回第二张
      if(this.direction==="right") {
        showPlace.style.marginLeft = imgList[showPlace.nextImgth].inShowPlaceDistance; //正常移动到最后一张
        showPlace.backToId = setTimeout(this.backToFirstImg.bind(this), this.oneMoveTime); //在移动完成后切回第二张
        showPlace.nextImgth=2;
      }
      else {
        showPlace.style.marginLeft = imgList[showPlace.nextImgth].inShowPlaceDistance;
        showPlace.nextImgth--;
      }
    }
    else if (showPlace.nextImgth===0) { //如果showPlace.nextImgth===0，说明说明这一次移动移动到了第一张，移动完毕后要切回倒数第二张
      if(this.direction==="right") {
        showPlace.style.marginLeft = imgList[showPlace.nextImgth].inShowPlaceDistance;
        showPlace.backToId = setTimeout(this.backToLastImg.bind(this), this.oneMoveTime);
        showPlace.nextImgth++;
      }
      else {
        showPlace.style.marginLeft = imgList[showPlace.nextImgth].inShowPlaceDistance; //正常移动到第一张
        showPlace.backToId = setTimeout(this.backToLastImg.bind(this), this.oneMoveTime); //在移动完成后切回倒数第二张
        showPlace.nextImgth=imgList.length-3
      }
    }
    showPlace.moveId = setTimeout(this.autoMove.bind(this), this.interval);
  },
  backToFirstImg: function () { //切回第二张图片
    var showPlace = document.getElementById("showPlace");
    var imgList = document.getElementsByClassName("image");
    showPlace.style.transition = "margin-left 0s";
    showPlace.style.marginLeft = imgList[1].inShowPlaceDistance;
  },
  backToLastImg: function () { //切回第二张图片
    var showPlace = document.getElementById("showPlace");
    var imgList = document.getElementsByClassName("image");
    showPlace.style.transition = "margin-left 0s";
    showPlace.style.marginLeft = imgList[imgList.length-2].inShowPlaceDistance;
  },
  clearCircleBackgroundColor: function () { //清除了所有小圆点的背景颜色
    var circleList = document.getElementsByClassName("circle");
    for(let i=0;i<circleList.length;i++) {
        circleList[i].style.backgroundColor = "transparent";
    }
  },
  moveRightOneTime: function () { //执行一次向右移动
    var showPlace = document.getElementById("showPlace");
    var imgListLength = document.getElementsByClassName("image").length;
    clearTimeout(showPlace.moveId); //清除当前正在进行到底移动
    if(this.direction==="right") { //如果默认向右移动，则立即进行下次移动
      this.autoMove();
    }
    else { //如果默认向左移动，则showPlace.nextImgth设为待显示的图片的序号
      showPlace.nextImgth += 2;
      showPlace.nextImgth %= imgListLength;
      if(showPlace.nextImgth===0) { //如果待显示的图片的序号为0，说明当前显示的最后一张，我们需要切回第二张，下一次显示的图片为第三张
        clearTimeout(showPlace.backToId);
        this.backToFirstImg();
        showPlace.nextImgth = 2;
      }
      this.autoMove(); //执行移动
    }
  },
  moveLeftOneTime: function () { //执行一次向左移动
    var showPlace = document.getElementById("showPlace");
    var imgListLength = document.getElementsByClassName("image").length;
    clearTimeout(showPlace.moveId); //清除当前正在进行到底移动
    if(this.direction==="right") { //如果默认向右移动，则showPlace.nextImgth设为待显示的图片的序号
      showPlace.nextImgth = showPlace.nextImgth + (imgListLength-2);
      showPlace.nextImgth %= imgListLength;
      if(showPlace.nextImgth===imgListLength-1) { //如果待显示的图片为最后一张，说明当前显示的第一张，我们需要切回倒数第二张，下一次显示的图片为倒数第三张
        clearTimeout(showPlace.backToId);
        this.backToLastImg();
        showPlace.nextImgth = imgListLength-3;
      }
      this.autoMove();
    }
    else { //如果默认向左移动，则立即进行下次移动
      this.autoMove();
    }
  },
  circleClick: function (circle) { //点击小圆点时清除当前移动，将showPlace.nextImgth设点击的小圆点所对应的图片的序号
    var showPlace = document.getElementById("showPlace");
    clearTimeout(showPlace.moveId);
    showPlace.nextImgth = circle.imgth;
    this.autoMove();
  },
  createHTML: function () { //创建轮播图的结构
    var container = document.getElementById(this.containerId);
    var showPlace = document.createElement("div");
    showPlace.id = "showPlace";
    showPlace.nextImgth = 1; //showPlace的nextImgth属性保存了下一张要显示的img的序号

    //创建所需的img元素并放到imgArray数组中
    var imgArray = [];
    for(let i=0;i<this.imgURLArray.length;i++) {
      let newImg = document.createElement("img");
      newImg.src = this.imgURLArray[i];
      newImg.className = "image";
      imgArray.push(newImg);
    }
    var firstImg = document.createElement("img");
    firstImg.src = this.imgURLArray[this.imgURLArray.length-1];
    firstImg.className = "image";
    imgArray.unshift(firstImg);
    var lastImg = document.createElement("img");
    lastImg.src = this.imgURLArray[0];
    lastImg.className = "image";
    imgArray.push(lastImg);

    //每张img的ininShowPlaceDistance保存了当该图片出现在显示区域时，showPlace的marginLeft值
    for(let i=0;i<imgArray.length;i++) {
      imgArray[i].inShowPlaceDistance = -this.imgWidth*i + "px";
    }
    //根据img的宽高设置container的宽高

    container.style.width = this.imgWidth + "px";
    container.style.height = this.imgHeight + "px";

    //将所有img元素添加到showPlace，并设置showPlace的样式
    for(let i=0;i<imgArray.length;i++) {
      showPlace.appendChild(imgArray[i]);
    }
    showPlace.style.marginLeft = -this.imgWidth + "px";
    showPlace.style.transition = "margin-left " + (this.oneMoveTime/1000 + "s");

    //将showPlace添加到container
    container.appendChild(showPlace);

    //根据设置创建左右箭头，并添加到container
    if(this.haveArrows) {
      var arrows = document.createElement("div");
      arrows.id = "arrows";
      arrows.style.width = this.imgWidth + "px";
      var arrowLeft = document.createElement("span");
      arrowLeft.id = "arrowLeft";
      arrowLeft.innerText = "<";
      arrows.appendChild(arrowLeft);
      var arrowRight = document.createElement("span");
      arrowRight.id = "arrowRight";
      arrowRight.innerText = ">";
      arrows.appendChild(arrowRight);
      container.appendChild(arrows);
    }

    //根据设置创建按钮，将图片与按钮进行双向绑定,并添加到container
    if(this.haveButtons) {
      var buttons = document.createElement("div");
      buttons.id = "buttons";
      for(let i=0;i<this.imgURLArray.length;i++) {
        let newCircle = document.createElement("span");
        newCircle.className = "circle";
        buttons.appendChild(newCircle);
      }
      var circleList = buttons.getElementsByClassName("circle");
      for(let i=1;i<imgArray.length-1;i++) {
        imgArray[i].circle = circleList[i-1]; //img的circle属性引用了每张图片对应的小圆点
        circleList[i-1].imgth = i; //每个circle的imgth属性保存了其对应的图片的序号
      }
      imgArray[0].circle = circleList[this.imgURLArray.length-1];
      imgArray[imgArray.length-1].circle = circleList[0];
      imgArray[1].circle.style.backgroundColor = "#1a77da"; //初始化第一个小圆点
      container.appendChild(buttons);
    }
  },
  createOnclick: function () { //绑定事件
    if(this.haveArrows) {
      var arrowRight = document.getElementById("arrowRight");
      arrowRight.onclick = this.moveRightOneTime.bind(this);
      var arrowLeft = document.getElementById("arrowLeft");
      arrowLeft.onclick = this.moveLeftOneTime.bind(this);
    }
    if(this.haveButtons) {
      var circleList = document.getElementsByClassName("circle");
      for(let i=0;i<circleList.length;i++) {
        var that = this;
        circleList[i].onclick = function () {
          that.circleClick(circleList[i]);
        }
      }
    }
  },
  init: function() { //初始化函数
    this.createHTML();
    this.createOnclick();
    this.autoMove();
  }
}

Object.defineProperty(Carousel.prototype, "constructor", { //修正constructor指向
  enumerable: false,
  value: Carousel
});
