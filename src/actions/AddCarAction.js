/**
 * Created by ligj on 2016/9/27.
 */
import { ToastAndroid } from 'react-native';

import * as TYPES from './types';
import * as UserService from '../services/UserService';

export function doLogin(UserParams, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.login(UserParams.phone, UserParams.password)
			.then((res)=>{
				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next();
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}

export function doRegCheckCaptcha(phone, trueName, password, captcha, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.checkCaptcha(phone, captcha)
			.then(()=>{
				next({
					phone, trueName, password, captcha
				});
				dispatch({'type': TYPES.REG_STEP2_START, regInfo: {
					phone, trueName, password, captcha
				}});
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
			});
	}
}

export function doReg(phone, trueName, password, smsCode, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.REG_STEP1_DOING});
		UserService.reg(phone, trueName, password, smsCode)
			.then((rs)=>{
				next({phone, password});
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.REG_STEP1_ERROR, error: e});
			});
	}
}

export function doQuickLogin(phone, code, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.fastLogin(phone, code)
			.then((res)=>{
				ToastAndroid.show('登录成功', ToastAndroid.SHORT);
				dispatch({'type': TYPES.LOGGED_IN, user: res});
				next();
			}).catch((e)=>{
			ToastAndroid.show(e.message, ToastAndroid.SHORT);
			dispatch({'type': TYPES.LOGGED_ERROR, error: e});
		});
	}
}

export function sendQuickLoginCode(phone) {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.fastLoginSendCode(phone)
			.then((res)=>{
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

export function sendRegCode(phone, captcha, isReSend) {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.regSendCode(phone, captcha, isReSend)
			.then((res)=>{
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


export function sendModifyMobileCode() {
	return (dispatch) => {
		dispatch({'type': TYPES.SEND_CODE_ING});
		UserService.sendModifyMobileSendCode()
			.then((res)=>{
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

export function getCarList(state,toList,toVin) {
	return (dispatch) => {
		dispatch({'type': TYPES.TDS_DATA_DOING});
		UserService.getCarList(state)
			.then((res)=>{
				dispatch({'type': TYPES.TDS_DATA_SUCCESS, data: res});
				if(res.list){
					//toList && toList(state);
					toVin && toVin(state);
				}else {
					//toVin && toVin(state);
				}
			})
			.catch((e)=>{
			ToastAndroid.show(e.message, ToastAndroid.SHORT);
			dispatch({'type': TYPES.TDS_DATA_ERROR, error: e});
		});
	}
}