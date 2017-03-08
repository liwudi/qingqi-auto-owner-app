/**
 * Created by zhaidongyou on 2016/10/24.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import TopBanner from '../../components/TopBanner';
import PageList from '../../components/PageList';
import Env from '../../utils/Env';
import {IconUser, IconLocationMarker} from '../../components/Icons';
import ViewForRightArrow from '../../components/ViewForRightArrow';
import MessageListCar from './MessageListCar';
const estyle = Env.style;

//所有车辆消息列表
class CarListMessage extends Component{

    componentWillReceiveProps(nextProps){
        console.log('CarListMessage componentWillReceiveProps');
        setTimeout(() => {
            this.refs.list && this.refs.list.reInitFetch && this.refs.list.reInitFetch();
        }, 50);
    }

    getComponentName(){
        return 'CarListMessage';
    }


    render() {
        return(
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <PageList
                    ref="list"
                    style={estyle.fx1}

                    renderRow={(row) => {
                        row.message =  row.message || {};
                        let messageDetail = row.messageDetail || {};
                        return (<ViewForRightArrow onPress={() => this.props.router.push(MessageListCar,{
                            carId: messageDetail.carId,
                            carNumber: messageDetail.carNumber
                        })}>
                            <View style={[estyle.fxRow,estyle.cardBackgroundColor]}>
                                <View style={[estyle.fxCenter]}>
                                    <Image
                                        style={{borderRadius:100,width:60,height:60}}
                                        source={require('../../assets/images/message-type-1.png')}
                                    />
                                    {row.count ? <View style={[
                                        Env.style.fxCenter,
                                        {
                                            width:Env.font.base * 22,
                                            height:Env.font.base * 22,
                                            borderRadius:Env.font.base * 20,
                                            backgroundColor:'red',
                                            position:'absolute',
                                            top:0,
                                            right:Env.font.base * 0}]}>
                                        <Text style={{color:'#FFF',fontSize:Env.font.base * 16}}>{row.count}</Text>
                                    </View> : null}
                                </View>
                                <View style={[estyle.marginLeft,estyle.fx1]}>
                                    <View style={[estyle.fxRow]}>
                                        <View style={estyle.fx1}>
                                            <Text style={[estyle.articleTitle]}>{messageDetail.carNumber}</Text>
                                        </View>
                                        <Text style={[estyle.note,estyle.marginLeft]}>{messageDetail.happenTime}</Text>
                                    </View>
                                    <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                                        <IconUser color='#FEBEBE'/><Text> </Text>
                                        <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{messageDetail.mastDriver || '无'}</Text>

                                        <IconUser color='#C4DFFE'/><Text> </Text>
                                        <Text style={[estyle.note, {color: Env.color.text}]}>{messageDetail.slaveDriver || '无'}</Text>
                                    </View>
                                    <View style={[estyle.fx1,estyle.fxRow]}>
                                        <IconLocationMarker color='#FED57E' size={Env.font.base * 30}/>
                                        <Text> </Text>
                                        <Text style={[estyle.marginFont,estyle.paddingRight,{color: Env.color.text}]}>{messageDetail.position || '未获取到位置信息'}</Text>
                                    </View>
                                </View>
                            </View>
                        </ViewForRightArrow>)
                    }}
                    fetchData={() => {
                        return Promise.resolve({
                            list : Object.assign([], this.props.messageStore.CarMessage).reverse(),
                            pageTotal:1
                        })
                    }}
                    noData="没未收到任何车队消息"
                    noMore=""
                />
            </View>
        );
    }
}

export default connect(function (stores) {
    return {messageStore: stores.messageStore}
})(CarListMessage);