/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator
} from 'react-native';

import { connect } from 'react-redux'

import HomePage from './home/HomePage';
import UserCenterHome from './userCenter';
/*import MessageList from './message/MessageList';
import News from './home/news/News';*/


import MainNavBar from '../components/MainNavBar';



const tabs = [
	{component: HomePage,index:0,name:'HomePage'},
/*	{component:News,index:1,name:'News'},
	{component:MessageList,index:2,name:'MessageList2'},*/
	{component:UserCenterHome,index:3,name:'UserCenterHome'}
];

let initialRoute = tabs[0];

class HomeRouter extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<Navigator
				initialRoute={initialRoute}
				navigationBar={<MainNavBar ref={(navBar) => {this.navBar = navBar;}}  changeTab={(index, navigator) => navigator.jumpTo(tabs[index])}/>}
				initialRouteStack={tabs}
				configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
				onDidFocus={(router) => {this.navBar.changeTab(router.index, false)}}
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
	return { ...stores.userStore }
}
export default connect(select)(HomeRouter);
