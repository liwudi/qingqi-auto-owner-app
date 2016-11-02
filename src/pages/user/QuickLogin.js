/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet
} from 'react-native';

import { UserActions } from '../../actions/index';

import TopBanner from '../../components/TopBanner';
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';
import LabelInput from '../../components/LabelInput';
import ConfirmButton from '../../components/ConfirmButton';
import SaveTrueName from './SaveTrueName'
import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;
class QuickLogin extends Component {
	constructor(props){
		super(props);
		this.formData = {phone: {}, code: {}};
	}

	next = () => {
		this.props.router.push(SaveTrueName);
	}
	onLogin() {
		if(this.vertify()) {
			this.props.dispatch(UserActions.doQuickLogin(this.formData, this.next));
		}
	}
	vertify() {
		let data = this.formData;
		for(let k in data) {
			let v = data[k];
			if (!v.vertify) {
				v.msg && ToastAndroid.show(v.msg, ToastAndroid.SHORT);
				return false;
			}
		}
		return true;
	}

	setFromData(name, value) {
		this.formData[name] = value;
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="手机快捷登录"/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style={[estyle.marginTop, estyle.borderBottom]}
						keyboardType="numeric"
						label="手机"
						placeholder={emsg.phone.placeholder}
						labelSize={3}
					/>
				{/*	<PhoneInput
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={value => this.setFromData('phone', value)}
						labelSize={3}
					/>*/}
					<PhoneChkCodeInput
						style={[estyle.borderBottom]}
						onChangeText={value => this.setFromData('code', value)}
						labelSize={3}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton disabled={this.props.userStore.status === 'doing'}
								   size="large" onPress={() => this.onLogin()}><Text>登录</Text></ConfirmButton>
					<View style={[estyle.fxRow, {alignItems:'flex-start'}, estyle.paddingTop]}>
						<Text style={[{fontSize: Env.font.mini}]}>注册视为同意</Text>
						<Text style={[{fontSize: Env.font.mini, color:Env.color.main}]}>服务条款和隐私政策</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default connect(function(stores) {
	return { userStore: stores.userStore }
})(QuickLogin);