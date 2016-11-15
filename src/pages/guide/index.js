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

import AddCar from '../userCenter/add-car/AddCar';
import AddCarList from '../userCenter/add-car/AddCarList';
import AddCarFind from '../userCenter/add-car/AddCarFind';
import AddCarVinAdd from '../userCenter/add-car/AddCarVinAdd';
import AddCarSelectCar from '../userCenter/add-car/AddCarSelectCar';
import AddCarForVin from '../userCenter/add-car/AddCarForVin';
import AddCarForVinStep2 from '../userCenter/add-car/AddCarForVinStep2';
import AddCarForInvoiceNo from '../userCenter/add-car/AddCarForInvoiceNo';
import AddCarForVinUploadInvoiceNo from '../userCenter/add-car/AddCarForVinUploadInvoiceNo';
import WhereisVin from '../userCenter/add-car/WhereisVin';

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
import MyDriverEdit from '../home/my-driver/MyDriverEdit'

import MyLine from '../home/my-line/MyLine'
import MyLineAdd from '../home/my-line/MyLineAdd'
import MyLineEdit from '../home/my-line/MyLineEdit'
import MyLineSetEnd from '../home/my-line/MyLineSetEnd'
import MyLineSetPass from '../home/my-line/MyLineSetPass'
import MyLineSetRule from '../home/my-line/MyLineSetRule'
import MyLineSetStart from '../home/my-line/MyLineSetStartEnd'
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

import UserCenterHome from '../userCenter/index';
import AccountHome from '../userCenter/account-config/AccountHome';
import ModifyTrueName from '../userCenter/account-config/ModifyTrueName';
import ModifyPassword from '../userCenter/account-config/ModifyPassword';
import ModifyMobileNewMobile from '../userCenter/account-config/ModifyMobileNewMobile';
import ModifyAvatar from '../userCenter/account-config/ModifyAvatar';
import ModifyMobile from '../userCenter/account-config/ModifyMobile';

import ManagerList from '../userCenter/manager/ManagerList'
import ManagerAdd from '../userCenter/manager/ManagerAdd'
import ManagerEdit from '../userCenter/manager/ManagerEdit'

import Recommend from '../recommend/Recommend';
import AboutUs from '../userCenter/AboutUs';

import * as Icons from '../../components/Icons';
import BorderButton from '../../components/BorderButton';

import ListItem from '../../components/ListItem';
import ListTitle from '../../components/ListTitle';
import ViewForRightArrow from '../../components/ViewForRightArrow';
import IconAlert from '../../components/Modals/IconAlert';
import StarGroup from '../../components/StarGroup';

export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertActive: false,
            alertCActive: false,
            alertIconActive: false
        }

    }

    toPage = (component) => {
        this.props.router.push(component);
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#eee'}}>
                <Text style={{fontSize:18,color:'red'}}>组件</Text>
                <Text>*通用按钮*</Text>
                <Text>属性-尺寸：size="large|middle|small"; 默认-middle</Text>
                <Text>属性-启用禁用：disabled="true|false"; 默认-false</Text>
                <Text>单击事件：onPress</Text>
                <Text>**确认按钮**</Text>
                <ConfirmButton size="large">大号按钮</ConfirmButton>
                <Text/>
                <ConfirmButton size="middle">中号按钮</ConfirmButton>
                <Text/>
                <ConfirmButton size="small">小号按钮</ConfirmButton>

                <Text>**取消按钮**</Text>
                <Text>没有大号的取消按钮</Text>
                <CancelButton size="middle">中号按钮</CancelButton>
                <Text/>
                <CancelButton size="small">小号按钮</CancelButton>

                <Text/>
                <Text/>
                <Text/>

                <Text>*彩色边框字体按钮*</Text>
                <Text>属性-颜色：color="#ff0000|rgb(255,0,0)"; </Text>
                <Text>单击事件：onPress</Text>
                <BorderButton>彩色</BorderButton>
                <Text/>
                <BorderButton color="#ff0000">彩色</BorderButton>

                <Text></Text>
                <Text>*小图标*</Text>
                <Text>属性-尺寸：size=100;</Text>
                <Text>属性-颜色：color="#ff0000|rgb(255,0,0)"; </Text>
                <View style={{flexDirection:'row'}}>
                    <Icons.IconArrowDown />
                    <Icons.IconArrowLeft/>
                    <Icons.IconArrowRight/>
                    <Icons.IconCall/>
                    <Icons.IconSearch/>
                    <Icons.IconMap/>
                    <Icons.IconSearch/>
                    <Icons.IconClose/>
                    <Icons.IconLocation/>
                    <Icons.IconList/>
                    </View>
                <View style={{flexDirection:'row'}}>
                    <Icons.IconUser/>
                    <Icons.IconPlus/>
                    <Icons.IconFire/>
                    <Icons.IconBarcode/>
                    
<Icons.IconTrash/>
                    <Icons.IconCaretLeft/>
                    <Icons.IconCaretRight/>
                    <Icons.IconFlag/>
		    <Icons.IconShare/>
                    <Icons.IconCheckCircle/>
                    <Icons.IconClock/>
                    <Icons.IconRibbon/>
                    <Icons.IconChainBroken/>
                    <Icons.IconArrowUp color="#00ff00" size={60}/>
                </View>
                 <Text>列表单项一</Text>
                <ViewForRightArrow><Text>默认是箭头。文字与电话之间有间距。样式是：有内边距，白色背景，有下边框。单项之间有间距，应该是通用值30</Text></ViewForRightArrow>
                <Text>列表单项二</Text>
                <ViewForRightArrow rightIcon={Icons.IconCall}><Text>换了个标，侧是电话，</Text></ViewForRightArrow>
                <Text/>
                <Text/>

                <Text/>
                {/*
                <StarGroup score={5} size={20}/>
                <StarGroup score={0} size={20}/>
                <StarGroup score={2.5} size={20}/>
                 */}

                <Text/>

                <Text/>

                <ListTitle title="卡片标题"/>
                <ListItem left="左侧内容" right="右侧内容"/>


                <ConfirmButton size="small" onPress={()=>{this.setState({alertActive:true})}}>普通alert</ConfirmButton>
                <Alert visible={this.state.alertActive} onConfirm={(()=>{this.setState({alertActive:false})})} onCancel={(()=>{this.setState({alertActive:false})})}>是否关闭?</Alert>

                <ConfirmButton size="small" onPress={()=>{this.setState({alertCActive:true})}}>自定义信息alert</ConfirmButton>
                <Alert visible={this.state.alertCActive}
                       title="删除线路"
                       confirmTitle="删除"
                       cancelTitle="再想想"
                       onConfirm={(()=>{this.setState({alertCActive:false})})}
                       onCancel={(()=>{this.setState({alertCActive:false})})}>
                    删除线路，会将线路关联车辆信息一起删除，是否删除？
                </Alert>

                <ConfirmButton size="small" onPress={()=>{this.setState({alertIconActive:true})}}>带ICON的alert</ConfirmButton>

                <IconAlert visible={this.state.alertIconActive}
                           icon={Icons.IconArrowUp}
                           title="应该有新版本了"
                           confirmTitle="立即更新"
                           cancelTitle="稍后再说"
                           onConfirm={(()=>{this.setState({alertIconActive:false})})}
                           onCancel={(()=>{this.setState({alertIconActive:false})})}>
                    删除线路，会将线路关联车辆信息一起删除，是否删除？
                </IconAlert>
                <View>
     
 <LabelInput style={{marginTop:5,marginBottom:5}}
                                label="手机"
                                placeholder="输入手机号"/>
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
                <Text style={styles.modify}{...this.props} onPress={() => {this.toPage(AddCar)}}>1、添加一手车</Text>
                <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(AddCarList)}}>2、添加一手车-tds-true列表</Text>
                <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(AddCarFind)}}>3、找回车辆</Text>
                <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(AddCarVinAdd)}}>4、添加一手车-tds-true添加</Text>
                    {/*
                <Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>2、添加一手车-选择车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForInvoiceNo)}}>3、添加一手车-找回车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>4、添加一手车-添加未关联车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVin)}}>5、添加二手车（VIN）</Text>
                <Text {...this.props} onPress={() => {this.toPage(WhereisVin)}}>6、VIN码在哪里页面</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVinStep2)}}>7、添加二手车-已有车主-找回</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVinUploadInvoiceNo)}}>8、添加二手车-无车主-申请车主身份-上传发票</Text>
                <Text> </Text>
                     */}
                    </View>

                <Text style={{fontSize:18,color:'red'}}>首页相关</Text>
                <Text {...this.props} onPress={() => {this.toPage(HomeRouter)}}  >1、管理页面</Text>
                <Text {...this.props} onPress={() => {this.toPage(SearchList)}}  >2、搜索列表</Text>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>我的车辆</Text>
                    <Text style={styles.over} onPress={() => {this.toPage(MyCar)}}  >3、我的车辆</Text>
                    <Text style={styles.over} onPress={() => {this.toPage(CarDetail)}}  >4、车辆详情</Text>
                    <Text style={styles.over} onPress={() => {this.props.router.push(ModifyVehicleLicence,{nav:{carId: 300,carCode: '辽A30001'}})}}  >5、车辆详情-修改车牌号</Text>
                    <Text {...this.props} onPress={() => {this.toPage(TimeTracking)}}  >6、车辆详情-实时跟踪</Text>
                    <Text {...this.props} onPress={() => {this.toPage(TrackPlay)}}  >7、车辆详情-轨迹回放</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MessageCars)}}  >8、车辆详情-消息车辆</Text>
                    <Text {...this.props} onPress={() => {this.toPage(BoundDriver)}}  >9、车辆详情-绑定司机</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(BoundLine)}}  >10、车辆详情-绑定线路</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(CarParameter)}}  >11、车辆详情-车辆参数</Text>
                </View>

                <View>
                    <Text style={{fontSize:18,color:'red'}}>我的司机</Text>
                    <Text style={styles.modify}{...this.props} onPress={() => {this.toPage(MyDriver)}}  >11、我的司机</Text>
                    <Text style={styles.modify}{...this.props} onPress={() => {this.toPage(MyDriverAdd)}}  >12、我的司机-添加司机</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(MyDriverEdit)}}  >13、我的司机-手机联系人编辑</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>我的线路</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(MyLine)}}  >我的线路</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(MyLineAdd)}}  >我的线路-添加线路</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(MyLineEdit)}}  >我的线路-编辑线路</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetStart)}}  >我的线路-设置起点</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetEnd)}}  >我的线路-设置终点</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetPass)}}  >我的线路-设置途经点</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MyLineSetRule)}}  >我的线路-驾驶规定</Text>
                    <Text style={styles.modify}{...this.props} onPress={() => {this.toPage(MyLineAddCarList)}}  >我的线路-添加车辆</Text>

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
                    <Text style={styles.modify}{...this.props} onPress={() => {this.toPage(OilManage)}}  >油耗管理</Text>
                    <Text style={styles.modify}{...this.props} onPress={() => {this.toPage(OilManageCarList)}}  >油耗管理-车辆列表</Text>
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
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(Message)}}  >消息中心</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(MessageListCar)}}  >车辆消息详情</Text>
                    <Text {...this.props} onPress={() => {this.toPage(MessageCarLocation)}}  >车辆事件定位</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>设置（用户中心）</Text>
                    <Text style={styles.over} {...this.props} onPress={() => {this.toPage(UserCenterHome)}}>1、用户中心首页</Text>
                    <Text style={styles.over} {...this.props} onPress={() => {this.toPage(AccountHome)}}>2、账号设置首页</Text>
                    <Text {...this.props} onPress={() => {this.toPage(ModifyAvatar)}}>3、头像修改</Text>
                    <Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyTrueName)}}>4、修改姓名</Text>
                    <Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyPassword)}}>5、修改密码</Text>
                    <Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyMobile)}}>6、更换绑定手机号-获取验证码</Text>
                    <Text style={styles.over} {...this.props} onPress={() => {this.toPage(ModifyMobileNewMobile)}}>7、绑定新手机</Text>

                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(ManagerList)}}  >邀请伙伴成为管理员</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(ManagerAdd)}}  >增加管理员</Text>
                    <Text style={styles.modify} {...this.props} onPress={() => {this.toPage(ManagerEdit)}}  >编辑管理员</Text>

                    <Text {...this.props} onPress={() => {this.toPage(Message)}}  >版本更新</Text>
                    <Text {...this.props} onPress={() => {this.toPage(Message)}}  >清除缓存</Text>

                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>推荐</Text>
                    <Text {...this.props} onPress={() => {this.toPage(Recommend)}}  >推荐</Text>
                </View>
                <View>
                    <Text style={{fontSize:18,color:'red'}}>关于我们</Text>
                    <Text {...this.props} onPress={() => {this.toPage(AboutUs)}}>21、关于我们</Text>
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