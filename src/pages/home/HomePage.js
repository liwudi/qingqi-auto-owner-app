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
import MyCar from './my-car/MyCar';


import ImgButton from '../../components/ImgButton';



import { IconArrowRight } from '../../components/Icons';

import Env from '../../utils/Env';
const estyle = Env.style;



export default class HomePage extends Component {

	goTo(page){
		this.props.router.push(page);
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner title="首页"/>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-1.png')} title="我的车辆"/>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-2.png')} title="我的司机"/>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-3.png')} title="我的线路"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow]}>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-1.png')} title="实时监控"/>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-2.png')} title="油耗管理"/>
					<View style={[estyle.fx1, estyle.fxCenter, estyle.border]}/>
				</View>
			</View>
		);
	}
}