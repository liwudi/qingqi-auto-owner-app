/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou  on 2016/10/19
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import ManagerAdd from './ManagerAdd';
import * as Icons from '../../../components/Icons';
const estyle = Env.style;
export default class ManagerList extends Component {
	toPage = (component) => {
		this.props.router.push(component);
	}
	render() {
		const topRightView= () => {
			return (
				<View>
					<Icons.IconPlus onPress={() => {this.toPage(ManagerAdd)}}/>
				</View>
			)
		};
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="邀请伙伴成为管理员" rightView={ topRightView()}/>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{flex:1}]}>令狐冲</Text>
					<Text style = {estyle.paddingRight}>133098701234</Text>
					<Text style = {estyle.note}>已添加</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{flex:1}]}>任我行</Text>
					<Text style = {estyle.paddingRight}>133098701234</Text>
					<Text style = {estyle.note}>已添加</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Text style = {[estyle.text,{flex:1}]}>张无忌</Text>
					<Text style = {estyle.paddingRight}>133098701234</Text>
					<Text style = {estyle.note}>未使用</Text>
				</View>
			</View>
		);
	}
}
