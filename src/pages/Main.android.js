/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import {
	Navigator,
    View,
    Text,
	StatusBar
} from 'react-native';

import Guide from './guide';
import Login from './user';
// import HomeRouter from './HomeRouter';
import HomeRouter from './userCenter/account-config/ModifyMobile';

import { addEventSystemBack } from '../utils/SystemEvents';

import Router from '../services/RouterService';

import Env from '../utils/Env'

class Main extends Component {

	navigator = null;
	router = null;

	constructor(props){
		super(props);
		addEventSystemBack(
			() => {
				// console.log(this.navigator.getCurrentRoutes())
				if(this.navigator.getCurrentRoutes().length > 1){
					return true;
				} else {
					return false;
				}
			},
			() => {
				this.navigator.pop();
			})
	}

	render() {
		return (
		    <View style={{flex:1}}>
				<StatusBar backgroundColor={Env.color.main} />
                <Navigator
                    initialRoute = {Router.Page(Guide)}
                    renderScene = {(page, navigator) => {
                        this.router = this.router || new Router(navigator);
                        this.navigator = navigator;
                        let Component = page.component;
                        return (
                            <Component
                                {...this.props}
                                {...page.props}
                                navigator = {navigator}
                                router = {this.router}
                                doBack = {() => {
                                    navigator.pop()
                                }}
                            />
                        );
                    }}
                />
                <View style={{justifyContent:'center',alignItems:'center',position:'absolute',borderRadius:100,bottom:50,left:10,width:50,height:50,backgroundColor:'#169ada'}}>
                    <Text onPress={() => this.router.resetTo(Guide)}>导航页</Text>
                </View>
            </View>
		);
	}
}
export default Main;
