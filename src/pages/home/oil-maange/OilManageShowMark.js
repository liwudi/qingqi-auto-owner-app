/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,

} from 'react-native';

import MapLine from '../../../components/MapLine';

import TopBanner from '../../../components/TopBanner';

export default class OilManageShowMark extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner {...this.props} title="查看标杆"/>
				<MapLine style={[estyle.fx1]}></MapLine>
			</View>
		);
	}
}