/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet,
	Image,
	Alert
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import LabelInput from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';
const estyle = Env.style;
export default class MyDriverEdit extends Component {
	logout(){
		Alert.alert('提示',
			'是否从车队中删除**司机？',
			[
				{text: '确定'},
				{text: '取消'}
			])
	}
	render() {
		const topRightView= () => {
			return (
				<View style={estyle.fxRow}>
					<Text onPress={this.logout}>删除</Text>
				</View>
			)
		};
		return (
			<View style = {estyle.fx1}>
				<TopBanner {...this.props} title="编辑手机联系人" rightView={ topRightView()}/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='梁大人'
						label="姓名"
						labelSize="3"
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='13301298761'
						label="电话"
						labelSize="3"
					/>
				</View>
				<View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
					<View style = {estyle.padding}>
						<ConfirmButton size="middle" >呼叫</ConfirmButton>
					</View>
					<View style = {estyle.padding}>
						<ConfirmButton size="middle" >保存</ConfirmButton>
					</View>

				</View>
			</View>
		);
	}
}