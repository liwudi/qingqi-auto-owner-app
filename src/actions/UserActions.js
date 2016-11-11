/**
 * Created by ligj on 2016/9/27.
 */
import { ToastAndroid } from 'react-native';

import * as TYPES from './types';
import * as UserService from '../services/UserService';
import { setToken } from '../service-config/RequestService';


function sendCodeDispatch(dispatch, sendFun, then = (rs, error)=>{}) {
	dispatch({'type': TYPES.SEND_CODE_ING});
/*	then({}, null);
	return;*/
	sendFun()
		.then((res)=>{
			console.info('sendCodeDispatch')
			console.info(res)
			ToastAndroid.show('验证码已发送', ToastAndroid.SHORT);
			let second = 10;
			let intval = setInterval(() => {

				if(second === 0){
					clearInterval(intval);
					dispatch({'type': TYPES.SEND_CODE_DONE});
					return;
				}

				dispatch({'type': TYPES.SEND_CODE_TIMEOUT, second});
				second--;
			},1000);
			console.info('sendCodeDispatch')
			console.info(res)
			then(res || {}, null);
		}).catch((e)=>{
			ToastAndroid.show(e.message, ToastAndroid.SHORT);
			dispatch({'type': TYPES.SEND_CODE_ERROR, error: e});
			then(null, e);
		});
}



/**
 * token验证
 * @param logged
 * @param noLogged
 * @returns {function(*)}
 */
export function checkToken(logged, noLogged) {
	return (dispatch) => {
		UserService.userDetail()
			.then(res => {
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				logged && logged(res);
			})
			.catch((e)=>{
				dispatch({'type': TYPES.LOGGED_NULL});
				noLogged && noLogged();
			})
	}
}

/**
 * 获取用户信息
 * @returns {function(*)}
 */
export function getUserDetail() {
	return (dispatch) => {
		UserService.userDetail()
			.then(res => {
				dispatch({'type': TYPES.LOGGED_IN, user: res});
			})
			.catch((e)=>{
				dispatch({'type': TYPES.LOGGED_NULL});
			});
	}
}

/**
 * 退出登陆
 * @param next
 * @returns {function(*)}
 */
export function logout(next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.logout()
			.then(res => {
				ToastAndroid.show('退出登录成功', ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_OUT});
			})
			.catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			}).finally(next);
	}
}

/**
 * 账号密码登录
 * @param UserParams
 * @param next
 * @returns {function(*)}
 */
export function doLogin(UserParams, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});

		UserService.login(UserParams.phone, UserParams.password, UserParams.captcha)
			.then((res)=>{
				let userToken = {token:res.token, userId: res.userId};
				setToken(userToken);
				global.storage.save({
					key: 'token',
					rawData: userToken,
					expires: null
				});
				return UserService.userDetail();
			})
			.then(res => {
				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next(res);
			})
			.catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}

/**
 * 注册-验证图片验证码
 * @param phone
 * @param trueName
 * @param password
 * @param captcha
 * @param next
 * @returns {function(*)}
 */
export function doRegCheckCaptcha(phone, trueName, password, captcha, next, err) {
	console.info('doRegCheckCaptcha');
	console.info(arguments)

	return (dispatch) => {
/*		next({
			phone, trueName, password, captcha
		});
		return;*/
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.checkCaptcha(phone, captcha)
			.then((rs)=>{
				console.info(rs)
				UserService.regSendCode(phone, captcha, false).then((d)=>{
					console.info(333)
					next({
						phone, trueName, password, captcha
					});
				}).catch((e) => {
					dispatch({'type': TYPES.REG_STEP2_START, regInfo: {
						phone, trueName, password, captcha
					}});
					(e.code === 1006) && err && err();
				});
				/*next({
					phone, trueName, password, captcha
				});*/
				dispatch({'type': TYPES.REG_STEP2_START, regInfo: {
					phone, trueName, password, captcha
				}});
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
			});
	}
}

/**
 * 找回密码-验证图片验证码，并发送短信
 * @param phone
 * @param captcha
 * @param next
 * @returns {function(*)}
 */
export function doFindPasswordCheckCaptcha(phone, captcha, next) {
	console.info(arguments)
	return (dispatch) => {
		dispatch({'type': TYPES.FINDPASS_STEP1_DOING});
		sendCodeDispatch(
			dispatch,
			UserService.findPasswordSendCode.bind(this, phone, captcha),
			(rs, error) => {
			if(rs){
				console.info('rs')
				console.info(rs)
				dispatch({'type': TYPES.FINDPASS_STEP2, phoneInfo:{phone, captcha}});
				console.info('next')
				console.info(next)
				next();
			}else if(error){
				dispatch({'type': TYPES.FINDPASS_STEP1_ERROR, error});
			}
		}
		);
	}
}

/**
 * 找回密码 重新发送短信验证码
 * @param phone
 * @returns {function(*=)}
 */
export function findPasswordReSendCode(phone) {
	console.info('findPasswordReSendCode');

	return (dispatch) => {
		sendCodeDispatch(
			dispatch,
			UserService.findPasswordReSendCode.bind(null, phone)
		);
	}
}

/**
 * 找回密码 验证短信验证码
 * @param phone
 * @param smsCode
 * @param next
 * @returns {function(*)}
 */
export function findPasswordCheckSmsCode(phone, smsCode, next) {
	console.info('findPasswordCheckSmsCode')
	return (dispatch) => {
		dispatch({'type': TYPES.FINDPASS_STEP2_DOING});
		UserService.findPasswordCheckSmsCode(phone, smsCode)
			.then((rs)=>{
				dispatch({'type': TYPES.FINDPASS_STEP3, phoneInfo: {phone, smsCode}});
				next();
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.FINDPASS_STEP2_ERROR, error: e});
			});
	}
}

/**
 * 找回密码-重置密码
 * @param phone
 * @param newPassword
 * @param smsCode
 * @param next
 * @returns {function(*)}
 */
export function findPasswordNewPassword(phone, newPassword, smsCode, next) {
	console.info('findPasswordNewPassword');
	return (dispatch) => {
		dispatch({'type': TYPES.FINDPASS_STEP3_DOING});
		UserService.findPasswordResetPassword(phone, newPassword, smsCode)
			.then((rs)=>{
				dispatch({'type': TYPES.FINDPASS_STEP3_DONE, phoneInfo: {phone}});
				next();
			}).catch((e)=>{
			ToastAndroid.show(e.message, ToastAndroid.SHORT);
			dispatch({'type': TYPES.FINDPASS_STEP3_ERROR, error: e});
		});
	}
}

/**
 * 注册
 * @param phone
 * @param trueName
 * @param password
 * @param smsCode
 * @param next
 * @returns {function(*)}
 */
export function doReg(phone, trueName, password, smsCode, next) {
	console.info('doReg');

	return (dispatch) => {
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.reg(phone, trueName, password, smsCode)
			.then((rs)=>{
				console.info(rs)
				ToastAndroid.show('注册成功，请登录！', ToastAndroid.SHORT);
				next({phone, password});
			}).catch((e)=>{
				console.info(e)
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
			});
	}
}

/**
 * 快捷登陆
 * @param phone
 * @param code
 * @param next
 * @returns {function(*)}
 */
export function doQuickLogin(phone, code, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.fastLogin(phone, code)
			.then((res)=>{
				let userToken = {token:res.token, userId: res.userId};
				setToken(userToken);
				global.storage.save({
					key: 'token',
					rawData: userToken,
					expires: null
				});
				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
				UserService.userDetail().then(userInfo => {
					console.info(userInfo)
					dispatch({'type': TYPES.LOGGED_IN, user: userInfo});
					next(userInfo);
				});
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				//return UserService.userDetail();
			})
			/*.then(res => {
				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next(res);
			})*/
			.catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
			/*.then((res)=>{
				console.info(res)
				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
				setToken(res.token);
				UserService.userDetail().then(userInfo => {
					console.info(userInfo)
					dispatch({'type': TYPES.LOGGED_IN, user: userInfo});
					next(userInfo);
				});
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				//next();
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});*/
	}
}

/**
 * 快捷登陆-发送验证码
 * @param phone
 * @returns {function(*=)}
 */
export function sendQuickLoginCode(phone) {
	console.info('sendQuickLoginCode');

	return (dispatch) => {
		sendCodeDispatch(dispatch, UserService.fastLoginSendCode.bind(null, phone));
	}
}

/**
 * 发送注册手机验证码
 * @param phone
 * @param captcha
 * @param isReSend
 * @returns {function(*=)}
 */
export function sendRegCode(phone, captcha, isReSend) {
	console.info('sendRegCode');

	return (dispatch) => {
		return sendCodeDispatch(dispatch, UserService.regSendCode.bind(null, phone, captcha, isReSend));
	}
}

/**
 *
 * @returns {function(*=)}
 */
export function sendModifyMobileCode() {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.sendModifyMobileSendCode()
			.then((res)=>{
				console.info('sendModifyMobileCode')
				ToastAndroid.show('验证码已发送', ToastAndroid.SHORT);
				let second = 10;
				let intval = setInterval(() => {

					if(second === 0){
						clearInterval(intval);
						dispatch({'type': TYPES.SEND_CODE_DONE});
						return;
					}

					dispatch({'type': TYPES.SEND_CODE_TIMEOUT, second});
					second--;

				},1000);
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.SEND_CODE_ERROR, error: e});
			});
	}
}

// export function modifyPassword(oldPassword, newPassword, next) {
// 	return (dispatch) => {
// 		if(oldPassword == newPassword){
// 			ToastAndroid.show('新密码不能与原始密码相同', ToastAndroid.SHORT);
// 			return;
// 		}
// 		dispatch({'type': TYPES.MODIFY_PASSWORD_DOING});
// 		UserService.modifyPassword(oldPassword, newPassword)
// 			.then((res)=>{
// 				ToastAndroid.show('密码修改成功', ToastAndroid.SHORT);
// 				dispatch({'type': TYPES.MODIFY_PASSWORD_NULL, user: res});
// 				next();
// 			})
// 			.catch((e)=>{
// 				ToastAndroid.show(e.message, ToastAndroid.SHORT);
// 				dispatch({'type': TYPES.MODIFY_PASSWORD_DOING, error: e});
// 			});
// 	}
// }