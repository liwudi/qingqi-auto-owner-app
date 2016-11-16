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
//console.info(item)
        // item = {"realtimeSpeed": 60.1,
        //     "todayLen": 34.1,
        //     "position": "辽宁省沈阳市华航大厦",
        //     "slaveDriver": "李四",
        //     "mastDriver": "张三",
        //     "carCode": "辽A88888",
        //     "carId": "1234567"}

        const SpeedView= (realtimeSpeed) => {
            if (realtimeSpeed == 0) {
                return "静止";
            } else {
                return realtimeSpeed + "km/h";
            }
        }

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
                        <Text style={[estyle.marginFont,{color: Env.color.text,textAlign:'right'}]}>{SpeedView(item.realtimeSpeed)}</Text>
                    </View>
                    {/*<View style={[estyle.paddingRight]}>*/}
                    {/*<IconTrash/>*/}
                    {/*</View>*/}
                </View>
            </ViewForRightArrow>
        )
    }
}