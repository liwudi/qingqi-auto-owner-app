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

export default class CarItem extends Component {

    render() {
        let item = this.props.data;
        console.info('-------------------------------------------------------------item')
        console.info(item)

        const SpeedView= (realtimeSpeed) => {
            if (realtimeSpeed == 0) {
                return "静止";
            } else {
                return realtimeSpeed + "km/h";
            }
        }

        return (
            <ViewForRightArrow  onPress={this.props.onPress} style={[estyle.fxRow,estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                    <View style={[estyle.fx1, estyle.fxRow]}>
                        <Text style={[estyle.text,{color: Env.color.important}]}>{item.carCode || '无'}</Text>
                    </View>
                    <View style={[estyle.fx1]}>
                        <Text style ={{textAlign:'right'}}>今日：<Text>{item.todayLen || 0}</Text> (公里)</Text>
                    </View>
                </View>
                <View style={[estyle.fxRow, estyle.fxRowCenter, estyle.marginFontBottom]}>
                    <IconUser color='#FEBEBE'/><Text> </Text>
                    <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mastDriver || "无"}</Text>
                    <IconUser color='#C4DFFE'/><Text> </Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{item.slaveDriver || "无"}</Text>
                </View>
                <Text style={[estyle.note,{color: Env.color.auxiliary}, estyle.marginFontBottom]}>车况：{item.carStatus || "无"}</Text>

                <View style={[estyle.fxRow, estyle.fxRowCenter, estyle.marginFontBottom]}>
                    <Text style={[estyle.note]}>瞬时油耗：</Text>
                    <Text style={[estyle.note]}><Text style={{color: Env.color.main}}>{item.realtimeOil || 0}</Text>L/100Km</Text>

                    <Text style={[estyle.note, estyle.marginLeft]}>瞬时油耗：</Text>
                    <Text style={[estyle.note]}><Text style={{color: Env.color.main}}>{item.realtimeSpeed || 0}</Text>Km/h</Text>
                </View>
                <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                    <View style={[estyle.fx1,estyle.fxRow]}>
                        <IconLocationMarker color='#FED57E' size={Env.font.base * 30}/>
                        <Text> </Text>
                        <Text style={[estyle.marginFont,estyle.paddingRight,{color: Env.color.text}]}>{item.position || '未获取到位置信息'}</Text>
                    </View>
                </View>
            </ViewForRightArrow>
        )
    }
}