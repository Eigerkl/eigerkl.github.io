/*
* @Author: Administrator
* @Date:   2017-06-14 09:26:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-25 19:15:42
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
		return window.onload=function(){
			select();
		}
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

























//************************************************
//返回e的第n层祖先元素
// function parent(e,n){
// 	if(n==undefined) n=1;
// 	while(n--&&e) e=e.parentNode;
// 	if(!e||e.nodeType!==1) return null;
// 	return e;
// }
