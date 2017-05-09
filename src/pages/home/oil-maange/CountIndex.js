/**
 * Created by linyao on 2017/5/3.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import OilManage from './OilManage';
import TripManage from './TripManage';
import TimeManage from './TimeManage';
const estyle = Env.style;
const basefont = Env.font.base;

const components=[
    {index:0,component:TripManage,txt:'行驶里程'},
    {index:1,component:OilManage,txt:'油耗'},
    {index:2,component:TimeManage,txt:'行驶时长'}
];
export  default class CountIndex extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currntPage : this.props.index || 0
        }
    }
    select(idx){
        this.setState({currntPage:idx});
    }
    renderView(){
        return (
            <View style={[estyle.fxRow]}>
                {
                    components.map((item,index)=>{
                        return  <TouchableOpacity style={[estyle.fx1]} activeOpacity={1} key={index} onPress={()=>{this.select(item.index) }}>
                            <View style={[estyle.cardBackgroundColor,estyle.fxCenter,estyle.paddingVertical]}><Text>{item.txt}</Text></View>
                            <View style={[{height:10 * basefont,backgroundColor: this.state.currntPage == item.index ? Env.color.main : '#fff'}]}/>
                        </TouchableOpacity>
                    })
                }
            </View>
        )
    }
    renderMain(){
        let Comp = components[this.state.currntPage].component;
        return <Comp {...this.props} />
    }
    render(){
        return(
            <View style={[estyle.containerBackgroundColor,estyle.fx1]}>
                <TopBanner {...this.props} title="统计分析"/>
                {this.renderView()}
                {this.renderMain()}
            </View>
        )
    }
}