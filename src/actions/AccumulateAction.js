/**
 * Created by liwd on 2017/6/21.
 */
import * as TYPES from './types';
import * as AccumulateService from '../services/AccumulateService';
export function requestScore() {
    return (dispatch) => {
        AccumulateService.queryUnfinishScoreTaskNum().then(res => {
            dispatch({'type':TYPES.REQUEST_SCORE,Integral:res});
        }).catch(error => {
            console.log(error);
        })
    }
}