/**
 * Created by kangyr on 2017/7/28.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import * as Icons from '../../../components/Icons';
const estyle = Env.style;
const basefont = Env.font.base;

export default class FleetReport extends Component {
    render() {
        const renderItem = (name, value) => {
            return <View style={[estyle.fx1,estyle.fxRowCenter,estyle.paddingLeft,estyle.paddingRight,{paddingTop:21*basefont}]}>
                        <View style={{height: 140*basefont}}>
                            <Text style={[estyle.paddingTop,estyle.text,{textAlign: 'center',width: 280*basefont,backgroundColor: "#58b8ff",color: Env.color.navTitle}]}>{name}</Text>
                            <Text style={[estyle.paddingBottom,estyle.navTitle,{textAlign: 'center',width: 280*basefont,backgroundColor: "#58b8ff",color: Env.color.navTitle}]}>{value || 0}</Text>
                        </View>
                    </View>;
        };
        return (
            <View style={[estyle.cardBackgroundColor,estyle.fx1]}>
                <TopBanner {...this.props} title="车队运营报表"/>
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,estyle.borderBottom,{backgroundColor:'#FFF'}]}>
                    <TouchableOpacity style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
                        <Icons.IconArrowLeft/>
                    </TouchableOpacity>
                    <Text style={[estyle.fxCenter,{color:'#9f9f9f'}]}>2017.06.05</Text>
                    <TouchableOpacity style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
                        <Icons.IconArrowRight/>
                    </TouchableOpacity>
                </View>
                <View style={[estyle.paddingLeft,estyle.paddingBottom,estyle.paddingVertical,{backgroundColor:'#eff9fa',marginBottom: 21*basefont}]}><Text style={{color:Env.color.important}}>本月运营概括 <Text style={[estyle.text,{color:Env.color.line}]}>|</Text> <Text style={[estyle.note,{color:Env.color.important}]}>车辆数：110</Text></Text></View>
                <View style={[estyle.fxRow]}>
                    {renderItem('行驶总里程', '56600.7 KM')}
                    {renderItem('总油耗', '2708.0 L')}
                </View>
                <View style={[estyle.fxRow]}>
                    {renderItem('工作时长', '3400.5 h')}
                    {renderItem('怠速时长', '300.0 h')}
                </View>
                <View style={[estyle.paddingLeft,estyle.paddingBottom,estyle.paddingVertical,estyle.important,{backgroundColor:'#eff9fa',marginTop: 21*basefont}]}><Text style={[estyle.text]}>本月运营详情 <Text style={[estyle.text,{color:Env.color.line}]}>|</Text> <Text style={[estyle.note,{color:Env.color.important}]}>车辆数：110</Text></Text></View>
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
                    <TouchableOpacity style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
                        <Text style={[estyle.text]}>全部车型 ▾</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
                        <Text style={[estyle.text]}>排序 ▾</Text>
                    </TouchableOpacity>
                </View>
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,estyle.borderTop,{backgroundColor: Env.color.bg}]}>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>车牌号</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>里程km</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>油耗L</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>平均油耗L/100km</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>工作时长h</Text>
                </View>
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding]}>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>京N12231</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>1300</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>500</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>26.5</Text>
                    <Text style={[estyle.fx1,estyle.fxRow,estyle.fxCenter,estyle.note]}>123.5</Text>
                </View>
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,estyle.borderTop,estyle.borderBottom]}>
                    <TouchableOpacity style={[estyle.fx1,estyle.fxRow,estyle.fxCenter]}>
                        <Text style={[estyle.text,{color: '#4f77db'}]}>加载更多>></Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}