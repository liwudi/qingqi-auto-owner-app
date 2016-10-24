/**
 * Created by zhaidongyou on 2016/10/21.
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
const estyle = Env.style;
export default class PersonalMessage extends Component{
    render() {
        return (
            <View>
                <TopBanner {...this.props} title="个人信息"/>
                <ScrollView>
                    {/*list的一条开始*/}
                    <View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                        <View>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={require('../../assets/images/icon-1.png')}
                            />
                        </View>
                        <View style={[estyle.marginLeft,estyle.fx1]}>
                            <View style={[estyle.fxRow,estyle.fx1]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>资质审核通过</Text>
                                </View>
                                <Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
                            </View>

                            <View>
                                <Text>您的审核已通过，成为了京N3331的车主</Text>
                            </View>
                        </View>
                    </View>
                    {/*list的一条结束*/}
                    <View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                        <View>
                            <Image
                                style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
                                    borderColor:'#85C7E7',}}
                                source={require('../../assets/images/icon-1.png')}
                            />
                        </View>
                        <View style={[estyle.marginLeft,estyle.fx1]}>
                            <View style={[estyle.fxRow,estyle.fx1]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>中秋节大酬宾</Text>
                                </View>
                                <Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
                            </View>

                            <View>
                                <Text>现邀请司机加入车队有机会获得货车专业行车记录仪</Text>
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
                            <View style={[estyle.fxRow,estyle.fx1]}>
                                <View style={estyle.fx1}>
                                    <Text style={[estyle.articleTitle]}>新版本更新</Text>
                                </View>
                                <Text style={[estyle.text]}>2016-09-04</Text>
                                <Text style={[estyle.text,estyle.marginLeft]}>19.06</Text>
                            </View>

                            <View>
                                <Text>新版本添加油耗分析功能让您分分钟省出一辆车</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}