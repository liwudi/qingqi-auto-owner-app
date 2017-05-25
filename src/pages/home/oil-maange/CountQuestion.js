/**
 * Created by mapbar on 2017/2/24.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;

export default class CountQuestion extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="名词解释" />
                <View style={[estyle.padding,estyle.fx1,estyle.fxRowCenter]}>
                    {/*<Text style={[estyle.marginBottom,estyle.articleTitle]}>什么是行驶时长、停车（怠速）时长？</Text>*/}
                    <Text style={[estyle.marginBottom,estyle.articleTitle]}>什么是行驶时长？</Text>
                    <Text style={[estyle.text,estyle.marginBottom]}>行驶时长：发动机启动的时长；</Text>
                    {/*<Text style={[estyle.text,estyle.marginBottom]}>停车（怠速）时长：发动机有转速，且车速等于零时的时长。</Text>*/}
                </View>
            </View>
        )
    }
}
