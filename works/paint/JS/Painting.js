/*
* @Author: Administrator
* @Date:   2017-08-01 09:39:37
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-25 18:00:20
*/

'use strict';
window.onload = function () {
	var canvas = document.querySelector('canvas');
	var mask = document.querySelector('.mask');
	var eraserBox = document.querySelector('.box');
	var huabu = document.querySelector('.huabu');
	class canvasBox{
		constructor(canvas,mask,eraserBox){
			this.canvas = canvas;
			this.ctx = this.canvas.getContext("2d");
			this.mask = mask;
			this.box = eraserBox;
			this.eraserSize = 15;
			this.Arr = [];
			this.type = 'line';
			this.style = 'stroke';
			this.bianNum = 5;
			this.line_width = 2;
			this.color = '#000';
			this.Arr.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
		}
		draw(){
			var that = this;
			this.mask.onmousedown = function(e){	
				var ox = e.offsetX;
				var oy = e.offsetY;
				that.ctx.lineWidth = that.line_width;
				that.ctx.fillStyle = that.color;
				that.ctx.strokeStyle = that.color;
				this.onmousemove = function(e){
					var x = e.offsetX;
					var y = e.offsetY;
					that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
					if(that.Arr.length>0){
						that.ctx.putImageData(that.Arr[that.Arr.length-1], 0, 0);
						}
					that.ctx.beginPath();
					that[that.type](ox,oy,x,y);
					that.ctx[that.style]();
				}
				this.onmouseup = function(){
					that.Arr.push(that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height));
					this.onmousemove = null;
				}
			}
		}
		pencil(){
			var that = this;
			this.mask.onmousedown = function(e){
				var ox = e.offsetX;
				var oy = e.offsetY;
				that.ctx.lineWidth = that.line_width;
				that.ctx.fillStyle = that.color;
				that.ctx.strokeStyle = that.color;
				that.ctx.moveTo(ox, oy);
				this.onmousemove = function(e){
					var x = e.offsetX;
					var y = e.offsetY;
					if(that.Arr.length>0){
						that.ctx.putImageData(that.Arr[that.Arr.length-1], 0, 0);
					}
					that.ctx.lineTo(x, y);
					that.ctx.stroke();
				}
				this.onmouseup = function(){
					that.Arr.push(that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height));
					this.onmousemove = null;
				}
			}
		}
		line(ox,oy,x,y){
			this.ctx.moveTo(ox, oy);
			this.ctx.lineTo(x, y);
		}
		arc(ox,oy,x,y){
			var Ox = Math.abs(x-(x-ox)/2);
    		var Oy = Math.abs(y-(y-oy)/2);
    		var r =  Math.sqrt(Math.pow(x-ox,2)+Math.pow(y-oy,2))/2;
    		this.ctx.arc(Ox, Oy,r ,0, Math.PI*2);
		}
		triangle(ox,oy,x,y){
			this.bianNum = '3';
    		this.poly(ox,oy,x,y);
		}
		RTtriangle(ox,oy,x,y){
			this.ctx.moveTo(ox, oy);
    		this.ctx.lineTo(x, y);
    		this.ctx.lineTo(ox, y);
    		this.ctx.closePath();
		}
		square(ox,oy,x,y){
			var w = Math.abs(ox-x);
    		if(ox>x){
    			ox = x;
    		}
    		if(oy>y){
    			oy = y;
    		}
    		this.ctx.rect(ox,oy,w,w);
		}
		rect(ox,oy,x,y){
			var w = Math.abs(ox-x);
			var h = Math.abs(oy-y);
    		if(ox>x){
    			ox = x;
    		}
    		if(oy>y){
    			oy = y;
    		}
    		this.ctx.rect(ox,oy,w,h);
		}
		arrow(ox,oy,x,y){
			this.ctx.moveTo(ox, Math.abs(y-(y-oy)/2));
    		this.ctx.lineTo(Math.abs(x-(x-ox)/2), oy);
    		this.ctx.lineTo(x, Math.abs(y-(y-oy)/2));
    		this.ctx.lineTo(Math.abs(x-(x-ox)/4), Math.abs(y-(y-oy)/2));
    		this.ctx.lineTo(Math.abs(x-(x-ox)/4),y);
    		this.ctx.lineTo(Math.abs(x-((x-ox)/4)*3),y);
    		this.ctx.lineTo(Math.abs(x-((x-ox)/4)*3), Math.abs(y-(y-oy)/2));
    		this.ctx.closePath();
		}
		poly(ox,oy,x,y){
			var r = Math.sqrt(Math.pow(x-ox,2)+Math.pow(y-oy,2));
			var angle = Math.PI*2/this.bianNum;
			for (var z = 0; z < this.bianNum; z++) {
    			this.ctx.lineTo(ox+r*Math.cos(angle*z), oy+r*Math.sin(angle*z));
    		}
    		this.ctx.closePath();
		}
		star(ox,oy,x,y){
			var R = Math.sqrt(Math.pow(x-ox,2)+Math.pow(y-oy,2));
			if(this.bianNum>4){
				var r = R*2/this.bianNum;
			}else{
				var r = R/this.bianNum;	
			}
			var angle = Math.PI/this.bianNum;
			for (var z = 0; z < this.bianNum*2; z++) {
				if(z%2==0){
					this.ctx.lineTo(ox+R*Math.cos(angle*z), oy+R*Math.sin(angle*z));
				}else{
					this.ctx.lineTo(ox+r*Math.cos(angle*z), oy+r*Math.sin(angle*z));
				}
			}
			this.ctx.closePath();
		}
		eraser(){
			var that = this;
			huabu.onmousemove = function(e){
				var x = e.offsetX;
				var y = e.offsetY;
				that.box.style.left = x-that.eraserSize/2 + 'px';
				that.box.style.top = y-that.eraserSize/2 +'px';
			}
			this.mask.onmousedown = function(){
				this.onmousemove = function(e){
					var x = e.offsetX;
					var y = e.offsetY;
					that.box.style.left = x + 'px';
					that.box.style.top = y +'px';
					that.ctx.clearRect(x-that.eraserSize/2, y-that.eraserSize/2, that.eraserSize, that.eraserSize);
				}
				this.onmouseup = function(){
					this.onmousemove = null;
					that.Arr.push(that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height));
				}
			}
		}
	}
	var obj = new canvasBox(canvas,mask,eraserBox); 
	var shapeBox = document.querySelector('.toolBar .shape');
	var colorBox = document.querySelector('.color');
	var color = document.querySelectorAll('.color>div');
	var colorMore = document.querySelector('input[type=color]');
	var number = document.querySelectorAll('input[type=number]');
	var style = document.querySelector('select');
	var erasers = document.querySelector('.eraser');
	var cancel = document.querySelector('.cancel');
	var save = document.querySelector('.save');
	var colorNow = document.querySelector('.toolBar .more>div>span');
	var fullBtn = document.querySelector('.fullBtn');
	var flag = true;
	fullBtn.onclick = function(){
		if(flag){
			if(document.body.requestFullScreen){
			document.body.requestFullScreen();
			}else if(document.body.mozRequestFullScreen){
				//  火狐 moz
				document.body.mozRequestFullScreen();
			}else if(document.body.webkitRequestFullScreen){
				// 谷歌 ms
				document.body.webkitRequestFullScreen();
			}else if(document.body.msRequestFullscreen){
				// IE ms
	            document.body.msRequestFullscreen();
	        }
	        fullBtn.innerText = '退出全屏';
		}else{
			if(document.exitFullscreen){
    			document.exitFullscreen();
    		}else if(document.webkitExitFullscreen){
    			document.webkitExitFullscreen();
    		}else if(document.mozCancelFullScreen){
    			document.mozCancelFullScreen();
    		}else if(document.msExitFullscreen){
                document.msExitFullscreen();
            }
            fullBtn.innerText = '全屏模式';
		}
		flag = !flag;
		
	}
	for (let j = 0; j < color.length; j++) {
		color[j].style.background = color[j].className;	
	}
	shapeBox.onclick = function(e){
		mask.style.cursor = 'crosshair';
		eraserBox.style.display = 'none';
		var shape = e.target;document.documentElement.requestFullScreen;
		if(shape.getAttribute('attr') == 'pencil'){
			obj.pencil();
		}else{
			obj.type = shape.getAttribute('attr');
			obj.draw();
		}
	}
	colorBox.onclick = function(e){
		var color = e.target;
		obj.color = color.className;
		colorNow.style.background = color.className;
	}
	colorMore.onchange = function(){
		obj.color = this.value;
		colorNow.style.background = this.value;
	}
	number[0].onchange = function(){
		obj.bianNum = this.value;
	}
	number[1].onchange = function(){
		obj.line_width = this.value;
	}
	style.onchange = function(){
		obj.style = this.value;
	}
	erasers.onclick = function(){
		mask.style.cursor = 'url(img/2.png) ,auto';
		eraserBox.style.display = 'block';
		obj.eraser();
		mouseWheel(document,function(){
			obj.eraserSize += 1;
			if(obj.eraserSize>50){
				obj.eraserSize = 50;
			}
			eraserBox.style.width = eraserBox.style.height = obj.eraserSize+'px';
		},function(){
			obj.eraserSize -= 1;
			if(obj.eraserSize<3){
				obj.eraserSize = 3;
			}
			eraserBox.style.width = eraserBox.style.height = obj.eraserSize+'px';
		})
	}
	cancel.onclick = function(){
		if(obj.Arr.length>1){
			obj.Arr.pop();
			obj.ctx.putImageData(obj.Arr[obj.Arr.length-1], 0, 0);
		}else{
			alert('木有啦~别删了！');
		}
	}
	obj.draw();
	save.onclick = function(){
		var URL = obj.canvas.toDataURL('images/png');
		var img = new Image();
		img.src = URL;
		var a = document.createElement('a');
		a.href = URL;
		a.className = 'NewP';
		a.innerText = '点击图片下载你美美哒画作吧！';
		a.appendChild(img);
		document.body.appendChild(a);
		a.download = 'canvas.png';
		document.querySelector('.NewP').onclick = function(){
			setTimeout(function(){
				document.body.removeChild(document.querySelector('.NewP'));
			},200 )
		}
	}

	//选择画布大小
	var newCanvas = document.querySelector('.toolBar .tool .new');
	var setH_W = document.querySelector('.setH_W');
	var ok = document.querySelector('.setH_W .ok');
	var close = document.querySelector('.setH_W .close');
	var C_h = document.querySelector('.setH_W .height input');
	var C_w = document.querySelector('.setH_W .width input');
	newCanvas.onclick = function(){
		setH_W.style.display = 'block';
	}
	ok.onclick = function(){
		canvas.height = C_h.value;
		canvas.width = C_w.value;
		setH_W.style.display = 'none';
		huabu.style.width = C_w.value + 'px';
		huabu.style.height = C_h.value + 'px';
	}
	close.onclick = function(){
		setH_W.style.display = 'none';
	}


}