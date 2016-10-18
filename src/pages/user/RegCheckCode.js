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

import Env from '../../utils/Env';

class RegCheckCode extends Component {
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
			<View style={styles.body}>
				<TopBanner {...this.props} title="注册"/>
				<View  style={styles.loginView}>
					<View style={{alignItems:'center',marginTop:10,marginBottom:10,}}>
						<Text style={{flex:1,textAlign:'center',color:Env.color.note,fontSize:Env.font.note}}>已发送短信验证码到</Text>
						<Text style={{flex:1,textAlign:'center',color:Env.color.note,fontSize:Env.font.navTitle}}>+86 18601201516</Text>
					</View>
					<LabelInput
						style = {styles.loginInput}
						onChangeText={password => this.onChange({password})}
						secureTextEntry={true}
						placeholder='短信验证码'
						label="验证码"
					/>
					<ConfirmButton style={{marginTop:10}} size="large" onPress={() => this.onLogin()}><Text>注册</Text></ConfirmButton>
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
})(RegCheckCode);