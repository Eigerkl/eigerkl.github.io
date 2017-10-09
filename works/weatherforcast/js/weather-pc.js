/*
* @Author: Administrator
* @Date:   2017-07-19 09:16:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-26 13:31:58
*/

'use strict';
window.onload=function(){
	var nowIcon = document.querySelector('.now-icon');
	var nowBasic = document.querySelector('.now-basic');
	var nowNow = document.querySelector('.now-now');
	var foreDate = document.querySelectorAll('.forecast>ul');
	var suggestion = document.querySelector('.suggestion');

	function getData(currentCity='西安'){
		//获取所有天气数据
		var config = {
			url: 'https://free-api.heweather.com/v5/',
			city: currentCity,
			key: '6dce789434f041fe887eb7774e3f4f10'

		}
		function getUrl(type='weather'){
			return `${config.url}${type}?city=${config.city}&key=${config.key}`
		}
		function getWeather(callback){
			ajax({
				url:getUrl('weather'),
				dataType:'JSON',
				success:callback
			})	
		}
		function getNow(callback){
			//获取当前天气
			ajax({
				url:getUrl('now'),
				dataType:'JSON',
				success:callback
			})
		}
		function getForecast(callback){
			//获取预测天气
			ajax({
				url:getUrl('forecast'),
				dataType:'JSON',
				success:callback
			})
		}
		function getSuggestion(callback){
			//获取生活指数
			ajax({
				url:getUrl('suggestion'),
				dataType:'JSON',
				success:callback
			})
		}
		//分别调用上面三个函数
		getNow(function(data){
			var n=data.HeWeather5[0].now;
			var b=data.HeWeather5[0].basic;
			nowIcon.querySelector('img').src = `img/weather/${n.cond.code}.png`;
			nowIcon.querySelector('.tmp span').innerText = n.tmp;
			nowIcon.querySelector('.tq span').innerText = n.cond.txt;
			nowBasic.querySelector('.b-1 .city').innerText = b.city;
			nowBasic.querySelector('.b-1 .cnty').innerText = b.cnty;
			nowBasic.querySelector('.b-2>span').innerText = b.lon;
			nowBasic.querySelector('.b-3>span').innerText = b.lat;
			nowBasic.querySelector('.b-4>span').innerText = b.update.loc;
			nowNow.querySelector('.w-1>span').innerText = n.fl;
			nowNow.querySelector('.w-2>span').innerText = n.hum;
			nowNow.querySelector('.w-3>span').innerText = n.vis;
			nowNow.querySelector('.w-4>span').innerText = n.wind.dir;
			nowNow.querySelector('.w-5>span').innerText = n.wind.sc;
			nowNow.querySelector('.w-6>span').innerText = n.wind.spd;
		})
		
		getForecast(function(data){
			var n = data.HeWeather5[0].daily_forecast;
			for (let i = 0; i < foreDate.length; i++) {
				foreDate[i].querySelector('.time>span').innerText = n[i].date;
				foreDate[i].querySelector('.tq-d>span').innerText = n[i].cond.txt_d;
				foreDate[i].querySelector('.tq-n>span').innerText = n[i].cond.txt_n;
				foreDate[i].querySelector('.tmp-max>span').innerText = n[i].tmp.max;
				foreDate[i].querySelector('.tmp-min>span').innerText = n[i].tmp.min;
				foreDate[i].querySelector('.pic>img').src = `img/weather/${n[i].cond.code_d}.png`;
			}
		})
		getSuggestion(function(data){
			var n = data.HeWeather5[0].suggestion;
			suggestion.querySelector('.comf .con>h4').innerText = '舒适度指数: ' + n.comf.brf;
			suggestion.querySelector('.comf .cover p').innerText = n.comf.brf;
			suggestion.querySelector('.comf .con>span').innerText = n.comf.txt;
			suggestion.querySelector('.drsg .con>h4').innerText = '穿衣指数: ' + n.drsg.brf;
			suggestion.querySelector('.drsg .cover p').innerText = n.drsg.brf;
			suggestion.querySelector('.drsg .con>span').innerText = n.drsg.txt;
			suggestion.querySelector('.uv .con>h4').innerText = '紫外线指数: ' + n.uv.brf;
			suggestion.querySelector('.uv .cover p').innerText = n.uv.brf;
			suggestion.querySelector('.uv .con>span').innerText = n.uv.txt;
			suggestion.querySelector('.sport .con>h4').innerText = '运动指数: ' + n.sport.brf;
			suggestion.querySelector('.sport .cover p').innerText = n.sport.brf;
			suggestion.querySelector('.sport .con>span').innerText = n.sport.txt;
			suggestion.querySelector('.flu .con>h4').innerText = '感冒指数: ' + n.flu.brf;
			suggestion.querySelector('.flu .cover p').innerText = n.flu.brf;
			suggestion.querySelector('.flu .con>span').innerText = n.flu.txt;
			suggestion.querySelector('.cw .con>h4').innerText = '洗车指数: ' + n.cw.brf;
			suggestion.querySelector('.cw .cover p').innerText = n.cw.brf;
			suggestion.querySelector('.cw .con>span').innerText = n.cw.txt;
		})	
	}

	getData('西安');
	//搜索城市
	var input = document.querySelector('.search>input');
	var btn = document.querySelector('.search>.btn');
	input.onfocus = function(){
		input.style.background = 'rgba(255,255,255,0.3)';
		input.placeholder = '请输入要查找的城市';
		btn.style.right = '40px';

	}

	btn.onclick = function(){
		var flag = parseInt(getComputedStyle(btn,null).right);
		if(flag == 40){
			console.log(input.value);
			getData(input.value);
		}
		input.style.background = 'transparent';
		btn.style.right = '485px';
		input.placeholder = '';
	}
	var container =  document.querySelector('.container');
	//滚轮事件
	var xiahua = document.querySelector('.xiahua');
	var top = document.querySelector('.top');
	xiahua.onclick = function(){
		container.style.top = -window.innerHeight + 'px';
	}
	top.onclick = function(){
		container.style.top = 0;
	}
	document.onmousewheel = function(e){
		var e=e || window.e;
		var num=e.detail ||e.wheelDelta;//每次滚动的码值
		if(num==120||num==-6||num==-3){
			container.style.top = 0;
		}else if(num==-120||num==6||num==3){
			container.style.top = -window.innerHeight + 'px';
		}
	}
}
