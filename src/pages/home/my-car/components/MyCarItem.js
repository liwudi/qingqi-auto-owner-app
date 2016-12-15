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

    constructor() {
        super();
        this.cacheData = {};
    }

    SpeedView = (realtimeSpeed) => {
        if(typeof realtimeSpeed === 'undefined') {
            return '';
        } else if (realtimeSpeed == 0) {
            return "静止";
        } else {
            return realtimeSpeed + "km/h";
        }
    }
    render() {
        let item = Object.assign(this.cacheData, this.props.data);
        return (
            <ViewForRightArrow  onPress={this.props.onPress} style={[estyle.fxRow,estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow]}>
                    <View style={[estyle.fx1]}>
                        <Text style={[estyle.articleTitle,{color: Env.color.important}]}>{item.carCode}</Text>
                    </View>
                    <View>
                        <Text style ={{textAlign:'right'}}>今日：<Text>{item.todayLen || 0}</Text> (公里)</Text>
                    </View>
                </View>
                <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                    <IconUser color='#FEBEBE'/><Text> </Text>
                    <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mastDriver || '无'}</Text>

                    <IconUser color='#C4DFFE'/><Text> </Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>{item.slaveDriver || '无'}</Text>
                </View>
                <View style={[estyle.fxRow, estyle.fxRowCenter,{marginTop:Env.font.base * 10}]}>
                    <View style={[estyle.fx1,estyle.fxRow]}>
                        <IconLocationMarker color='#FED57E' size={Env.font.base * 30}/>
                        <Text> </Text>
                        <Text style={[estyle.marginFont,estyle.paddingRight,{color: Env.color.text}]}>{item.position || '未获取到位置信息'}</Text>
                        <Text style={[estyle.marginFont,{color: Env.color.text,textAlign:'right'}]}>{this.SpeedView(item.realtimeSpeed)}</Text>
                    </View>
                    {/*<View style={[estyle.paddingRight]}>*/}
                    {/*<IconTrash/>*/}
                    {/*</View>*/}
                </View>
            </ViewForRightArrow>
        )
    }
}