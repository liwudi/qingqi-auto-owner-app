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
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';
import ConfirmButton from '../../components/ConfirmButton.android';

import FindPasswordNewPassword from './FindPasswordNewPassword';

import Env from '../../utils/Env';


const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class FindPasswordCheckCode extends Component {
	constructor(props){
		super(props);
		this.phone = this.props.findPasswordStore.phoneInfo.phone;
	}

	sendCode(){
		this.props.dispatch(UserActions.findPasswordReSendCode(this.phone));
	}

	next(){
		if(this.refs.code.validate()){
			this.props.dispatch(UserActions.findPasswordCheckSmsCode(this.phone, this.state.code, () => {
				this.props.router.replace(FindPasswordNewPassword)
			}))
		}
	}

	render() {
		return (
			<View style={styles.body}>
				<TopBanner {...this.props} title="忘记密码"/>
				<View  style={styles.loginView}>
					<View style={{alignItems:'center',marginTop:10,marginBottom:10,}}>
						<Text style={{flex:1,textAlign:'center',color:Env.color.note,fontSize:Env.font.note}}>已发送短信验证码到</Text>
						<Text style={{flex:1,textAlign:'center',color:Env.color.note,fontSize:Env.font.navTitle}}>+86 {this.phone}</Text>
					</View>
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
					<ConfirmButton
						style={{marginTop:10}}
						size="large"
						disabled={this.props.findPasswordStore.type === TYPES.FINDPASS_STEP2_DOING}
						onPress={() => this.next()}><Text>下一步</Text></ConfirmButton>
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
	return { findPasswordStore: stores.findPasswordStore , sendCodeStatus : stores.sendCodeStore }
})(FindPasswordCheckCode);