//main中buy-buy的手风琴效果
	/*$('.goods-class .goods-cla dl .goods').hover()*/
	
 //main中applaud的选项卡
    var content = $('.app-con .content .con-part');
	$('.app-nav ul .app-option').click(function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		// $(this).index()
		content.eq( $(this).index() ).show();
		content.eq( $(this).index() ).siblings().hide();
	});	
	//main中new-pro的ajax调用
	function setArr(){
		$.getJSON('js/main-new-pro.json',function(result){
			var con = '';
			for(var i in result){
				con += '<div class="new-pros">'
					+		'<div class="pros-img">'
					+			'<a href="javascript:;" class="last">'
					+				'<img src="'+result[i].pic+'"/>'
					+			'</a>'
					+			'<div class="goods">'
					+				'<span>加入购物车</span>'
					+				'<i class="iconfont">&#xe682;</i>'
					+			'</div>'
					+		'</div>'
					+		'<div class="pros-intr">'
					+			'<p class="pros-intr-pr">'
					+				'<span><i>￥</i>249.00</span>'
					+				'<del><i>￥</i>339.00</del>'
					+				'<b>78人收藏</b>'
					+			'</p>'
					+			'<p class="pros-intr-pi">'
					+				'<span>4.9折/</span>'
					+				'<a href="javascript:;">"'+result[i].name+'"</a>'
					+			'</p>'
					+		'</div>'
					+	'</div>'
			}
		var newP = $('.new-products .new-prods');
			newP.html(con);
		});
	}
	var but = $('.button');
	but.on('click',function(){
		setArr();
	})
	//main中flash-purchase的surprise的ajax调用
	function setData(){
		$.getJSON('js/main-surprise.json',function(result){
			var content = '';
			countDown('2016/12/19 00:00:00');
			var count_down = $('.sur-pro .product .pro-intr .count-down');;
				for (var i in result) {
					content +=  '<li class="product clear">'
							+		'<a href="javascript:;" class="img">'
							+			'<img src="'+result[i].pic+'" alt="" />'
							+		'</a>'
							+		'<div class="pro-intr">'
							+			'<strong class="count-down"></strong>'
							+			'<a href="javascript:;" class="pro-in"><span>6折</span> "'+result[i].intro+'" </a>'
							+			'<h5>"'+result[i].name+'"</h5>'
							+			'<p>'
							+				'<span><i>￥</i>39.00</span>'
							+				'<del>129.00</del>'
							+			'</p>'
							+			'<a href="javascript:;" class="loot">立即抢购</a>'
							+			'<b>390人抢购</b>'
							+		'</div>'
							+	'</li>';
							
				}
				
				var ul = $('.sur-pro ul');
				ul.append(content);
		});
	}
	var btn = $('.btn');
	btn.on('click',function(){
		setData();
	});
	
	
	//main中flash-purchase的surprise的倒计时
	function countDown(time){
		var futureTime = Date.parse(time);
		showTime();
		setInterval(showTime,500);
		function showTime(){
			var nowTime = Date.now();
			var diff = futureTime - nowTime;
			var days = addZero(parseInt(diff/1000/60/60/24)); 
			var hours = addZero(parseInt(diff/1000/60/60%24));
			var minutes = addZero(parseInt(diff/1000/60%60));
			var seconds = addZero(parseInt(diff/1000%60));
			var times = '距闪购结束' +days+ '天  ' +hours+ ' : ' +minutes+ ' : ' +seconds;
			count_down.html(times);
		}
		function addZero(num){
			if(num < 10){
				num = '0' + num;
			}
			return num;
		}
	}
	var count_down = $('.sur-pro .product .pro-intr .count-down');
	countDown('2016/12/19 00:00:00');
	
	