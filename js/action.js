/**
 * Created by 佳锐 on 2017/3/19.
 */
/*获取元素节点*/
window.onload = function(){
    var snake = document.getElementById("snake");
    var food = document.getElementById("food");
    var playground = document.getElementById("playground");
    var score = document.getElementById('score');
    /*设置全局变量*/
    var timer;
    var srr = [];//存放蛇的位置的数组
    var num = 0;//数组的长度
    var snakeBody;//每次吃调一个食物，增加的身体
    var timer1 = setInterval(eat,10);//设置一个碰撞的时间器
/*让小蛇动起来*/
    document.onkeydown = function(e){
        var evt = window.evnet || e;
        switch(evt.keyCode){
            case 37://左
                clearInterval(timer);
                timer = window.setInterval(runLeft,10);//向左移动的时间器
              function runLeft(){
                if(snake.offsetLeft > 0){
                    snake.style.left = snake.offsetLeft - 1 + 'px';
                    snake.style.top = snake.offsetTop + 'px';
                    srr.push([snake.offsetLeft,snake.offsetTop]);//每移动1px，就将位置存进数组中
                    num++;//相应的数组长度加1
                }else{
                    clearInterval(timer);
                    console.log("failed!");
                }
               }
                break;
            case 38://上
                clearInterval(timer);
                timer = window.setInterval(runTop,10);
                function runTop(){
                    if(snake.offsetTop > 0){
                        snake.style.top = snake.offsetTop - 1 + 'px';
                        snake.style.left = snake.offsetLeft + 'px';
                        srr.push([snake.offsetLeft,snake.offsetTop]);
                        num++;
                    } else{
                        clearInterval(timer);
                        console.log("failed!");
                    }
                }
                break;
            case 39://右
                clearInterval(timer);
                timer = window.setInterval(runRight,10);
                function runRight(){
                    if(snake.offsetLeft < 430){
                        snake.style.left = snake.offsetLeft + 1 + 'px';
                        snake.style.top = snake.offsetTop + 'px';
                        srr.push([snake.offsetLeft,snake.offsetTop]);
                        num++;
                    } else{
                        clearInterval(timer);
                        console.log("falied!");
                    }
                }
                break;
            case 40://下
                clearInterval(timer);
                timer = window.setInterval(runBottom,10);
                function runBottom(){
                    if(snake.offsetTop < 480) {
                        snake.style.top = snake.offsetTop + 1 + 'px';
                        snake.style.left = snake.offsetLeft + 'px';
                        srr.push([snake.offsetLeft,snake.offsetTop]);
                        num++;
                    }else{
                        clearInterval(timer);
                        console.log("falied!");
                    }
                }
                break;
        }
    }
/*让食物随机产生*/
function pos(){
    food.style.left = parseInt(Math.random()*430) + 'px';
    food.style.top = parseInt(Math.random()*480) + 'px';
}
/*检测碰撞函数*/
function eat(){
    snakeCrashFood(snake,food);
    function snakeCrashFood(obj1,obj2){
        var obj1Left = obj1.offsetLeft;
        var obj1Width = obj1.offsetWidth + obj1.offsetLeft;
        var obj1Top = obj1.offsetTop;
        var obj1Height = obj1.offsetHeight + obj1.offsetTop;
        var obj2Left = obj2.offsetLeft;
        var obj2Width = obj2.offsetWidth + obj2.offsetLeft;
        var obj2Top = obj2.offsetTop;
        var obj2Height = obj2.offsetHeight + obj2.offsetTop;
        if(!((obj1Width<obj2Left)||(obj2Width<obj1Left)||(obj1Height<obj2Top)||(obj2Height<obj1Top))){
            snakeBody = document.createElement("div");
            snakeBody.setAttribute("class","body");
            playground.appendChild(snakeBody);
            pos();
            setInterval(follow,10);
        }
    }
}
/*身体跟随函数*/
function follow(){
    /*获得增加的身体的数组*/
    var bodyNum = document.getElementsByClassName("body");
    score.innerHTML = bodyNum.length;
    var place = 0;
    /*数组每移动1px,新的身体的位置就是相对于前一个身体的第20个数组的位置，后面依次加等*/
    for(var i=0;i<bodyNum.length;i++){
        place += 20;
        bodyNum[i].style.left = srr[num-place][0] + 'px';
        bodyNum[i].style.top = srr[num-place][1] + 'px';
    }
}
}
