$(function(){
	var lg = $('.log-reg-form .da-log-reg .login');
	var lgf = $('.log-reg-form .lg-form');
	var rg = $('.log-reg-form .da-log-reg .register');
	var rgf = $('.log-reg-form .rg-form');
	var ctrl = $('.login-register .log-reg-form .ctrl');
	var inp = ctrl.find('input');
	var mobile = $('.mobile');
	var psw = $('.password');
	var cap = $('.log-reg-form .rg-form .captcha');
	var valU = $('.log-reg-form .rg-form .val');
	var errorInfoBox = $('.error-info');
	var res = $('.resent.res');
	var valP = $('.val-psw');
	var phone = $('.phone-val');
	var fra = $('.frame');
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
	});
	
	inp.focus(function(){
		inp.parent().addClass('current');
	});
	inp.blur(function(){
		inp.parent().removeClass('current');
	});
	var regM = /^1[3-9]\d{9}$/;
	var regP = /\w{6,}$/;
	
	
	

	
	
	/*if(valU.value != cap.html()){
			errorInfoBox.html('验证码不正确') ;
			return;
		};*/

	cap.click(function(){
		createCap();
	});
	res.click(function(){
		phone.show();
		valP.animate({
			top: 150
		},500)
		createRes();
	});
	fra.click(function(){
		phone.hide();
	})
	function createCap(){
		var vertifyStr = '';
		for(var i=0; i<6; i++){
			vertifyStr += parseInt(Math.random()*10);
		};
		cap.html(vertifyStr);
		
	};
	function createRes(){
		var vertifyStr = '';
		for(var i=0; i<6; i++){
			vertifyStr += parseInt(Math.random()*10);
		};
		valP.html(vertifyStr);
		
	};
})
/*//获取元素
	var username = $('.username')[0];
	var password = $('.password')[0];
	var passwordCheck = $('.password-check')[0];
	var passwordLevel = $('.password-level');
	var passwordLevelBtn = $('.password-level-btn')[0];
	var phone = $('.phone')[0];
	var vertifyU = $('.vertify-user')[0];
	var vertify = $('.vertify')[0];
	var vertifyChange = $('.vertify-change')[0];
	var isauto = $('#auto');
	var errorInfoBox = $('.error-info')[0];
	var submit = $('.submit')[0];
	
	//定义用户名、密码、手机号验证规则
	var regUName = /^[a-zA-Z_]\w{5,15}$/;
	var regUnameLength = /^.{6,16}$/;

	var regPswLength = /^.{6,20}$/;
	var regPswLow = /^\d{6,20}$/;
	var regPswMid = /[a-zA-Z]/;
	var regPswHigh = /[!@#\$%\^&\*\+\-]/;

	var regPhone = /^1[358]\d{9}$/;
	
	//表单提交事件 
	addEventListener(submit,'click',function(e){
		e.preventDefault(e);

		var uname = username.value;
		var upsw = password.value;
		var upswCheck = passwordCheck.value;

		// 用户名校验
		if(!regUnameLength.test(uname)){
			errorInfoBox.innerHTML = '用户名长度不合法';
			return ;
		}
		if(!regUName.test(uname)){
			errorInfoBox.innerHTML = '用户名必须是数字字母下划线，不能以数字开头';
			return ;
		}
		// 密码校验
		// 两次，密码是否一致
		if(upsw != upswCheck){
			errorInfoBox.innerHTML = '两次密码不一致';
			return;
		}
		// 密码长度是否合法
		if(!regPswLength.test(upsw) || !regPswLength.test(upswCheck)){
			errorInfoBox.innerHTML = '密码长度必须在6-20之间';
			return;
		}
		//密码强度校验
		if(regPswLow.test(upsw)){
			errorInfoBox.innerHTML = '密码太过简单';
			//return;
		}
		//手机号校验
		if(phone.value.length != 11){
			errorInfoBox.innerHTML = '手机号必须为11位';
			return;
		}
		if(!regPhone.test(phone.value)){
			errorInfoBox.innerHTML = '手机号不合法';
			return;
		}
		//验证码校验
		if(vertifyU.value != vertify.innerHTML){
			errorInfoBox.innerHTML = '验证码不正确';
			return;
		}
		//判断是否自动登录
		if(isauto.checked){
			setCookie('account',uname,10);
			setCookie('password',upsw,10);
		}else{
			errorInfoBox.innerHTML = '请勾选自动登录';
			return;
		}
		errorInfoBox.innerHTML = '验证通过';
		alert('表单验证通过，cookie是：'+document.cookie);
	});

	//校验密码强度
	password.oninput = function(){
		var upsw = password.value;
		var upswCheck = passwordCheck.value;
		console.log(upsw,upswCheck);
		//先将所有密码强度的背景改为默认颜色
		for(var i=0; i<passwordLevel.length; i++){
			removeClass(passwordLevel[i],'level'+i);
			passwordLevel[i].innerText = '';
		}
		if(!regPswLength.test(upsw)){
			errorInfoBox.innerHTML = '密码长度不合法';
			return;
		}
		//如果都是数字 （低）
		if(regPswLow.test(upsw)){
			showPswStrong(0,'低');
			return;
		}
		//如果含有特殊字符 （高）  更改最后一个密码强度的背景色
		if(regPswHigh.test(upsw)){
			showPswStrong(2,'高');
			return;
		}
		//如果含有字母  （中）  更改第2个密码强度的背景色
		if(regPswMid.test(upsw)){
			showPswStrong(1,'中');
		}
	}
	//显示密码强度
	function showPswStrong(index,des){
		addClass(passwordLevel[index],'level'+index);
		passwordLevel[index].innerText = des;
	}

	//点击切换验证码
	vertifyChange.onclick = function(){
		createVertify();
	}
	//生成验证码函数 
	function createVertify(){
		var vertifyStr = '';
		for(var i=0; i<4; i++){
			vertifyStr += parseInt(Math.random()*10);
		}
		vertify.innerHTML = vertifyStr;
	}*/