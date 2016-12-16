/**
 * Created by ligj on 2016/10/9.
 * edit by zhaidongyou on 2016/10/13
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;
import CarDetail from './CarDetail';
import PageList from '../../../components/PageList';
import MyCarItem from '../monitor/components/MyCarItem';

import { IconPlus, IconSearch } from '../../../components/Icons';
import { queryRealTimeCarList } from '../../../services/MonitorService';
import { queryOperateStatisToday } from '../../../services/AppService';
import AddCar from '../../userCenter/add-car/AddCar';
import MyCarSearch from './MyCarSearch';

export default class MyCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting : false,
            myCarsInfo:{},
            stop: false
        };
    }

    finaliy() {
        this.setState({
            isRefreshing: false,
            selecting: false
        });
    }

    fetchData() {
        queryOperateStatisToday()
            .then((myCarsInfo)=>{
                this.setState({myCarsInfo});}
            )
            .catch(this.finaliy.bind(this))
            .finally(this.finaliy.bind(this));
    };

    componentDidMount(){
        if(this.props.toAddCar){
            setTimeout(() => {
                this.goTo(AddCar);
                //this.props.router.push(AddCar);
            },50);
        }else{
            this.fetchData();
        }
    }

    /**
     * 这个方法是为了在内部更改完车牌号回退是列表能够刷新
     * */
    backRender(){
    //   this.refs.list.reInitFetch()
        this.setState({stop: false});
    }


    goTo(page, carId) {
        this.setState({stop: true});
        this.props.router.push(page, {nav: {
            carId: carId ,
            backRender: this.backRender.bind(this)
        }});
    }

    render() {
        const topRightView= () => {
            return (
                <View style={[estyle.fxRow]}>
                    <TouchableOpacity style={{marginRight:Env.font.base * 30}}
                                      onPress={() => {this.goTo(MyCarSearch)}}>
                        <IconSearch color="#FFF" size={Env.font.base * 40}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight:Env.font.base * 10}} onPress={() => {this.goTo(AddCar)}}>
                        <IconPlus color="#FFF" size={Env.font.base * 40}/>
                    </TouchableOpacity>
                </View>
            )
        };
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="我的车辆"
                    rightView={ topRightView()}
                />
                <View style={[estyle.fxRow,estyle.fxCenter,estyle.padding,{backgroundColor:Env.color.main,paddingVertical:Env.font.base*40}]}>
                    <View style={[estyle.fx1,estyle.fxCenter,estyle.borderRight]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.myCarsInfo.onlineCar || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>在线车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,estyle.borderRight]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.myCarsInfo.totalCarNum || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>总车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.myCarsInfo.mileAgeTotal || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>今日总里程(公里)</Text>
                    </View>
                </View>
                <PageList
                    ref="list"
                    style={estyle.fx1}
                    renderRow={(row) => {
                        return <MyCarItem data={row} onPress={() => this.goTo(CarDetail, row.carId)} stop={this.state.stop}/>
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        return queryRealTimeCarList(pageNumber, pageSize, this.state.key)
                    }}
                />
            </View>
        )
    }
}