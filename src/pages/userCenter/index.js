/**
 * Created by ligj on 2016/10/09.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    Linking,
    ScrollView
} from 'react-native';

import ViewForRightArrow from '../../components/ViewForRightArrow';

import Env from '../../utils/Env';
const estyle = Env.style;

import AccountHome from './account-config/AccountHome';
import ManagerList from './manager/ManagerList';
import AboutUs from './AboutUs';

import {getAppVersion, checkUpdate, updateApp} from '../../services/UpdateService';

import {UserActions} from '../../actions';
import CouponList  from './coupon/CouponList';
import {couponNum} from '../../services/ServiceStationService';
import MyInfo from './my-info/MyInfo';
import TopBanner from '../../components/TopBanner';
import Toast from '../../components/Toast';
import AppointmentList from '../home/service-station/ServiceStationAppointmentList';
import MyInfoIndex from './my-info/MyInfoIndex';

import ViewForIntegral from './window-integral/ViewForIntegral';
import IntegralMall from "./window-integral/IntegralMall";
import TaskCenter from "./window-integral/TaskCenter";
import TaskCenterPage from  './task-center/TaskCenterPage';
import IntegralMallPage from './integral-mall/IntegralMallPage';
import {requestScore} from '../../actions/AccumulateAction';
class UserCenterHome extends Component {

    constructor(props) {
        super(props);
        this.ridx = null;
        this.stopRequest = false;
        this.state = {
            userData: {},
            versionName : getAppVersion().versionName,
            versionCode : getAppVersion().versionCode,
            isUpdate: false
        };
        this.props.dispatch(UserActions.getUserPic());
    }

    goTo(page) {
        this.props.router.push(page);
    }

    _checkUpdate(isShowTip = true) {
        checkUpdate().then(rs => {
            if (rs['version_no'] > this.state.versionCode) {
                this.setState({
                    isUpdate: true
                })
                if (isShowTip) {
                    updateApp(rs, this.props.alert,true);
                }
            } else {
                isShowTip && Toast.show('暂无更新', Toast.SHORT);
            }
        });
    }

    componentDidMount() {
        // getAppVersion().then(v => {
        //     this.setState({
        //         versionName: v.versionName,
        //         versionCode: v.versionCode
        //     })
        // });
        //this.props.dispatch(UserActions.getCouponNum());
        this.getCouponNum();
        this.props.dispatch(requestScore());
        Env.isAndroid && this._checkUpdate(false);
    }

    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if (this.ridx === null) this.ridx = cidx;
        if (!this.props.userStore.userInfo.token){
            if (this.timer) this.timer = null;
            return false;
        }
        if (cidx === this.ridx) {
            //因为请求是异步的，添加延时，防止2次请求才会停止
            this.timer = setTimeout(() => {
                if (!this.stopRequest) {
                    this.getCouponNum();
                }
            }, 500)
        } else {
            this.stopRequest = false;
        }
        return true;
    }

    //获取优惠券数量
    getCouponNum() {
        couponNum().then((data) => {
            this.setState({coupon: data.num})
        }).catch((err) => {
            Toast.show(err.message, Toast.SHORT);
        }).finally(() => {
            this.stopRequest = true;
        })
    }

    componentWillUnmount() {
        this.ridx = null;
        this.stopRequest = false;
        if (this.timer) this.timer = null;
    }

    clearCache() {
        this.props.alert(
            '提示',
            '是否要清除应用缓存？',
            [
                {
                    text: '确定', onPress: () => {
                    Toast.show('缓存清除成功', Toast.SHORT);
                }
                },
                {text: '取消'}
            ]
        )
    }

    render() {
        let userInfo = this.props.userStore.userInfo;
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="我的" leftShow={false}/>
                <ScrollView>
                    <ViewForRightArrow
                        activeOpacity={1}
                        style={[{backgroundColor:Env.color.main}]}
                        onPress={() => this.goTo(AccountHome)}
                        iconColor='#FFF'
                    >
                        <View style={[estyle.fxRow]}>
                            <Image
                                style={{borderRadius:50 * Env.font.base,width:100 * Env.font.base,height:100 * Env.font.base,borderWidth:4 * Env.font.base,
                                    borderColor:Env.color.main}}
                                source={this.props.userPicStore.userPic}
                            />
                            <View style={{justifyContent: 'center', marginLeft: 20 * Env.font.base}}>
                                <Text style={[estyle.articleTitle, styles.colorFFF]}>{userInfo.name || '未设置姓名'}</Text>
                                <View style={[estyle.fxRow]}>
                                    <Text
                                        style={[estyle.articleTitle, styles.colorFFF]}>{userInfo.phone ? `${userInfo.phone.substr(0, 3)}******${userInfo.phone.substr(9)}` : ''}</Text>
                                    <Text style={[estyle.articleTitle, styles.colorFFF,estyle.marginLeft]}>{`积分：${this.props.Integral.scoreTotal || ''}`}</Text>
                                </View>
                            </View>
                        </View>
                    </ViewForRightArrow>
                    <ViewForIntegral >
                        <IntegralMall>
                            <TouchableOpacity onPress={() => { this.goTo(IntegralMallPage)}}>
                                <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                                    <Image source={require('../../assets/images/integralmall.png')} style={[Env.icon.size.middle]}/>
                                    <Text style={[estyle.articleTitle,estyle.marginLeft]}>积分商城</Text>
                                </View>
                            </TouchableOpacity>
                        </IntegralMall>
                        <TaskCenter>
                            <TouchableOpacity onPress={() => { this.goTo(TaskCenterPage)}}>
                                <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                                    <Image source={require('../../assets/images/taskcenter.png')} style={[Env.icon.size.middle]}/>
                                    <Text style={[estyle.articleTitle,estyle.marginLeft]}>任务中心</Text>
                                    {this.props.Integral && this.props.Integral.taskNum != 0 ? <View style={[styles.goodsNum,estyle.fxCenter,estyle.marginLeft]}>
                                        <Text style={[{color:'#fff',fontSize:Env.font.mini}]}>{this.props.Integral.taskNum}</Text>
                                    </View> : null}
                                </View>
                            </TouchableOpacity>
                        </TaskCenter>
                    </ViewForIntegral>

                    {userInfo.role === 4 ?
                        <ViewForRightArrow style={[estyle.marginTop]} onPress={() => this.goTo(ManagerList)}>
                            <Text style={estyle.text}>车队管理员</Text>
                        </ViewForRightArrow> : null}
                    <ViewForRightArrow onPress={() => this.goTo(MyInfoIndex)}>
                        <Text style={estyle.text}>资料认证</Text>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress = {() => this.goTo(AppointmentList)}>
                        <Text style={estyle.text}>我的预约</Text>
                    </ViewForRightArrow>
                    <ViewForRightArrow style={[estyle.marginBottom]} onPress={() => this.goTo(CouponList)}>
                        <View style={[estyle.fxRow]}>
                            <Text style={[estyle.text,estyle.fx1]}>优惠券</Text>
                            <Text style={[estyle.text,{color:Env.color.main}]}>{this.state.coupon}</Text>
                        </View>
                    </ViewForRightArrow>
                    {
                        Env.isAndroid ? <ViewForRightArrow onPress={this._checkUpdate.bind(this)}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={estyle.text}>版本更新</Text>
                                {this.state.isUpdate ? <Text style={[estyle.text,{color:'red'}]}> new</Text> : null}
                                <Text
                                    style={[estyle.text,estyle.fx1, {textAlign:'right'}]}>{this.state.versionName}</Text>
                            </View>
                        </ViewForRightArrow> : null
                    }

                    <ViewForRightArrow onPress={this.clearCache.bind(this)}>
                        <Text style={estyle.text}>清除缓存</Text>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress={() => this.goTo(AboutUs)}>
                        <Text style={estyle.text}>关于我们</Text>
                    </ViewForRightArrow>
                </ScrollView>
            </View>
        );
    }
}

export default connect(function (stores) {
    return {userStore: stores.userStore, userPicStore: stores.userPicStore,Integral:stores.IntegralStore.Integral}
})(UserCenterHome);

const basefont = Env.font.base;
const styles = StyleSheet.create({
    colorFFF: {
        color: '#FFF'
    },
    goodsNum:{
        width : 30 * basefont,
        height: 30 * basefont,
        borderRadius : 30 * basefont,
        backgroundColor:'red'
    }
});