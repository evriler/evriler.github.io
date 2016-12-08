/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */

/*! fly - v1.0.0 - 2014-12-22
 * https://github.com/amibug/fly
 * Copyright (c) 2014 wuyuedong; Licensed MIT */

define("utils/cookie", [], function() {
	var e = {
		read: function(e) {
			var t = document.cookie.match("(?:^|;)\\s*" + e + "=([^;]*)");
			return t ? decodeURIComponent(t[1]) : null
		},
		write: function(e) {
			var t = e.name + "=" + encodeURIComponent(e.value);
			e.domain && (t += "; domain=" + e.domain), e.path && (t += "; path=" + e.path);
			if (e.day) {
				var n = new Date;
				n.setTime(n.getTime() + e.day * 24 * 60 * 60 * 1e3), t += "; expires=" + n.toGMTString()
			}
			if (e.expires) {
				var r = new Date((new Date).getTime() + 864e5 - ((new Date).getHours() * 60 * 60 + (new Date).getMinutes() * 60 + (new Date).getSeconds()) * 1e3);
				r.setTime(r.getTime()), t += "; expires=" + r.toGMTString()
			}
			document.cookie = t;
			return
		},
		dispose: function(e) {
			var t = this.read(e);
			this.write({
				name: e,
				value: t,
				day: -1
			});
			return
		}
	};
	return function(n, r, i) {
		return typeof r != "undefined" ? r === null ? e.dispose(n) : (i = i || {}, i.name = n, i.value = r, e.write(i)) : e.read(n)
	}
}), define("models/account", ["jquery", "utils/cookie"], function(e, t) {
	function n() {
		return e("[data-has-login]").data("has-login") === !0
	}
	return {
		isLogin: n
	}
}), define("utils/stat", ["jquery"], function() {
	function e(e, t, n, r) {
		n == undefined ? n = "" : n, (new Image).src = "http://s.daling.com/b.gif?cache=" + +(new Date).getTime() + "&dataClass1=" + e + "|" + "dataClass2=" + t + "|" + "dataClass3=" + n, _hmt.push(["_trackEvent", e, t, n]), ga("send", "event", e, t, n)
	}
	return function() {
		if (localStorage.getItem("gaInfo") != null) {
			var t = JSON.parse(localStorage.getItem("gaInfo"));
			ga("require", "ecommerce"), ga("ecommerce:addTransaction", {
				id: t.orderId,
				affiliation: t.orderAffiliation,
				revenue: t.orderRevenueCurrency,
				shipping: t.orderShippingCurrency,
				tax: t.orderTaxCurrency
			}), $.each(t.goods, function(e, t) {
				ga("ecommerce:addItem", {
					id: t.Id * 1,
					name: t.Name,
					sku: t.SKU,
					category: t.Category,
					price: t.Price,
					quantity: t.Quantity * 1
				})
			}), ga("ecommerce:send"), localStorage.removeItem("gaInfo")
		}
	}(), $("body").on("click", "[data-stat-desc]", function(t) {
		var n = $(this).attr("data-stat-desc"),
			r = n.split("-")[0],
			i = n.split("-")[1],
			s = n.split("-")[2];
		e(r, i, s, n)
	}), e.trackTransaction = function(e) {
		localStorage.setItem("gaInfo", e)
	}, e
}), define("utils/validator", ["jquery", "jquery-validate"], function(e) {
	return e.validator.addMethod("regexp", function(e, t, n) {
		return this.optional(t) || n.test(e)
	}, "鏍煎紡涓嶆纭�"), function(t, n, r) {
		e(t).validate(e.extend(n, {
			submitHandler: r
		}))
	}
}), define("utils/dsp", ["jquery", "utils/cookie"], function(e, t) {
	"use strict";

	function n(t) {
		var n = document.createElement("script"),
			r = e.Deferred();
		return n.type = "text/javascript", n.src = t, document.getElementsByTagName("body")[0].appendChild(n), n.onload = function() {
			r.resolve()
		}, r.promise()
	}
	var r = n("https://v.behe.com/js/bgnms.js");
	(function() {
		r.then(function() {
			e("body").append('<iframe height="0" width="0" frameborder="0" src="https://v.behe.com/js/0.html"></iframe><script type="text/javascript">beheActiveView({at:"arrive",src:"1697005363",cid:"utm_source=bihe",sid:"2216"});</script>')
		})
	})();
	var i = e("[data-nickname]").data("nickname"),
		s = e("[data-user-id]").data("user-id");
	return {
		trackGoodsView: function(e, t, n, r, i, s, o) {},
		trackCartView: function() {
			r.then(function() {
				e("body").append('<script type="text/javascript">beheActiveEvent({at:"buy",src:"1697005363",cid:"utm_source=bihe",sid:"2216.2068"});</script>')
			})
		},
		trackCart: function(e) {},
		trackOrdertView: function() {
			r.then(function() {
				e("body").append('<script type="text/javascript">beheActiveEvent({at:"buy_1",src:"1697005363",cid:"utm_source=bihe",sid:"2216.2069"});</script>')
			})
		},
		trackOrder: function(e, t, n) {},
		trackRegister: function() {},
		trackSuccesstView: function() {
			r.then(function() {
				e("body").append('<script type="text/javascript">beheActiveEvent({at:"buy_2",src:"1697005363",cid:"utm_source=bihe",sid:"2216.2070"});</script>')
			})
		},
		zampda: function() {
			(function(e) {
				var t = {
					query: [],
					args: e || {}
				};
				t.query.push(["_setAccount", "614"]), (window.__zpSMConfig = window.__zpSMConfig || []).push(t);
				var n = document.createElement("script");
				n.type = "text/javascript", n.async = !0, n.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//cdn.zampda.net/s.js";
				var r = document.getElementsByTagName("script")[0];
				r.parentNode.insertBefore(n, r)
			})(window.__zp_tag_params)
		}
	}
}), define("widgets/popup", ["jquery"], function(e) {
	var t = {};
	return t.open = function(e, n) {
		var r = e.find(".da-dialog-inner");
		e.show(), r.css({
			"margin-left": -r.width() / 2 + "px",
			"margin-top": -r.height() / 2 + "px"
		}), e.data("close-handler", function() {
			n ? n() : null
		});
		if (e.data("dialog-init")) return;
		e.find(".close,.mask,[data-address-cancel]").on("click", function() {
			t.hide(e)
		}), e.data("dialog-init", "init")
	}, t.hide = function(e) {
		e.hide(), e.data("close-handler")()
	}, t
}), define("widgets/login-panel", ["jquery", "utils/validator", "utils/dsp", "widgets/popup"], function(e, t, n, r) {
	return function(i) {
		function h() {
			var t = o.find("[data-send-code]"),
				n = o.find("[data-resent]");
			if (l > 0) return;
			o.find("[name=mobile]").valid() && o.find("[name=validate]").valid() && (t.prop("disabled", !0), e.post(o.data("verify-url"), {
				mobile: o.find("[name=mobile]").val(),
				validate: o.find("[name=validate]").val(),
				type: "reg"
			}).done(function(r) {
				t.prop("disabled", !1);
				if (!r.status) {
					e("[data-captcha]").click(), e("[data-text-error]").html("*" + r.msg);
					return
				}
				e("[data-text-error]").html(""), l = 60, n.show().find(".timer").html(l), t.hide();
				var i = setInterval(function() {
					l -= 1;
					if (l > 0) {
						n.find(".timer").html(l);
						return
					}
					clearInterval(i), n.hide(), t.show()
				}, 1e3)
			}))
		}
		function p(e) {
			c = e ||
			function() {}, o.hide(), s.show(), i.find("[data-tab-login]").addClass("active"), i.find("[data-tab-register]").removeClass("active"), i.find("[data-captcha]").click()
		}
		function d(e) {
			c = e ||
			function() {}, o.show(), s.hide(), i.find("[data-tab-login]").removeClass("active"), i.find("[data-tab-register]").addClass("active"), i.find("[data-captcha]").click()
		}
		var s = i.find(".login-form"),
			o = i.find(".register-form"),
			u = e("[data-Agreement]").find("input"),
			a = e("[data-agreement-a]"),
			f = e("[data-agreement-dialog]"),
			l = 0,
			c;
		return u.click(function() {
			e("[data-Agreement]").find("input:checked").length == 1 ? (e("[data-text-error]").html(""), o.find("[type=submit]").removeClass("dispabled")) : o.find("[type=submit]").addClass("dispabled")
		}), a.click(function() {
			r.open(f, function() {})
		}), e("[data-agreement-confirm]").click(function() {
			e("[data-Agreement]").find("input:checked").length == 0 && e("[data-Agreement]").find("input").click(), r.hide(f)
		}), e("[data-agreement-close]").click(function() {
			r.hide(f)
		}), i.delegate("input", "focus", function(t) {
			var n = e(t.currentTarget);
			i.find(".ctrl").removeClass("current"), n.closest(".ctrl").addClass("current")
		}), i.find("[data-captcha]").click(function(t) {
			var n = e(t.target),
				r = n.data("src");
			n.attr("src", r + "&_r=" + (new Date).getTime())
		}), i.find("[data-tab-login]").click(function() {
			p(c)
		}), i.find("[data-tab-register]").click(function() {
			d(c)
		}), i.find("[data-send-code]").click(h), t(s, {
			rules: {
				mobile: {
					required: !0,
					regexp: /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				},
				pass: {
					required: !0
				}
			},
			messages: {
				mobile: {
					required: "璇疯緭鍏ユ墜鏈哄彿",
					regexp: "璇疯緭鍏ユ纭殑鎵嬫満鍙风爜"
				},
				pass: {
					required: "璇疯緭鍏ュ瘑鐮�"
				}
			}
		}, function(n, r) {
			r.preventDefault();
			var i = s.serialize();
			e.post(s.attr("action"), i).done(function(t) {
				t.status ? (e("[data-text-error1]").html(""), e("[data-has-login]").data("has-login", !0), c()) : e("[data-text-error1]").html("*" + t.msg)
			})
		}), e(".mobile").each(function() {
			e(this).keyup(function() {
				e(this).parents("form").css("display") == "block" && e(this).val().match(/\s+/g) != null && e(this).val(e(this).val().replace(/\s*/g, ""))
			})
		}), t(o, {
			rules: {
				mobile: {
					required: !0,
					regexp: /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				},
				validate: {
					required: !0
				},
				code: {
					required: !0
				},
				pass: {
					required: !0
				}
			},
			messages: {
				mobile: {
					required: "璇疯緭鍏ユ墜鏈哄彿",
					regexp: "璇疯緭鍏ユ纭殑鎵嬫満鍙风爜"
				},
				validate: {
					required: "璇疯緭鍏ラ獙璇佺爜"
				},
				code: {
					required: "璇疯緭鍏ョ煭淇￠獙璇佺爜"
				},
				pass: {
					required: "璇疯緭鍏ュ瘑鐮�"
				}
			}
		}, function(r, i) {
			i.preventDefault();
			if (e("[data-Agreement]").find("input:checked").length == 0) {
				e("[data-text-error]").html("璇锋帴鍙楁湇鍔℃潯娆�");
				return
			}
			var s = o.serialize();
			o.find("[type=submit]").prop("disabled", "disabled"), e.post(o.attr("action"), s).done(function(t) {
				o.find("[type=submit]").prop("disabled", null), t.status ? (e("[data-text-error]").html(""), e("[data-has-login]").data("has-login", !0), n.trackRegister(), c()) : e("[data-text-error]").html("*" + t.msg)
			})
		}), {
			login: p,
			register: d
		}
	}
}), define("widgets/login-dialog", ["jquery", "widgets/login-panel"], function(e, t) {
	function s(e) {
		n.show(), i.login(function() {
			n.hide(), e ? e() : location.reload()
		})
	}
	function o(e) {
		n.show(), i.register(function() {
			n.hide(), e ? e() : location.reload()
		})
	}
	var n = e("[data-login-dialog]"),
		r = n.find(".close"),
		i = t(n);
	return r.click(function() {
		n.hide()
	}), {
		login: s,
		register: o
	}
}), define("utils/shims", [], function() {
	window.console = window.console || {
		log: function() {},
		error: function() {},
		debug: function() {}
	}
}), define("widgets/header", ["jquery", "models/account", "utils/stat", "widgets/login-dialog", "utils/dsp", "utils/shims"], function(e, t, n, r, i) {
	function a() {
		e.get("/api/goods/getNavigation", function(t) {
			e("[da-category]").find(".opened").length == 0 && e(".da-category .dt").append(t)
		}), o.find(".ico-up").css("display", "none"), o.find(".ico-down").css("display", "inline-block")
	}
	function l() {
		e(window).scrollTop() >= f ? e("[data-go-top]").fadeIn() : e("[data-go-top]").fadeOut()
	}
	e.ajaxSetup({
		cache: !1
	});
	var s = e(".da-header");
	s.find("[data-login]").click(function() {
		r.login()
	}), s.find("[data-register]").click(function() {
		r.register()
	});
	var o = e(".da-category"),
		u = null;
	o.mouseenter(function() {
		u = setTimeout(a, 300)
	}).mouseleave(function() {
		e("[da-category]").find(".opened").length == 0 && (e(".da-category").find(".dd").remove(), clearTimeout(u)), o.find(".ico-up").css("display", "inline-block"), o.find(".ico-down").css("display", "none")
	}), e("body").click(function() {
		e("[da-category]").find(".opened").length == 0 && e(".da-category").find(".dd").hide(200)
	});
	var f = e(window).height();
	l(), e(window).scroll(function() {
		l()
	}), e("[data-go-top]").on("click", function() {
		e(window).scrollTop(0)
	}), e("[data-user-menu]").find("a").each(function() {
		e(this).click(function() {
			e(this).next("ul").length > 0 && e(this).next("ul").slideToggle(200)
		})
	}), e(window).load(function() {
		i.zampda()
	})
}), define("utils/flexslider", ["jquery"], function(e) {
	(function(e) {
		e.flexslider = function(t, n) {
			var r = e(t);
			r.vars = e.extend({}, e.flexslider.defaults, n);
			var i = r.vars.namespace,
				s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
				o = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
				u = "click touchend MSPointerUp",
				a = "",
				f, l = r.vars.direction === "vertical",
				c = r.vars.reverse,
				h = r.vars.itemWidth > 0,
				p = r.vars.animation === "fade",
				d = r.vars.asNavFor !== "",
				v = {},
				m = !0;
			e.data(t, "flexslider", r), v = {
				init: function() {
					r.animating = !1, r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0, 10), isNaN(r.currentSlide) && (r.currentSlide = 0), r.animatingTo = r.currentSlide, r.atEnd = r.currentSlide === 0 || r.currentSlide === r.last, r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" ")), r.slides = e(r.vars.selector, r), r.container = e(r.containerSelector, r), r.count = r.slides.length, r.syncExists = e(r.vars.sync).length > 0, r.vars.animation === "slide" && (r.vars.animation = "swing"), r.prop = l ? "top" : "marginLeft", r.args = {}, r.manualPause = !1, r.stopped = !1, r.started = !1, r.startTimeout = null, r.transitions = !r.vars.video && !p && r.vars.useCSS &&
					function() {
						var e = document.createElement("div"),
							t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
						for (var n in t) if (e.style[t[n]] !== undefined) return r.pfx = t[n].replace("Perspective", "").toLowerCase(), r.prop = "-" + r.pfx + "-transform", !0;
						return !1
					}(), r.vars.controlsContainer !== "" && (r.controlsContainer = e(r.vars.controlsContainer).length > 0 && e(r.vars.controlsContainer)), r.vars.manualControls !== "" && (r.manualControls = e(r.vars.manualControls).length > 0 && e(r.vars.manualControls)), r.vars.randomize && (r.slides.sort(function() {
						return Math.round(Math.random()) - .5
					}), r.container.empty().append(r.slides)), r.doMath(), r.setup("init"), r.vars.controlNav && v.controlNav.setup(), r.vars.directionNav && v.directionNav.setup(), r.vars.keyboard && (e(r.containerSelector).length === 1 || r.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
						var t = e.keyCode;
						if (!r.animating && (t === 39 || t === 37)) {
							var n = t === 39 ? r.getTarget("next") : t === 37 ? r.getTarget("prev") : !1;
							r.flexAnimate(n, r.vars.pauseOnAction)
						}
					}), r.vars.mousewheel && r.bind("mousewheel", function(e, t, n, i) {
						e.preventDefault();
						var s = t < 0 ? r.getTarget("next") : r.getTarget("prev");
						r.flexAnimate(s, r.vars.pauseOnAction)
					}), r.vars.pausePlay && v.pausePlay.setup(), r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init();
					if (r.vars.slideshow) {
						r.vars.pauseOnHover && r.hover(function() {
							!r.manualPlay && !r.manualPause && r.pause()
						}, function() {
							!r.manualPause && !r.manualPlay && !r.stopped && r.play()
						});
						if (!r.vars.pauseInvisible || !v.pauseInvisible.isHidden()) r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play()
					}
					d && v.asNav.setup(), o && r.vars.touch && v.touch(), (!p || p && r.vars.smoothHeight) && e(window).bind("resize orientationchange focus", v.resize), r.find("img").attr("draggable", "false"), setTimeout(function() {
						r.vars.start(r)
					}, 200)
				},
				asNav: {
					setup: function() {
						r.asNav = !0, r.animatingTo = Math.floor(r.currentSlide / r.move), r.currentItem = r.currentSlide, r.slides.removeClass(i + "active-slide").eq(r.currentItem).addClass(i + "active-slide"), s ? (t._slider = r, r.slides.each(function() {
							var t = this;
							t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function(e) {
								e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
							}, !1), t.addEventListener("MSGestureTap", function(t) {
								t.preventDefault();
								var n = e(this),
									i = n.index();
								!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass("active") && (r.direction = r.currentItem < i ? "next" : "prev", r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0))
							})
						})) : r.slides.on(u, function(t) {
							t.preventDefault();
							var n = e(this),
								s = n.index(),
								o = n.offset().left - e(r).scrollLeft();
							o <= 0 && n.hasClass(i + "active-slide") ? r.flexAnimate(r.getTarget("prev"), !0) : !e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass(i + "active-slide") && (r.direction = r.currentItem < s ? "next" : "prev", r.flexAnimate(s, r.vars.pauseOnAction, !1, !0, !0))
						})
					}
				},
				controlNav: {
					setup: function() {
						r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
					},
					setupPaging: function() {
						var t = r.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
							n = 1,
							s, o;
						r.controlNavScaffold = e('<ol class="' + i + "control-nav " + i + t + '"></ol>');
						if (r.pagingCount > 1) for (var f = 0; f < r.pagingCount; f++) {
							o = r.slides.eq(f), s = r.vars.controlNav === "thumbnails" ? '<img src="' + o.attr("data-thumb") + '"/>' : "<a>" + n + "</a>";
							if ("thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
								var l = o.attr("data-thumbcaption");
								"" != l && undefined != l && (s += '<span class="' + i + 'caption">' + l + "</span>")
							}
							r.controlNavScaffold.append("<li>" + s + "</li>"), n++
						}
						r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), r.controlNavScaffold.delegate("a, img", u, function(t) {
							t.preventDefault();
							if (a === "" || a === t.type) {
								var n = e(this),
									s = r.controlNav.index(n);
								n.hasClass(i + "active") || (r.direction = s > r.currentSlide ? "next" : "prev", r.flexAnimate(s, r.vars.pauseOnAction))
							}
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					setupManual: function() {
						r.controlNav = r.manualControls, v.controlNav.active(), r.controlNav.bind(u, function(t) {
							t.preventDefault();
							if (a === "" || a === t.type) {
								var n = e(this),
									s = r.controlNav.index(n);
								n.hasClass(i + "active") || (s > r.currentSlide ? r.direction = "next" : r.direction = "prev", r.flexAnimate(s, r.vars.pauseOnAction))
							}
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					set: function() {
						var t = r.vars.controlNav === "thumbnails" ? "img" : "a";
						r.controlNav = e("." + i + "control-nav li " + t, r.controlsContainer ? r.controlsContainer : r)
					},
					active: function() {
						r.controlNav.removeClass(i + "active").eq(r.animatingTo).addClass(i + "active")
					},
					update: function(t, n) {
						r.pagingCount > 1 && t === "add" ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : r.pagingCount === 1 ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove(), v.controlNav.set(), r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, t) : v.controlNav.active()
					}
				},
				directionNav: {
					setup: function() {
						var t = e('<ul class="' + i + 'direction-nav"><li><a class="' + i + 'prev" href="#">' + r.vars.prevText + '</a></li><li><a class="' + i + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
						r.controlsContainer ? (e(r.controlsContainer).append(t), r.directionNav = e("." + i + "direction-nav li a", r.controlsContainer)) : (r.append(t), r.directionNav = e("." + i + "direction-nav li a", r)), v.directionNav.update(), r.directionNav.bind(u, function(t) {
							t.preventDefault();
							var n;
							if (a === "" || a === t.type) n = e(this).hasClass(i + "next") ? r.getTarget("next") : r.getTarget("prev"), r.flexAnimate(n, r.vars.pauseOnAction);
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					update: function() {
						var e = i + "disabled";
						r.pagingCount === 1 ? r.directionNav.addClass(e).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(e).removeAttr("tabindex") : r.animatingTo === 0 ? r.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : r.directionNav.removeClass(e).removeAttr("tabindex")
					}
				},
				pausePlay: {
					setup: function() {
						var t = e('<div class="' + i + 'pauseplay"><a></a></div>');
						r.controlsContainer ? (r.controlsContainer.append(t), r.pausePlay = e("." + i + "pauseplay a", r.controlsContainer)) : (r.append(t), r.pausePlay = e("." + i + "pauseplay a", r)), v.pausePlay.update(r.vars.slideshow ? i + "pause" : i + "play"), r.pausePlay.bind(u, function(t) {
							t.preventDefault();
							if (a === "" || a === t.type) e(this).hasClass(i + "pause") ? (r.manualPause = !0, r.manualPlay = !1, r.pause()) : (r.manualPause = !1, r.manualPlay = !0, r.play());
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					update: function(e) {
						e === "play" ? r.pausePlay.removeClass(i + "pause").addClass(i + "play").html(r.vars.playText) : r.pausePlay.removeClass(i + "play").addClass(i + "pause").html(r.vars.pauseText)
					}
				},
				touch: function() {
					var e, n, i, o, u, a, f = !1,
						d = 0,
						v = 0,
						m = 0;
					if (!s) {
						t.addEventListener("touchstart", g, !1);

						function g(s) {
							if (r.animating) s.preventDefault();
							else if (window.navigator.msPointerEnabled || s.touches.length === 1) r.pause(), o = l ? r.h : r.w, a = Number(new Date), d = s.touches[0].pageX, v = s.touches[0].pageY, i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o, e = l ? v : d, n = l ? d : v, t.addEventListener("touchmove", y, !1), t.addEventListener("touchend", b, !1)
						}
						function y(t) {
							d = t.touches[0].pageX, v = t.touches[0].pageY, u = l ? e - v : e - d, f = l ? Math.abs(u) < Math.abs(d - n) : Math.abs(u) < Math.abs(v - n);
							var s = 500;
							if (!f || Number(new Date) - a > s) t.preventDefault(), !p && r.transitions && (r.vars.animationLoop || (u /= r.currentSlide === 0 && u < 0 || r.currentSlide === r.last && u > 0 ? Math.abs(u) / o + 2 : 1), r.setProps(i + u, "setTouch"))
						}
						function b(s) {
							t.removeEventListener("touchmove", y, !1);
							if (r.animatingTo === r.currentSlide && !f && u !== null) {
								var l = c ? -u : u,
									h = l > 0 ? r.getTarget("next") : r.getTarget("prev");
								r.canAdvance(h) && (Number(new Date) - a < 550 && Math.abs(l) > 50 || Math.abs(l) > o / 2) ? r.flexAnimate(h, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
							}
							t.removeEventListener("touchend", b, !1), e = null, n = null, u = null, i = null
						}
					} else {
						t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", w, !1), t._slider = r, t.addEventListener("MSGestureChange", E, !1), t.addEventListener("MSGestureEnd", S, !1);

						function w(e) {
							e.stopPropagation(), r.animating ? e.preventDefault() : (r.pause(), t._gesture.addPointer(e.pointerId), m = 0, o = l ? r.h : r.w, a = Number(new Date), i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o)
						}
						function E(e) {
							e.stopPropagation();
							var n = e.target._slider;
							if (!n) return;
							var r = -e.translationX,
								s = -e.translationY;
							m += l ? s : r, u = m, f = l ? Math.abs(m) < Math.abs(-r) : Math.abs(m) < Math.abs(-s);
							if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
								setImmediate(function() {
									t._gesture.stop()
								});
								return
							}
							if (!f || Number(new Date) - a > 500) e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (u = m / (n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / o + 2 : 1)), n.setProps(i + u, "setTouch"))
						}
						function S(t) {
							t.stopPropagation();
							var r = t.target._slider;
							if (!r) return;
							if (r.animatingTo === r.currentSlide && !f && u !== null) {
								var s = c ? -u : u,
									l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
								r.canAdvance(l) && (Number(new Date) - a < 550 && Math.abs(s) > 50 || Math.abs(s) > o / 2) ? r.flexAnimate(l, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
							}
							e = null, n = null, u = null, i = null, m = 0
						}
					}
				},
				resize: function() {
					!r.animating && r.is(":visible") && (h || r.doMath(), p ? v.smoothHeight() : h ? (r.slides.width(r.computedW), r.update(r.pagingCount), r.setProps()) : l ? (r.viewport.height(r.h), r.setProps(r.h, "setTotal")) : (r.vars.smoothHeight && v.smoothHeight(), r.newSlides.width(r.computedW), r.setProps(r.computedW, "setTotal")))
				},
				smoothHeight: function(e) {
					if (!l || p) {
						var t = p ? r : r.viewport;
						e ? t.animate({
							height: r.slides.eq(r.animatingTo).height()
						}, e) : t.height(r.slides.eq(r.animatingTo).height())
					}
				},
				sync: function(t) {
					var n = e(r.vars.sync).data("flexslider"),
						i = r.animatingTo;
					switch (t) {
					case "animate":
						n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
						break;
					case "play":
						!n.playing && !n.asNav && n.play();
						break;
					case "pause":
						n.pause()
					}
				},
				uniqueID: function(t) {
					return t.find("[id]").each(function() {
						var t = e(this);
						t.attr("id", t.attr("id") + "_clone")
					}), t
				},
				pauseInvisible: {
					visProp: null,
					init: function() {
						var e = ["webkit", "moz", "ms", "o"];
						if ("hidden" in document) return "hidden";
						for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
						if (v.pauseInvisible.visProp) {
							var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
							document.addEventListener(n, function() {
								v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
							})
						}
					},
					isHidden: function() {
						return document[v.pauseInvisible.visProp] || !1
					}
				},
				setToClearWatchedEvent: function() {
					clearTimeout(f), f = setTimeout(function() {
						a = ""
					}, 3e3)
				}
			}, r.flexAnimate = function(t, n, s, u, a) {
				!r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev"), d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
				if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
					if (d && u) {
						var f = e(r.vars.asNavFor).data("flexslider");
						r.atEnd = t === 0 || t === r.count - 1, f.flexAnimate(t, !0, !1, !0, a), r.direction = r.currentItem < t ? "next" : "prev", f.direction = r.direction;
						if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) return r.currentItem = t, r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), !1;
						r.currentItem = t, r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), t = Math.floor(t / r.visible)
					}
					r.animating = !0, r.animatingTo = t, n && r.pause(), r.vars.before(r), r.syncExists && !a && v.sync("animate"), r.vars.controlNav && v.controlNav.active(), h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), r.atEnd = t === 0 || t === r.last, r.vars.directionNav && v.directionNav.update(), t === r.last && (r.vars.end(r), r.vars.animationLoop || r.pause());
					if (!p) {
						var m = l ? r.slides.filter(":first").height() : r.computedW,
							g, y, b;
						h ? (g = r.vars.itemMargin, b = (r.itemW + g) * r.move * r.animatingTo, y = b > r.limit && r.visible !== 1 ? r.limit : b) : r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m, r.setProps(y, "", r.vars.animationSpeed);
						if (r.transitions) {
							if (!r.vars.animationLoop || !r.atEnd) r.animating = !1, r.currentSlide = r.animatingTo;
							r.container.unbind("webkitTransitionEnd transitionend"), r.container.bind("webkitTransitionEnd transitionend", function() {
								r.wrapup(m)
							})
						} else r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function() {
							r.wrapup(m)
						})
					} else o ? (r.slides.eq(r.currentSlide).css({
						opacity: 0,
						zIndex: 1
					}), r.slides.eq(t).css({
						opacity: 1,
						zIndex: 2
					}), r.wrapup(m)) : (r.slides.eq(r.currentSlide).css({
						zIndex: 1
					}).animate({
						opacity: 0
					}, r.vars.animationSpeed, r.vars.easing), r.slides.eq(t).css({
						zIndex: 2
					}).animate({
						opacity: 1
					}, r.vars.animationSpeed, r.vars.easing, r.wrapup));
					r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
				}
			}, r.wrapup = function(e) {
				!p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart")), r.animating = !1, r.currentSlide = r.animatingTo, r.vars.after(r)
			}, r.animateSlides = function() {
				!r.animating && m && r.flexAnimate(r.getTarget("next"))
			}, r.pause = function() {
				clearInterval(r.animatedSlides), r.animatedSlides = null, r.playing = !1, r.vars.pausePlay && v.pausePlay.update("play"), r.syncExists && v.sync("pause")
			}, r.play = function() {
				r.playing && clearInterval(r.animatedSlides), r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed), r.started = r.playing = !0, r.vars.pausePlay && v.pausePlay.update("pause"), r.syncExists && v.sync("play")
			}, r.stop = function() {
				r.pause(), r.stopped = !0
			}, r.canAdvance = function(e, t) {
				var n = d ? r.pagingCount - 1 : r.last;
				return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
			}, r.getTarget = function(e) {
				return r.direction = e, e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
			}, r.setProps = function(e, t, n) {
				var i = function() {
						var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
							i = function() {
								if (h) return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
								switch (t) {
								case "setTotal":
									return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
								case "setTouch":
									return c ? e : e;
								case "jumpEnd":
									return c ? e : r.count * e;
								case "jumpStart":
									return c ? r.count * e : e;
								default:
									return e
								}
							}();
						return i * -1 + "px"
					}();
				r.transitions && (i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = n !== undefined ? n / 1e3 + "s" : "0s", r.container.css("-" + r.pfx + "-transition-duration", n), r.container.css("transition-duration", n)), r.args[r.prop] = i, (r.transitions || n === undefined) && r.container.css(r.args), r.container.css("transform", i)
			}, r.setup = function(t) {
				if (!p) {
					var n, s;
					t === "init" && (r.viewport = e('<div class="' + i + 'viewport"></div>').css({
						overflow: "hidden",
						position: "relative"
					}).appendTo(r).append(r.container), r.cloneCount = 0, r.cloneOffset = 0, c && (s = e.makeArray(r.slides).reverse(), r.slides = e(s), r.container.empty().append(r.slides))), r.vars.animationLoop && !h && (r.cloneCount = 2, r.cloneOffset = 1, t !== "init" && r.container.find(".clone").remove(), r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true")), v.uniqueID(r.slides.first().clone().addClass("clone")).appendTo(r.container), v.uniqueID(r.slides.last().clone().addClass("clone")).prependTo(r.container)), r.newSlides = e(r.vars.selector, r), n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset, l && !h ? (r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%"), setTimeout(function() {
						r.newSlides.css({
							display: "block"
						}), r.doMath(), r.viewport.height(r.h), r.setProps(n * r.h, "init")
					}, t === "init" ? 100 : 0)) : (r.container.width((r.count + r.cloneCount) * 200 + "%"), r.setProps(n * r.computedW, "init"), setTimeout(function() {
						r.doMath(), r.newSlides.css({
							width: r.computedW,
							"float": "left",
							display: "block"
						}), r.vars.smoothHeight && v.smoothHeight()
					}, t === "init" ? 100 : 0))
				} else r.slides.css({
					width: "100%",
					"float": "left",
					marginRight: "-100%",
					position: "relative"
				}), t === "init" && (o ? r.slides.css({
					opacity: 0,
					display: "block",
					webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
					zIndex: 1
				}).eq(r.currentSlide).css({
					opacity: 1,
					zIndex: 2
				}) : r.slides.css({
					opacity: 0,
					display: "block",
					zIndex: 1
				}).eq(r.currentSlide).css({
					zIndex: 2
				}).animate({
					opacity: 1
				}, r.vars.animationSpeed, r.vars.easing)), r.vars.smoothHeight && v.smoothHeight();
				h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide"), r.vars.init(r)
			}, r.doMath = function() {
				var e = r.slides.first(),
					t = r.vars.itemMargin,
					n = r.vars.minItems,
					i = r.vars.maxItems;
				r.w = r.viewport === undefined ? r.width() : r.viewport.width(), r.h = e.height(), r.boxPadding = e.outerWidth() - e.width(), h ? (r.itemT = r.vars.itemWidth + t, r.minW = n ? n * r.itemT : r.w, r.maxW = i ? i * r.itemT - t : r.w, r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth, r.visible = Math.floor(r.w / r.itemW), r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible, r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1), r.last = r.pagingCount - 1, r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t) : (r.itemW = r.w, r.pagingCount = r.count, r.last = r.count - 1), r.computedW = r.itemW - r.boxPadding
			}, r.update = function(e, t) {
				r.doMath(), h || (e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1), r.animatingTo = r.currentSlide);
				if (r.vars.controlNav && !r.manualControls) if (t === "add" && !h || r.pagingCount > r.controlNav.length) v.controlNav.update("add");
				else if (t === "remove" && !h || r.pagingCount < r.controlNav.length) h && r.currentSlide > r.last && (r.currentSlide -= 1, r.animatingTo -= 1), v.controlNav.update("remove", r.last);
				r.vars.directionNav && v.directionNav.update()
			}, r.addSlide = function(t, n) {
				var i = e(t);
				r.count += 1, r.last = r.count - 1, l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i), r.update(n, "add"), r.slides = e(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.added(r)
			}, r.removeSlide = function(t) {
				var n = isNaN(t) ? r.slides.index(e(t)) : t;
				r.count -= 1, r.last = r.count - 1, isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove(), r.doMath(), r.update(n, "remove"), r.slides = e(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.removed(r)
			}, v.init()
		}, e(window).blur(function(e) {
			focused = !1
		}).focus(function(e) {
			focused = !0
		}), e.flexslider.defaults = {
			namespace: "flex-",
			selector: ".slides > li",
			animation: "fade",
			easing: "swing",
			direction: "horizontal",
			reverse: !1,
			animationLoop: !0,
			smoothHeight: !1,
			startAt: 0,
			slideshow: !0,
			slideshowSpeed: 7e3,
			animationSpeed: 600,
			initDelay: 0,
			randomize: !1,
			thumbCaptions: !1,
			pauseOnAction: !0,
			pauseOnHover: !1,
			pauseInvisible: !0,
			useCSS: !0,
			touch: !0,
			video: !1,
			controlNav: !0,
			directionNav: !0,
			prevText: "Previous",
			nextText: "Next",
			keyboard: !0,
			multipleKeyboard: !1,
			mousewheel: !1,
			pausePlay: !1,
			pauseText: "Pause",
			playText: "Play",
			controlsContainer: "",
			manualControls: "",
			sync: "",
			asNavFor: "",
			itemWidth: 0,
			itemMargin: 0,
			minItems: 1,
			maxItems: 0,
			move: 0,
			allowOneSlide: !0,
			start: function() {},
			before: function() {},
			after: function() {},
			end: function() {},
			added: function() {},
			removed: function() {},
			init: function() {}
		}, e.fn.flexslider = function(t) {
			t === undefined && (t = {});
			if (typeof t == "object") return this.each(function() {
				var n = e(this),
					r = t.selector ? t.selector : ".slides > li",
					i = n.find(r);
				i.length === 1 && t.allowOneSlide === !0 || i.length === 0 ? (i.fadeIn(400), t.start && t.start(n)) : n.data("flexslider") === undefined && new e.flexslider(this, t)
			});
			var n = e(this).data("flexslider");
			switch (t) {
			case "play":
				n.play();
				break;
			case "pause":
				n.pause();
				break;
			case "stop":
				n.stop();
				break;
			case "next":
				n.flexAnimate(n.getTarget("next"), !0);
				break;
			case "prev":
			case "previous":
				n.flexAnimate(n.getTarget("prev"), !0);
				break;
			default:
				typeof t == "number" && n.flexAnimate(t, !0)
			}
		}
	})(e), function(e) {
		e.flexslider = function(t, n) {
			var r = e(t);
			r.vars = e.extend({}, e.flexslider.defaults, n);
			var i = r.vars.namespace,
				s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
				o = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
				u = "click touchend MSPointerUp",
				a = "",
				f, l = r.vars.direction === "vertical",
				c = r.vars.reverse,
				h = r.vars.itemWidth > 0,
				p = r.vars.animation === "fade",
				d = r.vars.asNavFor !== "",
				v = {},
				m = !0;
			e.data(t, "flexslider", r), v = {
				init: function() {
					r.animating = !1, r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0, 10), isNaN(r.currentSlide) && (r.currentSlide = 0), r.animatingTo = r.currentSlide, r.atEnd = r.currentSlide === 0 || r.currentSlide === r.last, r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" ")), r.slides = e(r.vars.selector, r), r.container = e(r.containerSelector, r), r.count = r.slides.length, r.syncExists = e(r.vars.sync).length > 0, r.vars.animation === "slide" && (r.vars.animation = "swing"), r.prop = l ? "top" : "marginLeft", r.args = {}, r.manualPause = !1, r.stopped = !1, r.started = !1, r.startTimeout = null, r.transitions = !r.vars.video && !p && r.vars.useCSS &&
					function() {
						var e = document.createElement("div"),
							t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
						for (var n in t) if (e.style[t[n]] !== undefined) return r.pfx = t[n].replace("Perspective", "").toLowerCase(), r.prop = "-" + r.pfx + "-transform", !0;
						return !1
					}(), r.vars.controlsContainer !== "" && (r.controlsContainer = e(r.vars.controlsContainer).length > 0 && e(r.vars.controlsContainer)), r.vars.manualControls !== "" && (r.manualControls = e(r.vars.manualControls).length > 0 && e(r.vars.manualControls)), r.vars.randomize && (r.slides.sort(function() {
						return Math.round(Math.random()) - .5
					}), r.container.empty().append(r.slides)), r.doMath(), r.setup("init"), r.vars.controlNav && v.controlNav.setup(), r.vars.directionNav && v.directionNav.setup(), r.vars.keyboard && (e(r.containerSelector).length === 1 || r.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
						var t = e.keyCode;
						if (!r.animating && (t === 39 || t === 37)) {
							var n = t === 39 ? r.getTarget("next") : t === 37 ? r.getTarget("prev") : !1;
							r.flexAnimate(n, r.vars.pauseOnAction)
						}
					}), r.vars.mousewheel && r.bind("mousewheel", function(e, t, n, i) {
						e.preventDefault();
						var s = t < 0 ? r.getTarget("next") : r.getTarget("prev");
						r.flexAnimate(s, r.vars.pauseOnAction)
					}), r.vars.pausePlay && v.pausePlay.setup(), r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init();
					if (r.vars.slideshow) {
						r.vars.pauseOnHover && r.hover(function() {
							!r.manualPlay && !r.manualPause && r.pause()
						}, function() {
							!r.manualPause && !r.manualPlay && !r.stopped && r.play()
						});
						if (!r.vars.pauseInvisible || !v.pauseInvisible.isHidden()) r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play()
					}
					d && v.asNav.setup(), o && r.vars.touch && v.touch(), (!p || p && r.vars.smoothHeight) && e(window).bind("resize orientationchange focus", v.resize), r.find("img").attr("draggable", "false"), setTimeout(function() {
						r.vars.start(r)
					}, 200)
				},
				asNav: {
					setup: function() {
						r.asNav = !0, r.animatingTo = Math.floor(r.currentSlide / r.move), r.currentItem = r.currentSlide, r.slides.removeClass(i + "active-slide").eq(r.currentItem).addClass(i + "active-slide"), s ? (t._slider = r, r.slides.each(function() {
							var t = this;
							t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function(e) {
								e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
							}, !1), t.addEventListener("MSGestureTap", function(t) {
								t.preventDefault();
								var n = e(this),
									i = n.index();
								!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass("active") && (r.direction = r.currentItem < i ? "next" : "prev", r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0))
							})
						})) : r.slides.on(u, function(t) {
							t.preventDefault();
							var n = e(this),
								s = n.index(),
								o = n.offset().left - e(r).scrollLeft();
							o <= 0 && n.hasClass(i + "active-slide") ? r.flexAnimate(r.getTarget("prev"), !0) : !e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass(i + "active-slide") && (r.direction = r.currentItem < s ? "next" : "prev", r.flexAnimate(s, r.vars.pauseOnAction, !1, !0, !0))
						})
					}
				},
				controlNav: {
					setup: function() {
						r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
					},
					setupPaging: function() {
						var t = r.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
							n = 1,
							s, o;
						r.controlNavScaffold = e('<ol class="' + i + "control-nav " + i + t + '"></ol>');
						if (r.pagingCount > 1) for (var f = 0; f < r.pagingCount; f++) {
							o = r.slides.eq(f), s = r.vars.controlNav === "thumbnails" ? '<img src="' + o.attr("data-thumb") + '"/>' : "<a>" + n + "</a>";
							if ("thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
								var l = o.attr("data-thumbcaption");
								"" != l && undefined != l && (s += '<span class="' + i + 'caption">' + l + "</span>")
							}
							r.controlNavScaffold.append("<li>" + s + "</li>"), n++
						}
						r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), r.controlNavScaffold.delegate("a, img", u, function(t) {
							t.preventDefault();
							if (a === "" || a === t.type) {
								var n = e(this),
									s = r.controlNav.index(n);
								n.hasClass(i + "active") || (r.direction = s > r.currentSlide ? "next" : "prev", r.flexAnimate(s, r.vars.pauseOnAction))
							}
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					setupManual: function() {
						r.controlNav = r.manualControls, v.controlNav.active(), r.controlNav.bind(u, function(t) {
							t.preventDefault();
							if (a === "" || a === t.type) {
								var n = e(this),
									s = r.controlNav.index(n);
								n.hasClass(i + "active") || (s > r.currentSlide ? r.direction = "next" : r.direction = "prev", r.flexAnimate(s, r.vars.pauseOnAction))
							}
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					set: function() {
						var t = r.vars.controlNav === "thumbnails" ? "img" : "a";
						r.controlNav = e("." + i + "control-nav li " + t, r.controlsContainer ? r.controlsContainer : r)
					},
					active: function() {
						r.controlNav.removeClass(i + "active").eq(r.animatingTo).addClass(i + "active")
					},
					update: function(t, n) {
						r.pagingCount > 1 && t === "add" ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : r.pagingCount === 1 ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove(), v.controlNav.set(), r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, t) : v.controlNav.active()
					}
				},
				directionNav: {
					setup: function() {
						var t = e('<ul class="' + i + 'direction-nav"><li><a class="' + i + 'prev" href="#">' + r.vars.prevText + '</a></li><li><a class="' + i + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
						r.controlsContainer ? (e(r.controlsContainer).append(t), r.directionNav = e("." + i + "direction-nav li a", r.controlsContainer)) : (r.append(t), r.directionNav = e("." + i + "direction-nav li a", r)), v.directionNav.update(), r.directionNav.bind(u, function(t) {
							t.preventDefault();
							var n;
							if (a === "" || a === t.type) n = e(this).hasClass(i + "next") ? r.getTarget("next") : r.getTarget("prev"), r.flexAnimate(n, r.vars.pauseOnAction);
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					update: function() {
						var e = i + "disabled";
						r.pagingCount === 1 ? r.directionNav.addClass(e).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(e).removeAttr("tabindex") : r.animatingTo === 0 ? r.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : r.directionNav.removeClass(e).removeAttr("tabindex")
					}
				},
				pausePlay: {
					setup: function() {
						var t = e('<div class="' + i + 'pauseplay"><a></a></div>');
						r.controlsContainer ? (r.controlsContainer.append(t), r.pausePlay = e("." + i + "pauseplay a", r.controlsContainer)) : (r.append(t), r.pausePlay = e("." + i + "pauseplay a", r)), v.pausePlay.update(r.vars.slideshow ? i + "pause" : i + "play"), r.pausePlay.bind(u, function(t) {
							t.preventDefault();
							if (a === "" || a === t.type) e(this).hasClass(i + "pause") ? (r.manualPause = !0, r.manualPlay = !1, r.pause()) : (r.manualPause = !1, r.manualPlay = !0, r.play());
							a === "" && (a = t.type), v.setToClearWatchedEvent()
						})
					},
					update: function(e) {
						e === "play" ? r.pausePlay.removeClass(i + "pause").addClass(i + "play").html(r.vars.playText) : r.pausePlay.removeClass(i + "play").addClass(i + "pause").html(r.vars.pauseText)
					}
				},
				touch: function() {
					var e, n, i, o, u, a, f = !1,
						d = 0,
						v = 0,
						m = 0;
					if (!s) {
						t.addEventListener("touchstart", g, !1);

						function g(s) {
							if (r.animating) s.preventDefault();
							else if (window.navigator.msPointerEnabled || s.touches.length === 1) r.pause(), o = l ? r.h : r.w, a = Number(new Date), d = s.touches[0].pageX, v = s.touches[0].pageY, i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o, e = l ? v : d, n = l ? d : v, t.addEventListener("touchmove", y, !1), t.addEventListener("touchend", b, !1)
						}
						function y(t) {
							d = t.touches[0].pageX, v = t.touches[0].pageY, u = l ? e - v : e - d, f = l ? Math.abs(u) < Math.abs(d - n) : Math.abs(u) < Math.abs(v - n);
							var s = 500;
							if (!f || Number(new Date) - a > s) t.preventDefault(), !p && r.transitions && (r.vars.animationLoop || (u /= r.currentSlide === 0 && u < 0 || r.currentSlide === r.last && u > 0 ? Math.abs(u) / o + 2 : 1), r.setProps(i + u, "setTouch"))
						}
						function b(s) {
							t.removeEventListener("touchmove", y, !1);
							if (r.animatingTo === r.currentSlide && !f && u !== null) {
								var l = c ? -u : u,
									h = l > 0 ? r.getTarget("next") : r.getTarget("prev");
								r.canAdvance(h) && (Number(new Date) - a < 550 && Math.abs(l) > 50 || Math.abs(l) > o / 2) ? r.flexAnimate(h, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
							}
							t.removeEventListener("touchend", b, !1), e = null, n = null, u = null, i = null
						}
					} else {
						t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", w, !1), t._slider = r, t.addEventListener("MSGestureChange", E, !1), t.addEventListener("MSGestureEnd", S, !1);

						function w(e) {
							e.stopPropagation(), r.animating ? e.preventDefault() : (r.pause(), t._gesture.addPointer(e.pointerId), m = 0, o = l ? r.h : r.w, a = Number(new Date), i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o)
						}
						function E(e) {
							e.stopPropagation();
							var n = e.target._slider;
							if (!n) return;
							var r = -e.translationX,
								s = -e.translationY;
							m += l ? s : r, u = m, f = l ? Math.abs(m) < Math.abs(-r) : Math.abs(m) < Math.abs(-s);
							if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
								setImmediate(function() {
									t._gesture.stop()
								});
								return
							}
							if (!f || Number(new Date) - a > 500) e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (u = m / (n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / o + 2 : 1)), n.setProps(i + u, "setTouch"))
						}
						function S(t) {
							t.stopPropagation();
							var r = t.target._slider;
							if (!r) return;
							if (r.animatingTo === r.currentSlide && !f && u !== null) {
								var s = c ? -u : u,
									l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
								r.canAdvance(l) && (Number(new Date) - a < 550 && Math.abs(s) > 50 || Math.abs(s) > o / 2) ? r.flexAnimate(l, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
							}
							e = null, n = null, u = null, i = null, m = 0
						}
					}
				},
				resize: function() {
					!r.animating && r.is(":visible") && (h || r.doMath(), p ? v.smoothHeight() : h ? (r.slides.width(r.computedW), r.update(r.pagingCount), r.setProps()) : l ? (r.viewport.height(r.h), r.setProps(r.h, "setTotal")) : (r.vars.smoothHeight && v.smoothHeight(), r.newSlides.width(r.computedW), r.setProps(r.computedW, "setTotal")))
				},
				smoothHeight: function(e) {
					if (!l || p) {
						var t = p ? r : r.viewport;
						e ? t.animate({
							height: r.slides.eq(r.animatingTo).height()
						}, e) : t.height(r.slides.eq(r.animatingTo).height())
					}
				},
				sync: function(t) {
					var n = e(r.vars.sync).data("flexslider"),
						i = r.animatingTo;
					switch (t) {
					case "animate":
						n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
						break;
					case "play":
						!n.playing && !n.asNav && n.play();
						break;
					case "pause":
						n.pause()
					}
				},
				uniqueID: function(t) {
					return t.find("[id]").each(function() {
						var t = e(this);
						t.attr("id", t.attr("id") + "_clone")
					}), t
				},
				pauseInvisible: {
					visProp: null,
					init: function() {
						var e = ["webkit", "moz", "ms", "o"];
						if ("hidden" in document) return "hidden";
						for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
						if (v.pauseInvisible.visProp) {
							var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
							document.addEventListener(n, function() {
								v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
							})
						}
					},
					isHidden: function() {
						return document[v.pauseInvisible.visProp] || !1
					}
				},
				setToClearWatchedEvent: function() {
					clearTimeout(f), f = setTimeout(function() {
						a = ""
					}, 3e3)
				}
			}, r.flexAnimate = function(t, n, s, u, a) {
				!r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev"), d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
				if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
					if (d && u) {
						var f = e(r.vars.asNavFor).data("flexslider");
						r.atEnd = t === 0 || t === r.count - 1, f.flexAnimate(t, !0, !1, !0, a), r.direction = r.currentItem < t ? "next" : "prev", f.direction = r.direction;
						if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) return r.currentItem = t, r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), !1;
						r.currentItem = t, r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), t = Math.floor(t / r.visible)
					}
					r.animating = !0, r.animatingTo = t, n && r.pause(), r.vars.before(r), r.syncExists && !a && v.sync("animate"), r.vars.controlNav && v.controlNav.active(), h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide"), r.atEnd = t === 0 || t === r.last, r.vars.directionNav && v.directionNav.update(), t === r.last && (r.vars.end(r), r.vars.animationLoop || r.pause());
					if (!p) {
						var m = l ? r.slides.filter(":first").height() : r.computedW,
							g, y, b;
						h ? (g = r.vars.itemMargin, b = (r.itemW + g) * r.move * r.animatingTo, y = b > r.limit && r.visible !== 1 ? r.limit : b) : r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m, r.setProps(y, "", r.vars.animationSpeed);
						if (r.transitions) {
							if (!r.vars.animationLoop || !r.atEnd) r.animating = !1, r.currentSlide = r.animatingTo;
							r.container.unbind("webkitTransitionEnd transitionend"), r.container.bind("webkitTransitionEnd transitionend", function() {
								r.wrapup(m)
							})
						} else r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function() {
							r.wrapup(m)
						})
					} else o ? (r.slides.eq(r.currentSlide).css({
						opacity: 0,
						zIndex: 1
					}), r.slides.eq(t).css({
						opacity: 1,
						zIndex: 2
					}), r.wrapup(m)) : (r.slides.eq(r.currentSlide).css({
						zIndex: 1
					}).animate({
						opacity: 0
					}, r.vars.animationSpeed, r.vars.easing), r.slides.eq(t).css({
						zIndex: 2
					}).animate({
						opacity: 1
					}, r.vars.animationSpeed, r.vars.easing, r.wrapup));
					r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
				}
			}, r.wrapup = function(e) {
				!p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart")), r.animating = !1, r.currentSlide = r.animatingTo, r.vars.after(r)
			}, r.animateSlides = function() {
				!r.animating && m && r.flexAnimate(r.getTarget("next"))
			}, r.pause = function() {
				clearInterval(r.animatedSlides), r.animatedSlides = null, r.playing = !1, r.vars.pausePlay && v.pausePlay.update("play"), r.syncExists && v.sync("pause")
			}, r.play = function() {
				r.playing && clearInterval(r.animatedSlides), r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed), r.started = r.playing = !0, r.vars.pausePlay && v.pausePlay.update("pause"), r.syncExists && v.sync("play")
			}, r.stop = function() {
				r.pause(), r.stopped = !0
			}, r.canAdvance = function(e, t) {
				var n = d ? r.pagingCount - 1 : r.last;
				return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
			}, r.getTarget = function(e) {
				return r.direction = e, e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
			}, r.setProps = function(e, t, n) {
				var i = function() {
						var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
							i = function() {
								if (h) return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
								switch (t) {
								case "setTotal":
									return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
								case "setTouch":
									return c ? e : e;
								case "jumpEnd":
									return c ? e : r.count * e;
								case "jumpStart":
									return c ? r.count * e : e;
								default:
									return e
								}
							}();
						return i * -1 + "px"
					}();
				r.transitions && (i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = n !== undefined ? n / 1e3 + "s" : "0s", r.container.css("-" + r.pfx + "-transition-duration", n), r.container.css("transition-duration", n)), r.args[r.prop] = i, (r.transitions || n === undefined) && r.container.css(r.args), r.container.css("transform", i)
			}, r.setup = function(t) {
				if (!p) {
					var n, s;
					t === "init" && (r.viewport = e('<div class="' + i + 'viewport"></div>').css({
						overflow: "hidden",
						position: "relative"
					}).appendTo(r).append(r.container), r.cloneCount = 0, r.cloneOffset = 0, c && (s = e.makeArray(r.slides).reverse(), r.slides = e(s), r.container.empty().append(r.slides))), r.vars.animationLoop && !h && (r.cloneCount = 2, r.cloneOffset = 1, t !== "init" && r.container.find(".clone").remove(), r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true")), v.uniqueID(r.slides.first().clone().addClass("clone")).appendTo(r.container), v.uniqueID(r.slides.last().clone().addClass("clone")).prependTo(r.container)), r.newSlides = e(r.vars.selector, r), n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset, l && !h ? (r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%"), setTimeout(function() {
						r.newSlides.css({
							display: "block"
						}), r.doMath(), r.viewport.height(r.h), r.setProps(n * r.h, "init")
					}, t === "init" ? 100 : 0)) : (r.container.width((r.count + r.cloneCount) * 200 + "%"), r.setProps(n * r.computedW, "init"), setTimeout(function() {
						r.doMath(), r.newSlides.css({
							width: r.computedW,
							"float": "left",
							display: "block"
						}), r.vars.smoothHeight && v.smoothHeight()
					}, t === "init" ? 100 : 0))
				} else r.slides.css({
					width: "100%",
					"float": "left",
					marginRight: "-100%",
					position: "relative"
				}), t === "init" && (o ? r.slides.css({
					opacity: 0,
					display: "block",
					webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
					zIndex: 1
				}).eq(r.currentSlide).css({
					opacity: 1,
					zIndex: 2
				}) : r.slides.css({
					opacity: 0,
					display: "block",
					zIndex: 1
				}).eq(r.currentSlide).css({
					zIndex: 2
				}).animate({
					opacity: 1
				}, r.vars.animationSpeed, r.vars.easing)), r.vars.smoothHeight && v.smoothHeight();
				h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide"), r.vars.init(r)
			}, r.doMath = function() {
				var e = r.slides.first(),
					t = r.vars.itemMargin,
					n = r.vars.minItems,
					i = r.vars.maxItems;
				r.w = r.viewport === undefined ? r.width() : r.viewport.width(), r.h = e.height(), r.boxPadding = e.outerWidth() - e.width(), h ? (r.itemT = r.vars.itemWidth + t, r.minW = n ? n * r.itemT : r.w, r.maxW = i ? i * r.itemT - t : r.w, r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth, r.visible = Math.floor(r.w / r.itemW), r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible, r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1), r.last = r.pagingCount - 1, r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t) : (r.itemW = r.w, r.pagingCount = r.count, r.last = r.count - 1), r.computedW = r.itemW - r.boxPadding
			}, r.update = function(e, t) {
				r.doMath(), h || (e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1), r.animatingTo = r.currentSlide);
				if (r.vars.controlNav && !r.manualControls) if (t === "add" && !h || r.pagingCount > r.controlNav.length) v.controlNav.update("add");
				else if (t === "remove" && !h || r.pagingCount < r.controlNav.length) h && r.currentSlide > r.last && (r.currentSlide -= 1, r.animatingTo -= 1), v.controlNav.update("remove", r.last);
				r.vars.directionNav && v.directionNav.update()
			}, r.addSlide = function(t, n) {
				var i = e(t);
				r.count += 1, r.last = r.count - 1, l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i), r.update(n, "add"), r.slides = e(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.added(r)
			}, r.removeSlide = function(t) {
				var n = isNaN(t) ? r.slides.index(e(t)) : t;
				r.count -= 1, r.last = r.count - 1, isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove(), r.doMath(), r.update(n, "remove"), r.slides = e(r.vars.selector + ":not(.clone)", r), r.setup(), r.vars.removed(r)
			}, v.init()
		}, e(window).blur(function(e) {
			focused = !1
		}).focus(function(e) {
			focused = !0
		}), e.flexslider.defaults = {
			namespace: "flex-",
			selector: ".slides > li",
			animation: "fade",
			easing: "swing",
			direction: "horizontal",
			reverse: !1,
			animationLoop: !0,
			smoothHeight: !1,
			startAt: 0,
			slideshow: !0,
			slideshowSpeed: 7e3,
			animationSpeed: 600,
			initDelay: 0,
			randomize: !1,
			thumbCaptions: !1,
			pauseOnAction: !0,
			pauseOnHover: !1,
			pauseInvisible: !0,
			useCSS: !0,
			touch: !0,
			video: !1,
			controlNav: !0,
			directionNav: !0,
			prevText: "Previous",
			nextText: "Next",
			keyboard: !0,
			multipleKeyboard: !1,
			mousewheel: !1,
			pausePlay: !1,
			pauseText: "Pause",
			playText: "Play",
			controlsContainer: "",
			manualControls: "",
			sync: "",
			asNavFor: "",
			itemWidth: 0,
			itemMargin: 0,
			minItems: 1,
			maxItems: 0,
			move: 0,
			allowOneSlide: !0,
			start: function() {},
			before: function() {},
			after: function() {},
			end: function() {},
			added: function() {},
			removed: function() {},
			init: function() {}
		}, e.fn.flexslider = function(t) {
			t === undefined && (t = {});
			if (typeof t == "object") return this.each(function() {
				var n = e(this),
					r = t.selector ? t.selector : ".slides > li",
					i = n.find(r);
				i.length === 1 && t.allowOneSlide === !0 || i.length === 0 ? (i.fadeIn(400), t.start && t.start(n)) : n.data("flexslider") === undefined && new e.flexslider(this, t)
			});
			var n = e(this).data("flexslider");
			switch (t) {
			case "play":
				n.play();
				break;
			case "pause":
				n.pause();
				break;
			case "stop":
				n.stop();
				break;
			case "next":
				n.flexAnimate(n.getTarget("next"), !0);
				break;
			case "prev":
			case "previous":
				n.flexAnimate(n.getTarget("prev"), !0);
				break;
			default:
				typeof t == "number" && n.flexAnimate(t, !0)
			}
		}
	}(e)
}), define("utils/emitter", ["jquery", "underscore"], function(e, t) {
	function r(e, n) {
		this.prefix = e, t.defaults(this, n)
	}
	var n = e(document);
	return r.prototype.trigger = function(e, t) {
		n.trigger(this.prefix + "." + e, t)
	}, r.prototype.bind = function(e, t) {
		n.bind(this.prefix + "." + e, t.holder = function(e, n) {
			t(n)
		})
	}, r.prototype.unbind = function(e, t) {
		n.unbind(this.prefix + "." + e, t.holder)
	}, r
}), define("widgets/tooltip", ["jquery"], function(e) {
	var t, n, r;
	return function(i) {
		t || (t = e('<div class="da-tooltip"><div class="da-tooltip-bg"></div><div class="da-tooltip-text"></div></div>').hide().appendTo(document.body)), r && r.resolve(), r = e.Deferred(), n && clearTimeout(n), t.fadeIn().find(".da-tooltip-text").html(i);
		var s = t.find(".da-tooltip-text").outerWidth();
		return t.css({
			width: s + "px",
			"margin-left": -s / 2 + "px"
		}), n = window.setTimeout(function() {
			t.fadeOut(function() {
				r.resolve()
			})
		}, 2500), r.promise()
	}
}), define("models/cart", ["jquery", "underscore", "utils/emitter", "widgets/tooltip", "utils/dsp"], function(e, t, n, r, i) {
	return new n("cart", {
		addCart: function(n, r) {
			return e.get("/api/cart/add", {
				gid: n,
				quantity: r
			}).then(t.bind(this.notify, this)).then(function(e) {
				return i.trackCart(n), e
			})
		},
		updateCount: function(r, i) {
			return e.get("/api/cart/edit", {
				gid: r,
				act: "updnum",
				quantity: i,
				r: Math.random()
			}).then(t.bind(this.notify, this))
		},
		delCart: function(r) {
			return e.get("/api/cart/deleteGoods", {
				goods_id: r,
				r: Math.random()
			}).then(t.bind(this.notify, this))
		},
		selectCart: function(r, i) {
			return e.get("/api/cart/edit", {
				gid: r,
				act: i,
				r: Math.random()
			}).then(t.bind(this.notify, this))
		},
		selectAll: function(r) {
			return e.get("/api/cart/edit", {
				act: r,
				r: Math.random()
			}).then(t.bind(this.notify, this))
		},
		delSelect: function(r) {
			return e.get("/api/cart/deleteGoods", {
				r: Math.random(),
				goods_id: r
			}).then(t.bind(this.notify, this))
		},
		notify: function(e) {
			return e.status === !1 ? (r(e.msg), e) : (this.trigger("update", e), e)
		},
		setChanges: function(n) {
			return e.post("/api/cart/setChangeGoods", {
				change_goods_ids: n.join(",")
			}).then(t.bind(this.notify, this))
		},
		delChanges: function(n) {
			return e.post("/api/cart/deleteChangeGoods", {
				gid: n
			}).then(t.bind(this.notify, this))
		}
	})
}), define("widgets/share", ["jquery"], function($) {
	return function() {
		var share = [],
			common = {};
		$("[data-share-btn]").each(function(e, t) {
			var n = $(t);
			share.push({
				tag: n.data("tag"),
				bdSize: 16
			}), n.data("share-img") && (common.bdPic = n.data("share-img")), n.data("share-text") && (common.bdText = n.data("share-text")), n.data("share-description") && (common.bdDesc = n.data("share-description"), common.bdComment = n.data("share-description")), n.data("share-url") && (common.bdUrl = n.data("share-url"))
		}), window._bd_share_config = {
			common: common,
			share: share
		};
		with(document)(0)[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~ (-(new Date) / 36e5)]
	}
}), define("widgets/prompt", ["jquery"], function(e) {
	function r(r, i, s) {
		var o = t.find(".da-dialog-inner"),
			u = e.Deferred();
		return t.find("[data-message]").html(r), t.find("[data-btn-cancel]").html(i), t.find("[data-btn-confirm]").html(s), t.show(), o.css({
			"margin-left": -o[0].offsetWidth / 2 + "px",
			"margin-top": -o[0].offsetHeight / 2 + "px"
		}), n && n.resolve(!1), n = u, u.promise()
	}
	function i() {
		n.resolve(!0), t.hide()
	}
	function s() {
		n.resolve(!1), t.hide()
	}
	var t = e("[data-widget-prompt]"),
		n = null;
	return t.find("[data-widget-close]").click(s), t.find("[data-btn-cancel]").click(s), t.find("[data-btn-confirm]").click(i), function(t, n, i) {
		return r(t, n, i)
	}
}), define("widgets/cart", ["jquery", "underscore", "models/cart", "widgets/tooltip", "widgets/share", "widgets/header", "widgets/prompt"], function(e, t, n, r, i, s, o) {
	function u(t, r, i) {
		function u() {
			s && s.abort(), e.get("/api/cart/views", {
				is_mini: r ? 1 : 0
			}).then(function(n) {
				var r = e(n),
					o = t.find(".cart-table");
				s = null, o.size() > 0 ? o.replaceWith(r) : t.append(r), a(), i(r.data("total-price"), r.data("total-reduce"), r.data("total-count"), r.data("goods-amount"), r.data("goods-count"))
			})
		}
		function a() {
			t.find("[data-sel-group]").each(function(t, n) {
				var r = e(n),
					i = r.closest(".cart-list").find("[data-goods]"),
					s = !0;
				i.each(function(t, n) {
					var r = e(n).find("[data-cart-select]");
					!r.is(":checked") && !r.is(":disabled") && (s = !1)
				}), s && r.prop("checked", !0)
			});
			var n = !0;
			t.find("[data-cart-select]").each(function(t, r) {
				var i = e(r);
				!i.is(":checked") && !i.is(":disabled") && (n = !1)
			}), t.find("[data-sel-all]").prop("checked", n)
		}
		function f() {
			t.find("[data-remainder-time]").each(function(t, n) {
				var r = e(n),
					i = parseInt(r.data("remainder-time")),
					s;
				if (i <= 0) return;
				s = parseInt(r.data("remainder-timeout") || i), r.find(".day").html(Math.floor(s / 86400)), r.find(".hour").html(Math.floor(s % 86400 / 3600)), r.find(".minute").html(Math.floor(s % 3600 / 60)), r.find(".second").html(s % 60), r.data("remainder-timeout", s - 1)
			})
		}
		var s = null;
		return n.bind("update", u), t.delegate("[data-cart-add]", "click", function(t) {
			var r = e(t.currentTarget),
				i = r.closest("[data-goods]");
			n.updateCount(i.data("goods"), r.data("cart-quantity"))
		}), t.delegate("[data-cart-sub]", "click", function(t) {
			var r = e(t.currentTarget),
				i = r.closest("[data-goods]");
			if (r.data("cart-quantity") == 0) return;
			n.updateCount(i.data("goods"), r.data("cart-quantity"))
		}), t.delegate("[data-cart-del]", "click", function(t) {
			var i = e(t.currentTarget),
				s = i.closest("[data-goods]");
			if (r) {
				n.delCart(s.data("goods"));
				return
			}
			o("纭畾鍒犻櫎鍟嗗搧锛�", "淇濈暀鍟嗗搧", "纭畾鍒犻櫎").done(function(e) {
				if (!e) return;
				n.delCart(s.data("goods"))
			})
		}), t.delegate("[data-cart-select]", "click", function(t) {
			var r = e(t.currentTarget),
				i = r.closest("[data-goods]");
			r.is(":checked") ? n.selectCart(i.data("goods"), "select") : n.selectCart(i.data("goods"), "unselect")
		}), t.delegate("[data-add-cart]", "click", function(t) {
			var r = e(t.currentTarget),
				i = r.closest("[data-goods]");
			n.addCart(i.data("goods"))
		}), t.delegate("[data-sel-all]", "click", function(t) {
			var r = e(t.currentTarget);
			r.is(":checked") ? n.selectAll("selectall") : n.selectAll("unselectall")
		}), t.delegate("[data-del-select]", "click", function(r) {
			if (t.find("[data-cart-select]:checked").size() == 0) return;
			var i = "";
			t.find("[data-cart-select]:checked").each(function(r) {
				r == t.find("[data-cart-select]:checked").size() - 1 ? (i += e(this).parents("ul").attr("data-goods"), n.delSelect(i)) : i += e(this).parents("ul").attr("data-goods") + ","
			})
		}), t.delegate("[data-sel-group]", "click", function(t) {
			var n = e(t.currentTarget),
				r = n.closest(".cart-list").find("[data-goods]"),
				i = n.is(":checked"),
				s = [];
			r.each(function(t, n) {
				s.push(e(n).data("goods"))
			}), e.get("/api/cart/edit", {
				gid: s.join(","),
				act: i ? "selectgroup" : "unselectgroup",
				r: Math.random()
			}).done(u)
		}), t.delegate("[data-count-input]", "change", function(t) {
			var r = e(t.target),
				i = r.val(),
				s = r.closest("[data-goods]").data("goods");
			n.updateCount(s, i).then(function(e) {
				e.status === !1 && r.val(r[0].defaultValue)
			})
		}), t.find(".cart-table").size() > 0 ? a() : u(), f(), setInterval(f, 1e3), {
			refresh: u
		}
	}
	return u
}), define("utils/fly", ["jquery"], function(e) {
	(function() {
		var e = 0,
			t = ["webkit", "moz"];
		for (var n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
		window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
			var r = (new Date).getTime(),
				i = Math.max(0, 16 - (r - e)),
				s = window.setTimeout(function() {
					t(r + i)
				}, i);
			return e = r + i, s
		}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
			clearTimeout(e)
		})
	})(), function(e) {
		e.fly = function(t, n) {
			var r = {
				version: "1.0.0",
				autoPlay: !0,
				vertex_Rtop: 20,
				speed: 1.2,
				start: {},
				end: {},
				onEnd: e.noop
			},
				i = this,
				s = e(t);
			i.init = function(e) {
				this.setOptions(e), !! this.settings.autoPlay && this.play()
			}, i.setOptions = function(t) {
				this.settings = e.extend(!0, {}, r, t);
				var n = this.settings,
					i = n.start,
					o = n.end;
				s.css({
					marginTop: "0px",
					marginLeft: "0px",
					position: "fixed"
				}).appendTo("body"), null != o.width && null != o.height && e.extend(!0, i, {
					width: s.width(),
					height: s.height()
				});
				var u = Math.min(i.top, o.top) - Math.abs(i.left - o.left) / 3;
				u < n.vertex_Rtop && (u = Math.min(n.vertex_Rtop, Math.min(i.top, o.top)));
				var l = Math.sqrt(Math.pow(i.top - o.top, 2) + Math.pow(i.left - o.left, 2)),
					c = Math.ceil(Math.min(Math.max(Math.log(l) / .05 - 75, 30), 100) / n.speed),
					h = i.top == u ? 0 : -Math.sqrt((o.top - u) / (i.top - u)),
					p = (h * i.left - o.left) / (h - 1),
					v = o.left == p ? 0 : (o.top - u) / Math.pow(o.left - p, 2);
				e.extend(!0, n, {
					count: -1,
					steps: c,
					vertex_left: p,
					vertex_top: u,
					curvature: v
				})
			}, i.play = function() {
				this.move()
			}, i.move = function() {
				var t = this.settings,
					n = t.start,
					r = t.count,
					i = t.steps,
					o = t.end,
					u = n.left + (o.left - n.left) * r / i,
					l = 0 == t.curvature ? n.top + (o.top - n.top) * r / i : t.curvature * Math.pow(u - t.vertex_left, 2) + t.vertex_top;
				if (null != o.width && null != o.height) {
					var c = i / 2,
						h = o.width - (o.width - n.width) * Math.cos(c > r ? 0 : (r - c) / (i - c) * Math.PI / 2),
						p = o.height - (o.height - n.height) * Math.cos(c > r ? 0 : (r - c) / (i - c) * Math.PI / 2);
					s.css({
						width: h + "px",
						height: p + "px",
						"font-size": Math.min(h, p) + "px"
					})
				}
				s.css({
					left: u + "px",
					top: l + "px"
				}), t.count++;
				var d = window.requestAnimationFrame(e.proxy(this.move, this));
				r == i && (window.cancelAnimationFrame(d), t.onEnd.apply(this))
			}, i.destory = function() {
				s.remove()
			}, i.init(n)
		}, e.fn.fly = function(t) {
			return this.each(function() {
				void 0 == e(this).data("fly") && e(this).data("fly", new e.fly(this, t))
			})
		}
	}(e)
}), define("widgets/stock-notify", ["jquery", "models/account", "widgets/login-dialog", "widgets/tooltip"], function(e, t, n, r) {
	return function(i) {
		(function s() {
			return t.isLogin() ? e.post("/api/notify/set", {
				goods_id: i
			}).done(function(e) {
				return e.status === !1 ? r("娣诲姞澶辫触") : r("璁剧疆鎻愰啋鎴愬姛锛岃揣鍒版椂浼氱涓€鏃堕棿閫氱煡鎮�")
			}) : n.login(function() {
				s().then(function() {
					location.reload()
				})
			})
		})()
	}
}), define("widgets/sidebar", ["jquery", "widgets/cart", "models/cart", "utils/fly", "widgets/login-dialog", "widgets/stock-notify"], function(e, t, n, r, i, s) {
	function c() {
		o.width() < 320 && o.animate({
			width: "320px"
		}), e(".sidebar-btn").removeClass("active"), e("[data-sidebar-hide]").css("display", "block"), e(".goTop").css("display", "none"), e("body").css("overflow", "hidden"), e(".sidebar-show").css("display", "none"), e(".sidebar-btn").attr("data-show-num", 0)
	}
	function h() {
		c(), e(".sb-cart").addClass("active").attr("data-show-num", 1), e(".cart-mini").css("display", "block"), g()
	}
	function p() {
		c(), e(".sb-promo").addClass("active").attr("data-show-num", 1), e(".sidebar-coupon").css("display", "block"), e.get("/api/login/isLogin").done(function(t) {
			t.status == 1 ? b() : (e(".sb-coupon-contain").css("display", "none"), e("[data-coupon-login]").css("display", "block"), m(".sb-unlogin", 50))
		})
	}
	function d() {
		c(), e(".sb-collect").addClass("active").attr("data-show-num", 1), e(".sidebar-collect").css("display", "block"), e.get("/api/login/isLogin").done(function(t) {
			t.status == 1 ? S() : (e(".sb-collect-contain").css("display", "none"), e("[data-collect-login]").css("display", "block"), m(".sb-unlogin", 50))
		})
	}
	function v() {
		if (o.width() < 320) return;
		o.animate({
			width: "40px"
		}), e(".goTop").css("display", "block"), e("[data-sidebar-hide]").css("display", "none"), e(".sidebar-btn").attr("data-show-num", 0).removeClass("active"), e("body").css("overflow", "auto")
	}
	function g() {
		f.refresh(), m("[data-cart-mini-ct]", 148)
	}
	function y(t, n, r) {
		var i = e(t),
			s = e(".sidebar-data").find(n.eleAdd);
		s.size() > 0 ? (s.replaceWith(i), m(n.eleResize, r)) : (e(n.eleBox).append(i), m(n.eleResize, r))
	}
	function b() {
		e(".sb-coupon-contain").css("display", "block"), e("[data-coupon-login]").css("display", "none"), e.get("/api/coupon/active?from_index=1").done(function(e) {
			y(e, {
				eleAdd: ".sb-coupon-main",
				eleBox: ".sb-coupon-contain",
				eleResize: ".sb-coupon-list"
			}, 220)
		})
	}
	function w() {
		e.get("/api/coupon/old?from_index=1").done(function(e) {
			y(e, {
				eleAdd: ".sb-coupon-main",
				eleBox: ".sb-coupon-contain",
				eleResize: ".sb-coupon-list"
			}, 220)
		})
	}
	function E() {
		e.get("/api/coupon/used?from_index=1").done(function(e) {
			y(e, {
				eleAdd: ".sb-coupon-main",
				eleBox: ".sb-coupon-contain",
				eleResize: ".sb-coupon-list"
			}, 220)
		})
	}
	function S() {
		e(".sb-collect-contain").css("display", "block"), e("[data-collect-login]").css("display", "none"), e.get("/api/love/getmylist").done(function(e) {
			y(e, {
				eleAdd: ".sb-collect-main",
				eleBox: ".sb-collect-content",
				eleResize: ".sb-collect-content"
			}, 50)
		})
	}
	function x(t, r, i, s, o) {
		n.addCart(t, r).then(function(t) {
			if (!t.status) return !1;
			var n = i,
				r = s,
				u = e(window).scrollTop(),
				a = e("[data-cart-toggle]"),
				f = a.offset().left,
				l = a.offset().top - u,
				c = e("<img src=" + o + ' style="border-radius:25px;width: 50px;height:50px;width: 50px;height:50px;display: block;z-index:999;" />');
			c.fly({
				start: {
					left: n,
					top: r
				},
				end: {
					left: f,
					top: l,
					width: 0,
					height: 0
				}
			})
		})
	}
	function T() {
		return "ActiveXObject" in window
	}
	var o = e("[data-sidebar]"),
		u = o.find("[data-cart-mini]"),
		a = o.find("[data-cart-mini-ct]"),
		f, l = null;
	o.delegate(".sb-more", "click", function(t) {
		$el = e(t.currentTarget), $el.closest("[data-toggle-list]").height() < 300 ? (e("[data-toggle-hide]").hide(), e(".sb-more").text("鏌ョ湅鏇村"), $el.closest("[data-toggle-list]").find("li").show(), $el.text("鏀惰捣")) : ($el.closest("div").find("[data-toggle-hide]").hide(), $el.text("鏌ョ湅鏇村"))
	}), o.click(function(e) {
		e.stopPropagation()
	}), e("body").click(function() {
		v()
	}), o.delegate(".sb-cart", "click", function(t) {
		t.stopPropagation(), e(this).attr("data-show-num") == 0 ? h() : v()
	}), o.delegate(".sb-promo", "click", function(t) {
		t.stopPropagation(), e(this).attr("data-show-num") == 0 ? p() : v()
	}), o.delegate(".sb-collect", "click", function(t) {
		t.stopPropagation(), e(this).attr("data-show-num") == 0 ? d() : v()
	}), o.delegate("[data-tab-active]", "click", function(e) {
		e.stopPropagation(), b()
	}), o.delegate("[data-tab-old]", "click", function(e) {
		e.stopPropagation(), w()
	}), o.delegate("[data-tab-used]", "click", function(e) {
		e.stopPropagation(), E()
	}), o.delegate(".submit-btn", "click", function(e) {
		i.login()
	}), o.find("[data-sidebar-hide]").click(function(e) {
		e.stopPropagation(), v()
	}), f = t(a, !0, function(t, n, r, i, s) {
		u.find("[data-cart-count]").html(r), u.find("[data-cart-amount]").html(i), o.find("[data-cart-count]").html(s), e("[da-header-cart-count]").html(s), u.find(".cart-bar")[s == 0 ? "hide" : "show"]()
	});
	var m = function(t, n) {
			var r = e(window).height() - n + "px";
			e(t).height(r)
		};
	return e(window).resize(function() {
		m("[data-cart-mini-ct]", 148), m(".sb-coupon-list", 220), m(".sb-collect-content", 50), m(".sb-unlogin", 50)
	}), o.delegate("[data-add-cart]", "click", function(t) {
		t.preventDefault();
		var n = e(window).scrollTop();
		if (T()) var r = e(this).offset().left + (e(this).width() - 50) / 2,
			i = e(this).offset().top - n - 90;
		else var r = e(this).offset().left + (e(this).width() - 50) / 2,
			i = e(this).offset().top - n - 50;
		var s = e(t.currentTarget).data("goods-img"),
			o = e(t.currentTarget).data("add-cart");
		x(o, 1, r, i, s)
	}), o.delegate("[data-stock-notify]", "click", function(t) {
		var n = e(t.currentTarget);
		t.preventDefault(), s(n.data("stock-notify"))
	}), {
		addCart: x,
		hideSidebar: v
	}
}), require(["widgets/header", "jquery", "utils/flexslider", "widgets/sidebar", "widgets/stock-notify", "widgets/login-dialog", "models/account", "widgets/tooltip", "utils/cookie"], function(e, t, n, r, i, s, o, u, a) {
	t(function() {
		function c() {
			return "ActiveXObject" in window
		}
		function h(e, t, n) {
			if (e.length % t == 0) var r = e.length;
			else var r = e.length + (t - e.length % t);
			while (n < 0) n += r;
			while (n > e.length - 1) console.log(n), n -= r;
			e.hide(), console.log(n);
			for (var i = n; i < n + t; i++) e.eq(i).show()
		}
		var e = t(".da-index"),
			n = e.find(".slides li"),
			a = t(".index-tommorrow-tip").data("flash-interval"),
			f = 72e3;
		a < f ? e.find(".flash-text").text("浠婃櫄 20:00") : e.find(".flash-text").text("鏄庢櫄 20:00"), t(".flexslider").flexslider({
			slideshowSpeed: 4e3,
			animationSpeed: 400
		}), n.each(function(e) {
			n.eq(e).css("background", n.eq(e).data("background"))
		});
		var l = t("[da-category]");
		l.mouseout(function() {
			t(this).find(".opened").length != 0 && t(this).find(".dd").css("display", "block")
		}), t("[data-toggle-tab]").click(function(e) {
			var n = t(e.target),
				r = n.data("toggle-tab");
			n.addClass("current").siblings("[data-toggle-tab]").removeClass("current"), t("[data-tab-content=" + r + "]").show().siblings(["data-tab-content"]).hide()
		}), e.delegate("[data-add-cart]", "click", function(e) {
			e.preventDefault();
			var n = t(window).scrollTop();
			if (c()) var i = t(this).offset().left + (t(this).width() - 50) / 2,
				s = t(this).offset().top - n - 90;
			else var i = t(this).offset().left + (t(this).width() - 50) / 2,
				s = t(this).offset().top - n - 50;
			var o = t(e.currentTarget).data("goods-img"),
				u = t(e.currentTarget).data("add-cart");
			r.addCart(u, 1, i, s, o)
		}), function() {
			var t = 0,
				n = e.find(".index-country-box li");
			e.find(".arrow-pre").click(function(e) {
				t -= 5, h(n, 5, t)
			}), e.find(".arrow-next").click(function(e) {
				t += 5, h(n, 5, t)
			})
		}(), function() {
			var t = e.find(".index-new-box ul"),
				n = 0;
			e.delegate("[data-new-change]", "click", function() {
				n += 2, h(t, 2, n)
			})
		}(), t("[data-sale-list]").find("li").each(function() {
			function r(t, n) {
				if (n > 0) {
					var r = Math.floor(n / 3600),
						s = Math.floor(n / 60) % 60,
						o = Math.floor(n) % 60;
					r > 9 ? t.find("[data-hour]").html(r) : t.find("[data-hour]").html("0" + r), s > 9 ? t.find("[data-min]").html(s) : t.find("[data-min]").html("0" + s), o > 9 ? t.find("[data-sec]").html(o) : t.find("[data-sec]").html("0" + o), e--
				} else clearInterval(i), location.reload()
			}
			var e = t(this).data("endtime"),
				n = t(this).find(".timeout");
			if (e <= 0) return;
			var i = setInterval(function() {
				r(n, e)
			}, 1e3)
		}), e.find("[data-stock-notify]").click(function(e) {
			var n = t(e.currentTarget);
			e.preventDefault(), i(n.data("stock-notify"))
		});
		var p = e.find(".index-buy-list dl");
		p.each(function(e) {
			p.eq(e).delegate("dd", "mouseenter", function(n) {
				$el = t(n.currentTarget), p.eq(e).find("dd").removeClass("first").addClass("ex-first"), $el.removeClass("ex-first").addClass("first")
			}), p.eq(e).delegate("dd", "mouseleave", function(t) {
				p.eq(e).find("dd").removeClass("first").addClass("ex-first"), p.eq(e).find("dd:first").removeClass("ex-first").addClass("first")
			})
		}), function() {
			e.find("[data-toggle-fav]").click(function(e) {
				var n = t(e.currentTarget),
					r = n.data("toggle-fav"),
					i = n.is(".liked"),
					a = n.siblings("button").data("add-cart");
				(function f() {
					return o.isLogin() ? t.post(r, {
						type: i ? "" : "love",
						goods_id: a
					}).then(function(e) {
						return e.status === !1 ? u(e.msg) : (n[i ? "removeClass" : "addClass"]("liked"), u(e.data.content))
					}) : s.login(function() {
						f().then(function() {
							location.reload()
						})
					})
				})()
			})
		}(), t("[data-flash-expand]").click(function(e) {
			t(e.currentTarget).hide(), t("[data-sale-list] li").show()
		}), function() {
			function n(t) {
				t--, e.find("li").first().remove().appendTo(e), t > 0 && n(t)
			}
			function r(t) {
				t--, e.find("li").last().remove().prependTo(e), t > 0 && r(t)
			}
			var e = t("[data-flash-next]");
			t("[data-flash-up]").click(function(t) {
				t.stopPropagation(), r(5), e.find("li").hide(), e.find("li:lt(5)").show()
			}), t("[data-flash-down]").click(function(t) {
				t.stopPropagation(), n(5), e.find("li").hide(), e.find("li:lt(5)").show()
			})
		}(), function() {
			var e = t(".da-ad img").height() + "px";
			t(".da-ad").css("background", t(".da-smallad").data("ad-background"));
			var n = function() {
					t(".da-ad-once").css({
						display: "block",
						background: t(".da-bigad").data("ad-background"),
						height: e,
						overflow: "hidden"
					}), setTimeout(function() {
						t(".da-ad-once").animate({
							height: "782px"
						}, 500), t(".da-ad-once").css({
							background: t(".da-bigad").data("ad-background")
						}), setTimeout(function() {
							t(".da-ad-once").animate({
								height: e
							}, 2e3, function() {
								t(".da-ad").css({
									visibility: "visible",
									background: t(".da-smallad").data("ad-background")
								}), t(".da-ad-once").css({
									height: e,
									overflow: "hidden"
								}).fadeOut(), t(".da-smallad").fadeIn()
							})
						}, 3e3)
					}, 1e3)
				};
			t("[data-close-ad]").click(function(e) {
				return $el = t(e.currentTarget), $el.closest("div").css("display", "none"), !1
			}), t(".da-ad").css("visibility", "visible")
		}();
		var d = e.data("server-time"),
			v = new Date;
		v.setFullYear(2015, 8, 19), v.setHours(0), v.setMinutes(0), v.setSeconds(0);
		var m = parseInt(v.getTime() / 1e3 - d);
		setTime = function() {
			if (m > 0) {
				m -= 1;
				var e = Math.floor(m / 86400),
					n = Math.floor(m / 3600) % 24,
					r = Math.floor(m / 60) % 60,
					i = Math.floor(m) % 60;
				e > 9 ? t("#overDay").html(e) : t("#overDay").html("0" + e), n > 9 ? t("#overHour").html(n) : t("#overHour").html("0" + n), r > 9 ? t("#overMin").html(r) : t("#overMin").html("0" + r), i > 9 ? t("#overSecond").html(i) : t("#overSecond").html("0" + i)
			} else clearInterval(g), t("#overDay").html("00"), t("#overHour").html("00"), t("#overMin").html("00"), t("#overSecond").html("00")
		};
		var g;
		g = setInterval(setTime, 1e3);
		if (e.data("server-time")) {
			var y = e.data("server-time") * 1e3,
				b = 0;

			function w() {
				var e = new Date(2016, 10, 25, 23, 59, 59) - y - b;
				if (e <= 0) return;
				var n = parseInt(e / 1e3 / 60 / 60 / 24, 10),
					r = parseInt(e / 1e3 / 60 / 60 % 24, 10),
					i = parseInt(e / 1e3 / 60 % 60, 10),
					s = parseInt(e / 1e3 % 60, 10);
				n = E(n), r = E(r), i = E(i), s = E(s), t("[data-countdown-day]").text(n), t("[data-countdown-hour]").text(r), t("[data-countdown-minutes]").text(i), t("[data-countdown-second]").text(s), b += 1e3, setTimeout(w, 1e3)
			}
			w();

			function E(e) {
				return e < 10 && (e = "0" + e), e
			}
		}
	})
}), define("apps/index", function() {});