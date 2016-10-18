/**
 * Created by cryst on 2016/10/18.
 */
import React, {Component} from 'react';
import {View, Text, Navigator, ScrollView, StyleSheet} from 'react-native';

import ConfirmButton from '../../components/ConfirmButton';
import CancelButton from '../../components/CancelButton';
import ImgButton from '../../components/ImgButton';

import LabelInput from '../../components/LabelInput';
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';


import TopBanner from '../../components/TopBanner';
import Alert from '../../components/Modals/Alert';


import user from '../user/index'
import Login from '../user/Login';
import QuickLogin from '../user/QuickLogin';
import SaveTrueName from '../user/SaveTrueName';
import Reg from '../user/Reg';
import RegSuccess from '../user/RegSuccess';
import RegCheckCode from '../user/RegCheckCode';
import ServiceProvision from '../user/ServiceProvision';
import FindPassword from '../user/FindPassword';
import FindPasswordCheckCode from '../user/FindPasswordCheckCode';
import FindPasswordNewPassword from '../user/FindPasswordNewPassword';

import AddCar from '../add-car/AddCar';
import AddCarSelectCar from '../add-car/AddCarSelectCar';
import AddCarForVin from '../add-car/AddCarForVin';
import AddCarForVinStep2 from '../add-car/AddCarForVinStep2';
import AddCarForInvoiceNo from '../add-car/AddCarForInvoiceNo';
import AddCarForVinUploadInvoiceNo from '../add-car/AddCarForVinUploadInvoiceNo';
import WhereisVin from '../add-car/WhereisVin';

import HomeRouter from '../HomeRouter';
import SearchList from '../home/SearchList';
import MyCar from '../home/my-car/MyCar';
import CarDetail from '../home/my-car/CarDetail';
import BoundDriver from '../home/my-car/BoundDriver';
import BoundLine from '../home/my-car/BoundLine';
import CarParameter from '../home/my-car/CarParameter';
import MessageCars from '../home/my-car/MessageCars';
import ModifyVehicleLicence from '../home/my-car/ModifyVehicleLicence';
import TimeTracking from '../home/my-car/TimeTracking';
import TrackPlay from '../home/my-car/TrackPlay';

import MyDriver from '../home/my-driver/MyDriver'
import MyDriverAdd from '../home/my-driver/MyDriverAdd'
import MyDriverPhoneAdd from '../home/my-driver/MyDriverPhoneAdd'
import MyDriverEdit from '../home/my-driver/MyDriverEdit'

import MyLine from '../home/my-line/MyLine'
import MyLineAdd from '../home/my-line/MyLineAdd'
import MyLineEdit from '../home/my-line/MyLineEdit'
import MyLineSetEnd from '../home/my-line/MyLineSetEnd'
import MyLineSetPass from '../home/my-line/MyLineSetPass'
import MyLineSetRule from '../home/my-line/MyLineSetRule'
import MyLineSetStart from '../home/my-line/MyLineSetStart'
import MyLineAddCarList from '../home/my-line/MyLineAddCarList'

import Monitor from '../home/monitor/Monitor'
import MonitorCarDetail from '../home/monitor/MonitorCarDetail'
import MonitorMap from '../home/monitor/MonitorMap'
import MonitorMapOil from '../home/monitor/MonitorMapOil'
import MonitorMapSpeed from '../home/monitor/MonitorMapSpeed'
import MonitorShare from '../home/monitor/MonitorShare'
import MonitorTimeTracking from '../home/monitor/MonitorTimeTracking'

import OilManage from '../home/oil-maange/OilManage'
import OilManageCarList from '../home/oil-maange/OilManageCarList'
import OilManageSetMark from '../home/oil-maange/OilManageSetMark'
import OilManageShareMark from '../home/oil-maange/OilManageShareMark'
import OilManageShowMark from '../home/oil-maange/OilManageShowMark'

import MileageStatisitcs from '../mileage-statistics/MileageStatisitcs'

import Message from '../message/Message'
import MessageCarLocation from '../message/MessageCarLocation'
import MessageListCar from '../message/MessageListCar'

export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertActive: false
        }

    }

    toPage = (component) => {
        this.props.router.push(component);
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#eee'}}>
                <View>
                    <Text style={{fontSize: 18, color: 'red'}}>组件</Text>
                    <Text></Text>
                    <ConfirmButton size="large">大号按钮</ConfirmButton>
                    <Text/>
                    <ConfirmButton size="middle" disabled="true">中号按钮</ConfirmButton>
                    <Text/>
                    <ConfirmButton size="small">小号按钮</ConfirmButton>
                    <Text/>
                    <CancelButton size="middle">中号取消按钮</CancelButton>
                    <Text/>
                    <ImgButton src={require('../../assets/images/icon-1.png')} title="按钮文字"/>
                    <Text/>
                    <PhoneChkCodeInput
                        style={{marginTop:5}}
                        onChangeText={value => this.setFromData('code', value)}
                        labelSize={3}
                    />
                    <LabelInput style={{marginTop:5}} label="密码" type="password" placeholder="输入密码"/>
                    <LabelInput style={{marginTop:5,marginBottom:5}}
                                label="手机"
                                placeholder="输入手机号"
                                rightView={<ConfirmButton size="small" onPress={(()=>{this.setState({alertActive:true})}).bind(this)}>获取验证码</ConfirmButton>}/>
                    <ConfirmButton size="small" onPress={(()=>{this.setState({alertActive:true})}).bind(this)}>淘宝风格alert弹窗</ConfirmButton>
                    <Alert visible={this.state.alertActive} contentType="input" placeholder="自定义内容" onClose={(()=>{this.setState({alertActive:false})}).bind(this)}>是否关闭?</Alert>
                    <TopBanner title="topbanner" leftTitle/>
                </View>
                <Text style={{fontSize:18,color:'red'}}>注册登录相关</Text>
                <View>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(user)}}>0、登录</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(Login)}}>1、手机密码登录</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(QuickLogin)}}>2、手机快捷登录</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(SaveTrueName)}}>3、输入真实姓名（快捷登录未填写姓名）</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(Reg)}}>4、注册</Text>
                <Text  {...this.props} onPress={() => {this.toPage(RegSuccess)}}>4.1、注册-成功</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(RegCheckCode)}}>5、注册（填写验证码）</Text>
                <Text  {...this.props} onPress={() => {this.toPage(ServiceProvision)}}>6、服务条款</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPassword)}}>7、找回密码</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPasswordCheckCode)}}>8、找回密码-填写短信验证码</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPasswordNewPassword)}}>9、找回密码-输入新密码</Text>
                <Text> </Text>
                    </View>
                <View>
                <Text style={{fontSize:18,color:'red'}}>添加车辆=待定</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCar)}}>1、添加一手车</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>2、添加一手车-选择车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForInvoiceNo)}}>3、添加一手车-找回车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>4、添加一手车-添加未关联车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVin)}}>5、添加二手车（VIN）</Text>
                <Text {...this.props} onPress={() => {this.toPage(WhereisVin)}}>6、VIN码在哪里页面</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVinStep2)}}>7、添加二手车-已有车主-找回</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVinUploadInvoiceNo)}}>8、添加二手车-无车主-申请车主身份-上传发票</Text>
                <Text> </Text>
                    </View>

                <Text style={{fontSize:18,color:'red'}}>首页相关</Text>
                <Text {...this.props} onPress={() => {this.toPage(HomeRouter)}}  >1、管理页面</Text>
                <Text {...this.props} onPress={() => {this.toPage(SearchList)}}  >2、搜索列表</Text>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>我的车辆</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyCar)}}  >3、我的车辆</Text>
                    <Text {...this.props} onPress={() => {this.toPage(CarDetail)}}  >4、车辆详情</Text>
                    <Text {...this.props} onPress={() => {this.toPage(ModifyVehicleLicence)}}  >5、车辆详情-修改车牌号</Text>
                    <Text {...this.props} onPress={() => {this.toPage(TimeTracking)}}  >6、车辆详情-实时跟踪</Text>
                    <Text {...this.props} onPress={() => {this.toPage(TrackPlay)}}  >7、车辆详情-轨迹回放</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MessageCars)}}  >8、车辆详情-消息车辆</Text>
                    <Text {...this.props} onPress={() => {this.toPage(BoundDriver)}}  >9、车辆详情-绑定司机</Text>
                    <Text {...this.props} onPress={() => {this.toPage(BoundLine)}}  >10、车辆详情-绑定线路</Text>
                    <Text {...this.props} onPress={() => {this.toPage(CarParameter)}}  >11、车辆详情-车辆参数</Text>
                </View>

                <View>
                    <Text style={{fontSize:18,color:'red'}}>我的司机</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyDriver)}}  >11、我的司机</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyDriverAdd)}}  >12、我的司机-添加司机</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyDriverPhoneAdd)}}  >13、我的司机-手机联系人添加</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyDriverEdit)}}  >13、我的司机-手机联系人编辑</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>我的线路</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLine)}}  >我的线路</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineAdd)}}  >我的线路-添加线路</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineEdit)}}  >我的线路-编辑线路</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetStart)}}  >我的线路-设置起点</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetEnd)}}  >我的线路-设置终点</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetPass)}}  >我的线路-设置途经点</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetRule)}}  >我的线路-驾驶规定</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineAddCarList)}}  >我的线路-添加车辆</Text>

                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>实时监控-地图sdk</Text>
                    <Text {...this.props} onPress={() => {this.toPage(Monitor)}}  >实时监控列表</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MonitorMap)}}  >实时监控-地图模式</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MonitorCarDetail)}}  >实时监控-车辆监控详情</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MonitorTimeTracking)}}  >实时监控-实时跟踪</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MonitorMapSpeed)}}  >实时监控-轨迹回放速度</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MonitorMapOil)}}  >实时监控-轨迹回放油耗</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MonitorShare)}}  >实时监控-分享</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>油耗管理</Text>
                    <Text {...this.props} onPress={() => {this.toPage(OilManage)}}  >油耗管理</Text>
                    <Text {...this.props} onPress={() => {this.toPage(OilManageCarList)}}  >油耗管理-车辆列表</Text>
                    <Text {...this.props} onPress={() => {this.toPage(OilManageSetMark)}}  >油耗管理-设定标杆</Text>
                    <Text {...this.props} onPress={() => {this.toPage(OilManageShowMark)}}  >油耗管理-查看标杆</Text>
                    <Text {...this.props} onPress={() => {this.toPage(OilManageShareMark)}}  >油耗管理-标杆-分享</Text>

                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>里程统计</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MileageStatisitcs)}}  >里程统计</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>消息</Text>
                    <Text {...this.props} onPress={() => {this.toPage(Message)}}  >消息中心</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MessageListCar)}}  >车辆消息详情</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MessageCarLocation)}}  >车辆事件定位</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>设置</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>推荐</Text>
                </View>



            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    over: {
        color: 'green',
        fontSize: 18
    },
    modify: {
        color: 'orange',
        fontSize: 22
    },
    add: {
        color: 'blue',
        fontSize: 22
    }
});