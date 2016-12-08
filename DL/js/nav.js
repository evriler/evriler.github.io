//nav二级导航

var liF = $('.allclass .first-classify');
var allclass = $('.allclass ul');
var up = $('.allclass .first-classify .iconfont-up');
var down = $('.allclass .first-classify .iconfont-down');
liF.mouseenter(function(){
	up.show();
	down.hide();
	allclass.animate({
		height: 30px
	},200)
});
allclass.mouseleave(function(){
	
});
