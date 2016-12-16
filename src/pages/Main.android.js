/**
 * Created by ligj on 2016/9/23.
 */

import React, {Component} from 'react';
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
    Image,
    AppState,
    Keyboard
} from 'react-native';


var pushModule = NativeModules.MarbarPushModule;

import Toast from '../components/Toast';
import {MessageActions} from '../actions/index';
import Guide2 from './guide2';
import {addEventSystemBack} from '../utils/SystemEvents';
import Router from '../services/RouterService';
import Env from '../utils/Env'
const estyle = Env.style;
import {Alert2} from '../components/Modals/Alert';

import VideoShow from './VideoShow';

import HomeRouter from './HomeRouter';

AppState.addEventListener('change', (currentAppState) => {
    global.appIsActive = (currentAppState == 'active');
    if (global.appIsActive) {
        setTimeout(() => {
            global.toVideoShowMessage && global.toVideoShowFun();
        }, 900)
    }
});

global.toVideoShowMessage = null;
global.toVideoShowFun = null;
global.toVideoShowFunIsPlayIng = false;


class Main extends Component {

    navigator = null;
    router = null;

    toVideoShow = () => {
        let noticeId = global.toVideoShowMessage.noticeId;
        pushModule.cancelNotifacation(noticeId);
        global.toVideoShowMessage = null;
        global.toVideoShowFunIsPlayIng = true;
        this.router.push(VideoShow);
    }

    toMessagePage() {
        //this.router.resetTo(HomeRouter, {initPage:0});
    }

    newPushMessage(message, isNotificationClick = false) {
        if (/庆祝解放行车联网品牌发布/.test(message.Title)) {
            if (!global.toVideoShowMessage && !global.toVideoShowFunIsPlayIng) {
                global.toVideoShowMessage = message;
                if (global.appIsActive) {
                    global.toVideoShowFun();
                }
            }
        } else {
            this.props.dispatch(MessageActions.addMessage(message));
            // isNotificationClick && this.toMessagePage();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isConnected: true
        };
        global.toVideoShowFun = this.toVideoShow.bind(this);

        DeviceEventEmitter.addListener("notificationClick", (event) => {
            try {
                event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent || '{}') : {};
            } catch (e) {
                event.CustomContent = {};
            }
            this.newPushMessage(event, true);
        });
        DeviceEventEmitter.addListener("notificationReceive", (event) => {
            try {
                event.CustomContent = event.CustomContent ? JSON.parse(event.CustomContent || '{}') : {};
            } catch (e) {
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
        let routeIdx = this.router.currentIndex();
        if (routeIdx > 1) {
            /**
             * 页面退出之前收起键盘
             * */
            Keyboard.dismiss();
            this.navigator.pop();
        } else {
            this.refs.alert.alert(
                '提示',
                '是否要退出应用?',
                [
                    {
                        text: '确定',
                        onPress: () => {
                            exitApp();
                        }
                    },
                    {
                        text: '取消'
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

        setTimeout(() => {
            if (global.toVideoShowMessage) {
                global.toVideoShowFun();
            }
        }, 1100)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);

    }

    componentWillReceiveProps(props) {
        // console.log(props)
    }

    renderMain() {
        return <View style={[estyle.fx1]}>
            <Navigator
                initialRoute={Router.Page(Guide2)}
                renderScene={(page, navigator) => {
                    this.router = this.router || new Router(navigator);
                    this.navigator = navigator;
                    let Component = page.component;
                    return (
                        <Component
                            navigator={navigator}
                            router={this.router}
                            callTo={this.callTo}
                            doBack={() => {
                                this.doBack();
                            }}
                            NetIsConnected={this.state.NetIsConnected}
                            preLoginUserName={this.state.preLoginUserName}
                            alert={(a, b, c) => {
                                this.refs.alert.alert(a, b, c);
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
