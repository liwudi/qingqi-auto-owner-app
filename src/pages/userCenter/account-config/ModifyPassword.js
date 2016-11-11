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
	StyleSheet
} from 'react-native';

import { UserActions, TYPES } from '../../../actions/index';
import { modifyPassword } from '../../../services/UserService';

import TopBanner from '../../../components/TopBanner';
import PasswordInput from '../../../components/Inputs/Password';
import ConfirmButton from '../../../components/ConfirmButton.android';
import Toast from '../../../components/Toast';
import FindPassword from '../../user/FindPassword';
import Login from '../../user/index';

import Env from '../../../utils/Env';

const estyle = Env.style,
	emsg = Env.msg.form,
	pattern = Env.pattern;

class ModifyPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			doing: false
		};
	}

	modifyPassword(){
		// PasswordInput.Validate(this.refs) && this.props.dispatch(UserActions.modifyPassword(
		// 	this.state.oldPassword,
		// 	this.state.newPassword,
		// 	() => {
		// 		this.props.router.pop();
		// 	}
		// ));
		if(PasswordInput.Validate(this.refs)){
			if(this.state.oldPassword == this.state.newPassword){
				Toast.show('新密码不能与原始密码相同', Toast.SHORT);
				return;
			}
			this.setState({doing: true});
			modifyPassword(this.state.oldPassword,this.state.newPassword)
				.then((rs) => {
					Toast.show('密码修改成功，请重新登录', Toast.SHORT);
					setTimeout(() => {
						this.props.router.resetTo(Login);
					},1000);
				})
				.catch((e) => {
					Toast.show(e.message, Toast.SHORT);
					this.setState({doing: false});
				});
		}

	}

	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="修改密码"/>
				<View  style={styles.loginView}>
					<View style={[Env.style.paddingHorizontal, Env.style.paddingTop]}>
						<Text style={{flex:1,textAlign:'left',color:Env.color.note,fontSize:Env.font.note}}>
							如果忘记或未设置过登录密码，请点击 <Text onPress={() => this.props.router.push(FindPassword)} style={{color: Env.color.main}}>忘记密码</Text> 通过已绑定的手机验证并设置新密码。
						</Text>
					</View>
					<PasswordInput
						ref="oldPassword"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={oldPassword => this.setState({oldPassword})}
						placeholder='当前密码'
						labelSize={3}
						validates={[
							{require:true, msg: '请填写当前密码'},
							{pattern:pattern.password, msg: '当前密码格式错误'}
						]}
					/>
					<PasswordInput
						ref="newPassword"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={newPassword => this.setState({newPassword})}
						label="新密码"
						labelSize={3}
						validates={[
							{require:true, msg: '请填写新密码'},
							{pattern:pattern.password, msg: '新密码格式错误'}
						]}
					/>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<ConfirmButton
						size="large"
						disabled={this.state.doing}
						onPress={() => this.modifyPassword()}>确定</ConfirmButton>
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
	return { modifyPasswordStore: stores.modifyPasswordStore }
})(ModifyPassword);