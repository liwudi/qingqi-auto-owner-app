/**
 * Created by linyao on 2017/7/13.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

import moment from 'moment';
import Env from '../../../../utils/Env';
const estyle = Env.style;

export default class DateHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDate : moment().format('YYYY-MM-DD'),
        };
        this.startDate = moment();
        this.endDate = null;
        this.type = 1 ;// 1 按日期 2 按周期 3 按月份
        this.cycle = 0; //时间周期 按周为7天 自定义不超过60天
    }

    resetDate(type,cycle,startDate,endDate){
        this.type = type;
        this.cycle = cycle;
        switch (type){
            case 1 :
                this.startDate = moment();
                this.setShowDate(this.startDate.format('YYYY-MM-DD'));
                break;
            case 2 :
                if( startDate && endDate ){
                    this.startDate = startDate;
                    this.endDate = endDate;
                }else {
                    this.getMonDayAndSunday();
                }
                this.setShowDate(`${this.startDate.format('YYYY-MM-DD')} -- ${this.endDate.format('YYYY-MM-DD')}`);
                break;
            case 3 :
                this.startDate = moment();
                this.setShowDate(this.startDate.format('YYYY-MM'));
                break;
        }
    }

    getMonDayAndSunday(){
        let nowDate = moment();
        let nowDay = nowDate.day() ? nowDate.day() : 7 ; //当前星期几
        let startDate = nowDate.clone().subtract(nowDay-1, 'days');
        this.startDate = startDate;
        let endDate = startDate.clone().add(this.cycle -1 , 'days');
        this.endDate = endDate;
    }

    prevDate(){
        switch (this.type){
            case 1 :
                let _d = this.startDate.subtract(1, 'days');
                this.setShowDate( _d.format('YYYY-MM-DD') );
                this.startDate = _d;
                break;
            case 2 :
                this.startDate = this.startDate.subtract(this.cycle,'days');
                this.endDate = this.startDate.clone().add(this.cycle -1,'days');
                this.setShowDate(`${this.startDate.format('YYYY-MM-DD')} -- ${this.endDate.format('YYYY-MM-DD')}`);
                break;
            case 3 :
                this.startDate = this.startDate.subtract(1,'months');
                this.setShowDate(this.startDate.format('YYYY-MM'));
                break;
        }
    }

    nextDate(){
        switch (this.type){
            case 1 :
                let _d2 = this.startDate.add(1, 'days');
                this.setShowDate( _d2.format('YYYY-MM-DD') );
                this.startDate = _d2;
                break;
            case 2 :
                this.startDate = this.startDate.add(this.cycle,'days');
                this.endDate = this.startDate.clone().add(this.cycle -1,'days');
                this.setShowDate(`${this.startDate.format('YYYY-MM-DD')} -- ${this.endDate.format('YYYY-MM-DD')}`);
                break;
            case 3 :
                this.startDate = this.startDate.add(1,'months');
                this.setShowDate(this.startDate.format('YYYY-MM'));
                break;
        }
    }

    setShowDate(str){
        this.setState({showDate:str});
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor]}>
                <View><Text>{this.state.showDate}</Text></View>
                <Button title='<' onPress={ ()=>{ this.prevDate() } }/>
                <Button title='>' onPress={ ()=>{ this.nextDate() } }/>
            </View>
        )
    }
}