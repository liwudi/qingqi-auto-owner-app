/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
	Text,
	View,
	ScrollView,
	RefreshControl
} from 'react-native';

import ViewForRightArrow from '../../../components/ViewForRightArrow';
import { IconCall } from '../../../components/Icons';
import Env from '../../../utils/Env';
const estyle = Env.style;
import {carInfo} from '../../../services/AppService';

import CarParameter from './CarParameter';
import ModifyVehicleLicence from './ModifyVehicleLicence';
import BoundDriver from './BoundDriver';
import BoundLine from './BoundLine';
import ListTitle from '../../../components/ListTitle';
import ListItem from '../../../components/ListItem';
import TopBanner from '../../../components/TopBanner';

export default class CarDetail extends Component {
	constructor(props){
		super(props);
		this.state = {
			isRefreshing: true
		}
	}
	fetchData () {
		this.setState({isRefreshing: true});
		carInfo(this.props.nav.carId)
			.then((data)=>{this.setState({data});})
			.catch()
			.finally(()=>{this.setState({isRefreshing: false});});
	};
	onRefresh() {
		this.fetchData();
	}
	componentDidMount() {
		this.fetchData();
	}

	goToParams() {
		this.props.router.push(CarParameter, {nav: {
			carId: this.props.nav.carId,
			carCode: this.state.data.carCode
		}});
	}

	selectLine() {
		this.props.router.push(BoundLine, {nav: {
			routeId: this.state.data.routeId
		}});
	}
		//修改车牌号
	 modifyCarDode () {
		 this.props.router.push(ModifyVehicleLicence, {
			 nav: {
				 carId: this.props.nav.carId,
				 carCode: this.state.data.carCode
			 }}
		 );
	 }

	selectDriverSub(){
		this.props.router.push(BoundDriver, {
			nav: {
				carId: this.props.nav.carId,
				carCode: this.state.data.carCode
			}}
		);
	}

	selectDriverMain(){
		this.props.router.push(BoundDriver, {
			nav: {
				carId: this.props.nav.carId,
				carCode: this.state.data.carCode
			}}
		);
	}

	renderList() {
		console.info(this.props)
		let paddingRight = Env.font.base * 94;
		/*
		 * data.routeId	Integer	路线Id
		 * data.subDriverId	String	副驾驶员ID
		 * data.subDriverPhoneNum	String	副驾驶员电话号码
		 * data.mainDriverid	String	主驾驶员ID
		 * data.mainDriverPhoneNum	String	主驾驶员电话号码
		 * data.speed	Integer	速度
		 * data.adminList	Object[]	管理员信息数组
		 * data.adminList#phoneNum	String	管理员电话信息
		 * data.adminList#userNnme	String	管理员名称
		 * */
		let data = this.state.data;
		return <View>
			<ListTitle title="车辆详情"/>

			<ViewForRightArrow onPress={this.modifyCarDode.bind(this)}>
				 <View style={[estyle.fxRow]}>
					 <Text style={[estyle.text, {textAlign: 'left'}]}>车牌号</Text>
					 <Text style={[estyle.fx1,estyle.text, {color:Env.color.auxiliary, textAlign: 'right'}]}>{data.carCode}</Text>
				 </View>
			 </ViewForRightArrow>
			<ViewForRightArrow onPress={this.goToParams.bind(this)}>
				<View style={[estyle.fxRow]}>
					<Text style={[estyle.text, {textAlign: 'left'}]}>车辆速度</Text>
					<Text style={[estyle.fx1,estyle.text, {color:Env.color.main, textAlign: 'right'}]}>45km/h</Text>
				</View>
			</ViewForRightArrow>
			<ViewForRightArrow onPress={this.goToParams.bind(this)}>
				<Text style={[estyle.text, {textAlign: 'left'}]}>轨迹回放</Text>
			</ViewForRightArrow>
			<ViewForRightArrow onPress={this.goToParams.bind(this)}>
				<Text style={[estyle.text, {textAlign: 'left'}]}>报警通知</Text>
			</ViewForRightArrow>
			<ViewForRightArrow onPress={this.goToParams.bind(this)}>
				<Text style={[estyle.text, {textAlign: 'left'}]}>车辆参数</Text>
			</ViewForRightArrow>

			<ListTitle title="驾驶司机"/>
			{
				data.mainDriver
					?
					<ViewForRightArrow
						rightIcon={IconCall}
						iconSize={Env.vector.call.size}
						iconColor={Env.color.main}
						onPress={this.selectDriverMain.bind(this)}>
						<View style={[estyle.fxRow,estyle.paddingRight]}>
							<Text style={[estyle.text, {textAlign: 'left'}]}>主驾驶</Text>
							<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>{data.mainDriver}</Text>
						</View>
					</ViewForRightArrow>
					:
					<ListItem left="主驾驶" right="无" style={[{paddingRight: paddingRight}]}/>
			}

			{
				data.subDriver
					?
					<ViewForRightArrow
						rightIcon={IconCall}
						iconSize={Env.vector.call.size}
						iconColor={Env.color.main}
						onPress={this.selectDriverSub.bind(this)}>
						<View style={[estyle.fxRow,estyle.paddingRight]}>
							<Text style={[estyle.text, {textAlign: 'left'}]}>副驾驶</Text>
							<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>{data.subDriver}</Text>
						</View>
					</ViewForRightArrow>
					:
					<ListItem left="副驾驶" right="无" style={[{paddingRight: paddingRight}]}/>
			}

			<ListTitle title="行驶线路"/>
			<ViewForRightArrow onPress={this.selectLine.bind(this)}>
				<Text style={[estyle.text, {textAlign: 'left'}]}>{data.routeInfo}</Text>
			</ViewForRightArrow>
		</View>
	}
	renderView() {
		if(this.state.data) {
			return this.renderList();
		}
		return <View/>
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="车辆详情"/>
				<ScrollView style={[estyle.fx1]}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isRefreshing}
									onRefresh={this.onRefresh.bind(this)}
									colors={Env.refreshCircle.colors}
									progressBackgroundColor={Env.refreshCircle.bg}
								/>
							}>
					{this.renderView()}
				</ScrollView>
			</View>
		);
	}
}