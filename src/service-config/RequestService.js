/**
 * Created by linyao on 2016/9/8.
 */

import ServerConfig from './ServerConfig';
import Toast from '../components/Toast';

let serviceUrl = '';
let userInfo;
let token = null;
let userId = null;

function urlEncode(param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
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



function resultProcessor(result) {
    if (result.status === 200 || result.code === 200 || result.resultCode === 200) {
        console.info('success-result');
        //console.info(result);
        if(result.data === undefined){
            result.data={};
        }
        return Promise.resolve(result.data);
    } else {
        console.info('error-result');
        //console.info(result);
        result.message = result.message || '服务器错误';
        return Promise.reject(result);
    }
}

function typeToString(obj) {
    // if(obj instanceof Object || obj instanceof Array){
    //   forEach(obj, function (value, k) {
    //     obj[k] = (obj[k] !== null && typeof obj[k] === 'object') ? typeToString(obj[k]) : String(obj[k]);
    //   });
    // }
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
    options.headers.append('Content-Type', 'application/json;charset=utf-8');
    options.headers.append('Accept', 'application/json');

    if (opts.credentials != 'undefined') {
        options.credentials = opts.credentials;
    }


    //todo 统一加上token（临时处理方案）
    if (userInfo) {
        if (!opts.data) {
            opts.data = {};
        }
        opts.data['token'] = userInfo.token;
        //todo 测试id
        opts.data['userId'] = opts.data['userId'] || userInfo.userId;
        // opts.data['userId'] = userInfo.userId;
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
        if (opts.data instanceof FormData) {
            options.body = opts.data;
            options.headers.set('Content-Type', 'multipart/form-data');
        } else if (isUpload) {
            formData = new FormData();
            if (opts.data) {
                forEach(opts.data, function (value, key) {
                    formData.append(key, value);
                });
            }
            options.body = formData;
            options.headers.set('Content-Type', 'undefined');
        } else {
            options.body = JSON.stringify(typeToString(opts.data));
            options.headers.set('Content-Type', 'application/json;charset=utf-8');
            options.headers.set('Accept', 'application/json');
        }
    } else if (options.method === 'GET') {

        if (!opts.data) opts.data = {};
        opts.data['__rid'] = Math.random();

        queryString = urlEncode(opts.data);
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + queryString;
    }

    if(url.startsWith(ServerConfig.WD_SERVICE) && token){
        options.headers.set('X-Auth-Token', token);
    }

    processor = processor || resultProcessor;

    console.log('###############################################');
    console.log(url)
    console.log(options)
    console.log('###############################################');

    return fetch(url, options)
        .then(function (response) {
            return response.json()
        })
        .then(function (res) {
            return processor(res);
        })
        .catch(function (err) {
            Toast.show(JSON.stringify(err), Toast.SHORT);
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
            data:  data instanceof FormData ? data : Object.assign({}, data)
        }, processor, isUpload);
    },
    request: request
};

function setServiceUrl(url) {
    serviceUrl = url;
}

function setToken(userToken) {
    userInfo = userToken;
/*    console.info(userToken);
    token = userToken.token;
    userId = userToken.userId;*/
    //token = _token;

}

function getToken() {
    return token;
}


export {setServiceUrl, setToken, getToken};
export default RequetService;
