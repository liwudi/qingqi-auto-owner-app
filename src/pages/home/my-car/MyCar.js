/**
 * Created by ligj on 2016/10/9.
 * edit by zhaidongyou on 2016/10/13
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,Image,
    TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {driverCarList , carTeamInfo} from '../../../services/AppService';
const estyle = Env.style;
import CarDetail from './CarDetail';
import PageList from '../../../components/PageList';
import  AddCar from  '../../userCenter/add-car/AddCar'
import { IconUser, IconLocationMarker, IconPlus } from '../../../components/Icons';


export default class MyCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting : false,
            data:{}
        };
    }
    fetchData() {
        carTeamInfo()
            .then((data)=>{
                this.setState({data});}
                )
            .catch();
    };

    componentWillMount() {
        this.fetchData();
    }
    /**
     * 这个方法是为了在内部更改完车牌号回退是列表能够刷新
    * */
    backRender(){
        this.setState({
            isRender: new Date().getTime()
        })
    }

    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {
            carId: carId ,
            backRender: this.backRender.bind(this)
        }});
    }
    SpeedView(realtimeSpeed){
        if (realtimeSpeed == 0) {
            return "静止";
        } else {
            return realtimeSpeed + "km/h";
        }
    }

    itemView(item){
       return (
           <ViewForRightArrow  onPress={() => this.goToDetail(item.carId)} style={[estyle.fxRow,estyle.cardBackgroundColor]}>
               <View style={[estyle.fxRow]}>
                   <View style={[estyle.fx1]}>
                       <Text style={[estyle.articleTitle,{color: Env.color.important}]}>{item.carCode}</Text>
                   </View>
                   <View style={[estyle.paddingRight]}>
                       <Text style ={{textAlign:'right'}}>今日：<Text>{item.todayLen}</Text> (公里)</Text>
                   </View>
               </View>
               <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                   <IconUser color='#FEBEBE'/><Text> </Text>
                   <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{item.mastDriver}</Text>

                   <IconUser color='#C4DFFE'/><Text> </Text>
                   <Text style={[estyle.note, {color: Env.color.text}]}>{item.slaveDriver}</Text>
               </View>
               <View style={[estyle.fxRow, estyle.fxRowCenter,{marginTop:Env.font.base * 10}]}>
                   <View style={[estyle.fx1,estyle.fxRow]}>
                       <IconLocationMarker color='#FED57E' size={Env.font.base * 30}/>
                       <Text> </Text>
                       <Text style={[estyle.marginFont,estyle.paddingRight,{color: Env.color.text}]}>{item.position}</Text>
                       <Text style={[estyle.marginFont,{color: Env.color.text,textAlign:'right'}]}>{this.SpeedView(item.realtimeSpeed)}</Text>
                   </View>
               </View>
           </ViewForRightArrow>
       )
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="我的车辆"
                    rightView={
                        <TouchableOpacity onPress={ ()=>{ this.props.router.push(AddCar) } }>
                            <IconPlus color="#fff" />
                        </TouchableOpacity>
                    }
                />
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,{backgroundColor:Env.color.main,paddingVertical:Env.font.base*40}]}>
                    <View style={[estyle.fx1,estyle.fxCenter,estyle.borderRight]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.data.carNumOnline || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>在线车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,estyle.borderRight]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.data.carNumTotal || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>总车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.data.mileageTotal || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>今日总里程(公里)</Text>
                    </View>
                </View>
                <PageList
                    style={estyle.fx1}
                    reInitField={[this.state.isRender]}
                    renderRow={(row) => {
                        return <MyCarItem data={row} onPress={() => this.goToDetail(row.carId)}/>
                    }}
                    pageSize={5}
                    fetchData={(pageNumber, pageSize) => {
                        return driverCarList(pageNumber)
                    }}
                />
            </View>
        )
    }
}