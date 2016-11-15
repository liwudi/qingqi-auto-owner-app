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
	}

	fetchData() {
		queryRealTimeCar(this.props.nav.carId).then((data) => {
			this.setState({'data': data});
		}).catch(() => {
			/*this.addCar({
				"travelStatus": 1,
				"carStatus": "水温过高",
				"realtimeOil": 8.5,
				"realtimeSpeed": 88.8,
				"todayLen": 88.8,
				"position": "辽宁省沈阳市华航大厦",
				"slaveDriver": "李四",
				"mastDriver": "张三",
				"lat": 28.68291,
				"lon": 115.95380,
				"carCode": "辽A88888",
				"carId ": 888888
			})*/
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
	addMarker() {
		console.info('add marker')
		console.info(this.state)
		let data = this.state.data,
			pt = this.MPoint([data.lon, data.lat]);
		this.Map.setCenter(pt);
		let mkOpts = {longitude: pt.longitude,
			latitude: pt.latitude,
			title: '',
			imageName: "",
			iconText: data.carCode,
			iconTextColor: Env.color.main,
			iconTextSize: 14,
			id: this.MarkerId,
			offsetX: 5,
			offsetY: 5,
			click: true
		}
		console.info(mkOpts);
		this.Marker.add([mkOpts]);
		mkOpts = {
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: this.MarkerId,
			click: true,
			imageName: "res/icons/c100" + data.travelStatus + ".png",
			direction: Math.floor(Math.random() * 100)
		}
		console.info(mkOpts);
		this.MarkerRotate.add([mkOpts]);
	}


	update() {
		console.info('update marker')
		console.info(this.state)
		let data = this.state.data,
			pt = this.MPoint([data.lon, data.lat]);
		this.Marker.update([{
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: this.MarkerId/*,
			title: '',
			imageName: "",
			iconText: data.carCode,
			iconTextColor: Env.color.main,
			iconTextSize: 14,

			offsetX: 10,
			offsetY: 5*/
		}]);
		let d = Math.floor(Math.random() * 100);
		data.travelStatus = parseInt(Math.random() * 3);
		console.info('d----------------', d)
		this.MarkerRotate.update([{
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: this.MarkerId,
			imageName: "res/icons/c100" + data.travelStatus + ".png",
			direction: d
		}]);
	}
	addCar() {
		if(!this.state.data) return;
		if(this.MarkerId == -1) {
			this.MarkerId = parseInt(Math.random() * 100);
			this.addMarker();
		} else {
			console.info('update')
			this.update();
		}

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
	initMap(instance) {
		this.Map = instance;
		this.MPoint = instance.MPoint;
		this.Marker = instance.Marker;
		this.MarkerRotate = instance.MarkerRotate;
		this.fetchData();
	}
	goToMapline() {
		this.props.router.push(MapLine, this.props.nav)
	}

	render() {
		this.addCar();
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="地图模式" rightView={
							   <Button onPress={() => {this.props.doBack();}} style={[{height:90 * Env.font.base}, estyle.paddingLeft]}>
								   <IconList color="#ffffff"/>
							   </Button>
						   }/>
				<MapbarMap initMap={(instance)=> {this.initMap(instance);}} legend={this.renderLegend()}/>
				 <CarItem data={this.state.data || {}}/>
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