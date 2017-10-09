
var ImgUrl=[
"images/0.jpg",
"images/1.jpg",
"images/2.jpg",
"images/3.jpg",
"images/4.jpg",
"images/5.jpg",
"images/6.jpg",
"images/7.jpg",
"images/8.jpg",
"images/9.jpg",
"images/10.jpg",
"images/11.jpg",
"images/12.jpg",
"images/13.jpg",
"images/14.jpg",
"images/15.jpg",
"images/16.jpg",
"images/1.jpg",
"images/2.jpg",
"images/3.jpg",
"images/4.jpg",
"images/5.jpg",
"images/6.jpg",
"images/7.jpg",
"images/8.jpg"
];
var ImgPV_T = [];
var ImgPV_L = [];
var arr     = []; 
var leftP   = [];
var topP    = [];
var body_bg = new Image();
body_bg.src = 'images/body_bg.jpg';

$(body_bg).load(function (){
	var bodyH  = 0;
	var bodyW  = 0;
	var DivObj = $(".container");
	var UlObj  = $(".content");
	var LiObj  = $(".content li");
	var AObj   = $(".content li a");
	var Img    = $(".content li img");
	var Strong = $(".content li strong");
	var Index  = 0;
	var trues  = true;
	var marLs  = 0;
	var width_W  = 0;
	var height_W = 0;
	var time;
	var marginLeft;
	var marginTop=0;
	var xyz;
	 
	
	//获取窗口大小
	function bodys(){
	  bodyH= parseInt($("body").css("height"));
	  bodyW= parseInt($("body").css("width"));	
	};
	
	//隐藏gif
	function GifNone(){
		bodys();
		$(".load").css("display","none");
		CDispersion(600);
		rotate(true);
		var r=setTimeout(style,600);
	};
	
	//图片加载和归位
	$(function ImgPValue(){
		var Top  = 0;
		var Left = 0;
		var left_P= 0;
		var top_P = 0;
		var x    = 0;
		for(var i=0; i<LiObj.length; i++){
			arr[i]=i;
			x++;
			ImgPV_T[i]=Top;
			ImgPV_L[i]=Left;
			leftP[i]  =left_P;
			topP[i]   =top_P;
			Left=Left+20;
			left_P=left_P+25;
			if(x==5){
				x=0;
				Left=0;
				left_P=0;
				Top=Top+20;	
				top_P=top_P+25;
			};
		};
		ImgBgPos(ImgUrl[0],0);
	});
	
	$(function ImgPos(){
		var x=0;
		if(Index<LiObj.length){
			Img.eq(Index).attr("src",ImgUrl[Index]);
			Img.eq(Index).load(function(){
				x++;
				var x=$(this).parent().parent("li").index();
				LiObj.eq(x).animate({"top":ImgPV_T[x]+"%","left":ImgPV_L[x]+"%"},600);
				if(x==LiObj.length-1){
					var t= setTimeout(GifNone,2000);
				}
			});
			Index++;
			ImgPos();
		};
	});
	
	//图片背景定位
	function ImgBgPos(url,s){
		var x    = 0;
		var Left = 0;
		var Top  = 0;
		for(var i=0; i<AObj.length; i++){
			x++;
			AObj.eq(i).css("background","url("+url+") "+Left+"% "+Top+"%");
			Strong.eq(i).css("background","url("+url+") "+Left+"% "+Top+"%");
			AObj.eq(i).fadeIn(s);
			Strong.eq(i).fadeIn(s);
			Left=Left+25;
			if(x==5){
				x=0;
				Left=0;
				Top=Top+25;
			};
		};
	};
	//img旋转
	function rotate(falses){
		for(var i=0; i<LiObj.length; i++){
			if(falses){
				var x=parseInt(Math.random()*20+1);
			}
			else{
				var x=0;
			};
			var y=Math.random();
			if(y>0.5){
				LiObj.eq(i).css({
					"transform":"rotate("+x+"deg)",
					"-o-transform":"rotate("+x+"deg)",
					"-moz-transform":"rotate("+x+"deg)",
					"-webkit-transform":"rotate("+x+"deg)"
				});
			}else{
				LiObj.eq(i).css({
					"transform":"rotate("+-x+"deg)",
					"-o-transform":"rotate("+-x+"deg)",
					"-moz-transform":"rotate("+-x+"deg)",
					"-webkit-transform":"rotate("+-x+"deg)"
				});	
			};
		};
	};
	
	//container散开
	function style(){
			
			$(".content li img").animate({"margin":"5px","width":"150px","height":"90px"},300);
	};
	function CDispersion(s){
		var width    = parseInt(bodyW/100*80);
		var height   = parseInt(bodyH/100*80);
		marginTop    = (height-(height*0.8)-100)/2;
		var marginT  = parseInt(height/2);
			width_w  = width;
			height_w = height;
		var margin_1 = parseInt(width/2);
		var margin_2 = parseInt(width-(width/100*80+160));
		var margin_3 = parseInt(margin_2/2);
		marLs        = margin_3;
		var marginL  = margin_1-margin_3;
		marginLeft   = marginL;
		xyz=marginT;
		

		$(".content li span a,.content li span strong").fadeOut(1000);
		DivObj.animate({
			"width":width+"px",
			"height":height+"px",
			"margin-top":-marginT+marginTop+"px",
			"margin-left":-marginL+"px"	
		},s,function (){
			if(trues){
				UlObj.css({
					"width":width+"px",
					"height":height+"px"
				});
			};
		});
	};
	
	//窗口大小改变事件
	$(window).resize(function (){
		$(".left").animate({"margin-left":"-95px"},400);
		$(".right").animate({"margin-right":"-95px"},400);
		UlObj.css("box-shadow","0px 0px 0px 0px #111111");
		UlObj.stop(true);
		trues=false;
		bodys();
		DivObj.stop(true);
		CDispersion(0);
		time = setTimeout(UlWH,300);
	});
	function UlWH(){
		UlObj.stop(true);
		DivObj.stop(true);
		clearTimeout(time);
		width_w  = parseInt(DivObj.css("width"));
		height_w = parseInt(DivObj.css("height"));
		rotate(true);

		UlObj.animate({

			"width":width_w+"px",
			"height":height_w+"px",	
			"margin-top":"0px",
			"margin-left":"0px"
		},800,function (){
		style();	
		});	
	};
	

	//鼠标点击集合
	$(".content li").click(function (){
		UlObj.stop(true);
		DivObj.stop(true);
		clearTimeout(time);
		if(parseInt(UlObj.css("width"))!=800){
			var marginT=(height_w-500)/2;
			var marginL=(width_w-800)/2;
			Index=$(this).index();
			
			$(".content li img").animate({"margin":"0px","width":"160px","height":"100px"},200,function (){
				UlObj.animate({
				"width":"800px",
				"height":"500px",
				"margin-top":marginT+"px",
				"margin-left":marginL+"px"	
				
				},1000);

				DivObj.animate({"margin-left":-marginLeft-marLs+"px","margin-top":-xyz+"px"},1000,function (){
					UlObj.css({"box-shadow":"2px 2px 6px -1px #111111"});
					$(".left").animate({"margin-left":"0px"},400);
					$(".right").animate({"margin-right":"0px"},400);	
				});
				rotate(false);
			});
				
			ImgBgPos(ImgUrl[Index],1000);
		}
		else{
			$(".left").animate({"margin-left":"-95px"},400);
			$(".right").animate({"margin-right":"-95px"},400);
			UlObj.css("box-shadow","0px 0px 0px 0px #111111");
			UlObj.animate({
				"width":width_w+"px",
				"height":height_w+"px",
				"margin-top":"0px",
				"margin-left":"0px"
			},600);
			rotate(true);
			time = setTimeout(style,600);
			$(".content li span a,.content li span strong").fadeOut(700);
			DivObj.animate({"margin-left":-marginLeft+"px","margin-top":-xyz+marginTop+"px"},600);
		};
	});
	
	//鼠标点击换图
	var p=0;
	$(".left").click(function (){
		if(Index==0){
			Index=arr.length-1;	
		}else{
			Index--;
		}
		arr.sort(function(){ return 0.5 - Math.random() });
		if(p==0){
			Strong.css("left","160px");
			ImgHD();
		}else{
			AObj.css("left","160px");
			ImgHD();
		};
		
	});
	$(".right").click(function (){
		if(Index==AObj.length-1){
			Index=0;	
		}else{
			Index++;	
		};
		arr.sort(function(){ return 0.5 - Math.random() });
		if(p==0){
			Strong.css("left","-160px");
			ImgHD_2();
		}else{
			AObj.css("left","-160px");
			ImgHD_2();
		};
		
	});
	function ImgHD_2(){
		AObj.stop(true,true);
		Strong.stop(true,true);
		var y=Math.random();
		var i=0;
		if(p==0){
			function bg_3(s){
				if(y<0.5){
					s=200;
				};
				Strong.eq(arr[i]).css("background","url("+ImgUrl[Index]+") "+leftP[arr[i]]+"% "+topP[arr[i]]+"%");
				AObj.eq(arr[i]).animate({"left":"160px"},s,function (){
					$(this).css("left","-160px");
				});	
				Strong.eq(arr[i]).animate({"left":"0px"},s);
				i++;
				if(i<AObj.length){
					if(y>0.5){
						bg_3(800);
					}else{
						time = setTimeout(bg_3,20)
					};
				}else{
					p=1;
				};
			};			
			bg_3(800);
		}else{
			function bg_4(s){
				if(y<0.5){
					s=200;
				};
				AObj.eq(arr[i]).css("background","url("+ImgUrl[Index]+") "+leftP[arr[i]]+"% "+topP[arr[i]]+"%");
				Strong.eq(arr[i]).animate({"left":"160px"},s,function (){
					$(this).css("left","-160px");						
				});	
				AObj.eq(arr[i]).animate({"left":"0px"},s);				
				i++;
				if(i<AObj.length){
					if(y>0.5){
						bg_4(800);
					}else{
						time = setTimeout(bg_4,20)
					};
				}else{
					p=0;
				};
			};			
			bg_4(800);
		};	
	};
	function ImgHD(){
		AObj.stop(true,true);
		Strong.stop(true,true);
		var y=Math.random();
		var i=0;
		if(p==0){
			function bg_1(s){
				if(y<0.5){
					s=200;
				};
				Strong.eq(arr[i]).css("background","url("+ImgUrl[Index]+") "+leftP[arr[i]]+"% "+topP[arr[i]]+"%");
				AObj.eq(arr[i]).animate({"left":"-160px"},s,function (){
					$(this).css("left","160px");
				});	
				Strong.eq(arr[i]).animate({"left":"0px"},s);
				i++;
				if(i<AObj.length){
					if(y>0.5){
						bg_1(800);
					}else{
						time = setTimeout(bg_1,20)
					};
				}else{
					p=1;
				};
			};			
			bg_1(800);
		}else{
			function bg_2(s){
				if(y<0.5){
					s=200;
				};
				AObj.eq(arr[i]).css("background","url("+ImgUrl[Index]+") "+leftP[arr[i]]+"% "+topP[arr[i]]+"%");
				Strong.eq(arr[i]).animate({"left":"-160px"},s,function (){
					$(this).css("left","160px");						
				});	
				AObj.eq(arr[i]).animate({"left":"0px"},s);				
				i++;
				if(i<AObj.length){
					if(y>0.5){
						bg_2(800);
					}else{
						time = setTimeout(bg_2,20)
					};
				}else{
					p=0;
				};
			};			
			bg_2(800);
		};	
	};
});