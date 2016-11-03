/**
 * Created by yaocy on 2016/10/31.
 * Created by wangyang on 2016/11/3
 */
import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}tocapp/`;
const defaultPage = Server.defaultPage;
const userId = '1';
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
            userId: userId,
            keyWord:keyWord
        }
    );
}

export function addDriver(opts){
    opts.userId = userId;
    return RequestService.post(
        `${Server.QINGQI}tocapp/addDriver`,
        opts
    );
}

export function bindDriver(opts){
    opts.userId = userId;
    return RequestService.post(
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
export function deleteDriver(entity){
    return RequestService.get(
        makeUrl('delDriver'),
        {
            userId : userId,
            driverId : entity.driverId
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
export function modifyDriver(entity){
    return RequestService.post(
        makeUrl('modifyDriver'),
        {
            newPhone : entity.newPhone,
            oldPhone : entity.phone,
            name : entity.name
        }
    );
}