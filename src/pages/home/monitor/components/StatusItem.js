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

export default class StatusItem extends Component {

    render() {
        let item = this.props.data;
        const SpeedView= (realtimeSpeed) => {
            if (realtimeSpeed == 0) {
                return "静止";
            } else {
                return realtimeSpeed + "km/h";
            }
        }

        return (
            <ViewForRightArrow  onPress={this.props.onPress} style={[estyle.fxRow,estyle.cardBackgroundColor]}
                                rightIcon={null}>
                <View style={[estyle.fxRow]}>
                    <View style={[estyle.fx1]}>
                        <Text style={[estyle.note,{color: Env.color.auxiliary}, estyle.marginFontBottom]}>{item.msgTitle}</Text>
                        <Text style={[estyle.marginFontBottom,estyle.note, {color: Env.color.text}]}>{item.msgContent}</Text>
                        <Text style={[estyle.note, estyle.marginFontBottom]}>{item.happenTime}</Text>
                        <Text style={[estyle.marginFont,estyle.note]}>{item.position}</Text>
                    </View>
                </View>
            </ViewForRightArrow>
        )
    }
}