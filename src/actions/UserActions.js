/**
 * Created by ligj on 2016/9/27.
 */
import { ToastAndroid } from 'react-native';

import * as TYPES from './types';
import * as UserService from '../services/UserService';

export function doLogin(UserParams, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.login(UserParams.username, UserParams.password)
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

export function doQuickLogin(UserParams, next) {
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		UserService.login(UserParams.username, UserParams.password)
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

export function sendModifyMobileCode() {
	return (dispatch) => {
		dispatch({'type': TYPES.MODIFY_MOBILE_SEND_CODE_ING});
		UserService.sendModifyMobileSendCode()
			.then((res)=>{
				ToastAndroid.show('验证码已发送', ToastAndroid.SHORT);
				let second = 10;
				let intval = setInterval(() => {

					if(second === 0){
						clearInterval(intval);
						dispatch({'type': TYPES.MODIFY_MOBILE_SEND_CODE_DONE});
						return;
					}

					dispatch({'type': TYPES.MODIFY_MOBILE_SEND_CODE_TIMEOUT, second});
					second--;

				},1000);
			}).catch((e)=>{
				ToastAndroid.show(e.message, ToastAndroid.SHORT);
				dispatch({'type': TYPES.MODIFY_MOBILE_SEND_CODE_ERROR, error: e});
			});
	}
}