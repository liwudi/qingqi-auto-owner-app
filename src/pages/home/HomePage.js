/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
    NativeModules,
    StatusBar
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
import { startKefuActivity } from '../../utils/CommModule';

import MessageGoods  from './goods-message/GoodsMessage';
import Bbs from './bbs/index';

import { IconSearch } from '../../components/Icons';

import Env from '../../utils/Env';
estyle = Env.style;

import { queryOperateStatisToday, choiceCustomer } from '../../services/AppService';
var CommonModule = NativeModules.CommonModule;


export default class HomePage extends Component {

	constructor(props){
		super(props);
		this.state = {
			operateStatisToday : {},
            myCarsInfo:{}
		};
        this.ridx = null;
        this.isRouterChange=false;
	}

	goTo(page, checkCar=false){
		if(checkCar) {
			let totalCarNum = this.state.operateStatisToday.totalCarNum;
			if(isNaN(totalCarNum)) return;
			totalCarNum = +totalCarNum;
			if(totalCarNum === 0) page = MyCar;
		}
		this.props.router.push(page);
	}

    customerServiceInfo = null;
    customerServiceInfoErrorMsg = null;

	componentDidMount(){
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
    setTimer(){
	    this.timer=setInterval(()=>{
	        this.fetchData();
        },63000)
    }

    shouldComponentUpdate(props){
        let cidx = props.router.currentIndex();
        if(this.ridx === null) this.ridx = cidx;
        if(cidx === this.ridx) {
            if(this.isRouterChange){
                this.isRouterChange=false;
                this.fetchData();
                !this.timer && this.setTimer();
            }
        }else {
            this.timer && clearInterval(this.timer);
            this.timer=null;
            this.isRouterChange=true;
        }
        return true;
    }
	isLoadingCustomerService = false;
    startCustomerService(){

        Toast.show('正在启动客服，请稍后', Toast.SHORT);
        if(!this.isLoadingCustomerService){
            this.isLoadingCustomerService = true;
            choiceCustomer().then(rs => {
            	if(!rs.token){
            		Toast.show('分配客服失败，请稍后重试',Toast.SHORT);
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

    componentWillUnmount(){
	    this.timer &&clearInterval(this.timer);
    }

	render() {
		const renderItem = (name, value, isShowBorder = true) => {
			return <View style={[estyle.fx1,estyle.fxRowCenter, isShowBorder && estyle.borderRight]}>
				<View>
					<Text style={[estyle.articleTitle, {color:Env.color.main, textAlign:'center'}]}>{value || 0}</Text>
					<Text style={[estyle.text]}>{name}</Text>
				</View>
			</View>;
		};
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<StatusBar
					backgroundColor={Env.color.main}
					hidden={false}
					barStyle={'light-content'}
				/>
				<View style={[estyle.fxRow, estyle.fxCenter, { height: 84 * Env.font.base, backgroundColor: Env.color.main}]}>
					<TouchableOpacity onPress={() => this.props.router.push(MyCarSearch)} activeOpacity={.8} style={[estyle.fxRow,estyle.fxCenter,{borderRadius:4, width:Env.screen.width * .94, height: 64 * Env.font.base, backgroundColor: '#FFF'}]}>
						<IconSearch size={Env.font.base * 36} color={Env.color.text}/><Text style={estyle.text}> 请输入司机姓名、VIN或车牌号</Text>
					</TouchableOpacity>
				</View>
                {
                    this.props.NetIsConnected
                        ? null
                        : <View style={[estyle.padding,estyle.fxRow,estyle.fxRowCenter,{backgroundColor:'#FDEDEE'}]}>
						<Icons.IconWaring size={Env.font.base * 40} color="#E55C5D"/>
						<Text style={[estyle.note,{marginLeft:Env.font.base * 40}]}>网络连接不可用</Text>
					</View>
                }
				<View style={[estyle.padding]}><Text style={[estyle.navTitle,{color:Env.color.important}]}>今日运营统计</Text></View>
				<View style={[estyle.fxRow, estyle.padding,estyle.border, {backgroundColor:'#FFF'}]}>
					<Text style={[estyle.fx1,estyle.articleTitle]}>在线车辆数：{this.state.operateStatisToday.onlineCar||0}辆</Text>
					<Text style={[estyle.fx1,estyle.articleTitle]}>总车辆数：{this.state.operateStatisToday.totalCarNum||0}辆</Text>
				</View>
				<ViewForRightArrow onPress={() => this.goTo(TripManage)} style={[estyle.fxRow, estyle.cardBackgroundColor]}>
					<View style={[estyle.fxRow]}>
						{renderItem('行驶总里程(km)', this.state.operateStatisToday.mileAgeTotal||0)}
						{renderItem('平均里程/车(km)', this.state.operateStatisToday.mileAgeAvg||0, false)}
					</View>
				</ViewForRightArrow>
				<ViewForRightArrow onPress={() => this.goTo(OilManage)} style={[ estyle.fxRow, estyle.cardBackgroundColor, estyle.marginBottom ]}>
					<View style={[estyle.fxRow]}>
						{renderItem('总油耗(L)',this.state.operateStatisToday.oilWearTotal||0)}
						{renderItem('每百公里油耗(L)',this.state.operateStatisToday.oilWearAvg||0, false)}
					</View>
				</ViewForRightArrow>
				<View style={[estyle.fx1,estyle.fxRow, estyle.borderLeft]}>
					<ImgButton onPress={() => this.goTo(MyCar)} src={require('../../assets/images/icon-1.png')} title="我的车辆"/>
					<ImgButton onPress={() => this.goTo(MyDriver, true)} src={require('../../assets/images/icon-2.png')} title="我的司机"/>
					<ImgButton onPress={() => this.goTo(MyLine, true)} src={require('../../assets/images/icon-3.png')} title="我的线路"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow, estyle.borderLeft]}>
					<ImgButton onPress={() => this.goTo(Monitor)} src={require('../../assets/images/icon-4.png')} title="实时监控"/>
					<ImgButton onPress={() => this.goTo(OilManage)} src={require('../../assets/images/icon-5.png')} title="油耗管理"/>
					<ImgButton onPress={() => this.goTo(MessageGoods, true)} src={require('../../assets/images/icon-7.png')} title="货源信息"/>
				</View>
				<View style={[estyle.fx1,estyle.fxRow, estyle.borderLeft]}>
					{/*<ImgButton onPress={() => this.goTo(ServiceStation, true)}  src={require('../../assets/images/icon-10.png')} title="服务预约"/>*/}
					<ImgButton onPress={() => this.goTo(Bbs)} src={require('../../assets/images/icon-8.png')} title="卡友论坛"/>
					{!!1 ?
						<ImgButton onPress={() => this.startCustomerService()} src={require('../../assets/images/icon-6.png')} title="联系客服"/>
							: <ImgButton onPress={() => {}} src={require('../../assets/images/mask.png')}/>}
				</View>
			</View>
		)
	}
}