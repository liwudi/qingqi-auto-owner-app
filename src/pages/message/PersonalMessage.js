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
import Toast from '../../components/Toast';

import Env from '../../utils/Env';
const estyle = Env.style;
import GoodsDetail from '../home/goods-message/GoodsDetail';
import MyInfoIndex from '../userCenter/my-info/MyInfoIndex';
import {getCarGoDetail,userAuth} from '../../services/AppService';

class PersonalMessage extends Component{
    constructor(props){
        super(props);
    }

    getComponentName(){
        return 'PersonalMessage';
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.messageStore.PersonalMessage.length != this.props.messageStore.PersonalMessage.length){
            setTimeout(() => this.refs.list.reInitFetch(), 50);
        }
    }
    /**
     * 货源相关推送的方法
     * @param item
     */
    alert = (type) => {
        let mainMsg = '查看货源详情需要进行资料认证',confirmMsg = '去认证';
        if(type == 4) return;
        switch (type) {
            case 2 : mainMsg = '您的认证信息正在审核中请耐心等待'; confirmMsg = '查看详情'; break;
            case 5 : mainMsg = '您的认证信息已过期请更新信息'; confirmMsg = '去更新'; break;
            default : mainMsg = '查看货源详情需要进行资料认证';confirmMsg = '去认证';
        }
        this.props.alert(
            '提示', mainMsg, [
                {text: confirmMsg, onPress: this.goToMyInfo},
                {text: '取消'}
            ]
        )
    };

    goToMyInfo = () => {
        this.props.router.push(MyInfoIndex);
    }

    goToDetail = (data) => {
        if (data.dataSourcesCode == 1) {
            this.props.router.push(GoodsDetail, {
                nav: {
                    goodssourceid: data.goodsSourceId,
                    onlycode: data.onlyCode
                }
            });
        } else if (data.dataSourcesCode == 2) {
            let id = data.goodsSourceId;
            if (this.state.doing) return;
            this.setState({doing: true}, () => {
                getCarGoDetail(id)
                    .then((res) => {
                        this.props.router.push(GoodsDetail, {
                            url: res.url
                        });
                    })
                    .catch((e) => {
                        Toast.show(e.message, Toast.SHORT);
                    })
                    .finally(() => {
                        this.setState({doing: false})
                    })
            })

        }
    }

    clickItem = (data1) => {
        userAuth(data1.dataSourcesCode).then((data) => {
            let validStatus = data.status;
            if (validStatus == 4) {
                this.goToDetail(data1);
            } else {
                this.alert(validStatus);
            }
        }).catch((e = {}) => {
            Toast.show(e.message, Toast.SHORT);
        });
    }
    /**--------------------------------------*/

    gotoSomeWhere(item) {
        if (!item || !item.CustomContent || !item.CustomContent.Type) return;
        let goto =(page,props)=>{this.props.router.push(page,props)} ,content = item.CustomContent;
        switch (item.CustomContent.Type){
            case 'stationAppointment' :
                goto(ServiceStationAppointmentDetail,{order:{woCode:content.params.wocode}});
                break;
            case 'goodsDetail' :
                this.clickItem({
                    dataSourcesCode: content.params.dataSourcesCode,
                    goodsSourceId : content.params.goodsSourceId,
                    onlyCode : content.params.onlyCode
                });
                break;
        }
    }

    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <PageList
                    ref="list"
                    style={estyle.fx1}
                    renderRow={(row) => {
                        row.message =  row.message || {};
                        return <TouchableOpacity onPress={()=>{this.gotoSomeWhere(row.message)}}  style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
                            <View>
                                <Image
                                    style={{borderRadius:100,width:60,height:60}}
                                    source={require('../../assets/images/message-type-5.png')}
                                />
                            </View>
                            <View style={[estyle.marginLeft,estyle.fx1]}>
                                <View style={[estyle.fxRow]}>
                                    <View style={estyle.fx1}>
                                        <Text style={[estyle.articleTitle]}>{row.message.Title}</Text>
                                    </View>
                                    <Text style={[estyle.text,estyle.marginLeft]}>{moment(row.time).format('MM-DD HH:mm')}</Text>
                                </View>
                                <View>
                                    <Text style={[estyle.note]}>{row.message.Content}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }}
                    fetchData={() => {
                        return Promise.resolve({
                            list : Object.assign([], this.props.messageStore.PersonalMessage).reverse(),
                            pageTotal:1
                        })
                    }}
                    noData="没未收到任何个人消息"
                    noMore=""
                />
            </View>
        );
    }
}

export default connect(function (stores) {
    return {messageStore: stores.messageStore}
})(PersonalMessage);
