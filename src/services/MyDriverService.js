/**
 * Created by yaocy on 2016/10/31.
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