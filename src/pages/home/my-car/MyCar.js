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
import MyCarItem from './components/MyCarItem';

import { IconPlus } from '../../../components/Icons';
import { queryRealTimeCarList } from '../../../services/MonitorService';
import { carTeamInfo } from '../../../services/AppService';
import AddCar from '../../userCenter/add-car/AddCar';

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

    componentWillMount() {
        this.fetchData();
    }

    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {carId: carId}});
    }
    
    render() {
        const topRightView= () => {
            return (
                <TouchableOpacity style={{marginRight:Env.font.base * 10}} onPress={() => {this.props.router.push(AddCar)}}>
                    <IconPlus color="#FFF" size={Env.font.base * 40}/>
                </TouchableOpacity>
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
                    style={estyle.fx1}
                    reInitField={[this.state.key]}
                    renderRow={(row) => {
                        return <MyCarItem data={row} onPress={() => this.goToDetail(row.carId)}/>
                    }}
                    pageSize={5}
                    fetchData={(pageNumber, pageSize) => {
                        return queryRealTimeCarList(pageNumber, pageSize, this.state.key)
                    }}
                />
            </View>
        )
    }
}