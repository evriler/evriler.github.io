$(function(){
	var lg = $('.log-reg-form .da-log-reg .login');
	var lgf = $('.log-reg-form .lg-form');
	var rg = $('.log-reg-form .da-log-reg .register');
	var rgf = $('.log-reg-form .rg-form');
	
	lg.click(function(){
		lg.addClass('active');
		rg.removeClass('active');
		lgf.show();
		rgf.hide();
	});
	rg.click(function(){
		rg.addClass('active');
		lg.removeClass('active');
		rgf.show();
		lgf.hide();
	})
})
