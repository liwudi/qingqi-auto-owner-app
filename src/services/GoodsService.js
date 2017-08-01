/**
 * Created by linyao on 2017/7/26.
 */
import Server from '../service-config/ServerConfig';
import RequestService,{ getToken } from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}goods/`;
const defaultPage = Server.defaultPage;

function makeUrl(path) {
    return serviceUrl + path;
}

//统一提交认证入口接口
export function getUnifiedUserInfoForGoodsSource() {
    return RequestService.get(
        makeUrl('getUnifiedUserInfoForGoodsSource')
    )
}

//货车帮认证资料保存接口
export function saveUnifiedUserInfoForGoodsSource(opt) {
    return RequestService.post(
        makeUrl('saveUnifiedUserInfoForGoodsSource'),
        opt
    )
}
//提交认证资料到货源信息提供方接口
export function validateUnifiedUserInfoForGoodsSource() {
    return RequestService.get(
        makeUrl('validateUnifiedUserInfoForGoodsSource')
    )
}

