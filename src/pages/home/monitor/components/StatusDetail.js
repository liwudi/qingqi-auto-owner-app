/**
 * Created by cryst on 2016/10/20.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
import { IconUser, IconLocationMarker } from '../../../../components/Icons';

export default class StatusDetail extends Component {
    componentWillReceiveProps(props) {
        console.info(props.data)
        console.info('====================================')
        this.setState({data: props.data || {}});
    }
    render() {
        let item = this.state.data;
        return (
            <ViewForRightArrow  onPress={this.props.onPress} style={[estyle.fxRow,estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow]}>
                    <View style={[estyle.fx1]}>
                        <View style={[estyle.fxRow, estyle.fxRowCenter, estyle.marginFontBottom]}>
                            <View style={[estyle.fx1, estyle.fxRow]}>
                                <Text style={[estyle.text,{color: Env.color.important}]}>{item.carCode||item.carNo}</Text>
                            </View>
                            <View style={[estyle.fx1]}>
                                <Text style ={{textAlign:'right'}}>今日：<Text>{item.todayLen || 0}</Text> km</Text>
                            </View>
                        </View>
                        <Text style={[estyle.note,{color: Env.color.auxiliary}, estyle.marginFontBottom]}>车况：{item.msgTitle || "无"}</Text>
                        <Text style={[estyle.note, estyle.marginFontBottom]}>{item.happenTime}</Text>

                        <View style={[estyle.fxRow, estyle.fxRowCenter, estyle.marginFontBottom]}>
                            <Text style={[estyle.note]}>瞬时油耗：</Text>
                            <Text style={[estyle.note]}><Text style={{color: Env.color.main}}>{item.realtimeOil || 0}</Text>L/100Km</Text>
                        </View>
                        <View style={[estyle.fxRow, estyle.fxRowCenter, estyle.marginFontBottom]}>
                            <Text style={[estyle.note]}>瞬时速度：</Text>
                            <Text style={[estyle.note]}><Text style={{color: Env.color.main}}>{item.realtimeSpeed || 0}</Text>Km/h</Text>
                        </View>
                        <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                            <View style={[estyle.fx1,estyle.fxRow]}>
                                <IconLocationMarker color='#FED57E' size={Env.font.base * 30}/>
                                <Text> </Text>
                                <Text style={[estyle.marginFont,estyle.paddingRight,{color: Env.color.text}]}>{item.position || '未获取到位置信息'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ViewForRightArrow>
        )
    }
}