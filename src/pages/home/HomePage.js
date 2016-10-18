/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';

import TopBanner from '../../components/TopBanner';

/*
import ImgButton from '../../components/ImgButton';
*/

import Env from '../../utils/Env';

import { IconArrowRight } from '../../components/Icons';



const estyle = Env.style;

export default class HomePage extends Component {

	goTo(page){
		this.props.router.push(page);
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner
					titleShow={false}
					leftView={<Text style={[estyle.navTitle]}>解放者之家</Text>}
					rightView={<Text style={[estyle.text, {color: Env.color.navTitle}]}>京N233433 <IconArrowRight color="#FFF" size={Env.font.text}/></Text>}
				/>
				{/*<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(TripAnalysisList)} src={require('../../assets/images/icon-1.png')} title="行程分析"/>
					<ImgButton onPress={() => this.goTo(VehicleTestDetail)}  src={require('../../assets/images/icon-2.png')} title="故障诊断"/>
					<ImgButton onPress={() => this.goTo(TrafficSteward)}  src={require('../../assets/images/icon-3.png')} title="行车管家"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(ServiceStationList)}  src={require('../../assets/images/icon-4.png')} title="服务站及预约"/>
					<ImgButton onPress={() => this.goTo(Call)}  src={require('../../assets/images/icon-5.png')} title="一键呼救"/>
					<ImgButton onPress={() => this.goTo(CustomerService)}  src={require('../../assets/images/icon-6.png')} title="联系客服"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<View style={[estyle.fx1, estyle.fxCenter, estyle.border]}>

					</View>
					<View style={[estyle.fx1, estyle.fxCenter, estyle.border]}>

					</View>
					<View style={[estyle.fx1, estyle.fxCenter, estyle.border]}>

					</View>
				</View>*/}
			</View>
		);
	}
}