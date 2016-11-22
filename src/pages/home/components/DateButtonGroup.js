/**
 * Created by cryst on 2016/11/21.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Env from '../../../utils/Env';
import BorderButton from '../../../components/BorderButton';
import OilManageSelectTime from '../oil-maange/OilManageSelectTime';

export default class DateButtonGroup extends Component {
    constructor() {
        super();
        this.state = {timeType:1}
    }
    //时间段选择，选择后重新获取数据
    selectTime(value){
        let beginDate,endDate=moment().subtract(1, 'days').format('YYYYMMDD');
        switch (value){
            case 1: beginDate= moment().subtract(1, 'days').format('YYYYMMDD'); break;
            case 2: beginDate= moment().subtract(3, 'days').format('YYYYMMDD'); break;
            case 3: beginDate= moment().subtract(7, 'days').format('YYYYMMDD'); break;
        }
        this.setState({
            timeType: value,
            beginDate: beginDate,
            endDate: endDate
        });
        this.props.selectTime({beginDate:beginDate, endDate: endDate});
    }
    //自定义时间
    customTime(){
        this.setState({timeType: 4});
        this.props.router.push(OilManageSelectTime,
            { beginDate:this.state.beginDate || '',
                endDate: this.state.endDate || '',update:(date={
            }) => {
                !date.beginDate && (date.beginDate = this.state.beginDate);
                !date.endDate && (date.endDate = this.state.endDate);
                date.beginDate.indexOf('.') > -1 && (date.beginDate = moment(date.beginDate.split('.')).format('YYYYMMDD'));
                date.endDate.indexOf('.') > -1 && (date.endDate = moment(date.endDate.split('.')).format('YYYYMMDD'));
                this.setState(date);
                this.props.selectTime(date);
            }})
    }
    componentDidMount() {
        this.selectTime(1);
    }
    render() {
        return (
            <View style={[estyle.padding,estyle.borderTop,estyle.borderBottom,estyle.fxRow]}>
                <Text style={[estyle.text, estyle.fx1]}>设定时间：</Text>
                <BorderButton style={{marginRight:Env.font.base*6}} color={this.state.timeType === 1 ? Env.color.auxiliary : Env.color.main }  onPress={this.selectTime.bind(this,1)}>前一天</BorderButton>
                <BorderButton style={{marginRight:Env.font.base*6}} color={this.state.timeType === 2 ? Env.color.auxiliary : Env.color.main } onPress={this.selectTime.bind(this,2)}>前三天</BorderButton>
                <BorderButton style={{marginRight:Env.font.base*6}} color={this.state.timeType === 3 ? Env.color.auxiliary : Env.color.main } onPress={this.selectTime.bind(this,3)}>前七天</BorderButton>
                <BorderButton color={this.state.timeType === 4 ? Env.color.auxiliary : Env.color.main } onPress={this.customTime.bind(this)}>自定义</BorderButton>
            </View>
        );
    }
}