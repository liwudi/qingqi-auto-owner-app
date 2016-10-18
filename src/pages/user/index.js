/**
 * Created by ligj on 2016/9/30.
 */
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

import TopBanner from '../../components/TopBanner';
import TabNavigator from '../../components/TabNavigator';

import Login from './Login';
import QuickLogin from './QuickLogin'
import Env from '../../utils/Env';
import Reg from './Reg';

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
	}
	render(){
		return (
			<View style={{flex:1}}>
				<TopBanner
					leftShow={false}
					title="登录"
					rightView={(<Text style={{fontSize:Env.font.text,color:'#FFF'}} onPress={() => this.props.router.push(Reg)}>注册</Text>)}
				/>
				<TabNavigator {...this.props} tabs={tabs}/>
			</View>
		);
	}
}