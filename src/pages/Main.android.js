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
import Guide2 from './guide2';
import Login from './user';
import Reg from './user/Reg';
// import HomeRouter from './HomeRouter';
import AccountHome from './userCenter/account-config/AccountHome';

/*import TripAnalysisList from './home/trip-analysis/TripAnalysisList';
*/
import { addEventSystemBack } from '../utils/SystemEvents';

import Router from '../services/RouterService';

import Env from '../utils/Env'

import AddCarPostCarCode from './userCenter/add-car/AddCarPostCarCode';
import AddCar from './userCenter/add-car/AddCar';

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
                                doBack = {() => {
                                    navigator.pop()
                                }}
                                {...page.props}
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
