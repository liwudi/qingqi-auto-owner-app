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
	StyleSheet,
	Image
} from 'react-native';

import {UserActions, TYPES} from '../../actions/index';

import { getCaptcha, CAPTCHA_TYPE_FIND_PASSWORD } from '../../services/UserService';

import TopBanner from '../../components/TopBanner';
import LabelInput from '../../components/LabelInput';
import ConfirmButton from '../../components/ConfirmButton.android';
import PhoneInput from '../../components/Inputs/Phone';

import FindPasswordCheckCode from './FindPasswordCheckCode';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class FindPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			phone:'13123222333',
			captcha:'',
			captchaImg: false
		};
	}

	next = () => {
		this.props.router.replace(FindPasswordCheckCode);
	}

	onCheckCaptcha(){
		PhoneInput.Validate(this.refs) &&
		this.props.dispatch(UserActions.doFindPasswordCheckCaptcha(
			this.state.phone,
			this.state.captcha,
			this.next
		));
	}

	onPhoneChange(phone){
		phone && this.setState({phone});
		setTimeout(() => {
			if(this.refs.phone && this.refs.phone.validate(false)){
				this.setState({captchaImg:true});
			}else{
				this.setState({captchaImg:false});
			}
		},100);
	}

	componentDidMount(){
		this.onPhoneChange()
	}

	imgCapthCache = null;
	oldPhone = null;

	render() {

		let captcha = () => {
			if(this.state.captchaImg){
				if(this.oldPhone !== this.state.phone){
					this.oldPhone = this.state.phone;
					this.imgCapthCache = <Image
						style={{width:120,height:30}}
						resizeMode={Image.resizeMode.cover}
						source={{uri: getCaptcha(this.state.phone, CAPTCHA_TYPE_FIND_PASSWORD)}}
					/>;
				}

				return this.imgCapthCache;
			}else{
				return <View/>
			}
		}

		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="找回密码"/>
				<View  style={[estyle.fxRowCenter]}>
					<PhoneInput
						ref="phone"
						defaultValue={this.state.phone}
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={phone => this.onPhoneChange(phone)}
						validates={[
							{require:true, msg:emsg.phone.require},
							{pattern:pattern.phone, msg: emsg.phone.pattern}
						]}
						labelSize="3"
					/>
					<LabelInput
						ref="captcha"
						style = {[estyle.borderBottom]}
						onChangeText={captcha => this.setState({captcha})}
						secureTextEntry={true}
						placeholder='图形验证码'
						label="验证码"
						labelSize="3"
						rightView={captcha()}
						validates={[
							{require:true, msg: '请填写图形验证码'}
						]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton
						size="large"
						onPress={() => this.onCheckCaptcha()}
						disabled={this.props.findPasswordStore.type === TYPES.FINDPASS_STEP1_DOING}
					>
						<Text>下一步</Text>
					</ConfirmButton>

				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { findPasswordStore: stores.findPasswordStore }
})(FindPassword);