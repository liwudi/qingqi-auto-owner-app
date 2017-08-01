/**
 * Created by linyao on 2017/5/3.
 * Edit by kangyongrui on 2017/7/26
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import TripManage from './TripManage';
import OilManage from './OilManage';
import TimeManage from './TimeManage';
import FleetReport from './FleetReport';
const estyle = Env.style;
const basefont = Env.font.base;

/*const components = [
    {index:0,component:TripManage,txt:'行驶里程'},
    {index:1,component:OilManage,txt:'油耗'},
    {index:2,component:TimeManage,txt:'行驶时长'}
];*/

export default class CountIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //currntPage : this.props.index || 0
        }
    }
    /*select(idx){
        this.setState({currntPage:idx});
    }*/
    goTo(page) {
        this.props.router.push(page);
    }
    /*renderView(){
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
    }*/
    render() {
        return(
            <View style={[estyle.cardBackgroundColor,estyle.fx1]}>
                <TopBanner {...this.props} title="统计报表"/>
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.marginTop]}>
                    <Text style={{width: 30*basefont,height: 2*basefont,backgroundColor: "#cccccc"}}>-</Text>
                    <Text style={[estyle.articleTitle,estyle.paddingRight,estyle.paddingLeft,{color:Env.color.important}]}>车队统计</Text>
                    <Text style={{width: 30*basefont,height: 2*basefont,backgroundColor: "#cccccc"}}>-</Text>
                </View>
                <View style={[estyle.fxRow,{flexWrap:'wrap'}]}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[estyle.statisticsBox,estyle.fxCenter]}
                        onPress={() => this.goTo(TripManage)}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/statistics-icon1.png')}
                                   style={[estyle.statisticsIcon]}/>
                            <View style={[estyle.marginTop]}>
                                <Text style={[estyle.text,{color:Env.color.text}]}>里程统计</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[estyle.statisticsBox,estyle.fxCenter]}
                        onPress={() => this.goTo(OilManage)}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/statistics-icon2.png')}
                                   style={[estyle.statisticsIcon]}/>
                            <View style={[estyle.marginTop]}>
                                <Text style={[estyle.text,{color:Env.color.text}]}>油耗统计</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity
                        activeOpacity={0.6}
                        style={[estyle.statisticsBox,estyle.fxCenter]}
                        onPress={() => this.goTo()}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/statistics-icon3.png')}
                                   style={[estyle.statisticsIcon]}/>
                            <View style={[estyle.marginTop]}>
                                <Text style={[estyle.text,{color:Env.color.text}]}>加油统计</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[estyle.statisticsBox,estyle.fxCenter]}
                        onPress={() => this.goTo()}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/statistics-icon4.png')}
                                   style={[estyle.statisticsIcon]}/>
                            <View style={[estyle.marginTop]}>
                                <Text style={[estyle.text,{color:Env.color.text}]}>异常少油统计</Text>
                            </View>
                        </View>
                    </TouchableOpacity>*/}
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[estyle.statisticsBox,estyle.fxCenter]}
                        onPress={() => this.goTo(TimeManage)}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/statistics-icon5.png')}
                                   style={[estyle.statisticsIcon]}/>
                            <View style={[estyle.marginTop]}>
                                <Text style={[estyle.text,{color:Env.color.text}]}>行驶时长统计</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.marginTop]}>
                    <Text style={{width: 30*basefont,height: 2*basefont,backgroundColor: "#cccccc"}}>-</Text>
                    <Text style={[estyle.articleTitle,estyle.paddingRight,estyle.paddingLeft,{color:Env.color.important}]}>车队报表</Text>
                    <Text style={{width: 30*basefont,height: 2*basefont,backgroundColor: "#cccccc"}}>-</Text>
                </View>
                <View style={[estyle.fxRow]}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[estyle.statisticsBox,estyle.fxCenter]}
                        onPress={() => this.goTo(FleetReport)}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/statistics-icon6.png')}
                                   style={[estyle.statisticsIcon]}/>
                            <View style={[estyle.marginTop]}>
                                <Text style={[estyle.text,{color:Env.color.text}]}>车队报表</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity
                        activeOpacity={0.6}
                        style={[estyle.statisticsBox,estyle.fxCenter]}
                        onPress={() => this.goTo()}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/statistics-icon7.png')}
                                   style={[estyle.statisticsIcon]}/>
                            <View style={[estyle.marginTop]}>
                                <Text style={[estyle.text,{color:Env.color.text}]}>单车月度报表</Text>
                            </View>
                        </View>
                    </TouchableOpacity>*/}
                </View>
            </View>

        )
    }
}