import queryString from 'query-string';
import { message } from 'antd';
import Progress from '@/components/progress';
// const baseUrl = '/goblinlab/api';
const baseUrl = '';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

async function fetchBase(apiurl, options) {
  let url = apiurl;
  if (!options.noBaseUrl) {
    url = baseUrl + apiurl;
  }
  let opt = options;
  opt = opt || {};
  opt.method = opt.method || 'GET';
  opt.credentials = opt.credentials || 'include';
  opt.withCredentials = true;
  if (opt.headers) {
    Object.assign(opt.headers, {
      Accept: 'application/json',
    });
  }
  if (opt.query) {
    url = `${url}?${queryString.stringify(opt.query)}`;
  }

  // 防止同步render报错
  setImmediate(() => Progress.start());
  const res = await fetch(url, opt);
  // 先检查一下status，结果就直接console出来，方便调试
  try {
    checkStatus(res);
  } catch (err) {
    console.log(err.message);
  }
  try {
    // 如果是HEAD请求，说明不需要返回数据
    let json = { code: 200 };
    if (opt.raw) {
      Progress.done();
      return res.text();
    }
    // 如果是HEAD请求，不需要data
    if (!opt.method.toUpperCase() !== 'HEAD') {
      json = await parseJSON(res);
    }
    Progress.done();
    return {
      data: typeof json === 'undefined' ? true : json,
      // 有些场合数据是在HEADER中的
      _headers: res.headers,
    };
  } catch (err) {
    Progress.done();
    if (!opt.noCommonTip) {
      // 其他错误情况，统一toast提示后端msg 信息
      const errorMsg = err.message || '系统异常，请稍后重试';
      message.error(errorMsg);
    }
    throw err;
  }
  // return false 可以在对应model通过if(data)来判断是否取到值
  // return false;
}
/**
 * GET 方法，
 * @param {*} url api url
 * @param {*} data 传递的数据，GET请求queryString 到url上
 * @param {*} options 预留的其他配置项
 */
const get = (url, data = {}, options = {}) =>
  fetchBase(url, {
    method: 'GET',
    query: data,
    ...options,
  });

/**
 * POST, 数据格式为 application/json
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
const postJson = (url, data = {}, options = {}) => {
  const body = JSON.stringify(data);
  return fetchBase(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
};

/**
 * POST, 数据格式为 application/json
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
const post = (url, data = {}, options = {}) => {
  let body = Object.keys(data)
    .filter(key => data[key] !== undefined)
    .map(
      key =>
        `${key}=${
          typeof data[key] === 'object' && !Array.isArray(data[key])
            ? JSON.stringify(data[key])
            : data[key]
        }`,
    )
    .join('&');
  body = encodeURI(body);
  return fetchBase(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    ...options,
  });
};

/**
 * POST, 数据格式为 multipart/form-data
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
const postFormData = (url, data = {}, options = {}) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return fetchBase(url, {
    method: 'POST',
    body: formData,
    ...options,
  });
};

export default {
  get,
  post,
  postJson,
  postFormData,
};
