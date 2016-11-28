/**
 * Created by ligj on 2016/9/27.
 */
import { TYPES } from '../actions/index';

const STATE = {
	error:{},
	status: null
};

export function messageStore(state = STATE, action){
	switch (action.type){
		case TYPES.PUSH_MESSAGE_LIST:
			return Object.assign({},STATE,{ ...action, status: action.type});
			break;
		default:
			return state;
	}
}