/**
 * Created by linyao on 2017/7/26.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;

import MyInfoId from './MyInfoId';
import ModifyTrueName from '../account-config/ModifyTrueName';
import Toast from '../../../components/Toast';
import SubmitButton from '../../../components/SubmitButton';
import MyInfoDriverCard from './MyInfoDriverCard';
import MyInfoDrivingCard from './MyInfoDrivingCard';
import MyInfoCarCode from './MyInfoCarCode';
import MyInfoCarType from './MyInfoCarType';
import MyInfoRealPhoto from './MyInfoRealPhoto';
import UnifiedItem from './components/UnifiedItem';
import MyInfoCarBrandType from './MyInfoCarBrandType';
import MyInfoCarGangLength from './MyInfoCarGangLength';
import MyInfoCarLoad from './MyInfoCarLoad';
import { getUnifiedUserInfoForGoodsSource , saveUnifiedUserInfoForGoodsSource , validateUnifiedUserInfoForGoodsSource } from '../../../services/GoodsService';

class UnifiedUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            isRefreshing: true
        }
    }

    goTo= (page) => {
        this.props.router.push(page, {
            successFun: this.setDataState,
            data: this.state.data,
            type: 'carGang'
        });
    };

    fetchData() {
        this.setState({isRefreshing: true}, () => {
            getUnifiedUserInfoForGoodsSource()
                .then((data) => {
                    data && this.setState({data: data});
                })
                .catch((err) => {
                    Toast.show(err.message, Toast.SHORT);
                })
                .finally(() => {
                    this.setState({isRefreshing: false});
                })
        })
    }


    //判断每一项右侧的文字类型
    setRightText = (value, isPhoto = false, isSelect = false) => {
        let text='';
        if(value){
            if(isPhoto){
                text = '已上传';
            }else {
                text = value;
            }
        }else {
            if(isPhoto){
                text = '未上传'
            }else {
                if(isSelect){ text = '未选择' }else {text = '未输入'}
            }
        }
        if(this.state.data.flowStatus == 1) text = '审核中';
        return <Text style={[estyle.note]}>{text}</Text>
    };

    setDataState = (opts) => {
        return saveUnifiedUserInfoForGoodsSource(opts)
            .then(() => {
                this.fetchData();
            })
    };
    //提交审核
    submit(){
        if(this.state.doing) return;
        this.setState({doing:true},()=>{
            validateUnifiedUserInfoForGoodsSource().then(() => {
                Toast.show('提交成功', Toast.SHORT);
                this.fetchData();
            }).catch((err) => {
                Toast.show(err.message, Toast.SHORT)
            }).finally(()=>{
                this.setState({doing:false});
            })
        })
    };


    render() {
        let data = this.state.data;
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="资料认证" />
                <ScrollView style={[estyle.fx1]} refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        colors={[Env.color.main]}
                        progressBackgroundColor="#fff"
                        onRefresh={ this.fetchData.bind(this) }
                    />
                }
                >
                    {
                        this.state.data ?
                            <View style={[estyle.fx1]}>
                                <UnifiedItem title="真实姓名"
                                            onPress={()=>{this.goTo(ModifyTrueName)}}
                                            rightDom={this.setRightText(data.realName)}/>

                                <UnifiedItem title="身份证号"
                                            onPress={()=>{this.goTo(MyInfoId)}}
                                            rightDom={this.setRightText(data.identityNo ? data.identityNo.substr(0,5)+'**********'+data.identityNo.substr(15): data.identityNo)}/>

                                <UnifiedItem title="真实头像"
                                            isPhoto={true}
                                            onPress={()=>{this.goTo(MyInfoRealPhoto)}}
                                            rightDom={this.setRightText(data.memberPhoto,true)}/>

                                <UnifiedItem title="身份证照片"
                                            isPhoto={true}
                                            onPress={()=>{this.pressFun(MyInfoIdCadePhoto,data.idCardValidReason)}}
                                            rightDom={this.setRightText(data.idCardValidStatus,data.idFrontPhoto || data.idBackPhoto,true)}/>

                                <UnifiedItem title="驾驶证照片"
                                            isPhoto={true}
                                            onPress={()=>{this.goTo(MyInfoDriverCard)}}
                                            rightDom={this.setRightText(data.drivingLicensePhoto,true)}/>

                                <View style={[estyle.paddingVertical]}/>

                                <UnifiedItem title="车牌类型"
                                            onPress={()=>{this.goTo(MyInfoCarBrandType)}}
                                            rightDom={this.setRightText(data.plateNumberType,false,true)}/>

                                <UnifiedItem title="车牌号"
                                            onPress={()=>{this.goTo(MyInfoCarCode)}}
                                            rightDom={this.setRightText(data.carNumber)}/>

                                <UnifiedItem title=" 车厢长（米）"
                                            onPress={()=>{this.goTo(MyInfoCarGangLength)}}
                                            rightDom={this.setRightText(data.carLength,false,true)}/>

                                <UnifiedItem title="车型"
                                            onPress={()=>{this.goTo(MyInfoCarType)}}
                                            rightDom={this.setRightText(data.carType,false,true)}/>

                                <UnifiedItem title=" 载重（吨）"
                                            onPress={()=>{this.goTo(MyInfoCarLoad)}}
                                            rightDom={this.setRightText(data.vehicleLoad)}/>

                                <UnifiedItem title="行驶证照片"
                                            isPhoto={true}
                                            onPress={()=>{this.goTo(MyInfoDrivingCard)}}
                                            rightDom={this.setRightText(data.vehicleLicensePhoto,true)}/>

                                <View style={[estyle.fxRowCenter, estyle.marginTop]}>
                                    <SubmitButton size="large"
                                                  doing={this.state.doing}
                                                  onPress={()=>{this.submit()}}>提交认证</SubmitButton>
                                    <Text style={[estyle.note, estyle.paddingVertical]}>资料会提交给货源信息提供方共同认证</Text>
                                </View>
                            </View> : <View/>
                    }
                </ScrollView>
            </View>
        );
    }
}
export default connect(function (stores) {
    return {userStore: stores.userStore, userPicStore: stores.userPicStore}
})(UnifiedUserInfo);


const basefont = Env.font.base;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Env.color.bg
    },
    top: {
        width: Env.screen.width,
        height: 150 * basefont,
        backgroundColor: 'rgb(245,245,245)'
    },
    colorFFF: {
        color: '#FFF'
    },
    text: {
        fontSize: Env.font.text,
        color: Env.color.text
    }
});