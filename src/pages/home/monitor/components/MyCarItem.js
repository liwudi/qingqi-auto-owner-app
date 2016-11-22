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
const TIMEOUT = 30; //间隔30秒刷新
export default class MyCarItem extends Component {
    constructor() {
        super();
        this.state = {};
        this.stopRequest = true;
    }

    fetchData() {
        if (this.stopRequest) return;
        this.props.data.carId &&
        queryRealTimeCar({carId: this.props.data.carId}).then((data)=> {
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
            if (this.stopRequest) return;
            this.setData(data);
            this.setTimer();
        }).catch();//.finally(()=> {});
    }

    setTimer() {
        setTimeout(() => {
            this.fetchData();
        }, TIMEOUT * 1000);
    }

    setData(data) {
        //data = Object.assign({}, data, this.props.data);
        data.carNo && (data.carCode = data.carNo);
        this.setState({data});
    }

    clearTimer() {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }

    requestStop() {
        this.stopRequest = true;
        this.clearTimer();
    }

    requestStart() {
        this.stopRequest = false;
        this.setData(this.props.data);
        this.fetchData();
    }

    componentWillUnmount() {
        this.requestStop();
    }

    componentWillReceiveProps(props) {
        this.requestStart();
    }

    componentDidMount() {
        this.requestStart();
    }

    render() {
        return (
            <View>
                {this.state.data && <Item data={this.state.data} onPress={() => {
                    this.requestStop();
                    this.props.onPress();
                }}/>}
            </View>
        )
    }
}