/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/17
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Env from '../../../utils/Env';
const estyle = Env.style;
import MyInfoId from './MyInfoId';
import MyInfoDriver from './MyInfoDriveType';
export default class MyInfo extends Component {
    goTo(page){
        this.props.router.push(page);
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="我的资料"/>

                <ViewForRightArrow onPress = {() => this.goTo(MyInfoId)}>
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.text,estyle.fx1]}>身份证</Text><Text style={estyle.text}>130528198809236098</Text>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow onPress = {() => this.goTo(MyInfoDriver)}>
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.text,estyle.fx1]}>驾照类别</Text><Text style={estyle.text}>未设置</Text>
                    </View>
                </ViewForRightArrow>
            </View>
        );
    }
}