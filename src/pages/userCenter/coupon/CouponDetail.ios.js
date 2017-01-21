/**
 * Created by mapbar on 2017/1/12.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Navigator,
    ScrollView,
    NativeModules,
    RefreshControl
} from 'react-native';

import QRCode from 'react-native-qrcode';
import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import { IconCall } from '../../../components/Icons';
import Button from '../../../components/widgets/Button';
import { couponDetail,recommend } from '../../../services/ServiceStationService';
import CouponServiceStation from './CouponServiceStation';
import Toast from '../../../components/Toast';

import Env from '../../../utils/Env';
import CouponRecord from './CouponRecord';
//const module = NativeModules.MapbarMapModule;
const estyle = Env.style;
const basefont=Env.font.base;

export default class CouponDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null,
            lonlat:null,
            isRefreshing:true
        };
    }
    componentDidMount(){
        couponDetail(this.props.couponId)
            .then((data)=>{
                this.setState({data:data},()=>{ if(this.props.isUnUsed){this.getLocation()} })
            })
            .catch((err)=>{
                Toast.show(err.message,Toast.SHORT);
            })
            .finally(()=>{this.setState({isRefreshing:false})})

    }
    getLocation(){
        recommend({activityId:this.state.data.id})
            .then((data)=>{
                this.setState({serverStation:data})
            })
            .catch((err)=>{
                Toast.show(err.message,Toast.SHORT);
            })
    }

    render() {
        let data=this.state.data;
        return (
            <View style={[estyle.fx1,{backgroundColor:Env.color.bg}]}>
                <TopBanner {...this.props} title="优惠券" rightView={
                    data ?
                    <Button color="#FFF" onPress={() => { this.props.router.push(CouponRecord,{coupon:data.id,vin:data ? data.vin : ''})}
                     }><Text style={{color: Env.color.navTitle,fontSize: Env.font.text}}>消费记录</Text></Button>: <View/>
                }/>
                <ScrollView style={[estyle.fx1]} refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            colors={[Env.color.main]}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    {
                        this.state.data ?
                            <View style={[estyle.fx1,estyle.padding]}>
                                <View style={[estyle.cardBackgroundColor,estyle.fxRowCenter]}>
                                    <Text style={[estyle.articleTitle,estyle.marginVertical,{color:Env.color.main}]}>{data.couponName}</Text>
                                    <Text style={[estyle.text,estyle.marginBottom,{color:Env.color.main}]}>{data.couponContent}</Text>
                                    <Text style={[estyle.note]}>限使用车辆（车牌/VIN）：</Text>
                                    <Text style={[estyle.text,estyle.marginBottom]}>{data.carNumber+'/'+data.vin}</Text>
                                    <Text style={[estyle.note,estyle.marginBottom]}>使用有效期：{data.startDate+'至'+data.endDate}</Text>
                                    <View style={[estyle.borderTop,estyle.padding]}>
                                        <Text style={[estyle.note]}>请向商家或服务站出示消费码或二维码使用优惠劵</Text>
                                    </View>
                                    <View style={[estyle.fxCenter,estyle.marginBottom]}>
                                        <QRCode
                                            value={data.tradeCode}
                                            size={300*basefont}
                                            bgColor='#000'
                                            fgColor='#fff'/>
                                        <View style={[estyle.fxCenter,estyle.borderBottom,estyle.paddingVertical]}>
                                            <Text style={[estyle.text]}>{data.tradeCode}</Text>
                                        </View>
                                    </View>
                                    <View style={[estyle.fxRow,estyle.paddingBottom]}>
                                        <View style={[estyle.fx1,estyle.fxCenter,estyle.fxRow]}>
                                            <Text style={[estyle.note]}>已使用：</Text>
                                            <Text style={[estyle.text,{color:Env.color.main}]}>{data.usedNum}</Text>
                                        </View>
                                        <View style={[estyle.fx1,estyle.fxCenter,estyle.fxRow]}>
                                            <Text style={[estyle.note]}>未使用：</Text>
                                            <Text style={[estyle.text,{color:Env.color.main}]}>{data.unUsedNum}</Text>
                                        </View>
                                    </View>
                                </View>
                                {
                                    this.props.isUnUsed ?
                                    <View>
                                        <View style={[estyle.marginTop,estyle.padding]}>
                                            <Text style={[estyle.note]}>服务商信息</Text>
                                        </View>
                                        {
                                            this.state.serverStation ?
                                                <View style={[estyle.cardBackgroundColor,estyle.marginBottom]}>
                                                    <ViewForRightArrow
                                                        rightIcon={IconCall}
                                                        iconSize={Env.vector.call.size}
                                                        iconColor={Env.color.main}
                                                        style={{borderBottomWidth:0}}
                                                        onPress={() => {
                                this.props.callTo(this.state.serverStation.phone)
                            }}
                                                    >
                                                        <View style={[estyle.fx1]}>
                                                            <View style={[estyle.fxRow]}>
                                                                <Text style={[estyle.text]}>{this.state.serverStation.stationName}</Text>
                                                                <Text style={[estyle.marginLeft,estyle.text,{color:Env.color.auxiliary}]}>为您推荐</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={[estyle.note]}>{this.state.serverStation.address}</Text>
                                                            </View>
                                                        </View>
                                                    </ViewForRightArrow>
                                                </View> : null
                                        }
                                        <View style={[estyle.padding,estyle.cardBackgroundColor,estyle.marginBottom]}>
                                            <TouchableOpacity style={[estyle.fxCenter]} onPress={()=>{this.props.router.push(CouponServiceStation,{id:data.id,lonlat:this.state.lonlat})}}>
                                                <Text style={[estyle.articleTitle,{color:Env.color.main}]}>查看更多服务商&gt;</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> : <View/>
                                }
                            </View> : <View />
                    }
                </ScrollView>
            </View>
        );
    }
}
