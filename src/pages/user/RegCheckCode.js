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
			<View style={styles.body}>
				<TopBanner {...this.props} title="注册"/>
				<View  style={styles.loginView}>
					<View style={{alignItems:'center',marginTop:10,marginBottom:10,}}>
						<Text style={{flex:1,textAlign:'center',color:Env.color.note,fontSize:Env.font.note}}>发送短信验证码到</Text>
						<Text style={{flex:1,textAlign:'center',color:Env.color.note,fontSize:Env.font.navTitle}}>+86 {this.props.regInfo.phone}</Text>
					</View>
					<PhoneChkCodeInput
						ref="smsCode"
						style = {styles.loginInput}
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
					<ConfirmButton
						style={{marginTop:10}}
						size="large"
						disabled={this.props.regStore.status === TYPES.REG_STEP1_DOING}
						onPress={() => this.onReg()}>
						<Text>注册</Text>
					</ConfirmButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	loginView:{
		alignItems:'center'
	},
	loginInput:{
		marginTop:10
	}

});


export default connect(function(stores) {
	return { regStore: stores.regStore , sendCodeStatus : stores.sendCodeStore}
})(RegCheckCode);