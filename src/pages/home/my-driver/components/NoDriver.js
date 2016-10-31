/**
 * Created by yaocy on 2016/10/31.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;
import ConfirmButton from '../../../../components/ConfirmButton';

export default class NoDriver extends Component {
    render() {
        return (
            <View style={[estyle.containerBackgroundColor,estyle.fx1,estyle.fxRowCenter, {paddingTop: Env.font.base * 100}]}>
                <Text style={[estyle.text]}>目前没有司机</Text>
                <Text style={[estyle.marginBottom, estyle.text]}>车主添加司机后才会显</Text>
                <Text style={[estyle.marginTop, estyle.text, {color: Env.color.important}]}>我只一辆车，我是车主也是司机</Text>
                <Text style={[estyle.text, {color: Env.color.important}]}>您可以在此添加司机</Text>
                <ConfirmButton style={[estyle.marginVertical]} size="large"
                               onPress={() => this.onLogin()}><Text>添加司机</Text></ConfirmButton>
            </View>
        )
    }
}