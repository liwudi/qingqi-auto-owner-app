/**
 * Created by cryst on 2016/10/20.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {queryRealTimeCar} from '../../../../services/MonitorService';

import Item from '../../my-car/components/MyCarItem';
const TIMEOUT = 5;
export default class MyCarItem extends Component {
    constructor() {
        super();
        this.state = {};
    }
    fetchData() {
        this.props.data.carId &&
        queryRealTimeCar(this.props.data.carId).then((data)=>{
        /*    data = {
                carNo: '控123456',
                direction: Math.floor(Math.random() * 360),
                travelStatus: parseInt(Math.random() * 3),
                realtimeSpeed: +(Math.random() + 60).toFixed(1),
                todayLen: +(Math.random() + 30).toFixed(1),
                position: "辽宁省沈阳市华航大厦",
                slaveDriver: "李四",
                mastDriver: "张三",
                carId: "1234567"
            };*/

            try{
                this.setData(data);
            } catch (e) {
                this.clearTimer();
            }

        }).catch().finally(()=> {
            this.setTimer();
        });
    }
    setTimer() {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.fetchData();
        },TIMEOUT * 1000);
    }
    setData(data){
        data.carNo && (data.carCode = data.carNo);
        this.setState({data});
    }
    clearTimer() {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    componentDidMount() {
        this.setData(this.props.data);
        this.setTimer();
    }

    render() {
        return (
            <View>
                {this.state.data && <Item data={this.state.data} onPress={this.props.onPress}/>}
            </View>
        )
    }
}