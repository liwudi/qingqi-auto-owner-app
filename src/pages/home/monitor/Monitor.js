/**
 * Created by ligj on 2016/9/30.
 */
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

import TabNavigator from '../../../components/TabNavigator';

import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
const estyle = Env.style;
import SplashScreen from 'react-native-splash-screen';
import List from './MonitorCarList';
import Map from './MonitorMap'
import {IconMap, IconList} from '../../../components/Icons';
import Button from '../../../components/widgets/Button';
const tabs = [
    {
        component: List,
        rightIcon: IconMap
    },
    {
        component: Map,
        rightIcon: IconList
    }
];
const currentIndex = 0;
const initialRoute = tabs[currentIndex];
export default class Monitor extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex:currentIndex
        }
    }
    changeTab = (index, params) => {
        console.info(index)
        this.setState({currentIndex:index});
        this.refs.nav.jumpTo(tabs[index], params);
    }

    toMap = (params) => {
        this.changeTab(1, params)
    }

    renderNavigationBar() {
        let Icon = tabs[this.state.currentIndex].rightIcon;
        return   <View style={{position:'absolute', zIndex:1, left:0, top:0, width: Env.screen.width}}><TopBanner {...this.props} title="实时监控"
            rightView={
                <Button onPress={this.changeTab.bind(this,+!this.state.currentIndex)}
                style={[{height:90 * Env.font.base}, estyle.paddingLeft]}>
                    <Icon color="#ffffff"/>
                </Button>
            }
        /></View>;
    }

    render(){
        //SplashScreen.hide();
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <Navigator initialRoute={initialRoute}
                    ref="nav"
                    navigationBar={this.renderNavigationBar()}
                    initialRouteStack={tabs}
                    configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                    renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component
                        toMap={this.toMap}
                        {...this.props}
                    />}}
                >

                </Navigator>
            </View>
        );
    }
}