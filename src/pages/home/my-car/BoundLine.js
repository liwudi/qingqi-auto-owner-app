/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/21
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
export default class BoundLine extends Component {
	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="绑定线路"/>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
					<View style={[estyle.fx1]}>
						<Text style={styles.textBlue}>北京-----------------青岛</Text>
						<View style={estyle.paddingTop}>
							<Text>活跃车辆数：2辆</Text>
							<Text>承运车辆数：4辆</Text>
						</View>
					</View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}><Text>选择</Text></View>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
					<View style={[estyle.fx1]}>
						<Text style={styles.textBlue}>西安-----------------成都</Text>
						<View style={estyle.paddingTop}>
							<Text>活跃车辆数：2辆</Text>
							<Text>承运车辆数：4辆</Text>
						</View>
					</View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}><Text>选择</Text></View>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
					<View style={[estyle.fx1]}>
						<Text style={styles.textBlue}>乌鲁木齐-----------------齐齐哈尔</Text>
						<View style={estyle.paddingTop}>
							<Text>活跃车辆数：2辆</Text>
							<Text>承运车辆数：4辆</Text>
						</View>
					</View>
					<View style={[estyle.paddingRight, estyle.fxCenter]}>
						<View style={[styles.add,estyle.paddingHorizontal]}><Text>选择</Text></View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	add: {
		borderRadius: 400,
		backgroundColor: Env.color.main,
	},
	textBlue:{
		fontSize:Env.font.articleTitle,
		color:Env.color.main
	}
});