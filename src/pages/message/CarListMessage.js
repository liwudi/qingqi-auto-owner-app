/**
 * Created by zhaidongyou on 2016/10/24.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import TopBanner from '../../components/TopBanner';
import Env from '../../utils/Env';
import {IconUser} from '../../components/Icons';
const estyle = Env.style;
export default class CarListMessage extends Component{
    render() {
        return(
            <View>
                <TopBanner {...this.props} title="车队信息"/>
                <ScrollView>
                    {/*list一行开始*/}
                    <View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                        <View>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={require('../../assets/images/icon-1.png')}
                            />
                        </View>
                        <View style={[estyle.marginLeft,estyle.fx1]}>
                            <View style={[estyle.fxRow]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>京N23456</Text>
                                </View>
                                    <Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
                            </View>
                            <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                                <IconUser color={Env.color.main}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>张</Text>
                                <IconUser color={Env.color.main} style ={estyle.marginLeft}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>李四</Text>
                            </View>
                            <View>
                                <Text>在北京市东城区东直门南大街停车熄火</Text>
                            </View>
                        </View>
                    </View>
                    {/*list一行结束*/}
                    <View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                        <View>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={require('../../assets/images/icon-1.png')}
                            />
                        </View>
                        <View style={[estyle.marginLeft,estyle.fx1]}>
                            <View style={[estyle.fxRow]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>京N23456</Text>
                                </View>
                                <Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
                            </View>
                            <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                                <IconUser color={Env.color.main}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>张</Text>
                                <IconUser color={Env.color.main} style ={estyle.marginLeft}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>李四</Text>
                            </View>
                            <View>
                                <Text>在北京市东城区东直门南大街停车熄火</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                        <View>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={require('../../assets/images/icon-1.png')}
                            />
                        </View>
                        <View style={[estyle.marginLeft,estyle.fx1]}>
                            <View style={[estyle.fxRow]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>京N23456</Text>
                                </View>
                                <Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
                            </View>
                            <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                                <IconUser color={Env.color.main}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>张</Text>
                                <IconUser color={Env.color.main} style ={estyle.marginLeft}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>李四</Text>
                            </View>
                            <View>
                                <Text>在北京市东城区东直门南大街停车熄火</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                        <View>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={require('../../assets/images/icon-1.png')}
                            />
                        </View>
                        <View style={[estyle.marginLeft,estyle.fx1]}>
                            <View style={[estyle.fxRow]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>京N23456</Text>
                                </View>
                                <Text style={[estyle.text]}>2016-09-04</Text>
                                <Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
                            </View>
                            <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                                <IconUser color={Env.color.main}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>张</Text>
                                <IconUser color={Env.color.main} style ={estyle.marginLeft}/>
                                <Text style={[estyle.note, {color: Env.color.text}]}>李四</Text>
                            </View>
                            <View>
                                <Text>在北京市东城区东直门南大街停车熄火</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}