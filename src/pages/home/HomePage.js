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

import { queryOperateStatisToday } from '../../services/AppService';

export default class HomePage extends Component {

	constructor(props){
		super(props);
		this.state = {
			operateStatisToday : {}
		};
	}

	goTo(page){
		this.props.router.push(page);
	}

	componentDidMount(){
		queryOperateStatisToday().then((operateStatisToday) => {
			this.setState({
				operateStatisToday
			})
		})
	}

	render() {
		const renderItem = (name, value, isShowBorder = true) => {
			return <View style={[estyle.fx1,estyle.fxRowCenter, isShowBorder && estyle.borderRight]}>
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
					<Text style={[estyle.fx1,estyle.articleTitle]}>车辆数：{this.state.operateStatisToday.activeCarNum||0}辆</Text>
					{/*<Text style={[estyle.fx1,estyle.articleTitle]}>总车辆数：{this.state.operateStatisToday.activeCarNum||0}辆</Text>*/}
				</View>
				<ViewForRightArrow onPress={() => this.goTo(MyCar)} style={[estyle.fxRow, estyle.cardBackgroundColor]}>
					<View style={[estyle.fxRow]}>
						{renderItem('行驶总里程(km)', this.state.operateStatisToday.mileAgeTotal||0)}
						{renderItem('平均里程/车(km)', this.state.operateStatisToday.mileAgeAvg||0, false)}
					</View>
				</ViewForRightArrow>
				<ViewForRightArrow onPress={() => this.goTo(OilManage)} style={[ estyle.fxRow, estyle.cardBackgroundColor, estyle.marginBottom ]}>
					<View style={[estyle.fxRow]}>
						{renderItem('总油耗(L)',this.state.operateStatisToday.oilWearTotal||0)}
						{renderItem('每百公里油耗(L)',this.state.operateStatisToday.oilWearAvg||0, false)}
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