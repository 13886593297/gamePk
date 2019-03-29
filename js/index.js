// 炫耀一下
function flaunt() {
	if (sessionStorage.getItem('isplay') == 0) {
		document.getElementById('buttonPay').play();
	}
	setTimeout(function () {
		$('#dialog').show();
	}, 400);
}

// 回到首页
function goHome() {
	if (sessionStorage.getItem('isplay') == 0) {
		document.getElementById('buttonPay').play();
	}
	setTimeout(function () {
		window.location.href = baseUrl.base
	}, 400);
}

// 分享结束隐藏模态框
function modal_hide() {
	$('#dialog').hide();
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//展示广告
function showAdInfo(position) {
	if (bodys[question_index - 1].ad_info != null) {
		$('#footView').show();
		$('#img_adinfo').attr('src', bodys[question_index - 1].ad_info.ad_img);
		$('#test_adinfo').html(bodys[question_index - 1].ad_info.ad_content);
	} else {
		$('#footView').hide();
	}
}

function getUserInfo() {
	var ticket = getQueryString('ticket');
	$.ajax({
		url: baseUrl.base + baseUrl.wxInfo,
		type: 'post',
		data: {
			userCode: ticket
		},
		error: function (err) {
			//alert(JSON.stringify(err))
		},
		success: function (res) {
			//alert(JSON.stringify(res))
			if (res.code == 0) {
				bodys = res.body;
				var exp = new Date();
				exp.setTime(exp.getTime() + 60 * 60 * 1000 * 24);
				document.cookie = "userId" + "=" + escape(bodys.user_id) + ";expires=" + exp.toGMTString() + ";path=/";
				if (bodys.first == 1) {
					alert('非礼医用户请注册');
					document.cookie = "userId" + "=" + escape(bodys.user_id) + ";expires=" + exp.toGMTString() + ";path=/";
					window.location.href = '../html/me_info.html?backUrl=1'
				}
			} else if (res.code == 4) {
				window.location.href = res.body.hcpProfileURL;
				return;
			}
		}
	})
}