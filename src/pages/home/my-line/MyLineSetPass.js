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

export default class MyLineSetPass extends Component {
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="设置途经点"/>
				<Text onPress={() => {
						this.props.router.pop({pass:'北京'});
					}}
				>北京</Text>
				<Text onPress={() => {
						this.props.router.pop({pass:'天津'});
				}}
				>天津</Text>
			</View>
		);
	}
}