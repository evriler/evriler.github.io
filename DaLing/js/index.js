$(function(){
	$('.header').load('header.html',function(){
		$.getScript('js/header.js');
	});
	$('.nav').load('nav.html',function(){
		$.getScript('js/nav.js');
	});
	$('.banner').load('banner.html',function(){
		$.getScript('js/banner.js');
	});
	$('.main').load('main.html',function(){
		$.getScript('js/main.js');
	});
	$('.aside').load('aside.html',function(){
		$.getScript('js/aside.js');
	});

})

