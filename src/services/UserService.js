/**
 * Created by ligj on 2016/9/29.
 */
import Server from '../service-config/ServerConfig';
import RequestService, { getToken } from '../service-config/RequestService';
const loginUrl = `${Server.WD_SERVICE}ssoapi/user/login`;

export function sendModifyMobileSendCode(){
	return new Promise((resolve, reject) => {
		//模拟登录成功
		setTimeout(() => {
			resolve({username:1111});
		},2000);
		//模拟登录失败
		// setTimeout(() => {
		// 	reject({message:'密码错误'});
		// },2000);
	});
}




//添加/编辑车辆-评价ID
export function addCar(opts){
	return RequestService.get(
		`${Server.QINGQI}tocapp/addCar`,
		opts
	);
}

//车主端司机查询接口
export function queryDriver(page_number, page_size, keyWord){
	return new Promise((resolve, reject) => {
		let url = 'queryDriver';
	});
}

//车主端添加司机
export function addDriver(name,phone) {
	return new Promise((resolve, reject) => {
		let url = 'addDriver';
	});
}

//删除司机-司机ID
export function delDriver(driverId) {
	return new Promise((resolve, reject) => {
		let url = 'delDriver';
	});
}

/**
 * 登录
 * @param phone
 * @param password
 * @returns {*}
 */
export function login(phone, password, captcha = '') {
	return RequestService.post(loginUrl,{
		"loginName": phone,
		"autoLogin": 1,
		"captcha": captcha,
		"password": password,
		"product": "webUser"
	});
}

export const SEND_SMS_TYPE_REG = 'register';
export const SEND_SMS_TYPE_REG_RESEND = 'resentRegister';
export const SEND_SMS_TYPE_QUICK_LOGIN = 'quickLogin';
export const SEND_SMS_TYPE_CHANGE_BIND = 'changeBind';
export const SEND_SMS_TYPE_BIND_NEW = 'bind';

/**
 * 修改绑定手机发送验证码
 * @param phone
 * @returns {*}
 */
export function changeBindSendCode(phone, type = SEND_SMS_TYPE_CHANGE_BIND) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/applyBindMobile`,{
		mobile : phone,
		product : "webUser",
		type : type
	});
}

/**
 * 验证重新绑定手机短信验证码
 * @param phone
 * @param smsCode
 * @returns {*}
 */
export function checkChangeBindSmsCode(phone, smsCode) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/checkChangeBindMobile`,{
		mobile : phone,
		product : "webUser",
		smsCode : smsCode
	});
}

/**
 * 绑定新手机
 * @param phone
 * @param smsCode
 * @param oldMobile
 * @param oldSmsCode
 * @returns {*}
 */
export function bindNewMobile(phone, smsCode, oldMobile, oldSmsCode) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/bindMobile`,{
		"mobile": phone,
		"smsCode": smsCode,
		"type":"changeBind",
		"oldMobile": oldMobile,
		"oldSmsCode": oldSmsCode,
		"product":"webUser"
	});

}

/**
 * 快捷登录 发送验证码
 * @param phone
 * @returns {*}
 */
export function fastLoginSendCode(phone) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/sendSms`,{
		mobile : phone,
		product : "webUser",
		type : SEND_SMS_TYPE_QUICK_LOGIN
	});
}

/**
 * 注册 发送验证码
 * @param phone
 * @returns {*}
 */
export function regSendCode(phone, captcha, isRetry = false) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/sendSms`,{
		captcha : isRetry ? '' : captcha,
		mobile : phone,
		product : "webUser",
		type : isRetry ? SEND_SMS_TYPE_REG_RESEND : SEND_SMS_TYPE_REG
	});
}

/**
 * 找回密码 重新发送验证码
 * @param phone
 * @returns {*}
 */
export function findPasswordReSendCode(phone) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/sendSms`,{
		mobile : phone,
		product : "webUser",
		type : 'findPassword'
	});
}

/**
 * 找回密码 验证短信验证码
 * @param phone
 * @param smsCode
 * @returns {*}
 */
export function findPasswordCheckSmsCode(phone, smsCode) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/validateFindPasswordSms`,{
		mobile : phone,
		product : "webUser",
		smsCode : smsCode
	});
}

/**
 * 快捷登录
 * @param phone
 * @param smsCode
 * @returns {*}
 */
export function fastLogin(phone, smsCode) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/quickLogin`,{
		mobile: phone,
		product: "webUser",
		smsCode: smsCode
	});
}

export const CAPTCHA_TYPE_REGISTER = 'register';
export const CAPTCHA_TYPE_FIND_PASSWORD = 'findPassword';
export const CAPTCHA_TYPE_LOGIN = 'login';

/**
 * 获取图形验证码
 * @param phone
 * @returns {string}
 */
export function getCaptcha(phone, type = CAPTCHA_TYPE_REGISTER) {
	return `${Server.WD_SERVICE}ssoapi/user/getCaptcha?identifier=${phone}&type=${type}&product=webUser&__rid=${Math.random()}`;
}

/**
 * 验证图形验证码
 * @param phone
 * @returns {string}
 */
export function checkCaptcha(phone, verifyCode) {
    return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/checkCaptcha`,{
        identifier : phone,
        product  : "webUser",
        type  :  "register",
        verifyCode  : verifyCode
    });
}

export function reg(phone, trueName, password, smsCode) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/mobileRegister`,{
		mobile: phone,
		trueName: trueName,
		password: password,
		smsCode: smsCode,
		product: "webUser"
	});
}

/**
 * 找回密码发送验证码
 * @param phone
 * @param captcha
 * @returns {*}
 */
export function findPasswordSendCode(phone, captcha) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/findPasswordBySms`,{
		captcha : captcha,
		mobile : phone,
		product : "webUser"
	});
}

/**
 * 找回密码-重置密码
 * @param phone
 * @param newPassword
 * @param smsCode
 * @returns {*}
 */
export function findPasswordResetPassword(phone, newPassword, smsCode) {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/resetPassword`,{
		identifier : phone,
		verifyCode: smsCode,
		newPassword: newPassword,
		product : "webUser"
	});
}


//用户相信信息
export function userDetail() {
    return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/userDetail`, {"product":"webUser"});
}

/**
 * 用户头像
 * @returns {string}
 */
export function userPic() {
	return `${Server.WD_SERVICE}ssoapi/user/queryPic?token=${encodeURIComponent(getToken())}`;
}


/**
 * 上传头像
 * @param pic
 * @returns {*}
 */
export function uploadUserPic(pic) {
	let form = new FormData();
	form.append('file',Object.assign({}, pic, {type: 'application/octet-stream'}));
	// form.append('file2', {uri: pic, type: 'application/octet-stream', name: 'upload.jpg'});
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/uploadPic`, form);
}

/**
 * 退出登陆
 * @returns {*}
 */
export function logout() {
	return RequestService.post(`${Server.WD_SERVICE}ssoapi/user/logout`, {"product":"webUser"});
}

export function modifyPassword(oldPassword, newPassword) {
	return RequestService.post(
		`${Server.WD_SERVICE}ssoapi/user/updatePassword`,
		{
			"oldPassword":oldPassword,
			"newPassword":newPassword,
			"product":"webUser"
		}
	);
}

//修改用户信息
export function modifyUserInfo(name,phone) {
	return new Promise((resolve, reject) => {
		let url = 'modifyUserInfo';
	});
}

//车辆查询（从TDS系统获取车辆数据）
export function getCarList(opts,page_number,page_size) {
	return RequestService.get(
		`${Server.QINGQI}tocapp/getCarList`,
		Object.assign({},opts,{page_number: page_number || 1 ,page_size : page_size || 20})
	);
}

//用户信息查询
export function getUserInfo() {
	return new Promise((resolve, reject) => {
		let url = 'getUserInfo';
	});
}