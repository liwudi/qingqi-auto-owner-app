/**
 * Created by ligj on 2016/9/30.
 */
import React, { Component } from 'react';
import { View, Text ,Keyboard,TouchableOpacity} from 'react-native';

import TopBanner from '../../components/TopBanner';
import TabNavigator from '../../components/TabNavigator';

import Login from './Login';
import QuickLogin from './QuickLogin'
import Env from '../../utils/Env';
import Reg from './Reg';
const estyle = Env.style;

const tabs = [
	{
		title:'账号密码登录',
		component: Login
	},
	{
		title:'手机快捷登录',
		component: QuickLogin
	}
];
export default class User extends Component {
	constructor(props){
		super(props);
	//
	}
	componentDidMount() {
	//	console.info(global.storage)
		global.setToken();
		global.storage.remove({
			key: 'token'
		}).then(() => {
			console.info('clear')
		});
	}
	render(){
		//SplashScreen.hide();
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner
					{...this.props}
					leftShow={false}
					title="登录"
					rightView={
						<TouchableOpacity style={[estyle.padding]} onPress={() => this.props.router.push(Reg)}>
							<Text style={[{fontSize:Env.font.text,color:'#FFF'}]}>注册</Text>
						</TouchableOpacity>
					}
				/>
				<TabNavigator initialIndex={this.props.initialIndex} {...this.props} tabs={tabs} onChangeTab={()=>{ Keyboard.dismiss()}} />
			</View>
		);
	}
}