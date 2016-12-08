/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	WebView
} from 'react-native';
import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import Button from '../../../components/widgets/Button'
import {IconShare} from '../../../components/Icons'
const DEFAULT_URL = 'http://m.mapbar.com';
export default class DriveLineMarkAnalysis extends Component {
	constructor(props){
		super(props);

	}

	toShare() {

	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="标杆车辆驾驶分析"
					rightView={<Button onPress={this.toShare.bind(this)}>
						<IconShare color={Env.color.navTitle} />
					</Button>}
				/>
				<WebView style={[estyle.fx1]}
						 source={{uri: DEFAULT_URL}}
						 startInLoadingState={true}
						 domStorageEnabled={true}
						 javaScriptEnabled={true}
				/>
			</View>
		);
	}
}