//banner淡入淡出轮播

var banner = {
	main: $('.banner'),
	wrapper: $('.banner .wrapper'),
	imgs: $('.banner .wrapper a img'),
	circle: $('.banner .circles .circle-btn'),
	cBtn: $('.banner .circles .circle-btn .button'),
	wra1: $('.banner .wrapper .wrapper1'),
	wra2: $('.banner .wrapper .wrapper2'),
	wra3: $('.banner .wrapper .wrapper3'),
	next: 0,
	now: 0,
	timer: null,
	init: function(){
		this.imgs.eq(0).show();
		this.wra3.show();
		this.info();
		this.autoPlay();
		this.click();
	},
	
	//添加小圆按钮
	info: function(){
		var content = '';
		for (var i=0; i<this.imgs.length; i++) {
			content += '<div class="button" ><u data-index="'+i+'">'+(i+1)+'</u></div>'
		}
		this.circle.html(content);
		this.cBtn = $('.banner .circles .circle-btn .button');
		this.cBtn.eq(0).addClass('active');
	},
	
	//自动轮播,小圆点跟随
	autoPlay: function(){
		var that = this;
		that.timer = setInterval(function(){
			that.next++;
			that.imgSwitch();
		},1500)
	},
	
	//小圆点点击
	click: function(){
		this.circle.click(function(e){
			e = e || window.event;
			var _this = this;
			var target = e.target || e.srcElement;
			if(target.tagName == 'U'){
				_this.next = target.getAttribute("data-index");
				_this.imgSwitch();
			};
			
		});
	},
	
	//变换图片
	imgSwitch: function(){
		if (this.next >= this.imgs.length) {
			this.next = 0;
		};
		this.cBtn.eq(this.now).removeClass('active');
		this.cBtn.eq(this.next).addClass('active');
		this.imgs.eq(this.now).fadeOut();
		this.imgs.eq(this.next).fadeIn();
		this.now = this.next;
	}
};
banner.init();
