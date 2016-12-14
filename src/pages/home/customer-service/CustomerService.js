/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import Env from '../../../utils/Env';

const estyle = Env.style;

import TopBanner from '../../../components/TopBanner';

export default class CustomerService extends Component {
	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="客户服务"/>
			</View>
		);
	}
}