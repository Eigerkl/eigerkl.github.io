/*
* @Author: Administrator
* @Date:   2017-06-15 11:06:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-20 04:11:35
*/

'use strict';

$(function(){
	// 顶通图片
	$('header>.top i').click(function(){
		$('header>.top').slideUp();
	})
	//楼层跳转
	var search=$('.search-fix')[0];
	var floor=$('.floor');
	var btnbox=$('.left-list')[0];
	var btn=$('.btn',btnbox);
	document.onscroll=function(){
		var scrollT=document.body.scrollTop;
		if(scrollT>740){
			search.style.top='0';
		}else{
			search.style.top='-52px';
		}
		if(scrollT>1700){
			btnbox.style.opacity='1';
		}else{
			btnbox.style.opacity='0';
		}

		for(let i=0;i<btn.length;i++){
			if(document.body.scrollTop>floor[i].offsetTop-300){
				for(let j=0;j<btn.length;j++){
					btn[j].style.background='#918888';
				}
				btn[i].style.background='#d70b1c';
			}
			btn[i].onclick=function(){
				// document.body.scrollTop=floor[i].offsetTop-52;
				animate(document.body,{scrollTop:floor[i].offsetTop-52},500);

			}
		}
	}
	
	// 轮播图
	var wheel=$('.banner')[0];
	var images=$('a',wheel);
	var spotbox=$('.dd')[0];
	var spots=$('i',spotbox);
	WHEEL(wheel,images,spots,3000);

	// banner右边
	var gongao = document.querySelector('.fs .right .news .head a:nth-child(2)');
	var sale = document.querySelector('.fs .right .news .head a:nth-child(1)')
	gongao.onmouseenter = function(){
		document.querySelector('.fs .right .news .head .line').style.transform = 'translateX(52px)';
		document.querySelector('.fs .right .news .text .col2').style.display = 'block';
	}
	sale.onmouseenter = function(){
		document.querySelector('.fs .right .news .head .line').style.transform = 'translateX(0)';
		document.querySelector('.fs .right .news .text .col2').style.display = 'none';
	}

	//地址选择 
	var cityBox = document.querySelector('header .nav .position .come');
	var city = $('header .nav .position .come .city a');
	var choiceCity = $('.nav .position .box>span');
	var index = city.eq(0);
	city.click(function(){
		choiceCity.html($(this).html());
		index.css({background:'#fff',color:'#999'});
		$(this).css({background : '#f10215',color : '#fff'})
		index = $(this);
	})

	// 侧边选项卡
	var prev ;
	$('.fs .container>ul>li').mouseenter(
		function(){
			var index = $(this).index();
			$('.activeBox').show();
			if(prev)$('.activeBox>div').eq(prev).hide();
			$('.activeBox>div').eq(index).show();
			prev = index;
		}
	)
	$('.fs>div').mouseleave(
		function(){
			$('.activeBox').hide();
		}
	);

	// 京东秒杀倒计时
	var sec = 0;
	var min = 0;
	var hour = 2 ;
	console.log($('.hour'));
	function count(){
		sec--;
		if(sec<0){
			sec = 59;
			min--;
			if(min<0){
				min = 59;
				hour--;
				if(hour<0){
					hour = 2
				}
			}
		}
		$('.hour').html('0' +hour);
		$('.min').html(min<=9?('0'+min):min);
		$('.sec').html(sec<=9?('0'+sec):sec);
	}
	setInterval(count, 1000);

	// 京东秒杀轮播
	$('.ms .con ul i.left').click(function(){
		$('.ms .con ul>div').animate({left:'0'},800,function(){
			$('.ms .con ul li:gt(14)').prependTo($(this));
			$(this).css('left','-1000px');
		});
	})
	$('.ms .con ul i.right').click(function(){
		$('.ms .con ul>div').animate({left:'-2000px'},800,function(){
			$('.ms .con ul li:lt(5)').appendTo($(this));
			$(this).css('left','-1000px');
		});
	})

	// 优品专辑 轮播
	var  n = 0;
	function move(type='l'){
		if(type=='l'){
			n++;
			if(n>=3)n = 0;
		}else{
			n--;
			if(n<0);n=2;
		}
		$('.byp .center ul li').css('background','#c8c8c8').eq(n).css('background','#e01222')
		$('.byp .content').css('opacity','0').eq(n).css('opacity','1')
	}
	var t=setInterval(move,1000);
	$('.byp .center').mouseenter(function() {
		clearInterval(t);
	}).mouseleave(function() {
		t=setInterval(move,1000);
	});
	$('.byp .center i:first').click(move);
 	$('.byp .center i:last').click(function(){
 		move('r')
 	});
 	$('.byp .center ul li').mouseenter(function() {
 		var index = $(this).index();
 		n = index-1;
 		move();
 	});

 	// 排行榜
 	$('.byp .right .shang>a').mouseenter(function() {
 		var index = $(this).index();
 		$('.byp .right .xia>ul>li').hide().eq(index).show();
 		var length = index*78+'px'
 		$('.byp .right .shang .line').css('left',length)

 	});

 	// 京东直播
 	var  m = 0;
	function run(type='l'){
		if(type=='l'){
			m++;
			if(m>=5)m = 0;
		}else{
			m--;
			if(m<0);m=4;
		}
		$('.xpz .box2 .cover>ul li').css('background','#fff').eq(m).css('background','#fd3131')
		$('.xpz .box2 .img').css('opacity','0').eq(m).css('opacity','1')
	}
	var t1=setInterval(run,1000);
	$('.xpz .box2').mouseenter(function() {
		clearInterval(t1);
	}).mouseleave(function() {
		t1=setInterval(run,1000);
	});
	$('.xpz .box2 .cover .btnL').click(run);
 	$('.xpz .box2 .cover .btnR').click(function(){
 		run('r')
 	});
 	$('.xpz .box2 .cover>ul li').mouseenter(function() {
 		var index = $(this).index();
 		m = index-1;
 		run();
 	});
 	console.log($('.xpz .box2 .cover .btnL'))
 	
})
 