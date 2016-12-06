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
	componentWillUnmount() {
		this.props.nav.doBack && this.props.nav.doBack();
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title={this.props.nav.carCode}/>
				<TrackPlayback {...this.props}/>
			</View>
		);
	}
}