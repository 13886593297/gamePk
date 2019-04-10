var hander = {
  getStorage(name) {
    return JSON.parse(window.localStorage.getItem('user'))[name]
  },
  setStorage(name, value) {
    var user = JSON.parse(window.localStorage.getItem('user'))
    user[name] = value
    window.localStorage.setItem('user', JSON.stringify(user))
  },
  getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
  },
  getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
  }
}

export default hander;