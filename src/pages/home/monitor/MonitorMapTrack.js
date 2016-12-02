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
import TopBanner from '../../../components/TopBanner';
import MapLine from '../components/mapline/MapLine';
import Env from '../../../utils/Env';
import Toast from '../../../components/Toast';
const estyle = Env.style;
import {queryTrack} from '../../../services/MonitorService';
import DateButtonGroup from '../components/DateButtonGroup';
export default class MonitorMapTrack extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			animating: false
		}
	}
	selectTime(date) {
		this.fetchData(date);
	}

	doBack() {
		console.info('---------------------------doback')

		this.props.nav.doBack();
		//this.props.router.pop();
	}
	fetchData(date) {
		this.setState({animating: true});
		//Toast.show('正在查询轨迹信息', Toast.SHORT);
		//queryTrack({carId: 'ydtest00300', zoom: 0, beginDate: '20161110', endDate: '20161110'}
		queryTrack({carId: '20161124084', zoom: 0, beginDate: '20161130', endDate: '20161130'}
		//queryTrack(Object.assign({carId: this.props.nav.carId, zoom: 11}, date)
		).then((data) => {
			this.setState({animating: false});
			data && this.setData(data);
        }).catch(() => {
			this.setState({animating: false});
			Toast.show('没有行程轨迹', Toast.SHORT);
		}).finally(() => {

		});
	}
	setData(data) {
		this.setState({data: data});
	}
	componentWillUnmount() {
		console.info('out')
		this.props.nav.doBack();
	}
/*	componentDidMount() {
		this.fetchData();
	}*/

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="轨迹回放"/>
                <View style={{position:'absolute', zIndex:10, width: Env.screen.width, height: 80, marginTop:Env.screen.height / 3 * Env.font.base}}>
                    <ActivityIndicator
						animating={this.state.animating}
                        color={[Env.color.main]}
                        size="large"
                    />
                </View>

				<View style={[estyle.fx1]}>
					<MapLine data={this.state.data}/>
				</View>
				<DateButtonGroup {...this.props}  selectTime={(date) => {this.selectTime(date)}}/>
			</View>
		);
	}
}