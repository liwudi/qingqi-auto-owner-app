/**
 * Created by ligj on 2017/1/11.
 */

import {Platform} from 'react-native';

const Config = {
    mainColor: '#4f77db',  //司机端主色
    packageName: 'com.mapbar.qingqi.onwer', //应用包名
    uploadCk: '52b376899aaf4714a4e40e902a1f5aa5', // 应用商店更新key
    APP_TYPE: 'qingqi_owner_mobile', //    qingqi_owner_mobile(青汽车主版本)  qingqi_driver_mobile（青汽司机版本）
    APP_PRODUCT: 'qingqi',
    DEVICE_TYPE: Platform.OS === 'android' ? '1' : '2',//1:android,  2:ios   /////qingqi_owner_mobile
    TYPE: '0' //0 车主端 1 司机端
};

const UPDATE_SERVICE = `http://wdservice.mapbar.com/appstorewsapi/checkexistlist/21?package_name=${Config.packageName}&ck=${Config.uploadCk}`;
const ServerBase = {
    QINGQI: 'http://jfx.mapbar.com/api/qingqi/',
    WD_SERVICE: 'http://jfx.mapbar.com/usercenter/',
    SERVICE_STATION:'http://jfx.qdfaw.com:8081/api/qingqi/',
    BBS_PAGE: 'http://jfx.mapbar.com/forum/yqlt.php',
    GOODS_PAGE: 'https://www.lujing56.com/activities/goodsource/view/find_goods.html',
    NEWS_SERVICE: 'http://219.146.249.190:10106/',
    IMG_SERVICE: 'http://jfx.mapbar.com/usercenter/user/queryPicById',//用于头像相关
    UPLOAD_SERVICE: 'http://jfx.mapbar.com/fsm/',
    UPDATE_SERVICE
};


const Servers = {
    ServerDebug151:{
        ...ServerBase,
        QINGQI: 'http://10.30.50.151:8950/qingqi/',
        WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        SERVICE_STATION: 'http://10.30.50.151:8950/qingqi/',
    },
    ServerDebug153:{
        ...ServerBase,
        QINGQI: 'http://10.30.50.153:8950/qingqi/',
        WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        SERVICE_STATION: 'http://10.30.50.153:8950/qingqi/',
    },
    ServerDebug:{
        ...ServerBase,
        QINGQI: 'http://61.161.238.158:8950/qingqi/',
        WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        SERVICE_STATION:'http://61.161.238.158:8950/qingqi/',
    },
    ServerRelease:{
        ...ServerBase,
    }
}



export default {
    ...Config,
    server: Servers.ServerDebug
};