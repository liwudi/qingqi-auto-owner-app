/**
 * Created by yaocy on 2016/10/31.
 * Created by wangyang on 2016/11/3
 */
import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}tocapp/`;

function makeUrl(path) {
    return serviceUrl + path;
}

//车主端司机查询
export function queryDriver(page_number,page_size,keyWord){

    return RequestService.get(
        makeUrl('queryDriver'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            keyWord:keyWord
        }
    );
}

export function addDriver(opts){
    return RequestService.post(
        `${Server.QINGQI}tocapp/addDriver`,
        opts
    );
}

export function bindDriver(opts){
    return RequestService.get(
        `${Server.QINGQI}tocapp/bindDriver`,
        opts
    );
}

/**
 * 删除司机接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/delDriver?userId=11&driverId=11
 *
 * @param entity 页面表单
 */
export function deleteDriver(phone){
    return RequestService.get(
        makeUrl('delDriver'),
        {
            phone : phone
        }
    );
}


/**
 * 修改司机接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/modifyDriver?oldPhone=18640525668&newPhone=13112345678&name=lyadmin
 *
 * @param entity 页面表单
 */
export function modifyDriver(entity, oldPhone){
    return RequestService.post(
        makeUrl('modifyDriver'),
        {
            newPhone : entity.phone,
            oldPhone : oldPhone,
            name : entity.name
        }
    );
}

//解绑司机
export function unbindDriver(opts){
    return RequestService.get(
        makeUrl('unbindDriver'),
        opts
    );
}