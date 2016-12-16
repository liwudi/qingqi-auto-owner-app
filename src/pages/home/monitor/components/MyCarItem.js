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
const TIMEOUT = 15; //间隔30秒刷新
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
        if(this.props.stop) return;
        this.timer = setTimeout(() => {
            this.fetchData();
        }, TIMEOUT * 1000);
    }

    setData(data={}) {
/*        console.info('---------------------------')
        console.info(data)*/
        let _data = this.state.data;
        data.carCode = data.carCode || data.carNo || _data.carCode || _DATA.carNo;
        //data.carId = data.carId || _data.carId;
        //data.carNo && (data.carCode = data.carNo);
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
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }

    componentWillReceiveProps(props) {
        if(props.stop) {
            this.requestStop();
        } else {
            this.setData(props.data);
            this.requestStart();
        }
    }

    componentDidMount() {
        //this.requestStart();
    }

    render() {
        return (
            <View>
                 <Item data={this.state.data || {}} onPress={() => {
                 //   this.requestStop();
                    this.props.onPress();
                }}/>
            </View>
        )
    }
}