/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/17
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
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Env from '../../../utils/Env';
const estyle = Env.style;

import MyInfoId from './MyInfoId';
import MyInfoDriver from './MyInfoDriveType';
import ImagePickBotton from '../account-config/components/ImagePickButton';
import ModifyTrueName from '../account-config/ModifyTrueName';
import {UserActions} from '../../../actions';
import {uploadUserPic} from '../../../services/UserService';
import Toast from '../../../components/Toast';
import SubmitButton from '../../../components/SubmitButton';
import notReview from '../../../assets/images/notReview.png';
import reviewing from '../../../assets/images/reviewing.png';
import reviewed from '../../../assets/images/reviewed.png';
import reviewError from '../../../assets/images/reviewError.png';
import warning from '../../../assets/images/warning.png';
import {Star_i, IconQuestion} from '../../../components/Icons';
import MyInfoIdCadePhoto from './MyInfoIdCadePhoto';
import MyInfoDriverCard from './MyInfoDriverCard';
import MyInfoDrivingCard from './MyInfoDrivingCard';
import Button from '../../../components/widgets/Button';
import MyInfoQuestion from './MyInfoQuestion';
import MyInfoCarCode from './MyInfoCarCode';
import MyInfoCarType from './MyInfoCarType';
import MyInfoCarLength from './MyInfoCarLength';
import {getUserInfoStatus, validateUserInfo, saveUserInfo} from '../../../services/AppService';
import Server from '../../../service-config/ServerConfig';
import {getToken} from '../../../service-config/RequestService';

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

class MyInfoItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let state = this.props.state;
        let isReviewed, rightIcon, disabled;
        isReviewed = state == 4;
        if (this.props.isPhoto) {
            rightIcon = state == 2 ? null : undefined;
            disabled = (state == 2);
        } else {
            rightIcon = state == 2 || state == 4 ? null : undefined;
            disabled = (state == 2 || state == 4);
        }
        if(this.props.onlyRead){ disabled = true }
        return (
            <ViewForRightArrow disabled={disabled} onPress={this.props.onPress} rightIcon={rightIcon}>
                <View style={[estyle.fxRow,estyle.fxCenter]}>
                    <Star_i color={ isReviewed ? Env.vector.star.color.highlight : Env.color.note }
                            style={[estyle.marginRight]}/>
                    <Text style={[estyle.fx1, estyle.text]}>{this.props.title}</Text>
                    {
                        this.props.rightDom
                    }
                    {
                        this.props.isWarn ?
                            <Image source={warning}
                                   style={[{width:40 * basefont,height:40 * basefont},estyle.marginLeft]}/> : null
                    }
                </View>
            </ViewForRightArrow>
        )
    }
}


class MyInfo extends Component {
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

    goTo(page, prop) {
        this.props.router.push(page, prop);
    }

    fetchData() {
        this.setState({isRefreshing: true}, () => {
            getUserInfoStatus()
                .then((data) => {
                    data && this.setState({data: data, top: topContent[data.validStatus - 1]})
                })
                .catch((err) => {
                    Toast.show(err.message, Toast.SHORT);
                })
                .finally(() => {
                    this.setState({isRefreshing: false});
                })
        })
    }

    updatePic = () => {
        this.refs.ImagePickBotton.show();
    };
    //修改头像
    onImagePick = (imageSource) => {
        uploadUserPic(imageSource)
            .then(rs => {
                Toast.show('头像修改成功', Toast.SHORT);
                saveUserInfo({memberPhoto: `${Server.WD_SERVICE}user/queryPicById?userId=${getToken().userId}&_=/${Math.random()}.jpg`})
                    .then(() => {
                        Toast.show('头像上传成功', Toast.SHORT);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                this.props.dispatch(UserActions.getUserPic());
                this.fetchData();
            })
            .catch(e => {
                console.log(e);
                Toast.show(e.message, Toast.SHORT);
            });
    };
    //判断每一项右侧的文字类型
    setRightText = (type, photo) => {
        switch (type) {
            case 1:
                return photo ? '已上传' : '未上传';
                break;
            case 2:
                return '审核中';
                break;
            case 3:
                return '已上传';
                break;
            case 4:
                return '已上传';
                break;
            default :
                return '未上传'
        }
    };

    pressFun = (fun, reason) => {
        reason ? this.alert(reason, fun) : fun()
    }
    //审核失败时弹出提示
    alert(reason, fun) {
        this.props.alert(
            '提示',
            reason,
            [
                {
                    text: '取消', onPress: () => {
                }
                },
                {
                    text: '立即修改', onPress: () => {
                    fun()
                }
                }
            ]
        )
    }

    /**
     * 更改data中的项
     * */
    setDataState = (opts) => {
        return saveUserInfo(opts)
            .then(() => {
                //this.setState({data: Object.assign({},this.state.data,opts) });
                this.fetchData();
            })
            .catch((err) => {
                Toast.show('上传资料失败', Toast.SHORT)
            })
    };


    render() {
        let userInfo = this.props.userStore.userInfo;
        let data = this.state.data;
        let onlyRead = data ? data.validStatus == 2 : false;
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="我的资料" rightView={
                    <Button onPress={() => { this.goTo(MyInfoQuestion) }} style={estyle.topBtn}>
                        <IconQuestion color={Env.color.navTitle} />
                    </Button>
                }/>
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
                                    <View style={[estyle.fxRowCenter]}>
                                        <Image source={this.state.top.img}
                                               style={{width:80 * basefont, height:80 * basefont}}/>
                                        <Text
                                            style={[estyle.text,{color:this.state.top.color}]}>{this.state.top.text}</Text>
                                    </View>
                                </View>
                                <MyInfoItem title="真实头像" isWarn={data.memberPhotoValidReason}
                                            state={data.memberPhotoValidStatus}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun(this.updatePic,data.memberPhotoValidReason) }  }
                                            rightDom={
                                    data.memberPhotoValidStatus == 2 ?  <Text style={styles.text}>审核中</Text> :
                                    <Image
                                            resizeMode={Image.resizeMode.cover}
                                            style={{borderRadius:50 * Env.font.base,width:100 * Env.font.base,height:100 * Env.font.base,borderWidth:4 * Env.font.base,borderColor:Env.color.main}}
                                            source={this.props.userPicStore.userPic}
                                        />
                                 }/>
                                <MyInfoItem title="姓名" isWarn={data.nameValidReason} state={data.nameValidStatus}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(ModifyTrueName,{successFun:this.setDataState,data:data}) } ,data.nameValidReason) }  }
                                            rightDom={
                                    data.nameValidStatus == 2 ? <Text style={styles.text}>审核中</Text> : <Text style={styles.text}>{ data.realName || '未设置姓名'}</Text>
                                }/>
                                <MyInfoItem title="身份证号" isWarn={data.nameValidReason} state={data.nameValidStatus}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(MyInfoId,{successFun:this.setDataState,data:data}) } ,data.nameValidReason) }   }
                                            rightDom={
                                    data.nameValidStatus == 2 ? <Text style={styles.text}>审核中</Text> : <Text style={styles.text}>{ data.identityNo ? `${data.identityNo.substr(0,5)}**********${data.identityNo.substr(15)}` : '未输入'}</Text>
                                }/>
                                <MyInfoItem title="身份证照片" isWarn={data.idCardValidReason}
                                            state={data.idCardValidStatus} isPhoto={true}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(MyInfoIdCadePhoto,{successFun:this.setDataState,data:data}) } ,data.idCardValidReason) } }
                                            rightDom={
                                    <Text style={styles.text}>{this.setRightText(data.idCardValidStatus,data.idFrontPhoto|| data.idBackPhoto)}</Text>
                                }/>
                                <MyInfoItem title="驾驶证照片" isWarn={data.drivingLicenseValidReason}
                                            state={data.drivingLicenseValidStatus} isPhoto={true}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(MyInfoDriverCard,{successFun:this.setDataState,data:data}) } ,data.drivingLicenseValidReason) } }
                                            rightDom={
                                    <Text style={styles.text}>{this.setRightText(data.drivingLicenseValidStatus,data.drivingLicensePhoto)}</Text>
                                }/>
                                <View style={[estyle.paddingVertical]} />
                                <MyInfoItem title="车牌号" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(MyInfoCarCode,{successFun:this.setDataState,data:data}) } ,data.vehicleLicenseValidReason) } }
                                            rightDom={
                                    data.vehicleLicenseValidStatus == 2 ? <Text style={styles.text}>审核中</Text> : <Text style={styles.text}>{data.carNumber || '未输入'}</Text>
                                }/>
                                <MyInfoItem title="车长（米）" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(MyInfoCarLength,{successFun:this.setDataState,data:data}) } ,data.vehicleLicenseValidReason) } }
                                            rightDom={
                                    data.vehicleLicenseValidStatus == 2 ? <Text style={styles.text}>审核中</Text> : <Text style={styles.text}>{data.carLength || '未输入'}</Text>
                                }/>
                                <MyInfoItem title="车型" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(MyInfoCarType,{successFun:this.setDataState,data:data}) } ,data.vehicleLicenseValidReason) } }
                                            rightDom={
                                    data.vehicleLicenseValidStatus == 2 ? <Text style={styles.text}>审核中</Text> : <Text style={styles.text}>{data.carType || '未输入'}</Text>
                                }/>
                                <MyInfoItem title="行驶证照片" isWarn={data.vehicleLicenseValidReason}
                                            state={data.vehicleLicenseValidStatus} isPhoto={true}
                                            onlyRead={onlyRead}
                                            onPress={ ()=>{ this.pressFun( ()=>{ this.goTo(MyInfoDrivingCard,{successFun:this.setDataState,data:data}) } ,data.vehicleLicenseValidReason) } }
                                            rightDom={
                                    <Text style={styles.text}>{this.setRightText(data.vehicleLicenseValidStatus,data.vehicleLicensePhoto)}</Text>
                                }/>
                                {
                                    data.validStatus == 1 || data.validStatus == 3 ?
                                        <View style={[estyle.fxRowCenter,estyle.marginTop]}>
                                            <SubmitButton size="large"
                                                          doing={this.state.doing}
                                                          onPress={() => {
                                                       validateUserInfo().then(()=>{ Toast.show('提交成功',Toast.SHORT);this.fetchData(); }).catch( (err)=>{ Toast.show( err.message,Toast.SHORT) } )
                                                   } }>提交认证</SubmitButton>

                                            <Text style={[estyle.note,estyle.paddingVertical]}>资料会提交给货源信息提供方共同认证</Text>
                                        </View> : <View style={[estyle.paddingVertical]} />
                                }
                            </View> : <View/>
                    }
                </ScrollView>
                <ImagePickBotton ref="ImagePickBotton" onImagePick={this.onImagePick} maxWidth={200} maxHeight={200}/>
            </View>
        );
    }
}
export default connect(function (stores) {
    return {userStore: stores.userStore, userPicStore: stores.userPicStore}
})(MyInfo);


const basefont = Env.font.base;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Env.color.bg
    },
    top: {
        width: Env.screen.width,
        height: 200 * basefont,
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