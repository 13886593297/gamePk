var BTN_TARGET = null;
(function($) {
	// 备份jquery的ajax方法
	var _ajax = $.ajax;

	// 重写jquery的ajax方法
	$.ajax = function(opt) {
		if(BTN_TARGET && BTN_TARGET != null)
    		BTN_TARGET.disabled = true;
		
		// 备份opt中error和success方法
		var fn = {
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			},
			success : function(data, textStatus) {
			},
			complete : function(data) {
			},
			beforeSend: function(xhr, o) {}
		}
		if (opt.error) {
			fn.error = opt.error;
		}
		if (opt.success) {
			fn.success = opt.success;
		}
		if (opt.complete) {
			fn.complete = opt.complete;
		}
		if (opt.beforeSend) {
			fn.beforeSend = opt.beforeSend;
		}
		// 扩展增强处理
		var _opt = $.extend(opt, {
//			beforeSend: function(xhr, o) {
//				xhr.setRequestHeader('Access-Control-Request-Headers', 'accept, cache-control, x-requested-with, content-type, Access-Control-Allow-Origin');
//				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//				xhr.setRequestHeader("Access-Control-Request-Method", opt.method);
//				xhr.setRequestHeader("If-Modified-Since","0");   
//				xhr.setRequestHeader("Cache-Control","no-cache");
//				fn.beforeSend(xhr, o);
//		    },
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(BTN_TARGET && BTN_TARGET != null)
					BTN_TARGET.disabled = false;
				// 错误方法增强处理
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success : function(data, textStatus, xhr) {
				if(BTN_TARGET && BTN_TARGET != null)
					BTN_TARGET.disabled = false;
				var REDIRECT_URL = xhr.getResponseHeader('REDIRECT_URL');
				if (REDIRECT_URL && REDIRECT_URL != null) {
					var win = window.parent;
					while(win != win.parent){
						win = win.parent;
					}
					win.location = REDIRECT_URL;
					return;
				}

				// 成功回调方法增强处理
				var state = data.state;
				if (state != undefined && !state) {
					alert(data.msg);
					return;
				}
				fn.success(data, textStatus);
			},
			complete : function(data) {
				if(BTN_TARGET && BTN_TARGET != null)
					BTN_TARGET.disabled = false;

				fn.complete(data);
			}
		});
		return _ajax(_opt);
	};
})(jQuery);

/**
 * 设置重定向到登录页面
 */
//$(document).bind('ajaxSuccess', function(event, xhr, settings) {
//	var REDIRECT_URL = xhr.getResponseHeader('REDIRECT_URL');
//	if (REDIRECT_URL && REDIRECT_URL != null) {
//		window.parent.location = REDIRECT_URL;
//	}
//});