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

    initEvents = [];

    newPushMessage(message, isNotificationClick = false){
    	console.log(message)
        if(/庆祝解放行车联网品牌发布/.test(event.Title)){
            this.router.push(VideoShow);
        }else{
            this.props.dispatch(MessageActions.addMessage(message));
        }
	}

    constructor(props){
        super(props);
        this.state = {
            isConnected: true
        };

        DeviceEventEmitter.addListener("notificationClick", (event) => {
            try{
                event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent || '{}') : {};
            }catch (e){
                event.CustomContent = {};
            }
            this.newPushMessage(event, true);
        });
        DeviceEventEmitter.addListener("notificationReceive", (event) => {
            try{
                event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent || '{}') : {};
            }catch (e){
                event.CustomContent = {};
            }
            this.newPushMessage(event);
        });
        // DeviceEventEmitter.addListener("messageReceiver", (event) => {
        //     event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent) : {};
        //     console.log('接收到消息：', event);
        //     this.props.dispatch(MessageActions.addMessage(event));
        // });

        this.props.dispatch(MessageActions.getMessages());

        NetInfo.isConnected.fetch().done(isConnected => {
            global.NetIsConnected = isConnected;
            this.setState({NetIsConnected: isConnected});
        });
        NetInfo.addEventListener('change', isConnected => {
            global.NetIsConnected = (isConnected !== 'NONE');
            this.setState({NetIsConnected: isConnected !== 'NONE'});
        });

        global.storage.load({
            key: 'preLoginUserName'
        })
            .then(rs => this.setState({preLoginUserName: rs.name}))
            .catch(e => console.log(e));

    }

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
		if(this.navigator.getCurrentRoutes().length > 1){
			if(!this.wait) {
				console.info(this.router.map);
				let timeout = this.router.map.length ? 500 : 0;
				this.wait = !!this.router.map.legnth;
				setTimeout(() => {
					this.navigator.pop();
					this.router.map.pop();
					this.wait = false;
				}, timeout);
			}
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
		console.log('!!!!!!!!!!!!!!!!!!!!!componentDidMount')
        addEventSystemBack(
            (exitApp) => {
                return this.doBack(exitApp);
            }
        );
        this.initEvents.forEach((e) => {
            e();
        })
	}


	componentWillReceiveProps(props){
		// console.log(props)
	}

	renderMain() {
		return <View style={[estyle.fx1]}>
			<Navigator
				initialRoute = {Router.Page(Guide2)}
				renderScene = {(page, navigator) => {
					this.router = this.router || new Router(navigator);
					this.router.map = this.router.map || [];
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
