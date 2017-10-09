/*
* @Author: Administrator
* @Date:   2017-07-18 10:56:35
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-18 16:52:37
*/

'use strict';
function ajax(option) {
	//没有url 直接退出；
	if(!option.url){
		alert('请输入正确的URL');
		return;
	}

	var type = option.type || 'GET';
	var url = option.url;
	var async = option.async || true;
	var success = option.success || function () {};
	if (XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
　　}else {
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
　　}
　　
	var data = option.data || '';
	var dataType = option.dataType || 'text';
	var dataStr='';
	if(data){
		if(typeof data == 'string'){
			dataStr = data;
		}else{
			for(var i in data){
				dataStr += i+'=' +data[i] +'&';	
			}
			dataStr = dataStr.slice(0,-1);
		}
	}
	if(type.toUpperCase() == 'GET'){
		if(data){
			xhr.open(type,url+'?'+dataStr,async);
		}else{
			xhr.open(type,url,async);
		}
		xhr.send();
	}
	if(type.toUpperCase() == 'POST'){
		xhr.open(type,url,async);
　　　　xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
　　　　xhr.send(dataStr);
	}
	xhr.onreadystatechange = function () {
　　　　if (xhr.readyState == 4 ) {
			if(xhr.status == 200){
				if(dataType.toUpperCase() == 'TEXT'){
					success(xhr.responseText)
				}else if(dataType.toUpperCase() =='XML'){
					success(xhr.responseXML)
				}else if(dataType.toUpperCase()=='JSON'){
					success(JSON.parse(xhr.response));
				}
				
			}else if(xhr.status==404){
				alert('请求失败');
			}
　　　　}
　　};

}