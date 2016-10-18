/**
 * Created by ligj on 2016/9/27.
 */
import {combineReducers} from 'redux';

import { loginUserStore, modifyMobileSendCodeStore } from './UserReducers';

const rootReducer = combineReducers({
	userStore: loginUserStore,
	modifyMobileSendCodeStore
});

export default rootReducer;