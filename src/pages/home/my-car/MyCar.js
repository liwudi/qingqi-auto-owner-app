/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
import ConfirmButton from '../../../components/ConfirmButton';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import * as Icons from '../../../components/Icons';

export default class MyCar extends Component {
	state = {
		list: true
	}

	renderList() {
		return <View style={styles.bodyHave}>
			<TopBanner
				{...this.props}
				title="我的车辆"
				rightView={<Text style={{color:'#FFF',fontSize:Env.font.note}}>设置</Text>}
			/>

			<View>
				<ViewForRightArrow style={[estyle.cardBackgroundColor, estyle.marginTop, estyle.padding]}>
					<View style={[estyle.fxRow]}>
						<Text style={[estyle.articleTitle]}>京N23456</Text>
						<View style={[estyle.note,styles.currentCar,estyle.paddingHorizontal]}><Text style={[estyle.note,{color:'#fff'}]}>当前车辆</Text></View>
					</View>
					<View style={[estyle.fxRow]}>
						<Icons.IconUser />
						<Text style={[estyle.note,estyle.marginLeft]}>主：</Text>
						<Text style={[estyle.note,{color:Env.color.text}]}>梁大人</Text>
						<Text style={[estyle.marginLeft]}>副：</Text>
						<Text style={[estyle.note,{color:Env.color.text}]}>梁大人</Text>
					</View>
				</ViewForRightArrow>
				<ViewForRightArrow style={[estyle.cardBackgroundColor, estyle.marginTop, estyle.padding]}>
					<View style={[estyle.fxRow]}>
						<Text style={[estyle.articleTitle]}>京N23456</Text>
					</View>
					<View style={[estyle.fxRow]}>
						<Icons.IconUser />
						<Text style={[estyle.note,estyle.marginLeft]}>主：</Text>
						<Text style={[estyle.note,{color:Env.color.text}]}>梁大人</Text>
						<Text style={[estyle.marginLeft]}>副：</Text>
						<Text style={[estyle.note,{color:Env.color.text}]}>梁大人</Text>
					</View>
				</ViewForRightArrow>

			</View>
		</View>
	}

	renderEmpty() {
		return <View style={styles.body}>
			<TopBanner {...this.props} title="我的车辆"/>
			<View style={styles.addCarView}>
				<Text style={styles.label1}>目前没车辆</Text>
				<Text>车主添加您为司机后才会显示车辆</Text>
				<Text style={styles.label2}>我只一辆车，我是车主也是司机</Text>
				<Text style={styles.label3}>您可以在此添加车辆</Text>
				<ConfirmButton style={{marginTop:10}} size="large" onPress={() => this.onLogin()}><Text>添加车辆</Text></ConfirmButton>
				<Text style={styles.label4}>要体验更多的管理功能建议您下载“车主端”</Text>
			</View>
		</View>
	}

	render() {
		return (
			<View>
				{this.state.list ? this.renderList() : this.renderEmpty()}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.navTitle
	},
	bodyHave:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	addCarView:{
		padding:10,
		alignItems:'center'
	},
	label1:{
		marginTop:100 *  Env.font.base,
		fontSize:Env.font.text
	},
	label2:{
		marginTop:100 *  Env.font.base,
		color:Env.color.important,
		fontSize:Env.font.text
	},
	label3:{
		color:Env.color.important,
		fontSize:Env.font.text
	},
	label4:{
		marginTop:20 *  Env.font.base,
		fontSize:Env.font.note
	},
	item:{
		paddingTop:20 * Env.font.base,
		paddingBottom:20 * Env.font.base,
		paddingLeft:30 * Env.font.base,
		// paddingBottom:30 * Env.font.base,
		borderBottomWidth:1 * Env.font.base,
		borderColor:'#e5e5e5',
		backgroundColor:'#FFF'
	},
	text:{
		fontSize:Env.font.text,
		color:Env.color.text
	},

	currentCar:{
		borderRadius:400,
		backgroundColor:Env.color.auxiliary,
	}
});