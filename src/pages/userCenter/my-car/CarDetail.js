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
import DriveLine from './DriveLine';
import ListTitle from '../../../components/ListTitle';
import ListItem from '../../../components/ListItem';
import TopBanner from '../../../components/TopBanner';

export default class CarDetail extends Component {
	constructor(props){
		super(props);
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
	componentWillMount() {
		this.fetchData();
	}

	goToParams() {
		this.props.router.push(CarParameter, {nav: {
			carId: this.props.nav.carId,
			carCode: this.state.data.carCode
		}});
	}
	goToRoute() {
		this.props.router.push(DriveLine, {nav: {
			routeId: this.state.data.routeId
		}});
	}
	//修改车牌号
	modifyCarDode () {
		this.props.router.push(ModifyVehicleLicence, {nav: {
			carId: this.props.nav.carId,
			carCode: this.state.data.carCode
		}});
	}

	renderList() {
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
		console.info(data)
		return <View>
			<ListTitle title="车辆详情"/>
			<ListItem left="车牌号"
					  right={data.carCode}
					  color={Env.color.auxiliary}
					  style={[{paddingRight: paddingRight}]}/>

			{/*<ViewForRightArrow onPress={this.modifyCarDode.bind(this)}>
				<View style={[estyle.fxRow]}>
					<Text style={[estyle.text, {textAlign: 'left'}]}>车牌号</Text>
					<Text style={[estyle.fx1,estyle.text, {color:Env.color.auxiliary, textAlign: 'right'}]}>{data.carCode}</Text>
				</View>
			</ViewForRightArrow>*/}
			<ViewForRightArrow onPress={this.goToParams.bind(this)}>
				<View style={[estyle.fxRow]}>
					<Text style={[estyle.text, {textAlign: 'left'}]}>车辆参数</Text>
				</View>
			</ViewForRightArrow>

			<ListTitle title="车主信息"/>
			<ViewForRightArrow rightIcon={IconCall}
							   iconSize={Env.vector.call.size}
							   iconColor={Env.color.main}>
				<View style={[estyle.fxRow]}>
					<Text style={[estyle.text, {textAlign: 'left'}]}>车主</Text>
					<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>{data.carOwnname}</Text>
				</View>
			</ViewForRightArrow>
				{
					data.adminList.length ? data.adminList.map((item={}, idx) => {
						return <ViewForRightArrow  key={idx} rightIcon={IconCall}
										   iconSize={Env.vector.call.size}
										   iconColor={Env.color.main}>
						<View style={[estyle.fxRow]}>
							<Text style={[estyle.text, {textAlign: 'left'}]}>管理员</Text>
							<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>{item.userName}</Text>
						</View>
						</ViewForRightArrow>

					}) : <ListItem left="管理员"
								   right="无"
								   style={[{paddingRight: paddingRight}]}/>
				}
			<ListTitle title="驾驶司机"/>
			{
				data.mainDriver ? <ViewForRightArrow rightIcon={IconCall}
													 iconSize={Env.vector.call.size}
													 iconColor={Env.color.main}>
					<View style={[estyle.fxRow]}>
						<Text style={[estyle.text, {textAlign: 'left'}]}>主驾驶</Text>
						<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>{data.mainDriver}</Text>
					</View>
				</ViewForRightArrow> :
					<ListItem left="主驾驶"
							  right="无"
							  style={[{paddingRight: paddingRight}]}/>
			}
			{
				data.subDriver ? <ViewForRightArrow rightIcon={IconCall}
													iconSize={Env.vector.call.size}
													iconColor={Env.color.main}>
					<View style={[estyle.fxRow]}>
						<Text style={[estyle.text, {textAlign: 'left'}]}>副驾驶</Text>
						<Text style={[estyle.fx1,estyle.text, {color:Env.color.note, textAlign: 'right'}]}>{data.subDriver}</Text>
					</View>
				</ViewForRightArrow> :
					<ListItem left="副驾驶"
							  right="无"
							  style={[{paddingRight: paddingRight}]}/>
			}


			<ListTitle title="行驶线路"/>
			<ViewForRightArrow onPress={this.goToRoute.bind(this)}>
				<View style={[estyle.fxRow]}>
					<Text style={[estyle.text, {textAlign: 'left'}]}>{data.routeInfo}</Text>
				</View>
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