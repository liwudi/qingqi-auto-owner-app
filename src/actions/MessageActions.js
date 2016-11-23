/**
 * Created by ligj on 2016/9/27.
 */
import { ToastAndroid } from 'react-native';

import * as TYPES from './types';
import * as PushService from '../services/PushService';

export function addMessage(message) {
	return (dispatch) => {
		PushService.addMessage(message, message.noticeId)
		.then(() => {
			return PushService.readAllMessageAndUnreadCount()
		}).then((rs) => {
			dispatch({'type': TYPES.PUSH_MESSAGE_LIST, messageList: rs});
		}).catch(e => {
			console.log(e)
		});
	}
}

export function getMessages() {
	return (dispatch) => {
        PushService.readAllMessageAndUnreadCount()
		.then((rs) => {
			dispatch({'type': TYPES.PUSH_MESSAGE_LIST, messageList: rs});
		});
	}
}
