/**
 * Created by ligj on 2016/10/9.
 * edit by zhaidongyou on 2016/10/13
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
import ConfirmButton from '../../../components/ConfirmButton';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import {IconUser} from '../../../components/Icons'

export default class MyCar extends Component {
    state = {
        list: true
    }

    renderList() {
        return <View>
            <TopBanner
                {...this.props}
                title="我的车辆"
                rightView={<Text style={{color: '#FFF', fontSize: Env.font.note}}>设置</Text>}
            />

            <ScrollView>
                <ViewForRightArrow style={[estyle.cardBackgroundColor, estyle.padding, estyle.borderBottom]}>
                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                        <Text style={[estyle.articleTitle]}>京N23456</Text>
                        <View style={[styles.currentCar, estyle.paddingHorizontal]}><Text
                            style={[estyle.note, {color: '#fff'}]}>当前车辆</Text></View>
                    </View>
                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                        <IconUser color={Env.color.main}/>
                        <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                        <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                        <Text style={[estyle.marginLeft]}>副：</Text>
                        <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow style={[estyle.cardBackgroundColor, estyle.padding, estyle.borderBottom]}>
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.articleTitle]}>京N23456</Text>
                    </View>
                    <View style={[estyle.fxRow]}>
                        <IconUser color={Env.color.main}/>
                        <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                        <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                        <Text style={[estyle.marginLeft]}>副：</Text>
                        <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                    </View>
                </ViewForRightArrow>

            </ScrollView>
        </View>
    }

    renderEmpty() {
        return <View>
            <TopBanner {...this.props} title="我的车辆"/>
            <View style={[estyle.fxRowCenter, {paddingTop: Env.font.base * 100}]}>
                <Text style={[estyle.text]}>目前没车辆</Text>
                <Text style={[estyle.marginBottom, estyle.text]}>车主添加您为司机后才会显示车辆</Text>
                <Text style={[estyle.marginTop, estyle.text, {color: Env.color.important}]}>我只一辆车，我是车主也是司机</Text>
                <Text style={[estyle.text, {color: Env.color.important}]}>您可以在此添加车辆</Text>
                <ConfirmButton style={[estyle.marginVertical]} size="large"
                               onPress={() => this.onLogin()}><Text>添加车辆</Text></ConfirmButton>
                <Text style={[estyle.note]}>要体验更多的管理功能建议您下载“车主端”</Text>
            </View>
        </View>
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                {this.state.list ? this.renderList() : this.renderEmpty()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    currentCar: {
        borderRadius: 400,
        backgroundColor: Env.color.auxiliary,
    }
});