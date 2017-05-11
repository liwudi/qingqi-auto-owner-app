/**
 * Created by linyao on 2017/5/5.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import GoodsMessage from './GoodsMessage';
import {queryFollowLine, messageSwitch, messageOpenOrShut} from '../../../services/AppService';
import FollowItem from './components/FollowItem';
import GoodsFollowList from './GoodsFollowList';
import {IconLocationMarker, IconAdd, IconRemove}  from '../../../components/Icons';
import Toast from '../../../components/Toast';
import AddFollowLine from './AddFollowLine';
import messageOpen from '../../../assets/images/messageOpen.png';
import messageClose from '../../../assets/images/messageClose.png';
import RemoveFollowLine from './RemoveFollowLine';
const estyle = Env.style;
const basefont = Env.font.base;

export  default class GoodsFollow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 1
        }
    }

    fetchData = () => {
        this.setState({isRefreshing: true});
        messageSwitch()
            .then((s) => {
                this.setState({message: s})
            })
            .catch((err) => {
                Toast.show(err.message, Toast.SHORT)
            })
        queryFollowLine()
            .then((data) => {
                this.setState({data: data});
            })
            .catch((err) => {
                Toast.show(err.message, Toast.SHORT)
            })
            .finally(() => {
                this.setState({isRefreshing: false})
            });

    };

    onRefresh() {
        this.fetchData();
    }

    componentWillMount() {
        this.fetchData();
    }

    selectLine(item) {
        this.props.router.push(GoodsFollowList, {data: item})
    }

    renderList() {
        let data = this.state.data;
        return data.map((item, idx) => {
            return <FollowItem data={item} onPress={() => {
                this.selectLine(item)
            }} key={idx}/>
        })
    }

    renderView() {
        if (this.state.data) {
            return this.state.data.length ? this.renderList() : <View style={[estyle.fxCenter, estyle.marginTop]}>
                <Text style={[estyle.articleTitle]}>您还没关注线路</Text>
            </View>;
        }
        return <View/>;
    }

    setMessage() {
        if (this.state.message == 1) {
            this.props.alert('提示',
                '关闭消息提醒您的手机将不会收到最新货源信息，是否确认关闭？',
                [
                    {
                        text: '确定', onPress: () => {
                        messageOpenOrShut(0)
                            .then(() => {
                                this.setState({message: 0});
                            })
                            .catch((err) => {
                                Toast.show(err.message, Toast.SHORT)
                            })
                    }
                    },
                    {text: '取消'}
                ]);
        } else {
            messageOpenOrShut(1)
                .then(() => {
                    this.setState({message: 1});
                })
                .catch((err) => {
                    Toast.show(err.message, Toast.SHORT)
                })
        }
    }

    renderMessage() {
        let data = this.state.data;
        return (
            data && data.length >= 1 ?
                <View style={[estyle.fxRow, estyle.padding]}>
                    <View style={[estyle.fx1]}/>
                    <View style={[estyle.fxRow, estyle.fxCenter]}>
                        <Text style={[estyle.note]}>消息提醒</Text>
                        <TouchableOpacity style={estyle.marginLeft} onPress={() => {
                            this.setMessage()
                        }}>
                            <Image source={this.state.message === 1 ? messageOpen : messageClose}
                                   style={{width: 60 * basefont, height: 24 * basefont}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                : null
        )
    }

    render() {
        let data = this.state.data;
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <View style={[estyle.fx1]}>
                    {
                        this.renderMessage.bind(this)()
                    }
                    <ScrollView style={[estyle.fx1]}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                        colors={Env.refreshCircle.colors}
                                        progressBackgroundColor={Env.refreshCircle.bg}
                                    />
                                }>
                        {this.renderView()}
                        <View style={[estyle.fxRow, estyle.fxCenter, estyle.marginTop]}>
                            {
                                data && data.length < 5 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.router.push(AddFollowLine, {
                                                data: data,
                                                callBack: this.fetchData
                                            })
                                        }}
                                        style={[estyle.fxRow, estyle.fxCenter, estyle.padding, {
                                            backgroundColor: Env.color.main,
                                            borderRadius: 5 * basefont
                                        }]}>
                                        <IconAdd color='#fff'/>
                                        <Text
                                            style={[estyle.marginLeft, estyle.articleTitle, {color: '#fff'}]}>添加关注线路</Text>
                                    </TouchableOpacity> : null
                            }
                            {
                                data && data.length >= 1 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.router.push(RemoveFollowLine, {
                                                data: data,
                                                callBack: this.fetchData
                                            })
                                        }}
                                        style={[estyle.marginLeft, estyle.fxRow, estyle.fxCenter, estyle.padding, {
                                            backgroundColor: '#ccc',
                                            borderRadius: 5 * basefont
                                        }]}>
                                        <IconRemove color='#fff'/>
                                        <Text
                                            style={[estyle.marginLeft, estyle.articleTitle, {color: '#fff'}]}>删除关注线路</Text>
                                    </TouchableOpacity> : null
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}