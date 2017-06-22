/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import {
    Navigator
} from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux'

import HomePage from './home/HomePage';
import UserCenterHome from './userCenter';
import Message from './message/Message';
import News from './home/news/News';
import { setCurrentActivePage } from '../actions/MessageActions';

import Login from './user/index';

import MainNavBar from '../components/MainNavBar';
import { addInterceptor, interceptAlerting, unInterceptAlerting} from '../service-config/RequestService';

import MyCar from './home/my-car/MyCar';

const tabs = [
	{component:Message,index:0,name:'Message'},
	{component: HomePage,index:1,name:'HomePage'},
	{component:News,index:2,name:'News'},
	{component:UserCenterHome,index:3,name:'UserCenterHome'}
];

let initialRoute = tabs[1];

class HomeRouter extends Component {
	constructor(props){
		super(props);
		addInterceptor((res) => {
            if(res && (res.resultCode && res.resultCode === 509) || (res.code && res.code === 1019)){
                res.message = '账号未登录';
                interceptAlerting();
                this.props.alert(
                    '提示',
                    '您的账号已在其它设备登录，如非本人操作，请修改密码！',
                    [
                        {
                            text:'确定',
                            onPress:() => {
                                global._LoginOut=false;
                                unInterceptAlerting();
                                this.props.router.resetTo(Login);
                            }
                        }
                    ]
                );
            }
            return res;
        });
	}

    componentDidMount(){
        if(this.props.showAddCarMessage && this.props.userStore.userInfo.role != 3){
            this.props.alert(
                '提示',
                '您已注册成功, 是否要添加车辆？',
                [
                    {
                        text:'确定',
                        onPress:() => {
                            this.props.router.push(MyCar, {toAddCar:true});
                        }
                    },
                    {
                        text:'取消'
                    }
                ]
            );
        }
	}

	setCurrentPage = (index) => {
        this.props.dispatch(setCurrentActivePage({main:index}));
	}

	render() {
		return (
			<Navigator
				initialRoute={initialRoute}
				navigationBar={<MainNavBar
					ref={(navBar) => {this.navBar = navBar;}}
					changeTab={(index, navigator) => {
						navigator.jumpTo(tabs[index]);
                    }}
					sign={this.props.messageStore.AllUnReadCount}
                    taskNum={this.props.Integral}
				/>}
				initialRouteStack={tabs}
				configureScene={(route,routeStack) =>{
                    let HorizontalSwipeJump = Object.assign({},Navigator.SceneConfigs.HorizontalSwipeJump);
                    HorizontalSwipeJump.gestures=null;
                    return HorizontalSwipeJump
                }}
				onDidFocus={(router) => {
					this.navBar.changeTab(router.index, false);
                    this.setCurrentPage(router.index)
				}}
				renderScene={(route, navigator) => {
					let Component = route.component;
					return <Component
						{...this.props}
						navigator = {navigator}
					/>
				}}
			/>
		);
	}
}
function select(stores) {
	return { messageStore: stores.messageStore,userStore: stores.userStore,Integral:stores.IntegralStore.Integral}
}
export default connect(select)(HomeRouter);
