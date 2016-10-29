/**
 * Created by linyao on 2016/10/20.
 */
import { ToastAndroid } from 'react-native';
import * as AppService from '../services/AppService';
import * as TYPES from './types';
export function queryLastPhyExamResult(next) {
    return (dispatch) => {
        dispatch({'type': TYPES.TEST_DATA_DOING});
        AppService.queryLastPhyExamResult().then(
            (res) => {
                dispatch({'type': TYPES.TEST_DATA_SUCCESS, data: res});
                next && next(res);
            }
        ).catch(
            (e) => {
                ToastAndroid.show('获取数据失败，请检查网络', ToastAndroid.SHORT);
                dispatch({'type': TYPES.TEST_DATA_ERROR});
            }
        );
    }
}
export function phyExam(next) {
    return (dispatch) => {
        dispatch({'type': TYPES.TEST_DATA_DOING});
        AppService.phyExam().then(
            (res) => {
                console.info(res)
                dispatch({'type': TYPES.TEST_DATA_SUCCESS, data: res});
                next && next(res);
            }
        ).catch(
            (e) => {
                ToastAndroid.show(e.message, ToastAndroid.SHORT);
                dispatch({'type': TYPES.TEST_DATA_ERROR});
            }
        );
    }
}