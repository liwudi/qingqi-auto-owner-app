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
    Linking
} from 'react-native';

import ViewForRightArrow from '../../components/ViewForRightArrow';

import Env from '../../utils/Env';
const estyle = Env.style;

import AccountHome from './account-config/AccountHome';
import ManagerList from './manager/ManagerList';
import AboutUs from './AboutUs';

import {getAppVersion, checkUpdate} from '../../services/UpdateService';

import {UserActions} from '../../actions';
import CouponList  from './coupon/CouponList';
import {couponNum} from '../../services/ServiceStationService';
import MyInfo from './my-info/MyInfo';

import Toast from '../../components/Toast';


class UserCenterHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            versionName: '',
            versionCode: '',
            isUpdate: false
        };
        this.props.dispatch(UserActions.getUserPic());
    }

    goTo(page) {
        this.props.router.push(page);
    }

    _checkUpdate(isShowTip = true) {
        Env.isAndroid && checkUpdate().then(rs => {
            if (rs['version_no'] > this.state.versionCode) {
                this.setState({
                    isUpdate: true
                })
                isShowTip && this.props.alert(
                    `发现新版本(${rs.version_name})`,
                    '是否更新？',
                    [
                        {
                            text: '确定', onPress: () => {
                            Linking.openURL(rs.apk_path).catch(err => console.error('An error occurred', err));
                        }
                        },
                        {text: '取消'}
                    ]
                )
            } else {
                isShowTip && Toast.show('暂无更新', Toast.SHORT);
            }
        });
    }

    componentDidMount() {
        getAppVersion().then(v => {
            this.setState({
                versionName: v.versionName,
                versionCode: v.versionCode
            })
        });
        couponNum().then((data) => {
            this.setState({coupon: data.num})
        }).catch((err) => {
            Toast.show(err.message, Toast.SHORT);
        });
        this._checkUpdate(false);
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
                <View style={[estyle.iosStatusBarHeight, {backgroundColor:Env.color.main}]}/>
                <View style={[estyle.padding,estyle.fxRowCenter, {backgroundColor:Env.color.main}]}>
                    <Text style={[estyle.navTitle]}>设置</Text>
                </View>
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
                        <View style={{justifyContent:'center',marginLeft:20 * Env.font.base}}>
                            <Text style={[estyle.articleTitle,styles.colorFFF]}>{userInfo.name || '未设置姓名'}</Text>
                            <Text
                                style={[estyle.articleTitle,styles.colorFFF]}>{userInfo.phone ? `${userInfo.phone.substr(0, 3)}******${userInfo.phone.substr(9)}` : ''}</Text>
                        </View>
                    </View>
                </ViewForRightArrow>

                {/*{userInfo.role === 4 ? <ViewForRightArrow style={[estyle.marginTop]} onPress = {() => this.goTo(ManagerList)}>*/}
                {/*<Text style={estyle.text}>车队管理员</Text>*/}
                {/*</ViewForRightArrow> : null}*/}
                <ViewForRightArrow onPress={() => this.goTo(MyInfo)}>
                    <Text style={estyle.text}>我的资料</Text>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={() => this.goTo(CouponList)}>
                    <View style={[estyle.fxRow]}>
                        <Text style={[estyle.text,estyle.fx1]}>优惠券</Text>
                        <Text style={[estyle.text,{color:Env.color.main}]}>{this.state.coupon}</Text>
                    </View>
                </ViewForRightArrow>

                <ViewForRightArrow style={[estyle.marginTop]} onPress={this._checkUpdate.bind(this)}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={estyle.text}>版本更新</Text>
                        {this.state.isUpdate ? <Text style={[estyle.text,{color:'red'}]}> new</Text> : null}
                        <Text style={[estyle.text,estyle.fx1, {textAlign:'right'}]}>{this.state.versionName}</Text>
                    </View>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={this.clearCache.bind(this)}>
                    <Text style={estyle.text}>清除缓存</Text>
                </ViewForRightArrow>
                <ViewForRightArrow onPress={() => this.goTo(AboutUs)}>
                    <Text style={estyle.text}>关于我们</Text>
                </ViewForRightArrow>

            </View>
        );
    }
}

export default connect(function (stores) {
    return {userStore: stores.userStore, userPicStore: stores.userPicStore}
})(UserCenterHome);

const styles = StyleSheet.create({
    colorFFF: {
        color: '#FFF'
    }
});