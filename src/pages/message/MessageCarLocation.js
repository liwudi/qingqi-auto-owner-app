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

import Toast from '../../components/Toast';
import Slider from 'react-native-slider';

import TopBanner from '../../components/TopBanner';
import MapbarMap from '../../mapbarmap/MapbarMap';
import Button from '../../components/widgets/Button';

import {IconList, IconClock, IconLocation} from '../../components/Icons';




/*海量打点， 单车*/

import StatusDetail from './components/StatusDetail';
import {queryCarConditionDetail} from '../../services/MonitorService';
import Env from '../../utils/Env';
const estyle = Env.style;
const legend = [
	{
		value: '行驶',
		color: Env.color.main
	},
	{
		value: '怠速',
		color: Env.color.auxiliary
	},
	{
		value: '离线',
		color: Env.color.note
	}
];


export default class MessageCarLocation extends Component {
	constructor() {
		super();
		this.zoom = 1;
		this.center = {
			longitude: 104.621367,
			latitude: 35.317133
		};
		this.mapRef = null;
		this.state = {
			data: null
		}
	}


	//单车车辆信息
	fetchData() {
		console.info(this.props.nav)
		queryCarConditionDetail(this.props.nav).then((data) => {
		//queryCarConditionDetail({type:6, stype:1, msgId: 44, userId:20}).then((data) => {
			this.setData(data);
		}).catch(() => {
			Toast.show('没有详情', Toast.SHORT);
			console.info('data catch')
		})
	}
	setData(data) {
		this.setState({data});
		this.setMarker(data);
	}
	setMarker(data) {
		console.info('--------------------------')
		console.info(data)
		let pt = this.MPoint([data.longitude, data.latitude]),
			ox = 0.5,
			oy = 17,
			imageName = "res/icons/c100" + (data.travelStatus || 2) + ".png",
			direction = data.direction,
			iconText = data.carNumber,
			id = Math.floor(Math.random() * 100);
		let mkOpts = {
			longitude: pt.longitude,
			latitude: pt.latitude,
			title: '',
			imageName: 'ic_mask',
			iconText: iconText,
			iconTextColor: Env.color.main,
			iconTextSize: 14,
			id: id,
			offsetX: ox,
			offsetY: oy,
			click: false
		}
		this.Marker.add([mkOpts]);
		mkOpts = {
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: id,
			click: false,
			imageName: imageName,
			direction: direction
		}
		this.MarkerRotate.add([mkOpts]);
		this.Map.setCenter(pt);

		setTimeout(() => {
			this.Map.setZoomLevel(8);
		}, 300);
/*
		let list = this.list || [];
		//    console.info(list)
		if (list.length) {
			this.markers.length = this.markers_d.length = 0;
			list.forEach((item, idx) => {
				this.addMarkerOpts(item, idx);
			});
			this.Map.clearOverlays();
			this.Marker.add(this.markers);
			this.MarkerRotate.add(this.markers_d);
		}*/
	}

/*	addMarkerOpts(data, idx) {
		let iconText = data.carNo,
			ox = 0.5,
			oy = 17,
			imageName = "res/icons/c100" + data.travelStatus + ".png",
			direction = data.direction;
		if (data.count > 1) {
			iconText = data.count.toString();
			ox = 0.2;
			oy = 0;
			direction = 0;
			imageName = "res/icons/c1002-e.png";
		}
		let pt = this.MPoint([data.longitude, data.latitude]),
			mkOpts = {
				longitude: pt.longitude,
				latitude: pt.latitude,
				title: '',
				imageName: 'ic_mask',
				iconText: iconText,
				iconTextColor: Env.color.main,
				iconTextSize: 14,
				id: idx,
				offsetX: ox,
				offsetY: oy,
				click: true
			}
		this.markers.push(mkOpts);
		mkOpts = {
			longitude: pt.longitude,
			latitude: pt.latitude,
			id: idx,
			click: true,
			imageName: imageName,
			direction: direction
		}
		this.markers_d.push(mkOpts);
	}*/


	onInit(instance) {
		this.mapRef = instance.getMapRef();
		this.Map = instance;
		this.MPoint = instance.MPoint;
		this.Marker = instance.Marker;
		this.MarkerRotate = instance.MarkerRotate;
		this.fetchData();
	}



	renderLegend() {
		return <View style={[styles.legendView, estyle.padding, {paddingBottom: Env.font.base * 10}]}>
			{legend.map((item, index) =>
				<View style={[styles.legendItem, {paddingBottom: Env.font.base * 10}]} key={index}>
					<View style={[{
						backgroundColor: item.color,
						width: Env.font.base * 20,
						height: Env.font.base * 20,
						borderRadius: 100
					}, estyle.marginRight]}/>
					<Text style={[styles.legendText]}>{item.value}</Text>
				</View>
			)}
		</View>
	}

	renderBottom() {
		return <StatusDetail data={this.state.data}/>

	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="车辆事件定位"/>
				<MapbarMap zoom={this.zoom}
						   center={this.center}
						   onInit={(instance)=> {
							   this.onInit(instance);
						   }}
						   legend={this.renderLegend()}/>
				{this.state.data && this.renderBottom()}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	legendItem: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	legendText: {
		color: '#FFF',
		fontSize: Env.font.note
	},

	legendView: {
		position: 'absolute',
		backgroundColor: Env.color.modalBg,
		bottom: Env.font.base * 30,
		right: Env.font.base * 150,
		borderRadius: Env.font.base * 10,
		padding: Env.font.base * 10
	}
});