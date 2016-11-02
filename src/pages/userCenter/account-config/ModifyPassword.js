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

import Env from '../../../utils/Env';

class ModifyPassword extends Component {
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
				<TopBanner {...this.props} title="修改密码"/>
				<View  style={styles.loginView}>
					<View>
						<Text style={{flex:1,textAlign:'left',color:Env.color.note,fontSize:Env.font.note}}>
							如果忘记或未设置过登录密码，请点击 <Text>忘记密码</Text> 通过已绑定的手机验证并设置新密码。
						</Text>
					</View>
					<LabelInput
						style = {styles.loginInput}
						onChangeText={password => this.onChange({password})}
						type={LabelInput.Types.PASSWORD}
						placeholder='当前密码'
						label="密码"
					/>
					<LabelInput
						style = {styles.loginInput}
						onChangeText={password => this.onChange({password})}
						type={LabelInput.Types.PASSWORD}
						placeholder='6-20位字符'
						label="新密码"
					/>
					<ConfirmButton style={{marginTop:10}} size="large" onPress={() => this.onLogin()}><Text>确定</Text></ConfirmButton>
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
})(ModifyPassword);