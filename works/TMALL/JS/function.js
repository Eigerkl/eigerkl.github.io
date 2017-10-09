/*
* @Author: Administrator
* @Date:   2017-06-14 09:26:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-16 08:54:51
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
//
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
		window.onload=function(){
			select();
		}
	} 
}
//**************************************
//轮播函数
	function WHEEL(wheel,images,spots,millisec){
	
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
			spots[i].style.background='url(img/dian.png) no-repeat';
		}
		images[num].style.opacity='1';
		spots[num].style.background='url(img/dian1.png) no-repeat';
	}
	for(let i=0;i<spots.length;i++){
		spots[i].onclick=function(){
			num=i-1;
			move();
		}
	}
	var t=setInterval(move,millisec);
	
	wheel.onmouseenter=function(){
		clearInterval(t);
	}
	wheel.onmouseleave=function(){
		t=setInterval(move,millisec);
	}

}