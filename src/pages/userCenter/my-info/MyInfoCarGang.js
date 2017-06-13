/**
 * Created by linyao on 2017/4/28.
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
import {UserActions} from '../../../actions';
import {uploadUserPic} from '../../../services/UserService';
import Toast from '../../../components/Toast';
import SubmitButton from '../../../components/SubmitButton';
import notReview from '../../../assets/images/notReview.png';
import reviewing from '../../../assets/images/reviewing.png';
import reviewed from '../../../assets/images/reviewed.png';
import reviewError from '../../../assets/images/reviewError.png';
import {IconQuestion} from '../../../components/Icons';
import MyInfoDriverCard from './MyInfoDriverCard';
import MyInfoDrivingCard from './MyInfoDrivingCard';
import Button from '../../../components/widgets/Button';
import MyInfoQuestion from './MyInfoQuestion';
import MyInfoCarCode from './MyInfoCarCode';
import MyInfoCarType from './MyInfoCarType';
import MyInfoCarLength from './MyInfoCarLength';
import {hcbGetAuthInfo, hcbSaveAuthInfo, validateUserInfoTruck} from '../../../services/AppService';
import MyInfoRealPhoto from './MyInfoRealPhoto';
import MyInfoItem from './components/MyInfoItem';
import MyInfoCarBrandType from './MyInfoCarBrandType';
import MyInfoCarGangLength from './MyInfoCarGangLength';
import MyInfoCarLoad from './MyInfoCarLoad';
import warning from '../../../assets/images/warning.png';

const topContent = [
    {
        img: notReview,
        text: '资料未认证',
        color: 'rgb(153,153,153)'
    },
    {
        img: reviewing,
        text: '审核中，请稍后',
        color: 'rgb(255,144,0)'
    },
    {
        img: reviewError,
        text: '认证失败',
        color: 'rgb(255,0,0)'
    },
    {
        img: reviewed,
        text: '资料已通过认证',
        color: 'rgb(88,221,0)'
    }
];


class MyInfoCarGang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isRefreshing: true
        }
    }

    componentDidMount() {
        this.fetchData();
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
            hcbGetAuthInfo()
                .then((data) => {
                    data && this.setState({data: data, top: data.flowStatus ? topContent[data.flowStatus] : topContent[0]});
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

    //审核失败时弹出提示
    alert(reason) {
        this.props.alert(
            '提示',
            reason,
            [
                {
                    text: '好的'
                }
            ]
        )
    }

    setDataState = (opts) => {
        return hcbSaveAuthInfo(opts)
            .then(() => {
                this.fetchData();
            })
    };
    //提交审核
    submit(){
        if(this.state.doing) return;
        this.setState({doing:true},()=>{
            validateUserInfoTruck().then(() => {
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
                <TopBanner {...this.props} title="货车帮认证" />
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
                                <View style={[styles.top,estyle.fxCenter]}>
                                    <View style={[estyle.fxRowCenter,estyle.fxRow]}>
                                        <Image source={this.state.top.img}
                                               style={{width: 80 * basefont, height: 80 * basefont}}/>
                                        <Text
                                            style={[estyle.marginLeft, estyle.text, {color: this.state.top.color}]}>{this.state.top.text}</Text>
                                        {
                                            data.flowStatus == 2 && data.thirdReason ?
                                                <TouchableOpacity onPress={()=>{ this.alert(data.thirdReason) }}>
                                                    <Image source={warning}
                                                           style={[{width: 40 * basefont, height: 40 * basefont}, estyle.marginLeft]}/>
                                                </TouchableOpacity>
                                                 : null
                                        }
                                    </View>
                                </View>
                                <MyInfoItem title="真实姓名"  state={parseInt(data.flowStatus)+1 }
                                            onPress={()=>{this.goTo(ModifyTrueName)}}
                                            rightDom={this.setRightText(data.realName)}/>

                                <MyInfoItem title="身份证号"  state={parseInt(data.flowStatus)+1 }
                                            onPress={()=>{this.goTo(MyInfoId)}}
                                            rightDom={this.setRightText(data.identityNo ? data.identityNo.substr(0,5)+'**********'+data.identityNo.substr(15): data.identityNo)}/>

                                <MyInfoItem title="真实头像"
                                            state={parseInt(data.flowStatus)+1 } isPhoto={true}
                                            onPress={()=>{this.goTo(MyInfoRealPhoto)}}
                                            rightDom={this.setRightText(data.memberPhoto,true)}/>

                                {/*<MyInfoItem title="身份证照片"
                                            state={data.idCardValidStatus} isPhoto={true}
                                            onPress={()=>{this.pressFun(MyInfoIdCadePhoto,data.idCardValidReason)}}
                                            rightDom={this.setRightText(data.idCardValidStatus,data.idFrontPhoto || data.idBackPhoto,true)}/>*/}

                                <MyInfoItem title="驾驶证照片"
                                            state={parseInt(data.flowStatus)+1 } isPhoto={true}
                                            onPress={()=>{this.goTo(MyInfoDriverCard)}}
                                            rightDom={this.setRightText(data.drivingLicensePhoto,true)}/>

                                <View style={[estyle.paddingVertical]}/>

                                <MyInfoItem title="车牌类型"
                                            state={parseInt(data.flowStatus)+1 }
                                            onPress={()=>{this.goTo(MyInfoCarBrandType)}}
                                            rightDom={this.setRightText(data.plateNumberType,false,true)}/>

                                <MyInfoItem title="车牌号"
                                            state={parseInt(data.flowStatus)+1 }
                                            onPress={()=>{this.goTo(MyInfoCarCode)}}
                                            rightDom={this.setRightText(data.carNumber)}/>

                                <MyInfoItem title=" 车厢长（米）"
                                            state={parseInt(data.flowStatus)+1 }
                                            onPress={()=>{this.goTo(MyInfoCarGangLength)}}
                                            rightDom={this.setRightText(data.carLength,false,true)}/>

                                <MyInfoItem title="车型"
                                            state={parseInt(data.flowStatus)+1 }
                                            onPress={()=>{this.goTo(MyInfoCarType)}}
                                            rightDom={this.setRightText(data.carType,false,true)}/>

                                <MyInfoItem title=" 载重（吨）"
                                            state={parseInt(data.flowStatus)+1 }
                                            onPress={()=>{this.goTo(MyInfoCarLoad)}}
                                            rightDom={this.setRightText(data.vehicleLoad)}/>

                                <MyInfoItem title="行驶证照片"
                                            state={parseInt(data.flowStatus)+1 } isPhoto={true}
                                            onPress={()=>{this.goTo(MyInfoDrivingCard)}}
                                            rightDom={this.setRightText(data.vehicleLicensePhoto,true)}/>

                                {
                                    data.flowStatus == 0 || data.flowStatus == 2 || !data.flowStatus ?
                                        <View style={[estyle.fxRowCenter, estyle.marginTop]}>
                                            <SubmitButton size="large"
                                                          doing={this.state.doing}
                                                          onPress={()=>{this.submit()}}>提交认证</SubmitButton>
                                            <Text style={[estyle.note, estyle.paddingVertical]}>资料会提交给货源信息提供方共同认证</Text>
                                        </View> : <View style={[estyle.paddingVertical]}/>
                                }
                            </View> : <View/>
                    }
                </ScrollView>
            </View>
        );
    }
}
export default connect(function (stores) {
    return {userStore: stores.userStore, userPicStore: stores.userPicStore}
})(MyInfoCarGang);


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