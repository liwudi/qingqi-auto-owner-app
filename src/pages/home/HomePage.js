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

import ViewForRightArrow from '../../components/ViewForRightArrow';
import ImgButton from '../../components/ImgButton';

import MyCar from './my-car/MyCar';
import MyCarSearch from './my-car/MyCarSearch';
import MyDriver from './my-driver/MyDriver';
import MyLine from './my-line/MyLine';
import Monitor from './monitor/Monitor';
import OilManage from './oil-maange/OilManage';
import TripManage from './oil-maange/TripManage';
import * as Icons from '../../components/Icons';


import { IconSearch } from '../../components/Icons';

import Env from '../../utils/Env';
const estyle = Env.style;

import { queryOperateStatisToday } from '../../services/AppService';

export default class HomePage extends Component {

	constructor(props){
		super(props);
		this.state = {
			operateStatisToday : {},
            myCarsInfo:{}
		};
	}

	goTo(page){
		this.props.router.push(page);
	}

	componentDidMount(){
		queryOperateStatisToday().then((rs) => {
			this.setState({
                myCarsInfo: rs[0],
				operateStatisToday: rs[1]
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
				<View style={[estyle.fxRow, estyle.fxCenter, { height: 84 * Env.font.base, backgroundColor: Env.color.main}]}>
					<TouchableOpacity onPress={() => this.props.router.push(MyCarSearch)} activeOpacity={.8} style={[estyle.fxRow,estyle.fxCenter,{borderRadius:4, width:Env.screen.width * .94, height: 64 * Env.font.base, backgroundColor: '#FFF'}]}>
						<IconSearch size={Env.font.base * 36} color={Env.color.text}/><Text style={estyle.text}> 请输入司机姓名、VIN或车牌号</Text>
					</TouchableOpacity>
				</View>
                {
                    this.props.NetIsConnected
                        ? null
                        : <View style={[estyle.padding,estyle.fxRow,estyle.fxRowCenter,{backgroundColor:'#FDEDEE'}]}>
						<Icons.IconWaring size={Env.font.base * 40} color="#E55C5D"/>
						<Text style={[estyle.note,{marginLeft:Env.font.base * 40}]}>网络连接不可用</Text>
					</View>
                }
				<View style={[estyle.padding]}><Text style={[estyle.navTitle,{color:Env.color.important}]}>今日运营统计</Text></View>
				<View style={[estyle.fxRow, estyle.padding,estyle.border, {backgroundColor:'#FFF'}]}>
					<Text style={[estyle.fx1,estyle.articleTitle]}>在线车辆数：{this.state.myCarsInfo.carNumOnline||0}辆</Text>
					<Text style={[estyle.fx1,estyle.articleTitle]}>总车辆数：{this.state.myCarsInfo.carNumTotal||0}辆</Text>
				</View>
				<ViewForRightArrow onPress={() => this.goTo(TripManage)} style={[estyle.fxRow, estyle.cardBackgroundColor]}>
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
				<View style={[estyle.fx1,estyle.fxRow, estyle.borderLeft]}>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-1.png')} title="我的车辆"/>
					<ImgButton onPress={() => this.goTo(MyDriver)} src={require('../../assets/images/icon-2.png')} title="我的司机"/>
					<ImgButton onPress={() => this.goTo(MyLine)} src={require('../../assets/images/icon-3.png')} title="我的线路"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow, estyle.borderLeft]}>
					<ImgButton onPress={() => this.goTo(Monitor)} src={require('../../assets/images/icon-4.png')} title="实时监控"/>
					<ImgButton onPress={() => this.goTo(OilManage)} src={require('../../assets/images/icon-5.png')} title="油耗管理"/>
					<ImgButton onPress={() => {}} src={require('../../assets/images/mask.png')}/>
				</View>
			</View>
		);
	}
}