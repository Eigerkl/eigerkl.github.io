/*
* @Author: Administrator
* @Date:   2017-06-14 09:26:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-10 15:50:24
*/

'use strict';
//...............................
//通过类名获取元素的兼容性函数
//classname 获取元素的类型
//obj 属于哪个元素
function getClass(classname,obj){
	obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{

		var all=document.getElementsByTagName("*");
		var arr=[];
		for(var i=0;i<all.length;i++){
			if(checkRel(classname,all[i].className)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
function checkRel(classname,name1){
	var newarr=name1.split(" ");
	for(var j in newarr){
		if(classname==newarr[j]){
			return true;
		}
	}
	return false;
}
//*********************************************
//获取元素中的内容
//obj 获取或者设置其内容的对象  val设置的内容

function getText(obj,val){
	if(val==undefined){
		if(obj.textContent){
			return obj.textContent;
		}else{
			return obj.innerText;
		}
	}else{
		if(obj.textContent){
			return obj.textContent=val;
		}else{
			return obj.innerText=val;
		}
	}
}
//*********************************************************
//获取元素属性值  （兼容性函数） attr属性名
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
//**********************************************************
//获取dom
function $(select,obj){
	obj=obj||document;
	if(typeof select=='string'){
		select=select.replace(/^\s*|\s*$/g,'');
		if(select[0]=='.'){
			return getClass(select.slice(1),obj);
		}else if(select[0]=='#'){

			return obj.getElementById(select.slice(1));
		}else if(select[0]=='*'){
			return obj.getElementsByTagName(select.slice(1));
		}else if(select[0]=='~'){
			return obj.getElementsByName(select.slice(1));
		}
	}else if(typeof select=='function'){
		window.addEventListener('load',function(){
			select();
		},false)
	} 
}
//*********************************************
//轮播函数
function WHEEL(wheel,images,spots,btn,millisec){
	var num=0;
	function move(){
		num++;
		if(num>=images.length){
			num=0;
		}
		if(num<0){
			num=images.length-1;
		}
		for(let i=0;i<images.length;i++){
			images[i].style.opacity='0';
			spots[i].style.background='rgba(255, 255, 255, 0.5)';
		}
		images[num].style.opacity='1';
		spots[num].style.background='rgba(255, 255, 255, 0.8)';
	}
	for(let i=0;i<spots.length;i++){
		spots[i].onclick=function(){
			num=i-1;
			move();
		}
	}
	btn[0].onclick=function(){
		num=num-2;
		move();
	}
	btn[1].onclick=function(){
		move();
	}
	var t=setInterval(move,millisec);
	
	wheel.onmouseenter=function(){
		clearInterval(t);
	}
	wheel.onmouseleave=function(){
		t=setInterval(move,millisec);
	}

}
//*********************************************
//获取某元素中所有的元素节点
//obj 需要获取
//type==a 表示只获取元素节点
//type==b 表示获取元素节点和有意义的文本节点
function getChilds(obj,type='a'){
	if(type=='a'){
			var arr=obj.childNodes;
		// var newarr=Array.from(arr).filter((val,index)=>val.nodeType==1);
		// return newarr;
		var newarr=[];
		Array.from(arr).forEach(function(val,index){
			if(val.nodeType==1){
				newarr.push(val);
			}
		})
	}
	if(type=='b'){
		var arr=obj.childNodes;
		var newarr=Array.from(arr).filter((val,index)=>val.nodeType==1||val.nodeType==3&&val.nodeValue.trim());	

	}
	return newarr;
}
//获取元素节点中第一个子节点
function getFirst(parent){
	return getChilds(parent)[0];
}

//获取元素节点中最后一个子节点
function getLast(parent){
	return getChilds(parent)[getChilds(parent).length-1]
}
//***********************************************
//num从0开始
//获取第n个元素 num为负值表示倒数第几个元素
function getNum(parent,num,type='b'){
	if(num>=0){
		return getChilds(parent,type)[num];
	}else{
		return getChilds(parent,type)[getChilds(parent,type).length+num];
	}
}
//******************************************
//返回e的第n个兄弟元素
function sibling(e,n){
	while(e.nodeType==1&&n){
		var next=e.nextSibling;
		if(n>=0){
			if(e.nextSibling.nodeType!==1){
			e=e.nextSibling;
			}
			e=e.nextSibling;
			n--;
		}else{
			if(e.previousSibling.nodeType!==1){
			e=e.previousSibling;
			}
			e=e.previousSibling;
			n++;
		}
	}
	return e;
}
//**********************************************************
//获取（DOM）滚动条的距离 ,兼容火狐谷歌
	function getScrollt(){
		var obj=document.body.scrollTop?document.body:document.documentElement;
		//document.body.scrollTop 只适用于谷歌浏览器
		return obj.scrollTop;
	}
//**************************************************************
//给某一对象的同一事件添加多个事件处理程序的兼容性函数
//obj.addEventListener(事件类型，事件处理函数)//W3C标准
	function addEvent(obj,type,fn){
		if(obj.addEventListener){
			obj.addEventListener(type,fn);
		}else{
			obj.attachEvent('on'+type,fn);
		}
	}
	function removeEvent(obj,type,fn){
		if(obj.removeEvent){
			obj.removeEvent(type,fn);
		}else{
			obj.detachEvent('on'+type, fn);
		}
	}

//***************************************************************************
//滚轮事件的兼容性函数
function mouseWheel(obj,upfn,downfn){
	if(obj.attachEvent){
		obj.attachEvent('onmousewheel',scrollFn);//IE中的滚轮事件
	}else{
		obj.addEventListener('mousewheel', scrollFn, false);//谷歌中的滚轮事件
		obj.addEventListener('DOMMouseScroll',scrollFn, false);//火狐中的滚轮事件

	}
	function scrollFn(e){//事件处理程序
		var e=e || window.e;
		var num=e.detail ||e.wheelDelta;//每次滚动的码值
		if(num==120||num==-6||num==-3){
			if(upfn){
				upfn.call(obj);
			}
		}else if(num==-120||num==6||num==3){
			if(downfn){
				downfn.call(obj);
			}
		}
	}

}

//**************************************************************************************
//拖拽
function drag(obj){
    		this.obj=obj;
    	}
    	drag.prototype={
    		down:function(){
    			var that=this;
    			this.obj.onmousedown=function(e){
                    that.dw=e.offsetX;
                    that.dh=e.offsetY;
                    that.move();
                    that.up();
                }
    		},
    		move:function(){
    			var that=this;
    			document.onmousemove=function(e){
    				e=e||window.e;
    				if(e.preventDefault){
                        e.preventDefault();//W3C 清除浏览器默认行为
                    }else{
                        e.returnValue=false;//IE 清除浏览器默认行为
                    }
    				
    				var x=e.clientX-that.dw;
    				var y=e.clientY-that.dh;
    				var aa=window.innerWidth-that.obj.offsetWidth;
    				var bb=window.innerHeight-that.obj.offsetHeight;
    				if(x>aa){x=aa}
    				if(x<0){x=0}
    				if(y>bb){y=bb}
    				if(y<0){y=0}

    				that.obj.style.left=x+'px';
    				that.obj.style.top=y+'px';
    			}
    		},
    		up:function(){
    			document.onmouseup=function(){
    				document.onmousemove=null;
    			}
    		}
    	}