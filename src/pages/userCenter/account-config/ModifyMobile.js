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

import { changeBindSendCode, checkChangeBindSmsCode } from '../../../services/UserService';

import PhoneInput from '../../../components/Inputs/Phone';
import TopBanner from '../../../components/TopBanner';
import SubmitButton from '../../../components/SubmitButton';
import SendMobileCode from '../../../components/Inputs/SendMobileCode';

import Toast from '../../../components/Toast';

import Env from '../../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

import ModifyMobileNewMobile from './ModifyMobileNewMobile';

class ModifyMobile extends Component {
	constructor(props){
		super(props);
		this.userInfo = props.userStore.userInfo || {};
		this.state = {
			phone: this.userInfo.phone,
			doing: false
		}
	}

	onNext(){
		if(PhoneInput.Validate(this.refs)){
			this.setState({doing: true});
			checkChangeBindSmsCode(this.state.phone, this.state.smsCode)
				.then(rs => {
					this.setState({doing: false});
					this.props.router.replace(ModifyMobileNewMobile, {
						phone: this.state.phone,
						smsCode: this.state.smsCode
					})
				})
				.catch(e => {
					this.setState({doing: false});
					Toast.show(e.message || '系统异常，请稍后再试', Toast.SHORT);
				})/*.finally(() => {
					this.setState({doing: false})
			});*/
		}
	}

	sendSmsCode = () => {
		// return Promise.resolve({});
		if(this.refs.phone.validate()){
			return changeBindSendCode(this.state.phone)
		}else{
			return false;
		}
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="修改绑定手机"/>
				<View style={[estyle.fxRowCenter]}>
					<PhoneInput
						ref="phone"
						style={[estyle.marginTop, estyle.borderBottom]}
						defaultValue={this.userInfo.phone}
						onChangeText={phone => this.setState({phone})}
						placeholder='当前绑定的手机'
						labelSize={3}
						require={true}
					/>
					<SendMobileCode
						onChangeText={smsCode => this.setState({smsCode})}
						style={[estyle.borderBottom]}
						sendCode={this.sendSmsCode}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<SubmitButton doing={this.state.doing} size="large" onPress={() => this.onNext()}>下一步</SubmitButton>
				</View>
			</View>
		);
	}
}

export default connect(function(stores) {
	return { userStore: stores.userStore }
})(ModifyMobile);