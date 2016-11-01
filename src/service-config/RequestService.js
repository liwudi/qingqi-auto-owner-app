/**
 * Created by linyao on 2016/9/8.
 */
let serviceUrl='';
let userInfo;

function urlEncode(param, key, encode) {
  if(param==null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
function isFunction(value) {
  return typeof value === 'function';
}
function isUndefined(value) {
  return typeof value === 'undefined';
}
function isString(value) {
  return typeof value === 'string';
}
//angular的forEach
function forEach(obj, iterator, context) {
  var key, length;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        // Need to check if hasOwnProperty exists,
        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
        if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (isArray(obj) || isArrayLike(obj)) {
      var isPrimitive = typeof obj !== 'object';
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context, obj);
    } else if (isBlankObject(obj)) {
      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
      for (key in obj) {
        iterator.call(context, obj[key], key, obj);
      }
    } else if (typeof obj.hasOwnProperty === 'function') {
      // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else {
      // Slow path for objects which do not have a method `hasOwnProperty`
      for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
}

function resultProcessor(result) {
  if( result.status === 200 || result.code === 200 || result.resultCode === 200){
    return Promise.resolve(result.data);
  }else{
    return Promise.reject(result);
  }
}

function typeToString(obj){
  if(obj instanceof Object || obj instanceof Array){
    forEach(obj, function (value,k) {
      obj[k] = (obj[k] !== null && typeof obj[k] === 'object') ? typeToString(obj[k]) : String(obj[k]);
    });
  }
  return obj;
}

function request(opts, processor, isUpload) {
  let url = /^(http|https):\/\//.test(opts.url) ? opts.url : (serviceUrl + opts.url),
    options = {
        method: opts.method || 'GET',
        cache: false,
        // mode: 'cors', //允许跨域
        headers: new Headers()
      },
    queryString, formData;
  options.headers.append('Content-Type','application/json;charset=utf-8');
  options.headers.append('Accept','application/json');

  if (opts.credentials != 'undefined') {
    options.credentials = opts.credentials;
  }


  //todo 统一加上token（临时处理方案）
  if (userInfo) {
    if (!opts.data) {
      opts.data = {};
    }
    opts.data['token'] = userInfo.token;
  }


  if (opts.data && opts.data instanceof Object) {
    for (var _d in opts.data) {
      if ((options.method === 'GET' && opts.data[_d] === '') || isUndefined(opts.data[_d]) || opts.data[_d] === null) {
        delete  opts.data[_d];
      } else if (opts.data[_d] == 'null') {
        delete  opts.data[_d];
      }
    }
  }
  if (options.method === 'POST') {
    if (isString(opts.data)) {
      options.body = opts.data;

      // 为了兼容接口，其实不应该这样实现
      /*options.headers = {
       'Content-Type': 'application/json;charset=utf-8'
       };*/
    } else {
      if (opts.data instanceof FormData) {
        options.body = opts.data;
        options.headers.set('Content-Type','undefined');
      } else if (isUpload) {
        formData = new FormData();
        if (opts.data) {
          forEach(opts.data, function (value, key) {
            formData.append(key, value);
          });
        }
        options.body = formData;
        options.headers.set('Content-Type','undefined');
      } else {
        options.body = JSON.stringify(typeToString(opts.data));
        options.headers.set('Content-Type','application/json;charset=utf-8');
        options.headers.set('Accept','application/json');
      }
    }
  } else if (options.method === 'GET') {

    if (!opts.data) opts.data = {};
    opts.data['__rid'] = Math.random();

    queryString = urlEncode(opts.data);
    url = url + (url.indexOf('?') > -1 ? '&' : '?') + queryString;
  }

  processor = processor || resultProcessor;
  
  return fetch(url,options)
    .then(function (response) {
      return response.json()
    })
    .then(function (res) {
      return processor(res);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}


export let RequetService = {
  get: function (url, data, processor) {
    if (arguments.length === 2 && isFunction(data)) {
      processor = data;
      data = null;
    }
    return request({
      url: url,
      data: Object.assign({}, data)
    }, processor);
  },

  post: function (url, data, processor, isUpload) {
    if (isFunction(data) && arguments.length === 2) {
      isUpload = processor;
      processor = data;
      data = null;
    }
    return request({
      method: 'POST',
      url: url,
      data: Object.assign({}, data)
    }, processor, isUpload);
  },
  request: request
};

function setServiceUrl(url) {
  serviceUrl=url;
};


export { setServiceUrl };
export default RequetService;
