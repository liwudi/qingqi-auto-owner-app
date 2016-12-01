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

import Guide2 from './guide2';

import { addEventSystemBack } from '../utils/SystemEvents';

import Router from '../services/RouterService';



import Env from '../utils/Env'
const estyle = Env.style;
import {Alert2} from '../components/Modals/Alert';

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
			isConnected: true
		};



		addEventSystemBack(
			(exitApp) => {
				// console.info(123)
				if(this.navigator.getCurrentRoutes().length > 1){
					this.navigator.pop();
					return true;
				} else {
					this.refs.alert.alert(
						'提示',
                        '是否要退出应用?',
						[
							{
								text:'确定',
								onPress:() => {
                                    exitApp();
								}
							},
                            {
                                text:'取消'
                            }
						]
					);

					return true;
				}
			}
		);

        DeviceEventEmitter.addListener("notificationClick", (event) => {
            console.log('点击了通知栏消息：', event);
            console.log(this.navigator.getCurrentRoutes())
            // this.props.dispatch(MessageActions.addMessage(event));
        });
        DeviceEventEmitter.addListener("notificationReceive", (event) => {
            event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent) : {};
            console.log('收到了通知栏消息：', event);
            this.props.dispatch(MessageActions.addMessage(event));
        });
        DeviceEventEmitter.addListener("messageReceiver", (event) => {
            event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent) : {};
            console.log('接收到消息：', event);
            this.props.dispatch(MessageActions.addMessage(event));
        });
	
	this.props.dispatch(MessageActions.getMessages());
	NetInfo.isConnected.fetch().done(isConnected => {
            console.info('net status', isConnected, 'from fetch');
            global.NetIsConnected = isConnected;
            this.setState({NetIsConnected});
            //this.setState({isConnected: false});
        });
        NetInfo.addEventListener('change', isConnected => {
            console.info('net status', isConnected, 'from change');
            global.NetIsConnected = (isConnected !== 'NONE');
            this.setState({NetIsConnected: isConnected !== 'NONE'});
            //this.setState({isConnected: false});
        });

        global.storage.load({
            key: 'preLoginUserName'
        })
            .then(rs => this.setState({preLoginUserName: rs.name}))
            .catch(e => console.log(e));

	}

	componentWillReceiveProps(props){
		// console.log(props)
	}


	componentWillMount() {

	}

	renderMain() {
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
							NetIsConnected = {this.state.NetIsConnected}
							preLoginUserName = {this.state.preLoginUserName}
							alert = {(a,b,c) => {
                                this.refs.alert.alert(a,b,c);
							}}
							{...page.props}
						/>
					);
				}}
			/>
		</View>
	}

	render() {
		return (
			<View style={[estyle.fx1]}>
				{this.renderMain()}
				<Alert2 ref="alert"/>
				</View>
		);
	}
}

export default connect(function (stores) {
	return {messageStore: stores.messageStore}
})(Main);
