/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou  on 2016/10/19
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image
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
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="管理员列表" rightView={ topRightView()}/>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Image
						style={{borderRadius:100,width:25,height:25,borderWidth:4 * Env.font.base,
							borderColor:'#85C7E7',}}
						source={require('../../../assets/images/icon-1.png')}
					/>
					<Text style = {[estyle.text,estyle.paddingLeft]}>令狐冲</Text>
					<Text style = {[estyle.paddingLeft,{flex:1}]}>133098701234</Text>
					<Text style = {estyle.note}>已添加</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Image
						style={{borderRadius:100,width:25,height:25,borderWidth:4 * Env.font.base,
							borderColor:'#85C7E7',}}
						source={require('../../../assets/images/icon-1.png')}
					/>
					<Text style = {[estyle.text,estyle.paddingLeft]}>任我行</Text>
					<Text style = {[estyle.paddingLeft,{flex:1}]}>133098701234</Text>
					<Text style = {estyle.note}>已添加</Text>
				</View>
				<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
					<Image
						style={{borderRadius:100,width:25,height:25,borderWidth:4 * Env.font.base,
							borderColor:'#85C7E7',}}
						source={require('../../../assets/images/icon-1.png')}
					/>
					<Text style = {[estyle.text,estyle.paddingLeft]}>张无忌</Text>
					<Text style = {[estyle.paddingLeft,{flex:1}]}>133098701234</Text>
					<Text style = {[estyle.note,{color:Env.color.auxiliary}]}>未使用</Text>
				</View>
			</View>
		);
	}
}
