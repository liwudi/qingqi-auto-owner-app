import React, { Component } from 'react';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';

import Env from '../../../utils/Env';
const estyle = Env.style;
export default class ModifyVehicleLicence extends Component {
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="修改车牌号"/>
				<View style={[estyle.fxRowCenter]}>
					<LabelInput
						style={[estyle.marginTop, estyle.borderBottom]}
						label="车牌号"
						labelSize={3}
						placeholder="请输入车牌号"
						onChangeText={value => this.setFromData('username', value)}
					/>
					<ConfirmButton style={[estyle.marginTop]} size="large">保存</ConfirmButton>
				</View>
			</View>
		);
	}
}