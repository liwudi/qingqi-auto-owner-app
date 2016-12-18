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
        this.ridx = null;
    }

    fetchData() {
        console.info('this.stopRequest-------------------------------------', this.stopRequest)
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
        if (this.stopRequest) return;
        this.timer = setTimeout(() => {
            this.fetchData();
        }, TIMEOUT * 1000);
    }

    setData(data={}) {
        let _data = this.state.data;
        data.carCode = data.carCode || data.carNo || _data.carCode || _DATA.carNo;
        this.setState({data});
    }

    requestStop() {
        this.stopRequest = true;
    }

    requestStart() {
        this.stopRequest = false;
    //    this.fetchData();
    }

    componentWillUnmount() {
        this.requestStop();
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }

    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if(this.ridx === null) this.ridx = cidx;
/*        console.info(cidx, this.ridx)
        console.info('update -----------------------------------')*/
        this.timer && clearTimeout(this.timer);
        if(cidx === this.ridx) {
            this.requestStart();
        //    if(!this.state.data) {
                //this.requestStart();
        //    }
        } else {
            this.requestStop();
        }
        return true;
    }
    componentWillReceiveProps(props) {
        if(this.ridx === null) {
            props.data && this.setData(props.data);
            this.fetchData();
            //this.requestStart();
        }
    }

    componentDidMount() {
        this.ridx = null;
    }

    render() {
        return (
            <View>
                 <Item data={this.state.data || {}} onPress={() => {
                    this.props.onPress();
                }}/>
            </View>
        )
    }
}