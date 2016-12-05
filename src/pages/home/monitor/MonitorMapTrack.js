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
import TrackPlayback from '../components/TrackPlayback';
import Env from '../../../utils/Env';
const estyle = Env.style;
export default class MonitorMapTrack extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="轨迹回放"/>
				<TrackPlayback {...this.props}/>
			</View>
		);
	}
}