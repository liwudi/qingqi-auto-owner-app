/**
 * Created by wangyang on 2016/11/1.
 *
 * 车队管理员service
 */

import Server from '../service-config/ServerConfig';
import RequestService, { getToken } from '../service-config/RequestService';

const serviceUrl = `${Server.QINGQI}tocapp/`;

function makeUrl(path) {
    return serviceUrl + path;
}

/**
 * 查询车队管理员列表接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/queryAdmin?userId=5&page_number=1&page_size=1
 *
 * @param page_number 当前页码
 * @param page_size 每页记录数
 * @returns {*} 车队管理员信息列表
 */
export function getManagerList(keyWord, page_number, page_size){
    return RequestService.get(
        makeUrl('queryAdmin'),
        {
            keyWord : keyWord,
            page_number : page_number,
            page_size : page_size
        }
    );
}

/**
 * 添加车队管理员接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/addAdmin?userId=11&phone=13912345678&name=yshTest
 *
 * @param entity 页面表单
 */
export function addManager(entity){
    return RequestService.post(
        makeUrl('addAdmin'),
        {
            name : entity.name,
            phone : entity.phone
        }
    );
}

/**
 * 删除车队管理员接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/delAdmin?userId=11&adminId=12
 *
 * @param entity 页面表单
 */
export function deleteManager(entity){
    return RequestService.get(
        makeUrl('delAdmin'),
        {
            adminId : entity.adminId
        }
    );
}


/**
 * 修改车队管理员接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/modifyAdmin?newPhone=13130244319&oldPhone=13912345678&name=test
 *
 * @param entity 页面表单
 */
export function modifyManager(entity){
    return RequestService.post(
        makeUrl('modifyAdmin'),
        {
            newPhone : entity.newPhone,
            oldPhone : entity.phone,
            name : entity.name
        }
    );
}

