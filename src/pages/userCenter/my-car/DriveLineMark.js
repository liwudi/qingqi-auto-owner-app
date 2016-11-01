/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';

export default class DriveLineMark extends Component {
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="行驶线路-标杆车辆"/>
			</View>
		);
	}
}