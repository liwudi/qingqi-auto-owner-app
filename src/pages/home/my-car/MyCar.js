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
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import {driverCarList, setCurrentCar} from '../../../services/AppService';
const estyle = Env.style;
import Button from '../../../components/widgets/Button'
import Item from './components/MyCarItem'
import NoCar from './components/NoCar'
import CarDetail from './CarDetail';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import PageList from '../../../components/PageList';
import {IconCheckCircle} from '../../../components/Icons';

export default class MyCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting : false,
            carId : '1'
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
        this.fetchData();
    }

    goToDetail(carId) {
        this.props.router.push(CarDetail, {nav: {carId: carId}});
    }
    
    render() {

        const itemView= (item) => {
            return (
                <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                    <View style={estyle.fx1}>
                        <View style={[estyle.fxRow]}>
                            <View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
                                <Text style={[estyle.articleTitle,{color: Env.color.main}]}>{item.carCode}</Text>
                            </View>
                            <View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
                                <Text style ={{textAlign:'right'}}>今日：<Text style ={[styles.noteBlue]}>{item.todayLen}</Text> 公里</Text>
                            </View>
                        </View>
                        <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                            <IconUser color={Env.color.main}/>
                            <Text style={[estyle.note, estyle.marginLeft]}>主：</Text>
                            <Text style={[estyle.note, {color: Env.color.main}]}>{item.mastDriver}</Text>
                            <Text style={[estyle.marginLeft]}>副：</Text>
                            <Text style={[estyle.note, {color: Env.color.main}]}>{item.slaveDriver}</Text>
                        </View>
                        <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                            <View style={[estyle.fx1,estyle.text,estyle.paddingTop]}>
                                <View style={[estyle.fxRow]}>
                                    <Image
                                        style={{borderRadius:10,width:20,height:20,borderWidth:4 * Env.font.base,borderColor:'#85C7E7',}}
                                        source={require('../../../assets/images/icon-4.png')}
                                    />
                                    <Text style={[estyle.marginFont,{color: Env.color.main}]}>{item.position}</Text>
                                </View>
                            </View>
                            <View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
                                <Text style={[estyle.marginFont,{color: Env.color.main,textAlign:'right'}]}>{SpeedView(item.realtimeSpeed)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        };

        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner
                    {...this.props}
                    title="我的车辆"
                />
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