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

import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';
import CancelButton from '../../../components/CancelButton';

import Env from '../../../utils/Env';

class ModifyMobile extends Component {
	constructor(props){
		super(props);
	}

	onChange(input){
		this.setState(input);
	}

	sendCode(){
		this.props.dispatch(UserActions.sendModifyMobileCode());
	}

	render() {
		let rightView = () => {
			let disable = this.props.sendCodeStore.status === 'doing' || this.props.sendCodeStore.status === 'timeout';
			let text = this.props.sendCodeStore.status === 'doing' ? '正在发送' : this.props.sendCodeStore.status === 'timeout' ? `重新获取${this.props.sendCodeStore.second}` : '获取验证码';
			return (<CancelButton size="small" disabled={disable} onPress={this.sendCode.bind(this)}>{text}</CancelButton>);
		};
		return (
			<View style={styles.body}>
				<TopBanner {...this.props} title="修改绑定手机"/>
				<View  style={styles.loginView}>
					<LabelInput
						style = {styles.loginInput}
						onChangeText={password => this.onChange({password})}
						placeholder='当前绑定的手机'
						label="手机"
					/>
					<LabelInput
						style = {styles.loginInput}
						onChangeText={password => this.onChange({password})}
						placeholder='短信验证码'
						label="验证码"
						rightView = { rightView() }
					/>
					<ConfirmButton style={{marginTop:10}} size="large" onPress={() => this.onLogin()}><Text>下一步</Text></ConfirmButton>
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
	return { sendCodeStore: stores.modifyMobileSendCodeStore }
})(ModifyMobile);