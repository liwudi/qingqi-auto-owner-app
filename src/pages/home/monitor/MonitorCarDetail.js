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

export default class MonitorCarDetail extends Component {
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="监控车辆详情"/>
			</View>
		);
	}
}