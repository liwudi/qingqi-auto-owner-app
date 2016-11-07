/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,

} from 'react-native';

import TopBanner from '../../components/TopBanner';
import ViewForRightArrow from '../../components/ViewForRightArrow';
import ImgButton from '../../components/ImgButton';

import MyCar from './my-car/MyCar';
import MyDriver from './my-driver/MyDriver';
import MyLine from './my-line/MyLine';
import Monitor from './monitor/Monitor';
import OilManage from './oil-maange/OilManage';


import { IconArrowRight } from '../../components/Icons';

import Env from '../../utils/Env';
const estyle = Env.style;



export default class HomePage extends Component {

	goTo(page){
		this.props.router.push(page);
	}

	render() {
		let data = {};
		const renderItem = (name, value) => {
			return <View style={[estyle.fx1,estyle.fxRowCenter, estyle.borderRight]}>
				<View>
					<Text style={[estyle.articleTitle, {color:Env.color.main, textAlign:'center'}]}>{value || 0}</Text>
					<Text style={[estyle.text]}>{name}</Text>
				</View>
			</View>;
		};
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner title="首页" leftShow={false}/>
				<View style={[estyle.padding]}><Text style={[estyle.navTitle,{color:Env.color.important}]}>今日运营统计</Text></View>
				<View style={[estyle.fxRow, estyle.padding,estyle.border, {backgroundColor:'#FFF'}]}>
					<Text style={[estyle.fx1,estyle.articleTitle]}>在线车辆数：12辆</Text>
					<Text style={[estyle.fx1,estyle.articleTitle]}>总车辆数：12辆</Text>
				</View>
				<ViewForRightArrow onPress={() => this.goTo(MyCar)} style={[estyle.fxRow, estyle.cardBackgroundColor]}>
					<View style={[estyle.fxRow]}>
						{renderItem('行驶总里程(km)',123)}
						{renderItem('平均里程/车(km)',123)}
					</View>
				</ViewForRightArrow>
				<ViewForRightArrow onPress={() => this.goTo(OilManage)} style={[ estyle.fxRow, estyle.cardBackgroundColor, estyle.marginBottom ]}>
					<View style={[estyle.fxRow]}>
						{renderItem('总油耗(L)',123)}
						{renderItem('每百公里油耗(L)',123)}
					</View>
				</ViewForRightArrow>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-1.png')} title="我的车辆"/>
					<ImgButton onPress={() => this.goTo(MyDriver)} src={require('../../assets/images/icon-2.png')} title="我的司机"/>
					<ImgButton onPress={() => this.goTo(MyLine)} src={require('../../assets/images/icon-3.png')} title="我的线路"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(Monitor)} src={require('../../assets/images/icon-4.png')} title="实时监控"/>
					<ImgButton onPress={() => this.goTo(OilManage)} src={require('../../assets/images/icon-5.png')} title="油耗管理"/>
					<View style={[estyle.fx1, estyle.fxCenter, estyle.border]}/>
				</View>
			</View>
		);
	}
}