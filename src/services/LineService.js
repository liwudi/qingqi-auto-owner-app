/**
 * Created by yaocy on 2016/11/2.
 */

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';

const serviceUrl = `${Server.QINGQI}tocapp/`;
const defaultPage = Server.defaultPage;
const userId = '1';

function makeUrl(path) {
    return serviceUrl + path;
}


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