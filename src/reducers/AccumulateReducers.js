/**
 * Created by liwd on 2017/6/21.
 */
import { TYPES } from '../actions/index';

const SCORE_STATE = {
    Integral: 0,
};

export function IntegralStore(state = SCORE_STATE, action){
    switch (action.type){
        case TYPES.REQUEST_SCORE:
            return {Integral:action.Integral};
        default:
            return state
    }
}