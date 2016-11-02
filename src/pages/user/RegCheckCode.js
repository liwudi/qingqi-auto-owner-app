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

import { UserActions, TYPES } from '../../actions/index';

import TopBanner from '../../components/TopBanner';
import ConfirmButton from '../../components/ConfirmButton';
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';
import Login from './Login';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class RegCheckCode extends Component {
	constructor(props){
		super(props);
	}

	next(loginInfo){
		this.props.router.replace(Login, {loginInfo})
	}

	onReg(){
		PhoneChkCodeInput.Validate(this.refs) && this.props.dispatch(UserActions.doReg(
			this.props.regInfo.phone,
			this.props.regInfo.trueName,
			this.props.regInfo.password,
			this.state.smsCode,
			this.next
		));
	}

	sendCode(isReSend = false){
		this.props.dispatch(UserActions.sendRegCode(this.props.regInfo.phone, this.props.regInfo.captcha, isReSend));
	}

	componentDidMount(){
		this.sendCode();
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="注册"/>
				<View style={[estyle.fxRowCenter]}>
					<Text style={[estyle.marginTop, estyle.note]}>发送短信验证码到</Text>
					<Text style={[estyle.marginBottom, {color:Env.color.important,fontSize:Env.font.navTitle}]}>+86 {this.props.regInfo.phone}</Text>
					<PhoneChkCodeInput
						ref="smsCode"
						onChangeText={password => this.setState({password})}
						secureTextEntry={true}
						placeholder='短信验证码'
						label="验证码"
						sendCode = {this.sendCode.bind(this, true)}
						sendCodeStatus = {this.props.sendCodeStatus}
						validates={[
							{require:true, msg: emsg.code.require},
							{pattern:pattern.code, msg: emsg.code.pattern}
						]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton
						size="large"
						disabled={this.props.regStore.status === TYPES.REG_STEP1_DOING}
						onPress={() => this.onReg()}>
						注册
					</ConfirmButton>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { regStore: stores.regStore , sendCodeStatus : stores.sendCodeStore}
})(RegCheckCode);