/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import * as Icons from '../../../components/Icons';
const estyle = Env.style;
import Env from '../../../utils/Env';
import {IconUser} from '../../../components/Icons'
import {IconTrash} from '../../../components/Icons'

import MyLineSetStart from './MyLineSetStart';

export default class MyLineAdd extends Component {
    render() {
        return (
            <View style={estyle.fx1}>
                <TopBanner {...this.props} title="添加线路"/>
                <ScrollView style={[estyle.fx1,estyle.containerBackgroundColor]}>
                    <View style={estyle.padding}><Text style = {{color:Env.color.main}}>起终点</Text></View>
                    <View style={estyle.cardBackgroundColor}>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <View style={estyle.fx1}><Text>起点</Text></View>
                            <Text onPress={() => {
                                this.props.router.push(MyLineSetStart);
                            }} style={styles.noteBlue}>{this.props.start || '点击设置'}</Text>
                        </View>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <Text style={estyle.fx1}>终点</Text>
                            <Text style={styles.noteBlue}>点击设置</Text>
                        </View>
                    </View>

                    <View style={[estyle.padding,estyle.fxRow]}>
                        <View style={estyle.fx1}><Text style = {{color:Env.color.main}}>途径点</Text></View>
                        <View style={estyle.paddingRight}><Icons.IconPlus/></View>
                    </View>
                    <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                        <View style={estyle.fx1}><Text>济南</Text></View>
                        <View style={[estyle.paddingRight, estyle.fxCenter]}>
                            <IconTrash/>
                        </View>
                    </View>
                    <View style={estyle.padding}><Text style = {{color:Env.color.main}}>驾驶规定</Text></View>
                    <View style={estyle.cardBackgroundColor}>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <View style={estyle.fx1}><Text>最高时速</Text></View>
                            <Text style={[styles.noteBlue,estyle.paddingRight]}>60Km/h</Text>
                            <Text style={styles.noteBlue}>点击设置</Text>
                        </View>
                        <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding]}>
                            <View style={estyle.fx1}><Text>总油耗限制</Text></View>
                            <Text style={[styles.noteBlue,estyle.paddingRight]}>600L</Text>
                            <Text style={styles.noteBlue}>点击设置</Text>
                        </View>
                    </View>
                    <View style={[estyle.padding,estyle.fxRow]}>
                        <View style={estyle.fx1}><Text style = {{color:Env.color.main}}>设置车辆</Text></View>
                        <View style={estyle.paddingRight}><Icons.IconPlus/></View>
                    </View>
                    <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                        <View style={estyle.fx1}>
                            <Text style={[estyle.articleTitle]}>京N23456</Text>
                            <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                                <IconUser color={Env.color.main}/>
                                <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                                <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                                <Text style={[estyle.marginLeft]}>副：</Text>
                                <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                            </View>
                        </View>
                        <View style={[estyle.paddingRight, estyle.fxCenter]}>
                            <IconTrash/>
                        </View>
                    </View>
                    <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,,estyle.cardBackgroundColor]}>
                        <View style={estyle.fx1}>
                            <Text style={[estyle.articleTitle]}>鲁B1456</Text>
                            <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                                <IconUser color={Env.color.main}/>
                                <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                                <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                                <Text style={[estyle.marginLeft]}>副：</Text>
                                <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                            </View>
                        </View>
                        <View style={[estyle.paddingRight, estyle.fxCenter]}>
                            <IconTrash/>
                        </View>
                    </View>
                    <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                        <View style={estyle.fx1}>
                            <Text style={[estyle.articleTitle]}>陕A1456</Text>
                            <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                                <IconUser color={Env.color.main}/>
                                <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                                <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                                <Text style={[estyle.marginLeft]}>副：</Text>
                                <Text style={[estyle.note, {color: Env.color.text}]}>梁大人</Text>
                            </View>
                        </View>
                        <View style={[estyle.paddingRight, estyle.fxCenter]}>
                            <IconTrash/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    noteBlue:{
        fontSize:Env.font.note,
        color:Env.color.main
    }
});