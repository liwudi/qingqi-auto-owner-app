/**
 * Created by cryst on 2016/10/16.
 */
const DEBUG = true;
if(!DEBUG) {
    console.info = console.log = () => {}
}

//测试环境
const ServerTest = {
    QINGQI: 'http://10.30.50.153:8950/qingqi/',
    WD_SERVICE: 'http://119.255.37.167:8808/',
    BBS_PAGE: 'http://jfx.mapbar.com/forum/yqlt.php',
    GOODS_PAGE: 'https://www.lujing56.com/activities/goodsource/view/find_goods.html',
    NEWS_SERVICE: 'http://219.146.249.190:10106/',
    IMG_SERVICE: 'http://jfx.mapbar.com/usercenter/user/queryPicById',//用于头像相关
    UPLOAD_SERVICE: 'http://jfx.mapbar.com/fsm/',
    UPDATE_SERVICE: 'http://wdservice.mapbar.com/appstorewsapi/checkexistlist/21?package_name=com.mapbar.qingqi.onwer&ck=922432a3270d48de985db96d365b6df8',
};
//联调环境
const ServerDebug = {
    QINGQI: 'http://61.161.238.158:8950/qingqi/',
    WD_SERVICE: 'http://119.255.37.167:8808/',
    BBS_PAGE: 'http://jfx.mapbar.com/forum/yqlt.php',
    GOODS_PAGE: 'https://www.lujing56.com/activities/goodsource/view/find_goods.html',
    NEWS_SERVICE: 'http://219.146.249.190:10106/',
    IMG_SERVICE: 'http://jfx.mapbar.com/usercenter/user/queryPicById',//用于头像相关
    UPLOAD_SERVICE: 'http://jfx.mapbar.com/fsm/',
    UPDATE_SERVICE: 'http://wdservice.mapbar.com/appstorewsapi/checkexistlist/21?package_name=com.mapbar.qingqi.onwer&ck=922432a3270d48de985db96d365b6df8',
};
//正式环境
const ServerOnline = {
    QINGQI: 'http://jfx.mapbar.com/api/qingqi/',
    WD_SERVICE: 'http://jfx.mapbar.com/usercenter/',
    BBS_PAGE: 'http://jfx.mapbar.com/forum/yqlt.php',
    GOODS_PAGE: 'https://www.lujing56.com/activities/goodsource/view/find_goods.html',
    NEWS_SERVICE: 'http://219.146.249.190:10106/',
    IMG_SERVICE: 'http://jfx.mapbar.com/usercenter/user/queryPicById',//用于头像相关
    UPLOAD_SERVICE: 'http://jfx.mapbar.com/fsm/',
    UPDATE_SERVICE: 'http://wdservice.mapbar.com/appstorewsapi/checkexistlist/21?package_name=com.mapbar.qingqi.onwer&ck=922432a3270d48de985db96d365b6df8',
};


let ServerConfig = {
    ...ServerDebug,
    defaultPage : {
        page_number: 1,
        page_size: 20,
        page_total: 200
    },
    APP_TYPE: '0', //0是车主端，1是司机端
    APP_PRODUCT: 'qingqi',
    DEVICE_ID: '0E97B03CFB5D5F76304134A3D9976198',
    DEVICE_TYPE: '1' //1-android, 2-ios
};


export default ServerConfig;