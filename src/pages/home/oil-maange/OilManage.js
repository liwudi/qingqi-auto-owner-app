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

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
import {statisRouteOilwearByDay} from '../../../services/AppService';
import Env from '../../../utils/Env';
const estyle = Env.style;
import PageList from '../../../components/PageList';

import Chart from '../../../components/Chart/Chart';

export default class OilManage extends Component {
	constructor(props) {
		super(props);
		let nowDate = new Date();
		let statisDate = `${nowDate.getFullYear()}${nowDate.getMonth()+1}${nowDate.getDate()}`;
		this.state={
			statisDate:statisDate
		}
	}

	render() {

		const data = [
			[0, 10],
			[1, 30],
			[3, 70],
			[4, 90],
			[5,90],
			[6, 56],
			[7, 34]
		];
		data.onDataPointPress = (e,v,k) => {
			console.log(e,v,k)
		}

		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner {...this.props} title="油耗管理"/>
				<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
					<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Icons.IconCaretLeft style={styles.textBlue}/>
						<Text style={[styles.textBlue]}>上一周</Text>
					</View>
					<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
						<Text style={[estyle.note]}>下一周</Text>
						<Icons.IconCaretRight style={estyle.note}/>
					</View>
				</View>
				<View style={estyle.fxCenter}>
					<Image
						style={{width:200,height:100,borderWidth:4 * Env.font.base,
							borderColor:'#85C7E7',}}
						source={require('../../../assets/images/icon-1.png')}
					/>
				</View>
				<Chart
					style={{height:Env.screen.height * 0.3,backgroundColor:"#FFF"}}
					data={data}
					type="bar"
					color={Env.color.main}
					highlightColor={'#88C057'}
					currentIndex={3}
					widthPercent={1}
					axisLineWidth={0.5}
					gridLineWidth={0.1}
				/>
				<View style={estyle.padding}><Text>线路油耗详情</Text></View>
				<PageList
					style={[estyle.cardBackgroundColor, estyle.fx1]}
					renderRow={(list) => {
						return (
							<View style={[estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
								<Text style={styles.articleBlue}>{list.startPointName}----{list.endPointName}</Text>
								<View style={[estyle.fxRow]}>
									<View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
										<Text>总油耗：<Text style={styles.textBlue}>{list.totalOilwear}</Text>L</Text>
										<Text>平均油耗：<Text style={styles.textBlue}>{list.avgOilwear}</Text>L/100KM</Text>
									</View>
									<View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
										<Text style ={{textAlign:'right'}}>承运车辆数：<Text style={styles.textBlue}>{list.totalCarNum}</Text>辆</Text>
										<Text style ={{textAlign:'right'}}>活跃车辆数：<Text style={styles.textBlue}>{list.activeCarNum}</Text>辆</Text>
										<Text style ={{textAlign:'right'}}>线路标杆：<Text style={styles.textBlue}>{list.carCode}</Text></Text>
									</View>
								</View>
							</View>
						)
					}}
					fetchData={(pageNumber, pageSize) => {
						return statisRouteOilwearByDay(pageNumber, pageSize,this.state.statisDate)
					}}
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