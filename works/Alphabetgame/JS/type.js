/*
* @Author: Administrator
* @Date:   2017-07-06 17:57:11
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-10 15:50:25
*/

'use strict';
// 开始界面的JS
window.onload=function(){
    var choose=document.getElementsByClassName('choose')[0];
    var start=document.getElementsByClassName('start')[0];
    var begin=document. getElementsByClassName('begin')[0];
    var difficult=document.getElementsByClassName('difficult')[0];
    var quit1=document.getElementsByClassName('quit')[0];
    var quit2=document.getElementsByClassName('quit')[1];
    var diffBtn=document.getElementsByClassName('anniu')[0].getElementsByTagName('div');
    //调用函数时使用
    var over=document.getElementsByClassName('over')[0];
    var box=document.getElementsByClassName('box')[0];
    var audio=document.getElementsByTagName('audio')[0];
    var music=document.getElementsByClassName('music')[0];
    music.onclick=function(e){
        var event = e.target;
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
        this.style.animation='none';
    }


// 倒计时
    var count=document.getElementsByClassName('count')[0];
    var number=document.getElementsByClassName('number');


    
// 游戏界面的JS
    var obj={};
    var stop=document.getElementsByClassName('stop')[0];
    var missBox=document.getElementsByClassName('miss')[0];
    var scoreBox=document.getElementsByClassName('score');
    var bestScoreBox=document.getElementsByClassName('bestScore')[0];
    //获得两处计分节点
    var lifeBox=document.getElementsByClassName('progress')[0];
    var stop=document.getElementsByClassName('stop')[0];
    var stopbox=document.getElementsByClassName('stopbox')[0];
    var restart=document.getElementsByClassName('restart')[0];
    var restart1=document.getElementsByClassName('restart1')[0];
    var quit3=document.getElementsByClassName('quit3')[0];
    var continueBtn=document.getElementsByClassName('continue')[0];
    function typeGame(scoreEle,bestScoreEle,lifeEle,box,restart,restart1,stop,stopbox,continueBtn,quit2,quit3,overEle,num,time){
        this.box=box;//字母运动范围
        this.scoreEle=scoreEle;
        this.bestScoreEle=bestScoreEle;
        this.lifeEle=lifeEle;
        this.life=lifeEle.offsetWidth;//获取显示生命值图片的宽
        this.lifeCount=5;
        this.score=0;
        this.bestScore=0;
        this.obj={};
        this.t=null;
        this.time=time;
        this.num=num;
        this.overEle=overEle;
        this.restart=restart;
        this.restart1=restart1;
        this.quit2=quit2;
        this.quit3=quit3;
        this.stop=stop;
        this.stopbox=stopbox;
        this.continueBtn=continueBtn;
    }
    typeGame.prototype={
        init: function(){
            for(var i=0;i<this.num;i++){
                this.createLetter();
            }
            this.t=setInterval(this.move.bind(this), this.time);
            this.restartFn();
            //改变指针的方向，时间函数的指针指向window，从而使move函数中的this指针发生改变
        },
        createLetter: function(){
            var item=document.createElement('div');
            item.classList.add('item');
            this.box.appendChild(item);
            do{
                var letter=String.fromCharCode(Math.floor(Math.random()*26+65));
            }while(this.obj[letter]);
            do{
                var lefts=Math.random()*(this.box.offsetWidth-item.offsetWidth);

            }while(this.cheackPos(lefts,this.obj,item.offsetWidth));
            var speed=Math.random()*3+1;
            var tops=-50;
            this.obj[letter]={lefts,tops,item,speed}
            item.style.left=lefts+'px';
            item.style.background=`url(sucai/${letter}.png) center center no-repeat /cover`;

        },
        cheackPos:function(l,obj,itemWidth){
            for(var i in obj){
                if(Math.abs(obj[i].lefts-l)<itemWidth){
                    return true;
                }
            }
            return false;
        },
        move:function(){
            for(var i in this.obj){
                this.obj[i].item.style.top=this.obj[i].tops+this.obj[i].speed+'px';
                this.obj[i].tops+=this.obj[i].speed;
                if(this.obj[i].tops>window.innerHeight-this.obj[i].item.offsetWidth){
                    this.box.removeChild(this.obj[i].item);
                    delete this.obj[i];
                    this.createLetter();
                    this.lifeCount--;
                    this.lifeEle.style.width=this.lifeCount*this.life/5+'px';
                    if(this.lifeCount==0){
                        clearInterval(this.t);
                        // document.onkeydown=null;
                        this.overEle.style.display='block';
                        if(this.score>=this.bestScore){
                            this.bestScore=this.score;
                            this.bestScoreEle.innerText=this.bestScore;
                        }
                    }
                }
            }
            var that=this;
            document.onkeydown=function(e){
                e= e|| window.e;
                var num=String.fromCharCode(e.keyCode);
                if(that.obj[num]){
                    that.box.removeChild(that.obj[num].item);
                    delete that.obj[num];
                    that.createLetter();
                    that.score++;
                    //给两处计分的节点赋值
                    that.scoreEle[0].innerText=that.score;
                    that.scoreEle[1].innerText=that.score;
                }
            }
        },
        clear:function(){
            //gameover 之后清除所有的字母，恢复血条，和分数;
            console.log(this);
            for(let j in this.obj){
                this.box.removeChild(this.obj[j].item);
                delete this.obj[j];

            }
            this.lifeCount=5;
            this.lifeEle.style.width=this.life+'px';
            this.score=0;
            this.scoreEle[0].innerText=this.score;
        },
        restartFn:function(){
            var that=this;
            this.restart.onclick=function(){
                that.overEle.style.display='none';
                that.clear();
                that.init();
            }
            this.restart1.onclick=function(){
                that.stopbox.style.display='none';
                that.clear();
                that.init();
            }
            this.quit2.onclick=function(){
                begin.style.display='block';
                that.box.style.display='none';
                that.overEle.style.display='none';
                that.clear();
            }
            this.quit3.onclick=function(){
                begin.style.display='block';
                that.box.style.display='none';
                that.stopbox.style.display='none';
                that.clear();
            }
            this.stop.onclick=function(){
                clearInterval(that.t);
                that.stopbox.style.display='block';
                document.onkeydown=null;
            }
            this.continueBtn.onclick=function(){
                that.t=setInterval(that.move.bind(that), that.time);
                that.stopbox.style.display='none';
            }
        },
    }
    var obj={0:{num:4,time:100},1:{num:6,time:50},2:{num:8,time:30}}
    for(let i in obj){
        diffBtn[i].onclick=function(){
            difficult.style.display='none';
            box.style.display='block';
            new typeGame(scoreBox,bestScoreBox,lifeBox,box,restart,restart1,stop,stopbox,continueBtn,quit2,quit3,over,obj[i].num,obj[i].time).init();
        }
    }

    start.onclick=function(){
        begin.style.display='none';
        box.style.display='block';
        new typeGame(scoreBox,bestScoreBox,lifeBox,box,restart,restart1,stop,stopbox,continueBtn,quit2,quit3,over,5,100).init();
    }

    choose.onclick = function(){
        begin.style.display='none';
        difficult.style.display='block';
    }
    quit1.onclick=function(){
        begin.style.display='block';
        difficult.style.display='none';
    }

}