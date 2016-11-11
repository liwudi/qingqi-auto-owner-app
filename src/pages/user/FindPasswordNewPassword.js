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
import PasswordInput from '../../components/Inputs/Password';
import ConfirmButton from '../../components/ConfirmButton';

import Login from './index';

import Env from '../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class FindPasswordNewPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			password: ''
		}
		//console.info(this.props.findPasswordStore.phoneInfo)
		this.phone = this.props.findPasswordStore.phoneInfo.phone;
		this.smsCode = this.props.findPasswordStore.phoneInfo.smsCode;
	}

	onModifyPassword(){
		this.props.dispatch(UserActions.findPasswordNewPassword(this.phone, this.state.password,this.smsCode, () => {
			this.props.router.resetTo(Login);
		}));
	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="忘记密码"/>
				<View  style={[estyle.fxRowCenter]}>
					<PasswordInput
						ref="password"
						defaultValue={this.state.password}
						style={[estyle.borderBottom, estyle.marginTop]}
						onChangeText={password => this.setState({password})}
						validates={[
							{require:true, msg: emsg.password.require},
							{pattern:pattern.password, msg: emsg.password.pattern}
						]}
					/>

					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton
						size="large"
						disabled={this.props.findPasswordStore.type === TYPES.FINDPASS_STEP3_DOING}
						onPress={() => this.onModifyPassword()}>
						<Text>确定</Text></ConfirmButton>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { findPasswordStore: stores.findPasswordStore}
})(FindPasswordNewPassword);