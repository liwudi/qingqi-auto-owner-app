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
            if (this.stopRequest) return;
            if(data) {
                this.setData(data);
            }
        }).catch().finally(()=> {
            this.setTimer();
        });
    }

    setTimer() {
        setTimeout(() => {
            this.fetchData();
        }, TIMEOUT * 1000);
    }

    setData(data) {
        console.info('---------------------------')
        console.info(data)
        data.carNo && (data.carCode = data.carNo);
        this.setState({data});
    }

    requestStop() {
        this.stopRequest = true;
    }

    requestStart() {
        this.stopRequest = false;
        this.fetchData();
    }

    componentWillUnmount() {
        this.requestStop();
    }

    componentWillReceiveProps(props) {
        this.setData(props.data);
        this.requestStart();
    }

    componentDidMount() {
        //this.requestStart();
    }

    render() {
        return (
            <View>
                 <Item data={this.state.data || {}} onPress={() => {
                    this.requestStop();
                    this.props.onPress();
                }}/>
            </View>
        )
    }
}