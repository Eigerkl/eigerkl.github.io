/*
* @Author: Administrator
* @Date:   2017-06-15 11:06:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-20 08:45:11
*/

'use strict';

$(function(){
	//轮播图
	var wheel=$('.banner')[0];
	var images=$('*img',$('.imgbox')[0]);
	var spotbox=$('.spotbox')[0];
	var spots=$('*li',spotbox);
	WHEEL(wheel,images,spots,3000);

	//楼层跳转
	var search=$('.attached-search-container')[0];
	var verNav=$('.ver-nav')[0];
	var btn=$('.btn',verNav);
	var top=$('.top',verNav)[0];
	var floor=$('.floor');
	document.onscroll=function(){
		var scrollT=document.body.scrollTop;
		if(scrollT>630){
			verNav.style.width='36px';
			verNav.style.height='342px';
		}else{
			verNav.style.width='0';
			verNav.style.height='0';
		}
		if(scrollT>800){
			search.style.top='0';
		}else{
			search.style.top='-50px';
		}
		for(let i=0;i<btn.length;i++){
			btn[i].onclick=function(){
				animate(document.body,{scrollTop:floor[i].offsetTop-60},300);
			}
		 
			if(document.body.scrollTop>floor[i].offsetTop-300){	
				for(let j=0;j<btn.length;j++){
					btn[j].className='btn';
				}
				btn[i].className='btn active';
			}
		}
	}
	

})
 