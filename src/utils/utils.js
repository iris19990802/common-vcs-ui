/* eslint-disable eqeqeq */
export const PREFIX = '';

export function filterZero(obj) {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] != 0) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export function setQuery(params) {
  // 把无效的params过滤掉再生成url
  const newUrl = `${Object.keys(params)
    .filter(key => params[key] && params[key].toString().length > 0)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;
  return newUrl;
}

// 设置cookie
export function setCookie(cookie, value, expiredays) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${cookie}=${escape(value)};\
    expires=${exdate.toGMTString()};\
    path=/`;
}
