/**
 * Created by ligj on 2016/10/09.
 */

import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	Alert,

} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';

import ModifyMobile from './ModifyMobile';
import ModifyPassword from './ModifyPassword';
import ModifyTrueName from './ModifyTrueName';

export default class AccountHome extends Component {

	goTo(page){
		this.props.router.push(page);
	}

	logout(){
		Alert.alert('提示',
			'是否要退出登录？',
			[
				{text: '确定', onPress: () => console.log('Foo Pressed!')},
				{text: '取消', onPress: () => console.log('Bar Pressed!')}
			])
	}



	render() {
		return (
			<View style={styles.body}>
				<TopBanner {...this.props} title="账号设置"/>
				<View>
					<ViewForRightArrow
						style={[styles.item]}
					>
						<View style={[{flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
							<Text style={[styles.text,{flex:1}]}>头像</Text>
							<Image
								style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
									borderColor:'#85C7E7',}}
								source={require('../../../assets/images/icon-1.png')}
							/>
						</View>
					</ViewForRightArrow>
					<ViewForRightArrow style={styles.item} onPress = {() => this.goTo(ModifyTrueName)}>
						<View style={{flexDirection:'row'}}>
							<Text style={[styles.text,{flex:1}]}>姓名</Text><Text style={styles.text}>孟非</Text>
						</View>

					</ViewForRightArrow>
					<Text></Text>
					<ViewForRightArrow style={styles.item} onPress = {() => this.goTo(ModifyPassword)}>
						<Text style={styles.text}>修改密码</Text>
					</ViewForRightArrow>
					<ViewForRightArrow style={styles.item} onPress = {() => this.goTo(ModifyMobile)}>
						<Text style={styles.text}>已绑定手机 <Text>18911112222</Text></Text>
					</ViewForRightArrow>
					<Text></Text><Text></Text>
					<View style={{alignItems:'center'}}>
						<ConfirmButton size="large" onPress={this.logout.bind(this)}>退出账户</ConfirmButton>
					</View>

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
	colorFFF :{
		color:'#FFF'
	},
	item:{
		paddingTop:20 * Env.font.base,
		paddingBottom:20 * Env.font.base,
		paddingLeft:30 * Env.font.base,
		// paddingBottom:30 * Env.font.base,
		borderBottomWidth:1 * Env.font.base,
		borderColor:'#e5e5e5',
		backgroundColor:'#FFF'
	},
	text:{
		fontSize:Env.font.text,
		color:Env.color.text
	}
});