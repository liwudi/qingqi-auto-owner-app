/**
 * Created by ligj on 2017/1/11.
 */

import {Platform, NativeModules} from 'react-native';

const commonModule = NativeModules.CommonModule;

const Config = {
    mainColor: '#4f77db',  //车主端主色
    packageName: commonModule.APPLICATION_ID, //应用包名
    uploadCk: '52b376899aaf4714a4e40e902a1f5aa5', // 应用商店更新key
    APP_TYPE: 'qingqi_owner_mobile', //    qingqi_owner_mobile(青汽车主版本)  qingqi_driver_mobile（青汽司机版本）
    APP_PRODUCT: 'qingqi',
    DEVICE_TYPE: Platform.OS === 'android' ? '1' : '2',//1:android,  2:ios   /////qingqi_owner_mobile
    TYPE: '0', //0 车主端 1 司机端
    server_type: commonModule.server_type,
    deviceName: commonModule.deviceName || '',
    versionCode: commonModule.VERSION_CODE,
    versionName: commonModule.VERSION_NAME,
    INVERSE_AK: '79bd7f3bd5d240e888b2c84b4c3bc617'
};

const UPDATE_SERVICE = `http://wdservice.mapbar.com/appstorewsapi/checkexistlist/21?package_name=${Config.packageName}&ck=${Config.uploadCk}`;


const ServerBase = {
    QINGQI: 'http://jfx.mapbar.com/api/qingqi/',
    ACCUMULATE:'http://jfx.mapbar.com/api/qingqi/accumulate/',
    WD_SERVICE: 'http://jfx.mapbar.com/usercenter/',
    SERVICE_STATION:'http://jfx.qdfaw.com:8081/api/qingqi/',
    BBS_PAGE: 'http://jfx.mapbar.com/forum/yqlt.php',
    GOODS_PAGE: 'https://www.lujing56.com/activities/gooddetail/index.html',
    //GOODS_PAGE: 'https://www.lujing56.com/activities/goodsource/view/find_goods.html',
    NEWS_SERVICE: 'http://219.146.249.190:10106/',
    IMG_SERVICE: 'http://jfx.mapbar.com/usercenter/user/queryPicById',//用于头像相关
    UPLOAD_SERVICE: 'http://jfx.mapbar.com/fsm/',
    UPDATE_SERVICE,
    PUSH_SERVICE: 'http://wdservice.mapbar.com/pushapi/',
    INVERSE_SERVICE: 'http://wedrive.mapbar.com/opentsp/gis/api/inverse',
    DEBUG : true
};


const Servers = {
    debug151:{ //与线上同步内网环境
        ...ServerBase,
        QINGQI: 'http://10.30.50.151:8950/qingqi/',
        ACCUMULATE:'http://10.30.50.151:8950/qingqi/accumulate/',
        //WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.151:8950/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json',
        DEBUG : true
    },
    debug152:{  //内网开发联调环境
        ...ServerBase,
        QINGQI: 'http://10.30.50.152:8950/qingqi/',
        ACCUMULATE:'http://10.30.50.152:8950/qingqi/accumulate/',
        //WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.152:8950/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json',
        DEBUG : true
    },
    debug153:{  //内网qa测试环境
        ...ServerBase,
        QINGQI: 'http://10.30.50.153:8950/qingqi/',
        ACCUMULATE:'http://10.30.50.153:8990/qingqi/accumulate/',
        //WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8090/mapbar/yqlt.php',
        // BBS_PAGE: 'http://61.161.238.158:8071/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.153:8950/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json',
        DEBUG : true
    },
    debug8071:{  //153外网映射
        ...ServerBase,
        QINGQI: 'http://61.161.238.158:8071/api153/qingqi/',
        ACCUMULATE:'http://61.161.238.158:8071/api153/qingqi/accumulate/',
        //WD_SERVICE: 'http://119.255.37.167:8808/',
        BBS_PAGE: 'http://61.161.238.158:8090/mapbar/yqlt.php',
        GOODS_PAGE: 'https://statictest.tf56.com/lujing/activities/gooddetail/index.html',
        SERVICE_STATION: 'http://10.30.50.153:8950/qingqi/',
        IMG_SERVICE: 'http://119.255.37.167:8808/user/queryPicById',//用于头像相关
        INVERSE_SERVICE: 'http://geocode.mapbar.com/inverse/getInverseGeocoding.json',
        DEBUG : true
    },
    release:{  //线上环境
        ...ServerBase,
    }
}

export default {
    ...Config,
    //android端默认使用gradle配置，ios端默认release，注意开发时需要特殊修改的情况，请不要上传这段代码
    server: Servers[Config.server_type]
    //,server: Servers['debug8071']
};