/**
 * Created by ligj on 2016/10/13.
 */
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';
import TabBar from './TabBar';

export default class TabNavigator extends Component {
    tabBar = null;
    constructor(props){
        super(props);
        props.tabs = props.tabs.map((item, index) => {
            item.index = index;
            return item;
        })
    }
    render(){
        return (
            <Navigator
                initialRoute={this.props.tabs[0]}
                initialRouteStack={this.props.tabs}
                navigationBar={<TabBar ref={(tabBar) => {this.tabBar = tabBar;}} tabs={this.props.tabs} />}
                configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
                onDidFocus={(router) => {this.tabBar.changeTab(router.index, false)}}
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