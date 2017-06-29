/**
 * Created by linyao on 2016/10/17.
 */

import commonModule from './components/CommonModule';

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
import Config from '../config';
/**
 * 检查更新
 * @returns {*}
 */
export function checkUpdate(){
    return RequestService.get(Server.UPDATE_SERVICE).then(rs => rs[0]);
}

/**
 * 获取应用当前版本信息
 * @returns {*}
 */
export function getAppVersion() {
    return {
        versionName : Config.versionName,
        versionCode : Config.versionCode,
        appType : Config.APP_TYPE
    };
}