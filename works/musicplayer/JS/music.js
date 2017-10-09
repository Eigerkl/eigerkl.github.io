/*
* @Author: Administrator
* @Date:   2017-08-02 11:11:08
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-26 22:56:12
*/

'use strict';
window.onload = function () {
	var audio = document.querySelector('audio');
	var play = document.querySelector('.box_left');
	var horn = document.querySelector('.box_vice ul li:first-child');
	var voice = document.querySelector('.box_vice ul li:last-child');
	var voiceCtr = document.querySelector('.box_vice ul li:last-child>em');
	var voiceHight = document.querySelector('.box_vice ul li:last-child>div');
	var mask = document.querySelector('.mask');
	var pHeight = document.querySelector('.progress ul');
	var pjindu = document.querySelector('.progress>ul>div');
	var pBtn = document.querySelector('.progress>ul>li:nth-child(2)');
	var database = [{id:1,name:'Rolling In The Deep',src:'MUSIC/Rolling In The Deep.mp3',author:'Adele',time:'03:48'},{id:2,name:'红玫瑰',src:'MUSIC/红玫瑰.mp3',author:'陈奕迅',time:'04:00'},{id:3,name:'Because Of You',src:'MUSIC/Kelly Clarkson-Because Of You .mp3',author:'Kelly Clarkson',time:'03:43'},{id:4,name:'风去云不回',src:'MUSIC/吴京 - 风去云不回.mp3',author:'吴京',time:'05:04'},{id:5,name:'Last Christmas',src:'MUSIC/Taylor Swift-Last Christmas .mp3',author:'Taylor Swift',time:'03:28'},{id:6,name:'套路',src:'MUSIC/3ASiC,Jony J - 套路.mp3',author:'Jony J',time:'02:41'}];
	var  n = 2;	
	play.onclick = function(e){
		var event = e.target;
		if(event.id == 'btn'){
			if(audio.paused){
				audio.play();
				event.innerHTML = '&#xe600;';
			}else{
				audio.pause();
				event.innerHTML = '&#xe67f;';
			}
		}else{
			if(event.id == 'prev'){
				n--;
				if(n<=0){
					n=database.length;
				}
			}else{
				n++;
				if(n>database.length){
					n = 1;
				}
			}
			database.forEach(function(val,index){
				if(val.id==n){
					audio.src = val.src;
					pBtn.previousElementSibling.innerHTML = `<span>${val.name}</span>--<span>${val.author}</span>`;
					document.querySelector('.imgbox img').src=`img/${val.author}.jpg`;
					document.querySelector('.changpian .singger').src=`img/${val.author}.jpg`;
				}
			})
			audio.play();
			document.querySelector('.box_left>li:nth-child(2)').innerHTML = '&#xe600;';
			
		}
	}

	audio.onended=function(){
		n++;
		if(n>database.length){
			n = 1;
		}
		database.forEach(function(val,index){
			if(val.id==n){
				audio.src = val.src;
				pBtn.previousElementSibling.innerHTML = `<span>${val.name}</span>--<span>${val.author}</span>`;
				document.querySelector('.imgbox img').src=`img/${val.author}.jpg`;
				document.querySelector('.changpian .singger').src=`img/${val.author}.jpg`;
			}
		})
		audio.play();
		document.querySelector('.box_left>li:nth-child(2)').innerHTML = '&#xe600;';
		
	}
	var nowVoice = audio.volume;
	horn.onclick = function(){
		if(audio.muted){
			audio.muted = false;
			horn.innerHTML = '&#xe62c;';
			audio.volume = nowVoice;
		}else{
			audio.muted = true;
			horn.innerHTML = '&#xe61d;';
			nowVoice = audio.volume;
			audio.volume = 0;
		}
	}
	audio.onvolumechange = function(){
		voiceCtr.style.left = voice.offsetWidth*this.volume-5 +'px';
		voiceHight.style.width = voice.offsetWidth*this.volume +'px';
	}
	function drag(btn,jindu,kuan){
		btn.onmousedown = function(e){
			var ox = e.offsetX+e.clientX;
			var that = this;
			mask.style.zIndex = 2;
			var now_W = jindu.offsetWidth;
			document.onmousemove = function(e){
				var x = e.offsetX;
				var n = x-ox+now_W;
				if(n > kuan.offsetWidth){
					n = kuan.offsetWidth;
				}
				if(n < 0){
					n = 0;
				}
				that.style.left = n-that.offsetWidth/2 +'px';
				jindu.style.width = n +'px';	
				document.onmouseup = function(){
					if(kuan.id == 'aa'){
						audio.volume = n/kuan.offsetWidth;
					}else{
						audio.currentTime = audio.duration*((n-0.00001)/kuan.offsetWidth);
					}
					document.onmousemove = null;
					mask.style.zIndex = '';
				}				
			}	
		}
	}
	drag(voiceCtr,voiceHight,voice)
	drag(pBtn,pjindu,pHeight)
	voice.onclick = function(e){
		var x = e.offsetX;
		voiceCtr.style.left = x-5 +'px';
		voiceHight.style.width = x +'px';
		audio.volume = x/120;
	}
	pHeight.onclick = function(e){
		var x = e.offsetX;
		pBtn.style.left = x-10 +'px';
		pjindu.style.width = x + 'px';
		audio.currentTime = audio.duration*(x/pHeight.offsetWidth);
	}

	function update(){
		pBtn.nextElementSibling.innerHTML = `<span>0${dealTime(audio.currentTime).m}:${dealTime(audio.currentTime).s}</span>/<span>0${dealTime(audio.duration).m}:${dealTime(audio.duration).s}</span>`;
		document.querySelector('.progress>ul>div').style.width = parseInt(this.currentTime/this.duration*pHeight.offsetWidth)+"px";
		pBtn.style.left = parseInt(this.currentTime/this.duration*pHeight.offsetWidth)-10+"px";
	}
	audio.ontimeupdate=update;
	audio.onprogress=update;
    function dealTime(time){
    	var m = parseInt(time/60);
    	var s = parseInt(time%60)>9?parseInt(time%60):'0'+parseInt(time%60);
    	return {m,s}
    }

    	// 歌曲列表
	database.forEach(function(val,index){
		document.querySelector('tbody').innerHTML += `
			<tr>
				<td>${val.id}</td>
				<td>
					<div>
						<img src="img/${val.author}.jpg" alt="">
						<i></i>
						<span>${val.name}</span>
					</div>
				</td>
				<td>
					<span>${val.time}</span>
					<a href="" download="${val.src}">
						<img src="img/save.png" alt="">
					</a>
				</td>
				<td>
					<span>${val.author}</span>
				</td>
			</tr>
		`
	})

		// 播放列表的播放按钮
	var bofang = document.querySelectorAll('table tbody tr>td:nth-child(2) i');
	for(let z = 0;z<bofang.length;z++){
		bofang[z].onclick = function(){
			for(let i =0;i<bofang.length;i++){
				bofang[i].style.background = 'url(img/开始.png)'
			}
			bofang[z].style.background = 'url(img/begin.png)'
			database.forEach(function(val,index){
				if(val.id==z+1){
					audio.src = val.src;
					pBtn.previousElementSibling.innerHTML = `<span>${val.name}</span>--<span>${val.author}</span>`;
					document.querySelector('.imgbox img').src=`img/${val.author}.jpg`;
					document.querySelector('.changpian .singger').src=`img/${val.author}.jpg`;
				}
			})
			audio.play();
			document.querySelector('.box_left>li:nth-child(2)').innerHTML = '&#xe600;';
			
		}
	}
	// 出现播放列表
	document.querySelector('.down').onclick = function(){
		document.querySelector('table').style.top = '0';
	}
	document.querySelector('table').onmouseleave = function(){
		setTimeout(function(){
			document.querySelector('table').style.top = '-463px';
		}, 1500)
	}

} 