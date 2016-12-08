//nav二级导航

var clF = $('.all-con .allclass .first-classify');
var ul = $('.allclass ul');
var up = $('.allclass .first-classify .iconfont-up');
var down = $('.allclass .first-classify .iconfont-down');
var lis = allclass.find('.classify');
var mcl = $('.all-con mcl');
var ac = $('.all-con');
clF.mouseenter(function(){
	alert(1);
	up.show();
	down.hide();
	ul.show();
});
/*ac.mouseleave(function(){
	ul.hide();
});*/
