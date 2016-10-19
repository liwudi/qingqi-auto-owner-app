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
	Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import LabelInput from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';
const estyle = Env.style;
export default class ManagerEdit extends Component {
	render() {
		const topRightView= () => {
			return (
				<View style={estyle.fxRow}>
					<Text>删除</Text>
				</View>
			)
		};
		return (
			<View style = {estyle.fx1}>
				<TopBanner {...this.props} title="编辑管理员" rightView={ topRightView()}/>
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
