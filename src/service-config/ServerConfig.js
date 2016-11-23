/**
 * Created by cryst on 2016/10/16.
 */
const DEBUG = true;
if(!DEBUG) {
    console.info = console.log = () => {}
}
const ServerConfig = {
    QINGQI: 'http://61.161.238.158:8950/qingqi/',
    // QINGQI: 'http://10.30.50.152:8950/qingqi/',
    //WD_SERVICE: 'https://wdservice.mapbar.com/ssoapi/',
    //WEB_PAGE: 'http://119.255.37.167:2220/',
	WEB_PAGE: 'http://192.168.85.33:2020/',
    WD_SERVICE: 'http://192.168.85.49/',
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