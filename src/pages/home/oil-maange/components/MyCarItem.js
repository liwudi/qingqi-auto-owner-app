/**
 * Created by cryst on 2016/10/20.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
import { IconUser, IconLocationMarker } from '../../../../components/Icons';

export default class MyCarItem extends Component {

    render() {

        let item = this.props.data;

        const SpeedView= (realtimeSpeed) => {
            if(typeof realtimeSpeed === 'undefined') {
                return '';
            } else if (realtimeSpeed == 0) {
                return "静止";
            } else {
                return realtimeSpeed + "km/h";
            }
        }

        return (
            <View  onPress={this.props.onPress} style={[estyle.cardBackgroundColor,estyle.padding,estyle.borderBottom]}>
                <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                    <Text style={[estyle.articleTitle,{color: Env.color.important}]}>{item.carCode}</Text>
                    <Text style ={[estyle.note, estyle.fx1,{textAlign:'right',color: Env.color.text}]}>当日总里程：{item.mileage || 0} 公里</Text>
                </View>
                <View style={[estyle.fxRow, estyle.fxRowCenter,{marginTop:5}]}>
                    <IconUser color='#FEBEBE'/><Text> </Text>
                    <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mainDriver || '无'}</Text>

                    <IconUser color='#C4DFFE'/><Text> </Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{item.subDriver || '无'}</Text>
                    <Text style={[estyle.fx1, estyle.note, {color: Env.color.text,textAlign:'right'}]}>平均速度：{item.avgSpeed || 0} km/h</Text>
                </View>
            </View>
        )
    }
}