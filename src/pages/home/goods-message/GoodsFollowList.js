/**
 * Created by linyao on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

import {queryGoodsByLine, userAuth, getCarGoDetail} from '../../../services/AppService';
import GoodsDetail from './GoodsDetail';
import PageList from '../../../components/PageList';
import Item from './components/GoodsInfoItem';
import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import MyInfoIndex from '../../userCenter/my-info/MyInfoIndex';
import Toast from '../../../components/Toast';
const estyle = Env.style;
export default class GoodsFollowList extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

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
            this.setState({doing: false});
        } else if (data.dataSourcesCode == 2) {
            let id = data.goodsSourceId;
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
        }
    }

    clickItem = (data1) => {
        if(this.state.doing) return;
        this.setState({doing: true});
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

    renderNoData() {
        return <View><Text style={[estyle.marginFontBottom, estyle.text]}>该线路货源已经被抢光了,</Text><Text
            style={[{textAlign: 'center'}, estyle.text]}>有新货源我们马上通知您！</Text></View>
    }
    doback(){
        this.props.backFun && this.props.backFun();
        this.props.doBack();
    }

    render() {
        let propData = this.props.data;
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]} >
                <TopBanner {...this.props} title="货源信息" onPress={this.doback.bind(this)}/>
                <View style={[estyle.cardBackgroundColor, estyle.padding, estyle.fxCenter]}>
                    <Text style={[estyle.text]}>{
                        `${propData.startAddressName} --- ${propData.endAddressName || '无'} ${propData.carModel || ''}  ${propData.carLength ? (propData.carLength + '米') : '' }`
                    }
                    </Text>
                </View>
                <View style={estyle.fx1}>
                    <PageList
                        ref="list"
                        noDataView={this.renderNoData()}
                        noMore="无更多货源信息"
                        style={estyle.fx1}
                        reInitField={[this.state.random]}
                        renderRow={(row) => {
                            return <Item
                                router={this.props.router}
                                data={row}
                                onPress={() => {
                                    this.clickItem(row)
                                }}
                            />
                        }}
                        fetchData={(pageNumber, pageSize) => {
                            return queryGoodsByLine(
                                this.props.data.id,
                                pageNumber,
                                pageSize,
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}