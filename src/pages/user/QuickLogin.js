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

import { UserActions,TYPES } from '../../actions/index';

import PhoneInput from '../../components/Inputs/Phone';
import TopBanner from '../../components/TopBanner';
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';
import LabelInput from '../../components/LabelInput.android';
import ConfirmButton from '../../components/ConfirmButton.android';

import SaveTrueName from './SaveTrueName';
import HomeRouter from '../HomeRouter';
import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;


class QuickLogin extends Component {
	constructor(props){
		super(props);
		this.state = {
			phone: '',
			code: ''
		}
	}

	next = () => {
		this.props.router.push(HomeRouter);
	}

	vertify() {
		return LabelInput.Validate(this.refs);
	}

	sendCode(){
		if(this.refs.phone.validate()) {
			this.props.dispatch(UserActions.sendQuickLoginCode(this.state.phone));
		}
	}

	onLogin() {
		if(this.vertify()) {
			this.props.dispatch(UserActions.doQuickLogin(this.state.phone, this.state.code, this.next));
		}
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="手机快捷登录"/>
				<View
					style={[estyle.fxRowCenter]}
				>
					<PhoneInput
						ref="phone"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={phone => this.setState({phone})}
						labelSize={3}
						validates={[
							{require:true, msg: emsg.phone.require},
							{pattern:pattern.phone, msg: emsg.phone.pattern}
						]}
					/>
					<PhoneChkCodeInput
						ref="code"
						style={[estyle.borderBottom]}
						onChangeText={code => this.setState({code})}
						sendCode = {this.sendCode.bind(this)}
						sendCodeStatus = {this.props.sendCodeStatus}
						labelSize={3}
						validates={[
							{require:true, msg: emsg.code.require},
							{pattern:pattern.code, msg: emsg.code.pattern}
						]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton disabled={this.props.userStore.status === TYPES.LOGGED_DOING}
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
	return {
		userStore: stores.userStore,
		sendCodeStatus: stores.sendCodeStore
	}
})(QuickLogin);