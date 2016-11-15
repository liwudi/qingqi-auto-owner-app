/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	NativeModules,
	DeviceEventEmitter,
	findNodeHandle,
	TouchableHighlight,
	Image
} from "react-native";

import TopBanner from '../../../components/TopBanner';
import Button from '../../../components/widgets/Button';
const MapView = require('../../../mapbarmap/MapView');
import CarItem from './components/CarItem';


import MapbarMap from '../../../mapbarmap/MapbarMap';
import  MapLine from '../MapLine';
import {queryRealTimeCar} from '../../../services/MonitorService';
import Env from '../../../utils/Env';
const estyle = Env.style;
import {IconClock, IconLocation, IconList} from '../../../components/Icons';
import Monitor from './Monitor';
import CarStatus from  './CarStatus';
import MonitorMap from './MonitorMap';
const legend = [
	{
		value:'行驶',
		color:Env.color.main
	},
	{
		value:'怠速',
		color:Env.color.auxiliary
	},
	{
		value:'离线',
		color:Env.color.note
	}
];
const TIMEOUT = 8; //单位 秒
export default class MonitorCarDetail extends Component {
	constructor() {
		super();
		this.MarkerId = -1; //单车id
		this.state = {
			data: null
		}
		this.zoom = 8;
		this.markers = [];  //普通标注
		this.markers_d = [];    //带角度的
	}

	fetchData() {
		queryRealTimeCar(this.props.nav.carId).then((data) => {
			this.setState({'data': data});
			this.setMarker(data);
		}).catch(() => {
			console.info('catch')
		}).finally(() => {
			this.clearTimer();
			this.timer = setTimeout(() => {
				this.fetchData();
			},TIMEOUT * 1000);
		})
	}
	clearTimer() {
		this.timer = clearTimeout(this.timer);
		this.timer = null;
	}
	setMarker(data) {
		//this.setState({data: data});
		if(this.markerId === -1) {
			this.MarkerId = parseInt(Math.random() * 100);
			this.addMarkerOpts(data, this.MarkerId);
			this.Marker.add(this.markers);
			this.MarkerRotate.add(this.markers_d);
		} else {
			this.markers.length = this.markers_d.length = 0;
			this.updateMarkerOpts(data, this.MarkerId);
			this.Marker.update(this.markers);
			this.MarkerRotate.update(this.markers_d);
		}
	}


	updateMarkerOpts(data, idx) {
		console.info('update marker')
		console.info(this.state)
		letpt = this.MPoint([data.lon, data.lat]);
		this.Marker.update([{
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: idx
		}]);
		let d = Math.floor(Math.random() * 100);
		data.travelStatus = parseInt(Math.random() * 3);
		data.direction = Math.floor(Math.random() * 100);
		this.MarkerRotate.update([{
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: idx,
			imageName: "res/icons/c100" + data.travelStatus + ".png",
			direction: data.direction
		}]);
	}


	addMarkerOpts(data, idx) {
		let pt = this.MPoint([data.lon, data.lat]);
			mkOpts = {
				longitude: pt.longitude,
				latitude: pt.latitude,
				title: data.carCode,
				imageName: "ic_mask",
				iconText: '',
				iconTextColor: Env.color.main,
				iconTextSize: 14,
				id: idx,
				offsetX: .5,
				offsetY: 12,
				click: true,
				callOut: true
			}
		this.markers.push(mkOpts);
		data.travelStatus = parseInt(Math.random() * 3);
		data.direction = Math.floor(Math.random() * 100);
		mkOpts = {
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: idx,
			click: true,
			imageName: "res/icons/c100" + data.travelStatus + ".png",
			direction: data.direction
		};
		this.markers_d.push(mkOpts);
	}

	componentDidMount() {
		console.info('fetch')
		//this.fetchData();
	}

	componentWillUnmount() {
		this.clearTimer();
		console.info('map delete2')
	}
	renderLegend () {
		return <View style={[styles.legendView, estyle.padding, {paddingBottom:Env.font.base * 10}]}>
			{legend.map((item, index) =>
				<View style={[styles.legendItem, {paddingBottom:Env.font.base * 10}]} key={index}>
					<View style={[{backgroundColor: item.color, width: Env.font.base * 20, height: Env.font.base * 20, borderRadius:100}, estyle.marginRight]}/>
					<Text style={[styles.legendText]}>{item.value}</Text>
				</View>
			)}
		</View>
	}
	onInit(instance) {
		this.Map = instance;
		this.MPoint = instance.MPoint;
		this.Marker = instance.Marker;
		this.MarkerRotate = instance.MarkerRotate;
		this.fetchData();
	}
	goToMapline() {
		this.props.router.push(MapLine, this.props.nav)
	}
	goToList() {
		if(this.props.nav.p === 'map') {
			this.props.router.replace(MonitorMap);
		} else {
			this.props.doBack();
		}
	}
	gotoStatus() {
		console.info(555)

		this.props.router.push(CarStatus, {
			nav: {
				carCode: 'carCode',
				carId: '10'
			}
		});
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="地图模式"
						   onPress={()=>{this.goToList()}}
						   rightView={
							   <Button onPress={() => {this.goToList()}} style={[{height:90 * Env.font.base}, estyle.paddingLeft]}>
								   <IconList color="#ffffff"/>
							   </Button>
						   }/>
				<MapbarMap onInit={(instance)=> {this.onInit(instance);}}
						   legend={this.renderLegend()}/>
				 <CarItem data={this.state.data || {}} onPress={() => {this.gotoStatus()}}/>
				<View style={[estyle.fxRow, estyle.borderTop, estyle.paddingVertical]}>
					<Button style={[estyle.fx1, estyle.borderRight,estyle.fxRow, estyle.fxCenter]}>
						<IconClock color={Env.color.main} size={Env.font.base * 38}/>
						<Text style={[estyle.text, {marginLeft: Env.font.base * 10}]}>实时监控</Text></Button>
					<Button style={[estyle.fx1, estyle.fxCenter, estyle.fxRow]} onPress={()=>{this.goToMapline()}}>
						<IconLocation color={Env.color.main} size={Env.font.base * 38}/>
						<Text style={[estyle.text, {marginLeft: Env.font.base * 10}]}>轨迹回放</Text></Button>
				</View>
			</View>
		)

	}
}
const styles = StyleSheet.create({
	legendItem:{
		flexDirection:'row',
		alignItems:'center'
	},
	legendText:{
		color:'#FFF',
		fontSize:Env.font.note
	},

	legendView : {
		position:'absolute',
		backgroundColor:Env.color.modalBg,
		bottom: Env.font.base * 30,
		right: Env.font.base * 150,
		borderRadius:Env.font.base * 10,
		padding:Env.font.base * 10
	}
});