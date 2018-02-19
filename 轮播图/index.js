function autoPlay(firstImage, circle) { //设置图片的自动播放与图片下方对应小圆圈的切换
  firstImage.count %= 6; //通过将firstImage.count余除6使其可以回到开头
  firstImage.style.marginLeft = -768*firstImage.count + "px"; //根据firstImage.count的值来决定移动的距离
  for(let i=0;i<circle.length;i++) {
    circle[i].style.backgroundColor = "transparent";
  }
  circle[firstImage.count].style.backgroundColor = "#1a77da";
  firstImage.count++; //一次图片移动与切换完成后firstImage.count加1，用于下次移动
  firstImage.id =  setTimeout(function() {
    autoPlay(firstImage, circle);
  }, 3000); //将setTimeout调用返回的ID保存firstImage.id
}

window.onload = function () {
  var firstImage = document.getElementsByClassName("images")[0]; //通过设置第一张图片的margin-left的值来实现图片的移动
  var circle = document.getElementsByClassName("circle");
  var arrowLeft = document.getElementById("arrow_left");
  var arrowRight = document.getElementById("arrow_right");

  firstImage.count = 0; //firstImage.count用于计数当前停留的是哪张图片，其初始化为0；控制图片移动的关键在于设置firstImage.count的值
  autoPlay(firstImage, circle); //使图片自动间隔移动
  for(let i=0;i<circle.length;i++) {
    circle[i].onclick = function() {
      clearTimeout(firstImage.id); //清除掉当前的移动
      firstImage.count = i; //将firstImage.count的值设为对应的circle的下标
      autoPlay(firstImage, circle); //再次调用autoPlay(firstImage, circle)移动图片和切换到对应的圆圈，并自动间隔移动
    };
  }
  arrowLeft.onclick = function () {
    clearTimeout(firstImage.id); //清除掉当前的移动
    firstImage.count = (firstImage.count + 4)%6; //根据取余运算确定点击向左移动时的对应的firstImage.count值
    autoPlay(firstImage, circle); //再次调用autoPlay(firstImage, circle)移动图片和切换到对应的圆圈
  };
  arrowRight.onclick = function () { //点击向右移动的箭头相当于停止等待立即执行下次移动
    clearTimeout(firstImage.id); //清除掉当前的移动
    autoPlay(firstImage, circle); //再次调用autoPlay(firstImage, circle)移动图片和切换到对应的圆圈，并自动间隔移动
  };
}
