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
import * as Icons from '../../../components/Icons';
import Env from '../../../utils/Env';
const estyle = Env.style;
export default class MyLine extends Component {
	toPage = (component) => {
		this.props.router.push(component);
	}
	render() {
		const topRightView= () => {
			return (
				<View>
					<Icons.IconPlus onPress={() => {this.toPage()}}/>
				</View>
			)
		};
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="我的线路" rightView={ topRightView()}/>
				<View style={estyle.fxRow}>
					<View></View>
					<View></View>
				</View>
			</View>
		);
	}
}