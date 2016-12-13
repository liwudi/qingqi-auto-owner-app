/**
 * Created by linyao on 2016/11/18.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,DatePickerAndroid
} from 'react-native';
import moment from 'moment';

import TopBanner from '../../../components/TopBanner';
import OilManageSetMark from './OilManageSetMark';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
import Toast from '../../../components/Toast';
const estyle = Env.style;

export default class OilManageCarList extends Component {
    constructor(props) {
        super(props);
        this.state={
            beginDate: this.props.beginDate ? this.props.beginDate.substring(0,4)+'.'+ this.props.beginDate.substring(4,6)+'.'+this.props.beginDate.substring(6) : '',
            endDate: this.props.endDate ? this.props.endDate.substring(0,4)+'.'+ this.props.endDate.substring(4,6)+'.'+this.props.endDate.substring(6) : '',
        }
    }
    datePicker(type) {
        DatePickerAndroid.open(
            {
                date: type == 'start' ?
                this.state.beginDate ? new Date(this.state.beginDate.split('.')[0],this.state.beginDate.split('.')[1]-1,this.state.beginDate.split('.')[2]): new Date()
                    :
                this.state.endDate ? new Date(this.state.endDate.split('.')[0],this.state.endDate.split('.')[1]-1,this.state.endDate.split('.')[2]) : new Date()
            }
        ).then((obj) => {
            let month= obj.month < 9 ? '0'+(obj.month+1) : obj.month+1,
                day= obj.day < 10 ? '0'+obj.day : obj.day;
            if (obj.action !== DatePickerAndroid.dismissedAction) {
                if (type == 'start') {
                    this.setState({beginDate: obj.year + '.' + month + '.' + day});
                } else if (type == 'end') {
                    this.setState({endDate: obj.year + '.' + month + '.' + day});
                }
            }
        }).catch()

    }
    goBack(){
        moment().subtract(1, 'days').format('YYYYMMDD');
        let oneDayMs = 24 * 60 * 60 * 1000, //1天的时间间隔，单位：
            sl = 7 * oneDayMs, //七天
            days = 91 * oneDayMs;   //90天



        let start_ = this.state.beginDate.split('.'), end_ = this.state.endDate.split('.'),
            today_ = moment().format('YYYY.MM.DD').split('.');

        let getMonth = (v, k) => {
            return k === 1 ? +v - 1 : v;
        };

        let start = new Date(...(start_.map(getMonth))).getTime(),
            end = new Date(...(end_.map(getMonth))).getTime(),
            today = new Date(...(today_.map(getMonth))).getTime();
        days = today - days;

        if(start < days || end < days) {
            Toast.show('仅提供近90天（不含今天）的行驶轨迹查询。', Toast.SHORT);
        } else if(start >= today || end >= today) {
            Toast.show('仅提供近90天（不含今天）的行驶轨迹查询。', Toast.SHORT);
        } else if(end < start){
            Toast.show('结束时间不能小于开始时间', Toast.SHORT);
        }else if(end - start >= sl){
            Toast.show('时间区间不能大于7天', Toast.SHORT);
        }else {
            this.props.update({
                beginDate: start_.join(''),
                endDate: end_.join('')
            });
            this.props.router.pop();
        }
    }

    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="自定义时间"/>
                <View style={[estyle.fx1,estyle.fxRowCenter]}>
                    <ViewForRightArrow style={[estyle.marginTop,estyle.fxCenter]} onPress={()=>{ this.datePicker('start') }}>
                        <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                            <View style={[estyle.fx1, estyle.fxRow, estyle.paddingRight]}>
                                <Text style={[estyle.text, {textAlign: 'left'}]}>开始日期</Text>
                            </View>
                            <View style={[estyle.fxCenter]}>
                                <Text style={[estyle.text, {textAlign: 'right'}]}>{ this.state.beginDate || '选择开始时间'}</Text>
                            </View>
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow style={[estyle.marginTop,estyle.fxCenter]} onPress={ ()=>{ this.datePicker('end')} }>
                        <View style={[estyle.fxRow, estyle.fxRowCenter]}>
                            <View style={[estyle.fx1, estyle.fxRow, estyle.paddingRight]}>
                                <Text style={[estyle.text, {textAlign: 'left'}]}>结束日期</Text>
                            </View>
                            <View style={[estyle.fxCenter]}>
                                <Text style={[estyle.text, {textAlign: 'right'}]}>{ this.state.endDate || '选择结束时间' }</Text>
                            </View>
                        </View>
                    </ViewForRightArrow>
                    <View style={[estyle.fxRow, estyle.padding]}>
                        <Text style={[estyle.text]}>&nbsp;</Text>
                    </View>
                    <ConfirmButton disabled={ this.state.beginDate == '' || this.state.endDate == '' }
                                   size="large" onPress={() => {this.goBack()} }>确认</ConfirmButton>
                </View>
            </View>
        );
    }
}