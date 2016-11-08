/**
 * Created by yaocy on 2016/11/2.
 */

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';

const serviceUrl = `${Server.QINGQI}tocapp/`;
const defaultPage = Server.defaultPage;
const userId = '8';

function makeUrl(path) {
    return serviceUrl + path;
}

/**
 * 查询线路列表
 * @param page_number
 * @param page_size
 * @returns {*}
 */
export function queryRouteList(page_number,page_size){
    return RequestService.get(
        makeUrl('queryRouteList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            userId: userId
        }
    );
}
/**
 * 线路详情
 * @param routeId
 * @returns {*}
 */
export function routeInfo(routeId){
    return RequestService.get(
        makeUrl('routeInfo'),
        {
            routeId:routeId
        }
    );
}

/**
 * 添加线路
 * @param opts
 * @returns {*}
 */
export function addRoute(opts){
    return RequestService.post(
        makeUrl('addRoute'),
        opts
    );
}

export function deleteRoute(routeId){
    return RequestService.get(
        makeUrl('deleteRoute'),
        {
            routeId:routeId
        }
    );
}


/**
 * 线路车辆列表
 * @param page_number
 * @param page_size
 * @param searchKey
 * @returns {*}
 */
export function queryRouteAddCarList(page_number,page_size, searchKey){
    return RequestService.get(
        makeUrl('queryRouteAddCarList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            userId: userId,
            searchKey:searchKey
        }
    );
}
export function routeCarList(page_number,page_size, routeId){
    return RequestService.get(
        makeUrl('routeCarList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            routeId:routeId
        }
    );
}

/**
 * 车辆设置线路
 * @param opts
 * @returns {*}
 */
export function setCarRoute(opts){
    return RequestService.get(
        makeUrl('setCarRoute'),
        opts
    );
}

/**
 * 更新线路
 * @param opts
 * @returns {*}
 */
export function modifyRoute(opts){
    return RequestService.get(
        makeUrl('modifyRoute'),
        opts
    );
}

export function delCarRoute(carId){
    return RequestService.get(
        makeUrl('delCarRoute'),
        {carId: carId}
    );
}


