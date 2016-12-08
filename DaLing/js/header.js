//header点击“×”时，文本框消失
var rit = $('.header-top .header-top-right .register');
var regB = $('.header-top .header-top-right .register .reg-box');
regB.click(function(){
	rit.hide();
})