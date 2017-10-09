/*
* @Author: Administrator
* @Date:   2017-06-15 11:06:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-31 15:12:07
*/

'use strict';

$(function(){
	//横向导航栏
	var nav=$('.nav-list')[0];
	var navList=$('.nav-list')[0].getElementsByTagName('li');
	var navHover=$('.nav-list-hover')[0];
	var navListHover=$('.nav-list-hover')[0].getElementsByTagName('li');
	for(let i=0;i<navListHover.length;i++){
		navList[i].onmouseenter=function(){
			for(let j=0;j<navListHover.length;j++){
				navListHover[j].style.zIndex='1';
			}
			navListHover[i].style.zIndex='10';
		}	
	}
	nav.onmouseenter=function(){
		navHover.style.height='225px';
		navHover.style.boxShadow='0 2px 3px 2px rgba(0, 0, 0, 0.05)';
	}
	navHover.onmouseenter=function(){
		navHover.style.height='225px';
		navHover.style.boxShadow='0 2px 3px 2px rgba(0, 0, 0, 0.05)';
	}
	navHover.onmouseleave=function(){
		navHover.style.height='0';
		navHover.style.boxShadow='0 0 0 0'
	}
	nav.onmouseleave=function(){
		navHover.style.height='0';
		navHover.style.boxShadow='0 0 0 0'
	}
	//搜索框
	var searchForm=$('.search-form')[0];
	var searchBtn=$('.search-btn')[0];
	var keywordList=$('.keywordList')[0];
	var smbox=$('.smbox')[0];
	
	searchForm.onfocus=function(){
		searchBtn.style.borderColor='#ff6700';	
		keywordList.style.display='block';
		smbox.style.opacity='0';
	}
	searchForm.onblur=function(){
		searchBtn.style.borderColor='#e0e0e0';
		keywordList.style.display='none';
		smbox.style.opacity='1';
	}
	//轮播图
	var wheel=$('.wheel')[0];
	var images=$('.image',$('.imgbox')[0]);
	var btn=$('.btn',wheel);
	var spotbox=$('.spot')[0];
	var spots=$('*li',spotbox);
	WHEEL(wheel,images,spots,btn,5000);

	//明星单品
	
	var bigbox=$('.bigbox')[0];
	var ssleftbtn=$('.ssleftbtn')[0];
	var ssrightbtn=$('.ssrightbtn')[0];
	function move(type='l'){
 		var first=getNum(bigbox,0);
 		var last=getNum(bigbox,-1); 
 		if(type=='l'){
 			bigbox.style.left=-1240+'px';
 			ssleftbtn.style.color='#757575';
		 	ssrightbtn.style.color='#e0e0e0';
 			ssleftbtn.onmouseenter=function(){
 				ssleftbtn.style.cursor='pointer';
 				ssleftbtn.style.color='#ff6700';
 			}
 			ssrightbtn.onmouseenter=function(){
 				ssrightbtn.style.cursor='default';
 			}
 		}
 		if(type=='r'){

		 	bigbox.style.left=0+'px';
		 	
		 	ssleftbtn.style.color='#e0e0e0';
		 	ssrightbtn.style.color='#757575';
		 	ssleftbtn.onmouseenter=function(){
 				ssleftbtn.style.cursor='default';
 			}
 			ssrightbtn.onmouseenter=function(){
 				ssrightbtn.style.cursor='pointer';
 				ssrightbtn.style.color='#ff6700';
 			}
		 }
	 }
	setTimeout(move,2000);
			setTimeout(function(){
			}, 4000)
				move('r')
	var t=setInterval(function(){
			setTimeout(move,2000);
			setTimeout(function(){
				move('r')
			}, 4000)

		},4000)
	bigbox.onmouseenter=function(){
	 		clearInterval(t);
	 	}
 	bigbox.onmouseleave=function(){
 		t=setInterval(function(){
			setTimeout(move,2000);
			setTimeout(function(){
				move('r')
			}, 4000)
		},4600)
 	}
 	ssleftbtn.onclick=function(){
 		move('r');
 	}
 	ssrightbtn.onclick=function(){
 		move('l');
 	}



 	//搭配、配件、周边
 	var dprightbox=$('.dprightbox');
 	var smallbox=$('.smallbox1');
 	for(let j=0;j<dprightbox.length;j++){
 		xxk($('.dpbox',dprightbox[j]),$('.dpbtn',smallbox[j]))
 	}
	 function xxk(box,btn){
	 	for(let i=0;i<btn.length;i++){
	 		btn[i].onmouseenter=function(){
	 			 for(let j=0;j<box.length;j++){
	 			 	box[j].style.zIndex=1;
	 			 	btn[j].style.color='#000';
		 			btn[j].style.borderBottom=0;
	 			 }
			box[i].style.zIndex=10;
			btn[i].style.color='#FD6501';
			btn[i].style.borderBottom='2px solid #ff6700';
	 		}
	 	}
	 }


 	//推荐
 	var tjbtnright=$('.tjbtnright')[0];
 	var tjbtnleft=$('.tjbtnleft')[0];
 	var tjbox=$('.tjbox')[0];
 	var z=0;
 	var flag=true;
 	function move1(){
 		if(flag){
	 		z++;
	 		if(z>=4){
	 			flag=false;
	 			z=3;
	 			return;
	 		}
	 		tjbox.style.marginLeft=-1240*z+'px';
 		}else {
 			z--;
	 		if(z<0){
	 			flag=true;
	 			z=0;	
	 			return;	 			
	 		}
 			tjbox.style.marginLeft=-1240*z+'px';
 		}
 		if(z>0&&z<3){
 			tjbtnright.id = 'r-active';
 			tjbtnleft.id = 'l-active';
 			tjbtnright.style.color = '#757575';
 			tjbtnleft.style.color = '#757575';
	 		tjbtnright.style.cursor = 'pointer';
	 		tjbtnleft.style.cursor = 'pointer';
 		}
 		if(z>=3){
 			tjbtnright.style.color='#e0e0e0';
 			tjbtnleft.style.color='#757575';
 			tjbtnright.id = '';
 			tjbtnleft.id = 'l-active';
	 		tjbtnleft.style.cursor = 'pointer';
	 		tjbtnright.style.cursor = 'Default';
 		}
 		if(z<=0){
 			tjbtnright.style.color='#757575';
 			tjbtnleft.style.color='#e0e0e0';
 			tjbtnright.id = 'r-active';
 			tjbtnleft.id = '';
	 		tjbtnright.style.cursor = 'pointer';
	 		tjbtnleft.style.cursor = 'Default';
		}  
 		
 	}
 	tjbtnright.onclick=function(){
 		flag=true;
		move1()  
 	}
 	tjbtnleft.onclick=function(){
 		flag=false;
 		move1()
 	}

 	//内容
 	for(let i=0;i<$('.conbox1').length;i++){
 		Move($('.conbox1')[i],$('*li',$('.nrspot')[i]),$('.nrbtnleft')[i],$('.nrbtnright')[i]);
 	}

function Move(conbox,nrspot,nrbtnleft,nrbtnright){
	var j=0,flag1=true;
 	function move2(type){
 		if(type=='l'){
 			j++;
 			if(j>=nrspot.length){
 				j=nrspot.length-1;
 				return;
 			}
 		}
 		if(type=='r'){
 			j--;
 			if(j<0){
 				j=0;
 				return;
 			}
 		}	
 		for(let i=0;i<nrspot.length;i++){
 			nrspot[i].style.borderColor='#fff';
 			nrspot[i].style.background='#b0b0b0';

 		}
 		nrspot[j].style.borderColor='#ff6700';
 		nrspot[j].style.background='#fff';
		conbox.style.marginLeft=-296*j+'px';	
 	}
 	for(let i=0;i<nrspot.length;i++){
 		nrspot[i].onmouseenter=function(){
 			if(i==j){
 				nrspot[i].style.background='#fff';
 				nrspot[i].style.cursor='default';
 			}else{
 				nrspot[i].style.background='#ff6700'
 				nrspot[i].style.cursor='pointer';
 			}
 		}
 		nrspot[i].onmouseleave=function(){
 			if(i==j){
 				nrspot[i].style.background='#ffff'
 			}else{
 				nrspot[i].style.background='#b0b0b0'
 			}
 		}
 		nrspot[i].onclick=function(){
 			j=i;
 			move2();
 		}
 	}
 	nrbtnleft.onclick=function(){
 			move2('r')
 		}
 	nrbtnright.onclick=function(){
 			move2('l')
 		}
}
 })