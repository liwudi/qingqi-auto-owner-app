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
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}><Text style={styles.textBlue}>北京-------------青岛</Text></View>
					<View style={[estyle.paddingRight]}>
						<Text style ={{textAlign:'right'}}>承运车辆数 <Text style={styles.noteBlue}>4</Text></Text>
						<Text style ={{textAlign:'right'}}>今日活跃车辆  <Text style={styles.noteBlue}>2</Text></Text>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}><Text style={styles.textBlue}>西安-------------青岛</Text></View>
					<View style={[estyle.paddingRight]}>
						<Text style ={{textAlign:'right'}}>承运车辆数 <Text style={styles.noteBlue}>3</Text></Text>
						<Text style ={{textAlign:'right'}}>今日活跃车辆  <Text style={styles.noteBlue}>1</Text></Text>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}><Text style={styles.textBlue}>武汉-------------长沙</Text></View>
					<View style={[estyle.paddingRight]}>
						<Text style ={{textAlign:'right'}}>承运车辆数 <Text style={styles.noteBlue}>2</Text></Text>
						<Text style ={{textAlign:'right'}}>今日活跃车辆  <Text style={styles.noteBlue}>2</Text></Text>
					</View>
				</View>
				<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<View style={estyle.fx1}><Text style={styles.textBlue}>广州-------------深圳</Text></View>
					<View style={[estyle.paddingRight]}>
						<Text style ={{textAlign:'right'}}>承运车辆数 <Text style={styles.noteBlue}>6</Text></Text>
						<Text style ={{textAlign:'right'}}>今日活跃车辆  <Text style={styles.noteBlue}>3</Text></Text>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	textBlue:{
		fontSize:Env.font.text,
		color:Env.color.main
	},
	noteBlue:{
		fontSize:Env.font.note,
		color:Env.color.main
	}
});