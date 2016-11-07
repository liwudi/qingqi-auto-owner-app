/**
 * Created by wangyang on 2016/11/1.
 *
 * 车队管理员service
 */

import Server from '../service-config/ServerConfig';
import RequestService, { getToken } from '../service-config/RequestService';

const serviceUrl = `${Server.QINGQI}tocapp/`;

/************************测试数据id**************************/
const userId = 'jcm001';
/************************************************************/

function makeUrl(path) {
    return serviceUrl + path;
}

/**
 * 查询车队区间里程信息列表接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/statisOilwearByDay?beginDate=20161001&endDate=20161011&userId=jcm001
 *
 * @param beginDate 开始日期
 * @param endDate 结束日期
 * @returns {*} 区间里程信息列表
 */
export function getMileageStatisitcsList(beginDate, endDate){
    return RequestService.get(
        makeUrl('statisOilwearByDay'),
        {
            userId : userId,
            beginDate : beginDate,
            endDate : endDate
        }
    );
}

/**
 * 查询车队某日里程信息列表接口
 *
 * url : http://10.30.50.152:8950/qingqi/tocapp/statisMileageByDay?statisDate=20161011&userId=jcm001
 *
 * @param statisDate 日期
 * @returns {*} 某日里程信息列表
 */
export function getMileageStatisitcsList4Day(statisDate, page_number, page_size){
    return RequestService.get(
        makeUrl('statisMileageByDay'),
        {
            userId : userId,
            statisDate : statisDate,
            page_number : page_number,
            page_size : page_size
        }
    );
}