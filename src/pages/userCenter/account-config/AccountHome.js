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
	Image

} from 'react-native';

import TopBanner from '../../../components/TopBanner.android';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import SubmitButton from '../../../components/SubmitButton';
import Env from '../../../utils/Env';
const estyle = Env.style;
import Login from '../../user/index';
import ModifyMobile from './ModifyMobile';
import ModifyPassword from './ModifyPassword';
import ModifyTrueName from './ModifyTrueName';

import { userPic } from '../../../services/UserService';

import { UserActions, TYPES } from '../../../actions';

import { uploadUserPic } from '../../../services/UserService';

import Toast from '../../../components/Toast';

import ImagePickBotton from './components/ImagePickButton';
import Alert from '../../../components/Modals/Alert';

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
		this.state = {
			picSource:null,
			alertActive: false
		}
		// this.userInfo = props.userStore.userInfo;
	}
	// componentWillReceiveProps(nextProps){
	// 	this.userInfo = nextProps.userStore.userInfo;
	// }

	goTo(page){
		this.props.router.push(page);
	}

	logout(){
		this.props.dispatch(UserActions.logout(
			() => {
				this.setState({alertActive:false});
				this.props.router.resetTo(Login)
			}
		))

		/*Alert.alert('提示',
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
			])*/
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
		let userInfo = this.props.userStore.userInfo;
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="账号设置"/>
				<ImagePickBotton ref="ImagePickBotton" onImagePick={this.onImagePick}/>
				<View>
{/*
					<ViewForRightArrow onPress={this.updatePic}>
*/}
					{/*<ViewForRightArrow>*/}
						{/*<View style={[estyle.fxRow, estyle.fxCenter]}>*/}
							{/*<Text style={[estyle.fx1, estyle.text]}>头像</Text>*/}
							{/*/!*<Image*/}
								{/*style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,*/}
									{/*borderColor:Env.color.main}}*/}
								{/*source={{uri: userPic()}}*/}
							{/*/>*!/*/}
							{/*<Image*/}
								{/*style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,*/}
									{/*borderColor:'#85C7E7',}}*/}
								{/*source={require('../../../assets/images/driver.png')}*/}
							{/*/>*/}
						{/*</View>*/}
					{/*</ViewForRightArrow>*/}
					<ViewForRightArrow onPress = {() => this.goTo(ModifyTrueName)}>
						<View style={[estyle.fxRow]}>
							<Text style={[estyle.fx1, estyle.text]}>姓名</Text><Text style={styles.text}>{userInfo.name || '未设置姓名'}</Text>
						</View>

					</ViewForRightArrow>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyPassword)} style={[estyle.marginTop]}>
						<Text style={[estyle.fx1, estyle.text]}>修改密码</Text>
					</ViewForRightArrow>
					<ViewForRightArrow onPress = {() => this.goTo(ModifyMobile)}>
						<View style={[estyle.fxRow]}>
							<Text style={[estyle.fx1, estyle.text]}>已绑定手机</Text><Text style={styles.text}>{userInfo.phone}</Text>
						</View>
					</ViewForRightArrow>
					<View style={[estyle.fxRow, estyle.padding]}>
						<Text style={[estyle.text]}>&nbsp;</Text>
					</View>
					<View style={{alignItems:'center'}}>
						<SubmitButton
							size="large"
							doing={this.props.userStore.status === TYPES.LOGGED_DOING}
							onPress={(()=>{this.setState({alertActive:true})})}
						>退出账户</SubmitButton>
					</View>

				</View>
				<Alert visible={this.state.alertActive}
					   title="提示"
					   confirmTitle="确定"
					   cancelTitle="取消"
					   onConfirm={(()=>{this.logout()})}
					   onCancel={(()=>{this.setState({alertActive:false})})}>
					是否要退出登录？
				</Alert>
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
