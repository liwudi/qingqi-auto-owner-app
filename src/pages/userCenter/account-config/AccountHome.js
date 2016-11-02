/**
 * Created by ligj on 2016/10/09.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	Alert,

} from 'react-native';

import TopBanner from '../../../components/TopBanner.android';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
const estyle = Env.style;
import Login from '../../user/Login';
import ModifyMobile from './ModifyMobile';
import ModifyPassword from './ModifyPassword';
import ModifyTrueName from './ModifyTrueName';

import { userPic } from '../../../services/UserService';

import { UserActions, TYPES } from '../../../actions';

import { uploadUserPic } from '../../../services/UserService';

import Toast from '../../../components/Toast';

import ImagePickBotton from './components/ImagePickButton';


let options = {
	title: 'Select Avatar',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

class AccountHome extends Component {

	constructor(props){
		super(props);
		this.userInfo = props.userStore.userInfo;
		this.state = {
			picSource:null
		}
	}

	goTo(page){
		this.props.router.push(page);
	}

	logout(){
		Alert.alert('提示',
			'是否要退出登录？',
			[
				{
					text: '确定', onPress: () => {
						this.props.dispatch(UserActions.logout(
							() => {
								this.props.router.replace(Login)
							}
						))
					}
				},
				{text: '取消'}
			])
	}

	updatePic = () => {
		this.refs.ImagePickBotton.show();
	}

	onImagePick = (imageSource) => {
		uploadUserPic(imageSource)
			.then(rs => {
				
			})
			.catch(e => {
				Toast.show(e.message, Toast.SHORT);
			});
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="账号设置"/>
				<ImagePickBotton ref="ImagePickBotton" onImagePick={this.onImagePick}/>
				<View>
{/*
					<ViewForRightArrow onPress={this.updatePic}>
*/}
					<ViewForRightArrow>
						<View style={[estyle.fxRow, estyle.fxCenter]}>
							<Text style={[estyle.fx1, estyle.text]}>头像</Text>
							{/*<Image
								style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
									borderColor:Env.color.main}}
								source={{uri: userPic()}}
							/>*/}
							<Image
								style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
									borderColor:'#85C7E7',}}
								source={require('../../../assets/images/driver.png')}
							/>
						</View>
					</ViewForRightArrow>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyTrueName)}>
						<View style={[estyle.fxRow]}>
							<Text style={[estyle.fx1, estyle.text]}>姓名</Text><Text style={styles.text}>{this.userInfo.nickname || '未设置姓名'}</Text>
						</View>

					</ViewForRightArrow>
					<Text></Text>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyPassword)}>
						<Text style={[estyle.fx1, estyle.text]}>修改密码</Text>
					</ViewForRightArrow>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyMobile)}>
						<View style={[estyle.fxRow]}>
							<Text style={[estyle.fx1, estyle.text]}>已绑定手机</Text><Text style={styles.text}>{this.userInfo.mobile}</Text>
						</View>
					</ViewForRightArrow>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<View style={{alignItems:'center'}}>
						<ConfirmButton
							size="large"
							disabled={this.props.userStore.status === TYPES.LOGGED_DOING}
							onPress={this.logout.bind(this)}
						>退出账户</ConfirmButton>
					</View>

				</View>
			</View>
		);
	}
}

export default connect(function (stores) {
	return {userStore: stores.userStore}
})(AccountHome);


const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	colorFFF :{
		color:'#FFF'
	},
	item:{

	},
	text:{
		fontSize:Env.font.text,
		color:Env.color.text
	}
});
