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
import { carTeamInfo } from '../../../services/AppService';
import AddCar from '../../userCenter/add-car/AddCar';
import MyCarSearch from './MyCarSearch';

export default class MyCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting : false,
            myCarsInfo:{}
        };
    }

    finaliy() {
        this.setState({
            isRefreshing: false,
            selecting: false
        });
    }

    fetchData() {
        carTeamInfo()
            .then((myCarsInfo)=>{
                this.setState({myCarsInfo});}
            )
            .catch(this.finaliy.bind(this))
            .finally(this.finaliy.bind(this));
    };

    componentDidMount(){
        if(this.props.toAddCar){
            setTimeout(() => {
                this.props.router.push(AddCar);
            },50);
        }else{
            this.fetchData();
        }
    }

    /**
     * 这个方法是为了在内部更改完车牌号回退是列表能够刷新
     * */
    backRender(){
       this.refs.list.reInitFetch()
    }

    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {
            carId: carId ,
            backRender: this.backRender.bind(this)
        }});
    }

    render() {
        const topRightView= () => {
            return (
                <View style={[estyle.fxRow]}>
                    <TouchableOpacity style={{marginRight:Env.font.base * 30}}
                                      onPress={() => {this.props.router.push(MyCarSearch)}}>
                        <IconSearch color="#FFF" size={Env.font.base * 40}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight:Env.font.base * 10}} onPress={() => {this.props.router.push(AddCar)}}>
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
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.myCarsInfo.carNumOnline || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>在线车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,estyle.borderRight]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.myCarsInfo.carNumTotal || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>总车辆数(辆)</Text>
                    </View>
                    <View style={[estyle.fx1,estyle.fxCenter,]}>
                        <Text style={[estyle.articleTitle,{color:'#FFF'}]}>{this.state.myCarsInfo.mileageTotal || 0}</Text>
                        <Text style={[estyle.text,{color:'#FFF'}]}>今日总里程(公里)</Text>
                    </View>
                </View>
                <PageList
                    ref="list"
                    style={estyle.fx1}
                    renderRow={(row) => {
                        return <MyCarItem data={row} onPress={() => this.goToDetail(row.carId)} oneTime={true}/>
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        return queryRealTimeCarList(pageNumber, pageSize, this.state.key)
                    }}
                />
            </View>
        )
    }
}