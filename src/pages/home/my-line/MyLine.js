/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import ConfirmButton from '../../../components/ConfirmButton';
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
					<Icons.IconSearch  onPress={() => {this.toPage()}}/>
				</View>
			)
		};
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="我的线路" rightView={ topRightView()}/>
				<View style={estyle.fx1}>
					<View style={[estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
						<View style={[estyle.fxCenter]}><Text style={styles.textBlue}>北京●----------------------●青岛</Text></View>
						<View style={[estyle.fxRow]}>
							<View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
								<Text>总油耗：120.3L</Text>
								<Text>平均油耗：30.6L/100KM</Text>
							</View>
							<View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
								<Text style ={{textAlign:'right'}}>承运车辆数：4辆</Text>
								<Text style ={{textAlign:'right'}}>活跃车辆数：2辆</Text>
							</View>
						</View>
					</View>
					<View style={[estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
						<View style={[estyle.fxCenter]}><Text style={styles.textBlue}>北京●----------------------●青岛</Text></View>
						<View style={[estyle.fxRow]}>
							<View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
								<Text>总油耗：120.3L</Text>
								<Text>平均油耗：30.6L/100KM</Text>
							</View>
							<View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
								<Text style ={{textAlign:'right'}}>承运车辆数：4辆</Text>
								<Text style ={{textAlign:'right'}}>活跃车辆数：2辆</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small">添加线路</ConfirmButton>
					</View>
				</View>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	textBlue:{
		fontSize:Env.font.articleTitle,
		color:Env.color.main
	}
});