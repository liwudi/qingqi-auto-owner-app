/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    NativeModules,
    StatusBar,
    ScrollView
} from 'react-native';
import ViewForRightArrow from '../../components/ViewForRightArrow';
import ImgButton from '../../components/ImgButton';

import MyCar from './my-car/MyCar';
import MyCarSearch from './my-car/MyCarSearch';
import MyDriver from './my-driver/MyDriver';
import MyLine from './my-line/MyLine';
import Monitor from './monitor/Monitor';
import OilManage from './oil-maange/OilManage';
import TripManage from './oil-maange/TripManage';
import ServiceStation from './service-station/ServiceStation';
import * as Icons from '../../components/Icons';
import Toast from '../../components/Toast';
import {startKefuActivity} from '../../utils/CommModule';

import MessageGoods  from './goods-message/GoodsMessage';
import Bbs from './bbs/index';

import {IconSearch} from '../../components/Icons';
import CountIndex from './oil-maange/CountIndex';
import Banner from '../../components/Banner';
import GoodsIndex  from './goods-message/GoodsIndex';

import Env from '../../utils/Env';
estyle = Env.style;
const basefont = Env.font.base;

import {queryOperateStatisToday, choiceCustomer} from '../../services/AppService';
var CommonModule = NativeModules.CommonModule;


export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operateStatisToday: {},
            myCarsInfo: {}
        };
        this.ridx = null;
        this.isRouterChange = false;
    }

    goTo(page, checkCar = false, prop) {
        if (checkCar) {
            let totalCarNum = this.state.operateStatisToday.totalCarNum;
            if (isNaN(totalCarNum)) return;
            totalCarNum = +totalCarNum;
            if (totalCarNum === 0) page = MyCar;
        }
        this.props.router.push(page, prop);
    }

    customerServiceInfo = null;
    customerServiceInfoErrorMsg = null;

    componentDidMount() {
        this.fetchData();
        !this.timer && this.setTimer();
    }

    //请求数据
    fetchData = () => {
        return queryOperateStatisToday().then((rs) => {
            this.setState({
                operateStatisToday: rs
            })
        }).catch(e => {
            Toast.show(e.message, Toast.SHORT);
        })
    }
    //启动定时器
    setTimer() {
        this.timer = setInterval(() => {
            this.fetchData();
        }, 50000)
    }

    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if (this.ridx === null) this.ridx = cidx;
        if (cidx === this.ridx) {
            if (this.isRouterChange) {
                this.isRouterChange = false;
                this.fetchData();
                !this.timer && this.setTimer();
            }
        } else {
            this.timer && clearInterval(this.timer);
            this.timer = null;
            this.isRouterChange = true;
        }
        return true;
    }

    isLoadingCustomerService = false;

    startCustomerService() {

        Toast.show('正在启动客服，请稍后', Toast.SHORT);
        if (!this.isLoadingCustomerService) {
            this.isLoadingCustomerService = true;
            choiceCustomer().then(rs => {
                if (!rs.token) {
                    Toast.show('分配客服失败，请稍后重试', Toast.SHORT);
                    return;
                }
                startKefuActivity(
                    rs.userId + '',
                    rs.serverId + '',
                    "1",
                    rs.token + '',
                    rs.dialogId + ''
                );
            }).catch(e => {
                Toast.show(e.message, Toast.SHORT);
            }).finally(() => {
                this.isLoadingCustomerService = false;
            });
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render() {
        const renderItem = (name, value, isShowBorder = true) => {
            return <View style={[estyle.fx1, estyle.fxRowCenter, isShowBorder && estyle.borderRight]}>
                <View style={[estyle.fxRow,estyle.fxCenter]}>
                    <Text
                        style={[estyle.articleTitle, {color: Env.color.main, textAlign: 'center',fontWeight:'bold'}]}>{value || 0}</Text>
                    <Text style={[{fontSize:Env.font.mini,color:Env.color.note,marginLeft:10 * basefont}]}>{name}</Text>
                </View>
            </View>;
        };
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <View style={[estyle.iosStatusBarHeight, {backgroundColor: Env.color.main}]}></View>
                <View style={[estyle.fxRow, estyle.fxCenter, {
                    height: 84 * Env.font.base,
                    backgroundColor: Env.color.main
                }]}>
                    <TouchableOpacity onPress={() => this.props.router.push(MyCarSearch)} activeOpacity={.8}
                                      style={[estyle.fxRow, estyle.fxCenter, {
                                          borderRadius: 4,
                                          width: Env.screen.width * .94,
                                          height: 64 * Env.font.base,
                                          backgroundColor: '#FFF'
                                      }]}>
                        <IconSearch size={Env.font.base * 36} color={Env.color.text}/><Text style={estyle.text}>
                        请输入司机姓名、VIN或车牌号</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={[estyle.fx1]}>
                <Banner {...this.props} />
                {
                    this.props.NetIsConnected
                        ? null
                        :
                        <View style={[estyle.padding, estyle.fxRow, estyle.fxRowCenter, {backgroundColor: '#FDEDEE'}]}>
                            <Icons.IconWaring size={Env.font.base * 40} color="#E55C5D"/>
                            <Text style={[estyle.note, {marginLeft: Env.font.base * 40}]}>网络连接不可用</Text>
                        </View>
                }
                    <View style={[estyle.padding]}><Text style={[estyle.note]}>今日运营统计</Text></View>

                    <View style={[estyle.fxRow, estyle.padding, estyle.border, {backgroundColor: '#FFF'}]}>
                        <Text
                            style={[estyle.fx1, estyle.text]}>在线车辆数：{this.state.operateStatisToday.onlineCar || 0}辆</Text>
                        <Text
                            style={[estyle.fx1, estyle.text]}>总车辆数：{this.state.operateStatisToday.totalCarNum || 0}辆</Text>
                    </View>
                    <ViewForRightArrow onPress={() => this.goTo(CountIndex)}
                                       style={[estyle.fxRow, estyle.cardBackgroundColor]}>
                        <View style={[estyle.fxRow]}>
                            {renderItem('行驶总里程(km)', this.state.operateStatisToday.mileAgeTotal || 0)}
                            {renderItem('平均里程/车(km)', this.state.operateStatisToday.mileAgeAvg || 0, false)}
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress={() => this.goTo(CountIndex, false, {index: 1})}
                                       style={[estyle.fxRow, estyle.cardBackgroundColor]}>
                        <View style={[estyle.fxRow]}>
                            {renderItem('总油耗(L)', this.state.operateStatisToday.oilWearTotal || 0)}
                            {renderItem('每百公里油耗(L)', this.state.operateStatisToday.oilWearAvg || 0, false)}
                        </View>
                    </ViewForRightArrow>
                    <View style={[estyle.fx1,estyle.fxRow,{flexWrap:'wrap',marginTop:10*basefont}]}>
                        <ImgButton onPress={() => this.goTo(MyCar)}
                                   src={require('../../assets/images/icon12.png')} title="我的车辆"/>
                        <ImgButton  onPress={() => this.goTo(MyDriver, true)}
                                   src={require('../../assets/images/icon13.png')} title="我的司机"/>
                        <ImgButton onPress={() => this.goTo(MyLine, true)}
                                   src={require('../../assets/images/icon14.png')} title="我的线路"/>
                        <ImgButton onPress={() => this.goTo(Monitor)}
                                   src={require('../../assets/images/icon15.png')} title="实时监控"/>
                        <ImgButton onPress={() => this.goTo(CountIndex)}
                                   src={require('../../assets/images/icon11.png')} title="统计分析"/>
                        {
                            Env.isAndroid ? <ImgButton onPress={() => this.startCustomerService()}
                                                       src={require('../../assets/images/icon6.png')} title="联系客服"/>
                                : null
                        }
                        <ImgButton onPress={() => this.goTo(ServiceStation, true)}
                                   src={require('../../assets/images/icon4.png')} title="服务预约"/>
                        <ImgButton onPress={() => this.goTo(GoodsIndex, true)}
                                   src={require('../../assets/images/icon9.png')} title="货源信息"/>
                        <ImgButton onPress={() => this.goTo(Bbs)}
                                   src={require('../../assets/images/icon8.png')} title="卡友论坛"/>
                        {/*<ImgButton  src={require('../../assets/images/icon10.png')} gray={true} title="开发中"/>*/}
                    </View>
                </ScrollView>
            </View>
        )
    }
}