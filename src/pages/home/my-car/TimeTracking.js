/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import TrackPlayback from '../components/TrackPlayback';
import {connect} from 'react-redux'
import Env from '../../../utils/Env';
const estyle = Env.style;
class TimeTracking extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title={this.props.userStore.userInfo.carNo}/>
				<TrackPlayback {...this.props}/>
			</View>
		);
	}
}
export default connect(function (stores) {
	return {userStore: stores.userStore}
})(TimeTracking);