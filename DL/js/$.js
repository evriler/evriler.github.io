/*
	js方法集合
*/

/*
	$ 获取元素   
	@param
		selector  字符串
	$('#container')  $('.box')  $('div')
*/
function $(selector){
	//.box => box
	selector = selector.substr(1);
	//浏览器支持getElementsByClassName
	if(document.getElementsByClass){
		return document.getElementsByClassName(selector);
	}
	//浏览器不支持getElementsByClassName
	var allEles = document.getElementsByTagName('*');
	var eles = [];
	//变量所有的元素，匹配class
	for(var i=0; i<allEles.length; i++){
		if(allEles[i].className == selector){
			eles.push( allEles[i] );
		}
	}
	return eles;
}

/**
	css  获取或者设置元素样式的值
	@param
		elem 元素
		style 样式名
		value 样式值
*/
function css(elem,style,value){
	//如果是获取样式的值
	if(arguments.length == 2){
		//判断浏览器是否支持currentStyle
		if(elem.currentStyle){
			return elem.currentStyle[style];
		}
		return window.getComputedStyle(elem)[style];
	}else{
		elem.style[style] = value;
	}
}

/**
	获取元素的第一个子元素
*/
function first(elem){
	return elem.firstElementChild || elem.firstChild;
}

/**
	获取元素的最后一个子元素
*/
function last(elem){
	return elem.lastElementChild || elem.lastChild;
}

function show(elem){
	elem.style.display = 'block';
}
function hide(elem){
	elem.style.display = 'none';
}


/**
	添加事件监听
	@param 
		elem 元素
		type 事件类型
		fn 要做的事情
		isCapture 是否捕捉
*/
function addEventListener(elem,type,fn,isCapture){
	//判断是否支持addEventListener(非IE)
	if(elem.addEventListener){
		isCapture = isCapture || false;
		elem.addEventListener(type,fn,isCapture);
	}else{
		elem.attachEvent('on'+type,fn);
	}
}

/**
	阻止事件冒泡
	@param
		e 事件对象

*/
function stopPropagation(e){
	e = e || window.event;
	//判断浏览器是否支持stopPropagation（非IE）
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}


/*
	阻止事件的默认行为
	@param
		e 事件对象
*/
function preventDefault(e){
	e = e || window.event;
	//判断浏览器是否支持preventDefault（非IE）
	if(e.preventDefault){
		e.preventDefault();
	}else {
		e.returnValue = false;
	}
}


/*
	设置cookie
	@param
		cname cookie名
		cvalue cookie值
		expires 存储的期限 (正整数)
*/
function setCookie(cname,cvalue,expires){
	if(arguments.length == 2){
		document.cookie = cname+'='+cvalue;
	}else {
		//var date = new Date(Date.now() + expires*24*3600*1000);
		var date = new Date();
		date.setDate( date.getDate() + expires );
		var time = date.toGMTString();
		document.cookie = cname+'='+cvalue+';expires='+time;
	}
}

/*
	获取某个cookie
	@param 
		cname cookie名
*/
function getCookie(cname){
	//按照分隔符'; '将所有的cookie分割成数组
	var cookie = document.cookie;
	var cookieArr = cookie.split('; ');
	//遍历所有的cookie
	for(var i in cookieArr){
		var str = cookieArr[i];//"psw=123456"
		var item = str.split('='); // ['psw','123456']
		//判断当前cookie名和传入的cookie名是否一致
		if(item[0] === cname){
			return item[1];
		}
	}
	return null; // 没有找到返回null
}

/*
	删除cookie
	将cookie的时间设置为过去时间，浏览器会自动删除cookie
*/
function delCookie(cname){
	setCookie(cname,null,-1);
}



/*
	给元素添加class
	@param
		elem 元素
		className 要添加的class
*/
function addClass(elem,className){
	//将元素的class按照空格进行分割
	var c = elem.className; // elem.getAttribute('class');
	var classArr = c.split(' ');
	//遍历所有的class
	for(var i in classArr){
		//如果存在传入的className，直接返回
		if(classArr[i] == className){
			return;
		}
	}
	//执行到此处，说明elem没有传入的className，那么添加一个
	elem.className += ' '+className;
}
