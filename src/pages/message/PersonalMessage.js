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

import moment from 'moment';

import TopBanner from '../../components/TopBanner';
import PageList from '../../components/PageList';
import {connect} from 'react-redux'

import Env from '../../utils/Env';
const estyle = Env.style;


class PersonalMessage extends Component{
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.messageStore.PersonalMessage.length != this.props.messageStore.PersonalMessage.length){
            setTimeout(() => this.refs.list.reInitFetch(), 50);
        }
    }

    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="个人消息"/>

                <PageList
                    ref="list"
                    style={estyle.fx1}
                    renderRow={(row) => {
                        row.message =  row.message || {};
                        return <View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                            <View>
                                <Image
                                    style={{borderRadius:100,width:60,height:60}}
                                    source={require('../../assets/images/message-type-5.png')}
                                />
                            </View>
                            <View style={[estyle.marginLeft,estyle.fx1]}>
                                <View style={[estyle.fxRow,estyle.fx1]}>
                                    <View style={estyle.fx1}>
                                        <Text style={[estyle.articleTitle]}>{row.message.Title}</Text>
                                    </View>
                                    <Text style={[estyle.text,estyle.marginLeft]}>{moment(row.time).format('MM-DD hh:ss')}</Text>
                                </View>
                                <View>
                                    <Text style={[estyle.note]}>{row.message.Content}</Text>
                                </View>
                            </View>
                        </View>
                    }}
                    fetchData={() => {
                        return Promise.resolve({
                            list : Object.assign([], this.props.messageStore.PersonalMessage).reverse(),
                            pageTotal:1
                        })
                    }}
                />
            </View>
        );
    }
}

export default connect(function (stores) {
    return {messageStore: stores.messageStore}
})(PersonalMessage);
