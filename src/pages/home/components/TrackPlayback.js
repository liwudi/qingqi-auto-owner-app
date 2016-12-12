/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import MapLine from '../components/mapline/MapLine';
import Env from '../../../utils/Env';
import Toast from '../../../components/Toast';
const estyle = Env.style;
import {queryTrack} from '../../../services/MonitorService';
import DateButtonGroup from './DateButtonGroup';
export default class TrackPlayback extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			animating: false
		}
	}

	fetchData(date) {
		this.time = Math.random();
		this.setState({animating: true, data: null});
		queryTrack(Object.assign({carId: this.props.nav.carId, zoom: 0}, date)
		).then((data) => {
			if(!data.lons) {
				data = null;
				Toast.show('没有行程轨迹', Toast.SHORT);
			}
			this.time = Math.random();
			this.setState({data: data, animating: false});
		}).catch(() => {
			this.time = Math.random();
			this.setState({data: null, animating: false});
			Toast.show('获取行程轨迹异常', Toast.SHORT);
		}).finally(()=>{});
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: 80, marginTop:Env.screen.height / 3 * Env.font.base}}>
                    <ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
                </View>
				<View style={[estyle.fx1]}>
					<MapLine data={this.state.data} time={this.time}/>
				</View>
				<DateButtonGroup {...this.props} selectTime={(date) => {this.fetchData(date)}} isFetching={this.state.animating}/>
			</View>
		);
	}
}