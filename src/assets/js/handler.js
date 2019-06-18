/**
 * 更新localStoage
 * @param {string} name 
 * @param {string} value 
 */
export const setStorage = (name, value) => {
  let user = JSON.parse(window.localStorage.getItem('user'))
  user[name] = value
  window.localStorage.setItem('user', JSON.stringify(user))
}

/**
 * 获取localStorage
 * @param {string} name 
 */
export const getStorage = name => {
  return JSON.parse(window.localStorage.getItem('user'))[name] || ''
}

/**
 * 获取地址栏参数 
 * @param {string} name 
 */
export const getQueryString = name => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 获取是否可以自动播放
 */
export const isAutoPlay = () => {
  return JSON.parse(window.sessionStorage.getItem('isAutoPlay'))
}

/**
 * 处理播放音乐
 * @param {string} id 
 */
export const handleMusic = id => {
  let ele = document.getElementById(id)
  ele.paused ? ele.play() : ele.pause()
}

/**
 * 点击按钮播放按钮BGM，并处理回调
 * @param {string} cb 
 * @param {string} id 
 */
export const handleBtnBgm = (cb, id = 'buttonPlay') => {
  isAutoPlay() && handleMusic(id)
  setTimeout(() => cb(), 500)
}