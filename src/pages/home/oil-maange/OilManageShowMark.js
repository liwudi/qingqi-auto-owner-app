/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
    Alert,StyleSheet,
    ToastAndroid
} from 'react-native';

import MapLine from '../../../components/MapLine';

import TopBanner from '../../../components/TopBanner';
import BorderButton from '../../../components/BorderButton';
import * as Icons from '../../../components/Icons';
import { IconArrowDown, IconQuestion } from '../../../components/Icons';
import {viewStandard ,deleteStandard} from '../../../services/AppService';
import {queryShareSummary} from '../../../services/MonitorService';
import OilManageSetMark from  './OilManageSetMark';
import Env from '../../../utils/Env';
const estyle = Env.style;

export default class OilManageShowMark extends Component {
    constructor(props){
        super(props);
        this.state={
            standardInfo:{}
        }
    }

    componentDidMount(){
        this.getStandardInfo();
    }
    //查询标杆基本信息
    getStandardInfo(){
        viewStandard( this.props.routeId )
            .then( (res)=>{
                this.getShareSummary( {
                    carId: res.carId,
                    beginDate: res.startTime,
                    endDate: res.endTime
                },res.carCode);
                this.fetchData(res);
            } )
            .catch()
    }
    //获取标杆路线的统计信息
    getShareSummary(obj,carCode){
        queryShareSummary(obj)
            .then( (data)=>{
                this.setState({
                    standardInfo:{ carCode:carCode, timeTotal:data.timeTotal,oilwearTotal:data.oilwearTotal,mileageTotal:data.mileageTotal,oilwearAvg:data.oilwearAvg }
                })
            } )
            .catch()
    }
    //获取轨迹数据
    fetchData(info){
        queryTrack({
            carId: info.carId,
            beginDate: info.startTime,
            endDate: info.endTime
        })
            .then((data)=>{ this.setState({data: data}) })
            .catch()
    }

    //删除标杆
    delStanderd(){
        deleteStandard( this.props.routeId )
            .then( ()=>{
                this.props.backFuns.forEach((item,index)=>{
                    index == 0 ? item(2) : item()
                });
                this.props.router.pop();
            } )
            .catch(
                ()=>{
                    ToastAndroid.show('删除失败', ToastAndroid.SHORT);
                }
            )
    }
    //重设标杆
    goSetStanderd(){
        this.props.router.push(OilManageSetMark,{
            ...this.props,
            isOccupy: true //通知设置标杆页面，路线已有标杆
        })
    }

    render() {
        let standardInfo= this.state.standardInfo;
		return (
			<View style={[estyle.containerBackgroundColor,estyle.fx1]}>
				<TopBanner {...this.props} title="查看标杆"/>
				<MapLine style={[estyle.fx1]}
                         rightButtomView={<View style={styles.rightView}>
                                 <View style={[styles.rightItem]}>
                                     <Icons.IconFlag style={{color: 'red'}} size={Env.font.base * 30}/><Text style={styles.rightText}>{ this.props.routeName }</Text>
                                 </View>
                                 <Text style={styles.rightText}>车牌：{ standardInfo.carCode }</Text>
                                 <Text style={styles.rightText}>总时长：{ standardInfo.timeTotal }</Text>
                                 <Text style={styles.rightText}>总里程：{ standardInfo.mileageTotal }</Text>
                                 <Text style={styles.rightText}>总油耗：{ standardInfo.oilwearTotal }</Text>
                                 <Text style={styles.rightText}>平均油耗：{ standardInfo.oilwearAvg }</Text>
                             </View>
                         }
				></MapLine>
                <View >
                    <View style={[
                        estyle.padding,
                        estyle.borderBottom,
                        estyle.fxRow,
                        estyle.fxRowCenter
                    ]}>
                        <Text style={estyle.fx1}> </Text>
                        <BorderButton style={ {marginRight: Env.font.base*6} } onPress={ ()=>{
                            Alert.alert('删除标杆','是否删除当前线路标杆？',
                                [
                                    {text: '确认', onPress: ()=>{ this.delStanderd() } },
                                    {text: '取消'}
                                ])
                        } }>删除标杆</BorderButton>
                        <BorderButton style={{marginRight: Env.font.base*6}}onPress={()=>{this.goSetStanderd()}}>重设标杆</BorderButton>
                        <TouchableOpacity onPress={ ()=>{ Alert.alert('为什么设定标杆？','线路标杆将自动推荐给您车队内的所有司机师傅，让优秀的驾驶经验快速传播，全车队省油效率整体提高。', [
                            {text: '确认'}
                        ]) } } ><IconQuestion color={Env.color.main} size={Env.font.text * 1.5}/></TouchableOpacity>
                    </View>
                </View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
    rightView : {
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.5)',
        bottom: Env.font.base * 30,
        left: Env.font.base * 10,
        borderRadius:Env.font.base * 10,
        padding:Env.font.base * 10
    },
    rightItem:{
        flexDirection:'row',
        padding: Env.font.base * 4,
        alignItems:'center'
    },
    rightText:{
        color:'#FFF',
        fontSize:Env.font.note
    }

});