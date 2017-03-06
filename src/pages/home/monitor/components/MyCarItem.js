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
        this.isLoadding = false;
    }
    componentDidMount(){
        this.setData(this.props.data);
    }

    fetchData() {
        if(this.isLoadding) return;
        if (this.stopRequest) return;
        this.isLoadding = true;
        this.props.data.carId &&
        queryRealTimeCar({carId: this.props.data.carId}).then((data)=> {
            if (this.stopRequest) return;
            if(data) {
                this.setData(data);
            }
        }).catch().finally(()=> {
            this.isLoadding = false;
            this.setTimer();
        });
    }

    setTimer() {
        if(this.isLoadding) return;
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
    }

    componentWillUnmount() {
        this.requestStop();
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.ridx = null;
    }

    shouldComponentUpdate(props) {
        let cidx = props.router.currentIndex();
        if(this.ridx === null) this.ridx = cidx;
        if(cidx === this.ridx) {
            if(this.stopRequest) {
                this.requestStart();
                setTimeout(() => {
                    this.fetchData();
                }, Math.random() * 2000);
            }
        } else {
            this.requestStop();
        }
        return true;
    }
    componentWillReceiveProps(props) {
        props.data && this.setData(props.data);
    }

    onPress = () => {
        this.props.onPress(this.state.data.position);
    }

    render() {
        return (
            <View>
                 <Item data={this.state.data || {}} onPress={this.onPress}/>
            </View>
        )
    }
}