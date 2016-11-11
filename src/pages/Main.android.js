/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
	Navigator,
	View,
	Text,
	StatusBar,
	Linking,
	ToastAndroid,
	DeviceEventEmitter,
	NetInfo,
	Switch,
	NativeModules
} from 'react-native';

import { MessageActions } from '../actions/index';

import Guide from './guide';
import Guide2 from './guide2';

import { addEventSystemBack } from '../utils/SystemEvents';

import Router from '../services/RouterService';

import Button from '../components/widgets/Button';
import ErrorPage from './error/NetError';
import SplashScreen from 'react-native-splash-screen';
import Alert from '../components/Modals/Alert';
const SystemSetting = NativeModules.SystemSettingModule;
import ManagerAddForContacts from './userCenter/manager/ManagerAddForContacts';

class Main extends Component {

	navigator = null;
	router = null;

	callTo = (phone) => {
		let url = 'tel:' + phone;
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				ToastAndroid.show('拨打电话' + url + '失败', ToastAndroid.SHORT);
			}
		});
	};

	constructor(props){
		super(props);
		this.state = {
			exitAlert : false,
			isConnected: true
		}
		addEventSystemBack(
			(exitApp) => {
				// console.info(123)
				if(this.navigator.getCurrentRoutes().length > 1){
					this.navigator.pop();
					return true;
				} else {
					this.setState({exitAlert : true, exitApp});
					return true;
				}
			}
		);
		DeviceEventEmitter.addListener("notificationClick", (event) => {
			console.log('点击了通知栏消息：', event);
			this.props.dispatch(MessageActions.addMessage(event));
		});
		DeviceEventEmitter.addListener("messageReceiver", (event) => {
			console.log('接收到消息：', event);
			this.props.dispatch(MessageActions.addMessage(event));
		});
	}

	componentWillReceiveProps(props){
		// console.log(props)
	}
	renderNetError() {
		if(!this.state.isConnected) {
			SplashScreen.hide();
			return <ViewForRightArrow style={[{position:'absolute', backgroundColor: Env.color.modalBg, left:0, top:0, width: Env.screen.width}]}
									  onPress={() => {
					console.info('opens ettting');
					SystemSetting.openNetWork();
				}}>
				<View style={[estyle.fxRow, estyle.fxRowCenter]}>
					<IconChainBroken size={Env.font.text * 2} color={'#ffffff'}/>
					<View style={[estyle.fx1, estyle.marginLeft]}>
						<Text style={[{fontSize: Env.font.text, color: '#ffffff'}]}>网络中断</Text>
						<Text style={[{fontSize: Env.font.text, color: '#ffffff'}]}>请检查您的网络设置</Text>
					</View>

				</View>
			</ViewForRightArrow>
		}

/*
		// console.info('errornet')
		return <ErrorPage visible={!this.state.isConnected}/>;*/
		/*return <View style={[{position:'absolute', width:Env.screen.width, height: Env.screen.height, zIndex:10, left:0,top:0}]}>
			<ErrorPage type="net"/>
		</View>;*/
	}

	componentWillMount() {
		NetInfo.isConnected.fetch().done(isConnected => {
			console.info('net status', isConnected, 'from fetch');
			this.setState({isConnected});
			//this.setState({isConnected: false});
		});
		NetInfo.addEventListener('change', isConnected => {
			console.info('net status', isConnected, 'from change');
			this.setState({isConnected: isConnected !== 'NONE'});
			//this.setState({isConnected: false});
		});
	}

	renderMain() {
		// console.info('renderMain')
		return <View style={[estyle.fx1]}>
			<Navigator
				initialRoute = {Router.Page(Guide2)}
				renderScene = {(page, navigator) => {
					this.router = this.router || new Router(navigator);
					this.navigator = navigator;
					let Component = page.component;
					return (
						<Component
							navigator = {navigator}
							router = {this.router}
							callTo = {this.callTo}
							doBack = {() => {
								navigator.pop()
							}}
							{...page.props}
						/>
					);
				}}
			/>
			<View style={{justifyContent:'center',alignItems:'center',position:'absolute',borderRadius:100,bottom:100,left:10,width:50,height:50,backgroundColor:'#169ada'}}>
				<Text onPress={() => this.router.resetTo(Guide)}>导航页</Text>
			</View>
			<Button onPress={()=>{this.setState({isConnected: !this.state.isConnected})}} style={{justifyContent:'center',alignItems:'center',position:'absolute',borderRadius:100,bottom:50,left:10,width:50,height:50,backgroundColor:'#169ada'}}>

			<Text >网络测试</Text></Button>

		</View>
	}

	render() {
		return (
			<View style={[estyle.fx1]}>
				{this.renderMain()}
				{this.renderNetError()}
				<Alert
					visible={this.state.exitAlert}
					onConfirm={(()=> {

						{/*console.info(this.state.isConnected)*/}
						this.setState({exitAlert: false});
						this.state.exitApp();
					})}
					onCancel={(()=> {
						{/*console.info(this.state.isConnected)*/}
						this.setState({exitAlert: false})
					})}
				>是否要退出应用?</Alert>
				</View>
		);
	}
}

export default connect(function (stores) {
	return {messageStore: stores.messageStore}
})(Main);
