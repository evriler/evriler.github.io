$(function(){
	$('.header').load('header.html',function(){
		$.getScript('js/header.js');
	});
	$('.nav').load('nav.html',function(){
		$.getScript('js/nav.js');
	});
	$('.footer').load('footer.html',function(){
		$.getScript('js/footer.js');
	});
	$('.aside').load('aside.html',function(){
		$.getScript('js/aside.js');
	});

})