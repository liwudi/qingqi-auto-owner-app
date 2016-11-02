/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19 车辆参数
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
export default class CarParameter extends Component {
	render() {
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="京N23456"/>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{width:80}]}>型号</Text>
					<Text style = {[estyle.paddingLeft,estyle.note,{flex:1}]}>一汽解放J6P载货车</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{width:80}]}>VIN</Text>
					<Text style = {[estyle.paddingLeft,estyle.note,{flex:1}]}>EING3556393N46</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{width:80}]}>变速箱型号</Text>
					<Text style = {[estyle.paddingLeft,estyle.note,{flex:1}]}>变速箱CA12TAX160M超速档</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{width:80}]}>发动机型号</Text>
					<Text style = {[estyle.paddingLeft,estyle.note,{flex:1}]}>锡柴CA6DL2-35E4</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{width:80}]}>后桥速比</Text>
					<Text style = {[estyle.paddingLeft,estyle.note,{flex:1}]}>4.111</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{width:80}]}>轮胎型号</Text>
					<Text style = {[estyle.paddingLeft,estyle.note,{flex:1}]}>11.00R20型16层级</Text>
				</View>
			</View>
		);
	}
}