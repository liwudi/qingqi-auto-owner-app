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

import { UserActions } from '../../../actions/index';
import { changeBindSendCode, bindNewMobile, SEND_SMS_TYPE_BIND_NEW } from '../../../services/UserService';

import PhoneInput from '../../../components/Inputs/Phone';
import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import CancelButton from '../../../components/CancelButton';
import SendMobileCode from '../../../components/Inputs/SendMobileCode';

import Toast from '../../../components/Toast';

import Env from '../../../utils/Env';
const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;


class ModifyMobileNewMobile extends Component {
	constructor(props){
		super(props);
		this.userInfo = props.userInfo || {};
		this.state = {
			phone: this.userInfo.mobile
		}
	}

	onNext(){
		if(PhoneInput.Validate(this.refs)){
			bindNewMobile(this.state.phone, this.state.smsCode, this.props.phone, this.props.smsCode)
				.then(rs => {
					this.props.router.pop();
				})
				.catch(e => {
					Toast.show(e.message || '系统异常，请稍后再试', Toast.SHORT);
				});
		}
	}

	sendSmsCode = () => {
		if(this.refs.phone.validate()){
			return changeBindSendCode(this.state.phone, SEND_SMS_TYPE_BIND_NEW)
		}else{
			return false;
		}
	}

	render() {
		return (
			<View style={styles.body}>
				<TopBanner {...this.props} title="绑定新手机"/>
				<View  style={styles.loginView}>
					<PhoneInput
						ref="phone"
						defaultValue={this.state.phone}
						onChangeText={phone => this.setState({phone})}
						placeholder='要绑定的新手机'
						labelSize={3}
						validates={[
							{require:true, msg:emsg.phone.require},
							{pattern:pattern.phone, msg: emsg.phone.pattern}
						]}
					/>
					<SendMobileCode
						onChangeText={smsCode => this.setState({smsCode})}
						sendCode={this.sendSmsCode}
					/>
					<ConfirmButton style={{marginTop:10}} size="large" onPress={() => this.onNext()}><Text>绑定</Text></ConfirmButton>
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
	return { userStore: stores.userStore }
})(ModifyMobileNewMobile);