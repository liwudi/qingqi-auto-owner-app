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
import Message from './message/Message';
import News from './home/news/News';


import MainNavBar from '../components/MainNavBar';



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
	}
	render() {
		return (
			<Navigator
				initialRoute={initialRoute}
				navigationBar={<MainNavBar
					ref={(navBar) => {this.navBar = navBar;}}
					changeTab={(index, navigator) => navigator.jumpTo(tabs[index])}
					sign={this.props.messageStore.AllUnReadCount}
				/>}
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
	return { messageStore: stores.messageStore }
}
export default connect(select)(HomeRouter);
