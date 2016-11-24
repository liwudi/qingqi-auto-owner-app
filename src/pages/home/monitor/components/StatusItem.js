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
import { IconClock, IconLocationMarker } from '../../../../components/Icons';

export default class StatusItem extends Component {

    render() {
        let item = this.props.data;
        return (
            <ViewForRightArrow  onPress={this.props.onPress} style={[estyle.fxRow,estyle.cardBackgroundColor]}
                                rightIcon={null}>
                <View style={[estyle.fxRow]}>
                    <View style={[estyle.fx1]}>
                        <Text style={[{color: Env.color.auxiliary, fontSize: Env.font.articleTitle}, estyle.marginFontBottom]}>{item.msgTitle}</Text>
                        <Text style={[estyle.marginFontBottom,estyle.text]}>{item.msgContent}</Text>
                        <Text style={[estyle.note, estyle.marginFontBottom]}>{item.happenTime}</Text>
                        <View style={[estyle.fx1,estyle.fxRow]}>
                            <IconLocationMarker color='#FED57E' size={Env.font.base * 30}/>
                            <Text> </Text>
                            <Text style={[estyle.marginFont,estyle.paddingRight,{color: Env.color.text}]}>{item.position || '未获取到位置信息'}</Text>
                        </View>
                    </View>
                </View>
            </ViewForRightArrow>
        )
    }
}