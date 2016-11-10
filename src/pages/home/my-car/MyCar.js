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
    RefreshControl,Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {driverCarList} from '../../../services/AppService';
const estyle = Env.style;
import CarDetail from './CarDetail';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import PageList from '../../../components/PageList';

import { IconUser, IconLocationMarker, IconTrash } from '../../../components/Icons';

export default class MyCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting : false,
            carId : '1',
            data:{list:[1,2,4,5]}
        };
    }
    finaliy() {
        this.setState({isRefreshing: false});
        this.setState({selecting: false});
        this.setState({carId: this.defaultCarId});
    }

    fetchData() {
        driverCarList()
            .then((data)=>{
                this.setState({'selecting': false});
                this.setState({data});}
                )
            .catch(this.finaliy.bind(this))
            .finally(this.finaliy.bind(this));
    };

    componentWillMount() {
        // this.fetchData();
    }

    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {carId: carId}});
    }
    
    render() {
        const SpeedView= (realtimeSpeed) => {
            if (realtimeSpeed == 0) {
                return "静止";
            } else {
                return realtimeSpeed + "km/h";
            }
        }
        const itemView= (item) => {
            item = {"realtimeSpeed": 60.1,
                "todayLen": 34.1,
                "position": "辽宁省沈阳市华航大厦",
                "slaveDriver": "李四",
                "mastDriver": "张三",
                "carCode": "辽A88888",
                "carId": "1234567"}
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
                            <Text style={[estyle.marginFont,{color: Env.color.text,textAlign:'right'}]}>{SpeedView(item.realtimeSpeed)}</Text>
                        </View>
                        {/*<View style={[estyle.paddingRight]}>*/}
                            {/*<IconTrash/>*/}
                        {/*</View>*/}
                    </View>
                </ViewForRightArrow>
            )
        };

        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="我的车辆"
                />
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,{backgroundColor:Env.color.main,paddingVertical:Env.font.base*40}]}>
                    <View style={[estyle.fx1,estyle.fxCenter,estyle.borderRight]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>12</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>在线车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,estyle.borderRight]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>12</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>总车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>12</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>今日总里程(公里)</Text>
                    </View>
                </View>
                <PageList
                    style={estyle.fx1}
                    reInitField={[this.state.key]}
                    renderRow={(row) => {
                        return itemView(row)
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        return Promise.resolve(this.state.data);
                    }}
                />
            </View>
        )
    }
}