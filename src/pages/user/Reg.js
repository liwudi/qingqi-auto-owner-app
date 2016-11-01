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
import LabelInput from '../../components/LabelInput';
import ConfirmButton from '../../components/ConfirmButton';
import CancelButton from '../../components/CancelButton';

import Env from '../../utils/Env';
const estyle = Env.style;
class Reg extends Component {
	constructor(props){
		super(props);
	}

	onChange(input){
		this.setState(input);
	}

	onLogin(){
		this.props.dispatch(UserActions.doLogin(this.state));
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="注册"/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						onChangeText={password => this.onChange({password})}
						placeholder='手机'
						label="手机"
						labelSize="3"
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						onChangeText={password => this.onChange({password})}
						placeholder='请输入真实姓名'
						label="姓名"
						labelSize="3"
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						onChangeText={password => this.onChange({password})}
						secureTextEntry={true}
						placeholder='6-20位字符'
						label="密码"
						labelSize="3"
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						onChangeText={password => this.onChange({password})}
						secureTextEntry={true}
						placeholder='图形验证码'
						label="验证码"
						labelSize="3"
						rightView={<CancelButton size="small" onPress={(()=>{this.setState({alertActive:true})}).bind(this)}>获取验证码</CancelButton>}
					/>
					<ConfirmButton style={[estyle.marginVertical]} size="large" onPress={() => this.onLogin()}><Text>下一步</Text></ConfirmButton>
					<View style={[estyle.fxRow, {alignItems:'flex-start'}]}>
						<Text style={[estyle.note]}>注册视为同意</Text>
						<Text style={[estyle.note, {color:Env.color.main}]}>服务条款和隐私政策</Text>
					</View>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { userStore: stores.userStore }
})(Reg);