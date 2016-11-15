/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image
} from 'react-native';

import moment from 'moment';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import {statisRouteOilwearByDay, statisOilwearByDay} from '../../../services/AppService';
import Env from '../../../utils/Env';
const estyle = Env.style;
import PageList from '../../../components/PageList';

import Chart from '../../../components/Chart/Chart';

import MyLineItem from './components/MyLineItem';
import OilManageCarList from './OilManageCarList';

let currentDate = moment();
function getWeekDays(num) {
	currentDate = currentDate.clone().add(num * 7, 'd');

	let weeks = [];
	for(let i = 0; i < 7; i++){
		weeks.push(currentDate.clone().add(i - 6, 'd'));
	}
	return weeks;
}

export default class OilManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex:0,
			weeks: getWeekDays(),
            datas: []
		}
	}

	_getStatisOilwearByDay(){
		statisOilwearByDay(
			this.state.weeks[0].format('YYYYMMDD'),
			this.state.weeks[this.state.weeks.length - 1].format('YYYYMMDD')
		).then(rs => {
			console.log(rs)
			this.setState({datas : rs});
		}).catch(e => {

		})
	}

	componentDidMount(){
		this._getStatisOilwearByDay();
	}

	render() {

		const data = this.state.weeks.map((date) => {
			let _d = this.state.datas.filter((item) => item.statisDate == date.format('YYYYMMDD'));
			return [date.format('MM-DD'), (_d.length > 0 ? _d[0].oilwear : 0)]
		});

		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner {...this.props} title="油耗管理"/>
				<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,{backgroundColor:'#FFF'}]}>
					<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Icons.IconArrowLeft style={styles.textBlue}/>
						<Text style={[styles.textBlue]}>上一周</Text>
					</View>
					<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Text style={[estyle.note]}>下一周</Text>
						<Icons.IconArrowRight style={estyle.note}/>
					</View>
				</View>
				<Chart
					style={{height:Env.screen.height * 0.3,backgroundColor:"#FFF"}}
					data={data}
					type="bar"
					color={Env.color.main}
					highlightColor={'#88C057'}
					currentIndex={6}
					widthPercent={1}
					axisLineWidth={0.5}
					gridLineWidth={0.1}
					labelFontSize={Env.font.base * 24}
					onDataPointPress={(e,v,k) => {
						this.setState({currentIndex: k});
					}}
					hideVerticalGridLines={true}
				/>
				<View style={estyle.padding}><Text>线路油耗详情</Text></View>
				<PageList
					style={[estyle.cardBackgroundColor, estyle.fx1]}
					renderRow={(row) => {
						return (
							<MyLineItem data={row} onPress={() => {this.props.router.push(OilManageCarList, {lineInfo:row})}}/>
						)
					}}
					fetchData={(pageNumber, pageSize) => {
						return statisRouteOilwearByDay(pageNumber, pageSize,this.state.weeks[this.state.currentIndex].format('YYYYMMDD'))
					}}
					reInitField={[this.state.currentIndex]}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	articleBlue:{
		fontSize:Env.font.articleTitle,
		color:Env.color.main
	},
	textBlue:{
		fontSize:Env.font.note,
		color:Env.color.main
	}
});