/**
 * Created by yaocy on 2016/11/2.
 */
import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;

export default class NoDriver extends Component {
    render() {
        return (
            <View style={[estyle.containerBackgroundColor,estyle.fx1,estyle.fxRowCenter, {paddingTop: Env.font.base * 100}]}>
                <Text style={[estyle.text]}>目前没有线路</Text>
                <Text style={[estyle.marginBottom, estyle.text]}>车主添加线路后才会显</Text>
            </View>
        )
    }
}