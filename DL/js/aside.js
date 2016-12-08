	//侧边栏点击事件
	/*var index = $(this).index
		$(this).eq(index).addClass('active');
		*/
	var 
		asi = $('.aside'),
		sca = $('.aside .si-function .shop-catch'),
		icon = $('.aside .si-function .pay .icon'),
		icc = $('.aside .si-function .concern .icon-con'),
		col = $('.aside .si-column .column');
	sca.click(function(){
		Carry(sca,icon,icc,'#F4F4F4')
	})
	icon.click(function(){
		Carry(icon,sca,icc,'#474747')
	})
	icc.click(function(){
		Carry(icc,icon,sca,'#474747')
	})
	function Carry(elem1,elem2,elem3,bgcolor){
		elem1.addClass('active');
		elem2.removeClass('active');
		elem3.removeClass('active');
		col.animate({
			width: 300
		},300)
		asi.css({
			'background-color': bgcolor
		});
	}
	//二维码显示
	$('.aside .si-function .si-code i').mouseenter(function(){
		$(this).parent().find('.asi').stop(true).delay(200).animate({
			opacity: 1
		},200);
	});
	$('.aside .si-function .si-code').mouseleave(function(){
		$(this).find('.asi').stop(true).delay(200).animate({
			opacity: 0
		},200);
	})
	//aside的运动
	$('.aside .si-function .si .sii').mouseenter(function(){
		$(this).parent().find('.isi').stop(true).delay(200).animate({
			right: 42,
			opacity: 1
		},200);
		$(this).parent().find('.asi').stop(true).delay(200).animate({
			opacity: 1
		},200);
	});
	$('.aside .si-function .si').mouseleave(function(){
		$(this).find('.isi').stop(true).delay(200).animate({
			right: -100,
			opacity: 0
		},200);
		$(this).find('.asi').stop(true).delay(200).animate({
			opacity: 0
		},200);
	});