/**
 * Created by ligj on 2016/9/27.
 */
import { TYPES } from '../actions/index';

const LOGIN_STATE = {
	isLogged: false,
	userInfo: {},
	error:{},
	status: 'done'
};

export function loginUserStore(state = LOGIN_STATE, action){
	switch (action.type){
		case TYPES.LOGGED_DOING:
			return Object.assign({},LOGIN_STATE,{status:'doing'});
			break;
		case TYPES.LOGGED_IN:
			return Object.assign({},LOGIN_STATE,{isLogged: true, userInfo: action.user});
			break;
		case TYPES.LOGGED_ERROR:
			return Object.assign({},LOGIN_STATE,{error: action.error});
			break;
		default:
			return state;
	}
}
const MOD_MOBILE_CODE_STATE = {
	second: null,
	error:{},
	status: 'done'
};
export function modifyMobileSendCodeStore(state = MOD_MOBILE_CODE_STATE, action) {
	switch (action.type){
		case TYPES.MODIFY_MOBILE_SEND_CODE_ING:
			return Object.assign({},LOGIN_STATE,{status:'doing'});
			break;
		case TYPES.MODIFY_MOBILE_SEND_CODE_TIMEOUT:
			return Object.assign({},LOGIN_STATE,{status:'timeout',second:action.second});
			break;
		case TYPES.MODIFY_MOBILE_SEND_CODE_ERROR:
			return Object.assign({},LOGIN_STATE,{error: action.error});
			break;
		case TYPES.MODIFY_MOBILE_SEND_CODE_DONE:
			return Object.assign({},LOGIN_STATE,{status:'done'});
			break;
		default:
			return state;
	}
}