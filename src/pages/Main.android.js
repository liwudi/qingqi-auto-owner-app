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
	DeviceEventEmitter,
	NetInfo,
	Switch,
	NativeModules,
    Image
} from 'react-native';
//import {disposeMap} from '../mapbarmap/MapbarMapInstance';
import Toast from '../components/Toast';
import { MessageActions } from '../actions/index';

import Guide2 from './guide2';

import { addEventSystemBack } from '../utils/SystemEvents';

import Router from '../services/RouterService';


import Env from '../utils/Env'
const estyle = Env.style;
import {Alert2} from '../components/Modals/Alert';

import VideoShow from './VideoShow';


class Main extends Component {

	navigator = null;
	router = null;

	callTo = (phone) => {
		let url = 'tel:' + phone;
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				Toast.show('拨打电话' + url + '失败', Toast.SHORT);
			}
		});
	};
	doBack = (exitApp) => {
		let routeIdx = this.router.currentIndex();
		if(routeIdx > 1){
			this.navigator.pop();
			/*if(!this.wait) {
				console.info(routeIdx)
				console.info(this.router.map)
				let cmap = this.router.map[routeIdx],
					timeout = 0;
				if(typeof cmap === 'number') {
					timeout = 500;
					disposeMap(cmap);
					this.router.map[routeIdx] = undefined;
				}
				setTimeout(() => {
					this.navigator.pop();
					this.wait = false;
				}, timeout);

				console.info(this.router.map);
				let timeout = this.router.map.length ? 500 : 0;
				this.wait = !!this.router.map.legnth;
				timeout && disposeMap(this.router.map.pop());
				setTimeout(() => {
					this.navigator.pop();
					this.wait = false;
				}, timeout);
			}*/
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
		}
		return true;
	};
	componentDidMount() {
		addEventSystemBack(
			(exitApp) => {
				return this.doBack(exitApp);
			}
		);
	}
	constructor(props){
		super(props);
		this.state = {
			isConnected: true
		};

        DeviceEventEmitter.addListener("notificationClick", (event) => {
            console.log('点击了通知栏消息：', event);
            console.log(this.navigator.getCurrentRoutes())
            // this.props.dispatch(MessageActions.addMessage(event));

            if(/庆祝解放行车联网品牌发布/.test(event.Title)){
                this.router.push(VideoShow);
            }else{
                this.props.dispatch(MessageActions.addMessage(event));
            }

        });
        DeviceEventEmitter.addListener("notificationReceive", (event) => {
            console.log('收到了通知栏消息：', event);
            event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent) : {};
            console.log('收到了通知栏消息：', event);

            if(/庆祝解放行车联网品牌发布/.test(event.Title)){
                this.router.push(VideoShow);
			}else{
                this.props.dispatch(MessageActions.addMessage(event));
			}
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
            this.setState({NetIsConnected: isConnected});
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
					//this.router.map = this.router.map || [];
					this.navigator = navigator;
					let Component = page.component;
					return (
						<Component
							navigator = {navigator}
							router = {this.router}
							callTo = {this.callTo}
							doBack = {() => {
								this.doBack();
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
