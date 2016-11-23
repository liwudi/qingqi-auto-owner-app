/**
 * Created by ligj on 2016/10/9.
 * Edit by wangyang on 2016/11/4.
 */
import React, {Component} from "react";
import {Text, View, TouchableHighlight, Image, ToastAndroid, Item, ScrollView, RefreshControl} from "react-native";
import Env from "../../utils/Env";
import TopBanner from "../../components/TopBanner";
import * as Icons from "../../components/Icons";
import ConfirmButton from "../../components/ConfirmButton";
import PageList from "../../components/PageList";
import * as DateUtil from "../../utils/Date";
import {getMileageStatisitcsList, getMileageStatisitcsList4Day} from "../../services/MileageStatisitcsService";


const estyle = Env.style;

export default class MileageStatisitcs extends Component {

	constructor(){
		super(...arguments);
		this.state = {
			statisDate : this.currentEndDate(),
			beginDate : this.currentBeginDate(),
			endDate : this.currentEndDate(),

			// statisDate : '20161011',
			// beginDate : '20161009',
			// endDate : '20161010',
			chart : []
		};
	}

	currentBeginDate() {
		return DateUtil.format(DateUtil.cale(new Date(), 'd', -6), 'yyyyMMdd');
	}
	currentEndDate() {
		return DateUtil.format(new Date(),'yyyyMMdd');
	}

	preBeginDate() {
		return DateUtil.format(DateUtil.cale(this.state.beginDate, 'd', -7), 'yyyyMMdd');
	}
	preEndDate() {
		return DateUtil.format(DateUtil.cale(this.state.endDate, 'd', -7), 'yyyyMMdd');
	}

	nextBeginDate() {
		return DateUtil.format(DateUtil.cale(this.state.beginDate, 'd', 7), 'yyyyMMdd');
	}
	nextEndDate() {
		return DateUtil.format(DateUtil.cale(this.state.endDate, 'd', 7), 'yyyyMMdd');
	}


	componentDidMount() {
		this.fetchData4Chart();
	}

	/**
	 * 加载图表数据
	 */
	fetchData4Chart () {
		// getMileageStatisitcsList('20161001', '20161011')
		getMileageStatisitcsList(this.state.beginDate, this.state.endDate)
			.then((data) => {
				this.setState({chart:data});
			})
			.catch((reason) => {
				ToastAndroid.show(reason.message, ToastAndroid.SHORT);
			})
	};

	/**
	 * 渲染图表
	 */
	renderView4Chart() {
		let view = this.state.chart.map((entity) => (
			<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]} >
				<Text style = {[estyle.text,estyle.paddingLeft]}>{entity.statisDate}</Text>
				<Text style = {[estyle.paddingLeft,{flex:1}]}>{entity.mileage}</Text>
				<Text style = {[estyle.paddingLeft,{flex:1}]}>{entity.oilwear}</Text>
			</View>
		));
		return view;
	}

	/**
	 * 上1周
	 */
	preWeek() {
		this.setState(
			{beginDate:this.preBeginDate(), endDate:this.preEndDate(), statisDate:this.preEndDate()},
			() => {
				this.fetchData4Chart();
				this.renderView4Rows();
			}
		);
	}

	/**
	 * 下1周
	 */
	nextWeek() {
		this.setState(
			{beginDate:this.nextBeginDate(), endDate:this.nextEndDate(), statisDate:this.nextEndDate()},
			() => {
				this.fetchData4Chart();
				this.renderView4Rows();
			}
		);
	}

	renderView4Rows() {
		return (
			<PageList
				style = {estyle.fx1}
				renderRow = {
					(row) => {
						return (
							<View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
								<View style={estyle.fx1}>
									<Text style={[estyle.articleTitle]}>{row.carCode}</Text>
									<View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
										<Icons.IconUser color={Env.color.main}/>
										<Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
										<Text style={[estyle.note, {color: Env.color.text}]}>{row.mainDriver}</Text>
										<Text style={[estyle.note, estyle.marginLeft]}>副：</Text>
										<Text style={[estyle.note, {color: Env.color.text}]}>{row.subDriver}</Text>
									</View>
								</View>
								<View style={[estyle.paddingRight, estyle.marginRight]}>
									<Text style={{fontSize:Env.font.note, color:Env.color.main}}>当日总里程</Text>
									<Text>当日总里程</Text>
								</View>
							</View>
						)
					}
				}
				fetchData = {
					(pageNumber, pageSize) => getMileageStatisitcsList4Day(this.state.statisDate, pageNumber, pageSize)
				}
			/>
		)
	}

	setStatisDate() {
		// this.setState({isRefreshing: true, statisDate:'20161011'}, () => {
		// 	this.renderView4Rows();
		// });
		this.setState({statisDate:'20161011'}, () => {

		});
	}

	render() {
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="里程统计"/>
				<View><Text>图表【TODO】</Text></View>
				<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
					<TouchableHighlight onPress={() => this.preWeek()}>
						<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
							<Icons.IconCaretLeft style={{fontSize:Env.font.note,color:Env.color.main}}/>
							<Text style={{fontSize:Env.font.note,color:Env.color.main}}>上一周</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight onPress={() => this.nextWeek()}>
						<View style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
							<Text style={[estyle.note]}>下一周</Text>
							<Icons.IconCaretRight style={estyle.note}/>
						</View>
					</TouchableHighlight>
				</View>

				<Text>==============================================</Text>
				<Text>===============以下是chart图==================</Text>
				<Text>==============================================</Text>

				{this.renderView4Chart()}
				<ConfirmButton style={[estyle.marginVertical]} size="large" onPress={() => this.setStatisDate()}><Text>查看某天的数据</Text></ConfirmButton>

				<Text>==============================================</Text>
				<Text>================以下是列表====================</Text>
				<Text>==============================================</Text>

				<ScrollView style={[estyle.fx1,estyle.containerBackgroundColor]}>
					{this.renderView4Rows()}
				</ScrollView>

			</View>
		);
	}
}