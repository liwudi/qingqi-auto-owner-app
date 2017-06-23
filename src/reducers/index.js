/**
 * Created by ligj on 2016/9/27.
 */
import {combineReducers} from 'redux';

import * as userReducers from './UserReducers';
import * as vehicleReduers from './VehicleReduers';
import * as messageReduers from './MessageReducers';
import * as AccumulateReducers from './AccumulateReducers';

const rootReducer = combineReducers({
	...userReducers,
	...vehicleReduers,
	...messageReduers,
    ...AccumulateReducers
});

export default rootReducer;