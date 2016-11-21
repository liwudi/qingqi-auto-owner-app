/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,Alert,DatePickerAndroid,
    ToastAndroid
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import moment from 'moment';
import MapLine from '../../../components/MapLine';
import { IconArrowDown, IconQuestion } from '../../../components/Icons';
import BorderButton from '../../../components/BorderButton';
import { queryTrack } from '../../../services/MonitorService';

import OilManageSelectCar from './OilManageSelectCar';
import OilManageSelectTime from './OilManageSelectTime';

import Env from '../../../utils/Env';
const estyle = Env.style;


export default class OilManageSetMark extends Component {
    constructor(props){
		super(props);
		this.state={
			title:'请选择车辆',
            timeType:1
		}
	}
    //跳转去选择车辆
    selectCar(){
		this.props.router.push(OilManageSelectCar, {
			routeId: this.props.routeId,
            date: this.props.date,
            setCar:this.setCar.bind(this)
		})
	}
	//选择车辆之后执行的方法
	setCar(carInfo){
        this.setState({
            title: carInfo.carCode,
            carId: carInfo.carId
        },()=>{ this.selectTime(1) })
    }
    //时间段选择，选择后重新获取数据
    selectTime(value){
	    let beginDate,endDate=moment().subtract(1, 'days').format('YYYYMMDD');
	    switch (value){
            case 1: beginDate= moment().subtract(1, 'days').format('YYYYMMDD'); break;
            case 2: beginDate= moment().subtract(3, 'days').format('YYYYMMDD'); break;
            case 3: beginDate= moment().subtract(7, 'days').format('YYYYMMDD'); break;
        }
        this.setState({
            timeType: value,
            beginDate: beginDate,
            endDate: endDate
        }, ()=>{ this.fetchData() })
    }
    //获取轨迹数据
    fetchData(){
        queryTrack({
            carId: this.state.carId,
            beginDate: this.state.beginDate,
            endDate: this.state.endDate
        })
            .then((data)=>{ this.setState({data: data}) })
            .catch()
    }
    //自定义时间
    customTime(){
            this.setState({timeType: 4});
            this.props.router.push(OilManageSelectTime,{ beginDate:this.state.beginDate || '', endDate: this.state.endDate || '',updata:this.fetchData.bind(this) })
    }
    //设置标杆
    setStandard(){
        let msg = this.props.isOccupy ?  this.props.routeName+'的线路已存在标杆，是否替换？' : '是否将此段轨迹设为线路标杆？';
        if(this.state.data){
           Alert.alert('设置标杆', msg, [
               {text: '确认',onPress: ()=>{
                        this.props.backFuns.forEach((item,index)=>{
                            index == 0 ? item(1) : item()
                        });
                        this.props.isOccupy ? this.props.router.popN(2) :  this.props.router.pop();
                    }},
               {text: '取消'},
           ])
        }else {
            ToastAndroid.show('请选择车辆与时间', ToastAndroid.SHORT);
        }
    }

    componentDidMount(){

    }

	render() {
		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner
					{...this.props}
					titleView={
						<TouchableOpacity onPress={this.selectCar.bind(this)} style={[estyle.fx1,estyle.fxRow,estyle.fxRowCenter,{backgroundColor:'transparent'}]}>
							<Text style={[estyle.articleTitle, {color:'#FFF'}]}>{this.state.title}</Text><IconArrowDown color="#FFF"/>
						</TouchableOpacity>
					}
				/>
				<MapLine style={[estyle.fx1]}/>
                <View>
                    <View style={[
                        estyle.padding,
                        estyle.borderTop,
                        estyle.borderBottom,
                        estyle.fxRow
                    ]}>
                        <Text style={[estyle.text, estyle.fx1]}>设定时间：</Text>
                        <BorderButton style={{marginRight:Env.font.base*6}} color={this.state.timeType === 1 ? Env.color.auxiliary : Env.color.main }  onPress={this.selectTime.bind(this,1)}>前一天</BorderButton>
                        <BorderButton style={{marginRight:Env.font.base*6}} color={this.state.timeType === 2 ? Env.color.auxiliary : Env.color.main } onPress={this.selectTime.bind(this,2)}>前三天</BorderButton>
                        <BorderButton style={{marginRight:Env.font.base*6}} color={this.state.timeType === 3 ? Env.color.auxiliary : Env.color.main } onPress={this.selectTime.bind(this,3)}>前七天</BorderButton>
                        <BorderButton color={this.state.timeType === 4 ? Env.color.auxiliary : Env.color.main } onPress={this.customTime.bind(this)}>自定义</BorderButton>
                    </View>

                    <View style={[
                        estyle.padding,
                        estyle.borderBottom,
                        estyle.fxRow,
                        estyle.fxRowCenter
                    ]}>
                        <Text style={estyle.fx1}> </Text>
                        <BorderButton style={{marginRight:Env.font.base*6}} onPress={()=>{ this.setStandard() }}>设为标杆</BorderButton>
                        <TouchableOpacity onPress={ ()=>{ Alert.alert('为什么设定标杆？','线路标杆将自动推荐给您车队内的所有司机师傅，让优秀的驾驶经验快速传播，全车队省油效率整体提高。', [
                            {text: '确认'}
                        ]) } } ><IconQuestion color={Env.color.main} size={Env.font.text * 1.5}/></TouchableOpacity>
                    </View>
                </View>
			</View>
		);
	}
}