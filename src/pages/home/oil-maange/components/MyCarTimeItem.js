/**
 * Created by linyao on 2017/5/4.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;
import { IconUser} from '../../../../components/Icons';

export default class MyCarTimeItem extends Component {

    render() {

        let item = this.props.data;

        return (
            <View  onPress={this.props.onPress} style={[estyle.cardBackgroundColor,estyle.padding,estyle.borderBottom]}>
                <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                    <Text style={[estyle.articleTitle,{color: Env.color.important}]}>{item.carCode}</Text>
                    <Text style ={[estyle.note, estyle.fx1,{textAlign:'right',color: Env.color.text}]}>当日运行时长：{item.runningMinutes ? (parseInt(item.runningMinutes)/60).toFixed(2) : 0}h</Text>
                </View>
                <View style={[estyle.fxRow, estyle.fxRowCenter,{marginTop:5}]}>
                    <IconUser color='#FEBEBE'/><Text> </Text>
                    <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mainDriver || '无'}</Text>

                    <IconUser color='#C4DFFE'/><Text> </Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{item.subDriver || '无'}</Text>
                    {/*<Text style={[estyle.fx1, estyle.note, {color: Env.color.text,textAlign:'right'}]}>当日怠速时长：{item.idleMinutes || 0}</Text>*/}
                </View>
            </View>
        )
    }
}