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

	static defaultProps = {
        onTimeChange: () => {}
	}


	constructor(props) {
		super(props);
		this.state = {
			data: null,
			animating: false,
			carId: props.nav.carId
		}
	}

    selectTime = null;
	fetchData() {
		let date = this.selectTime;
	//	this.time = Math.random();
		this.setState({animating: true, data: null});
		queryTrack(Object.assign({carId: this.state.carId, zoom: 0}, date)
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

    componentWillReceiveProps(nextProps){
		if(nextProps.nav.carId !== this.props.nav.carId){
			this.setState(
				{carId:nextProps.nav.carId},
				() => {
					this.selectTime && this.fetchData();
				}
			)
		}
	}

    onTimeChange(){
        this.props.onTimeChange(this.selectTime);
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: 80, marginTop:Env.screen.height / 3 * Env.font.base}}>
                    <ActivityIndicator animating={this.state.animating} color={[Env.color.main]} size="large"/>
                </View>
				<View style={[estyle.fx1]}>
					<MapLine data={this.state.data} time={this.time} {...this.props}/>
				</View>
				<DateButtonGroup {...this.props}
								 selectTime={(date) => {
								 	this.selectTime = date;
									this.onTimeChange();
									this.fetchData();
								}}
								 isFetching={this.state.animating}/>
			</View>
		);
	}
}