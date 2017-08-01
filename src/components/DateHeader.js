/**
 * Created by linyao on 2017/7/13.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity
} from 'react-native';

import moment from 'moment';
import Env from '../utils/Env';
import { IconCaretLeft , IconCaretRight } from './Icons';
const estyle = Env.style;

export default class DateHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDate : moment().format('YYYY-MM-DD'),
            canNext:false
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
                this.endDate = moment();
                this._moreThenNowDate();
                this.setShowDate(this.startDate.format('YYYY-MM-DD'));
                break;
            case 2 :
                if( startDate && endDate ){
                    this.startDate = startDate;
                    this.endDate = endDate;
                }else {
                    this.getMonDayAndSunday();
                }
                this._moreThenNowDate();
                this.setShowDate(`${this.startDate.format('YYYY-MM-DD')} -- ${this.endDate.format('YYYY-MM-DD')}`);
                break;
            case 3 :
                this.getMouthStartAndEnd();
                this._moreThenNowDate();
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

    getMouthStartAndEnd(){
        this.startDate = moment().startOf('month');
        this.endDate = moment().endOf('month');
    }
    _moreThenNowDate(){
        if(this.endDate.clone().diff(moment(),'day') >= 0){
            this.endDate = moment();
            this.setState({canNext:false});
        }else {
            this.setState({canNext:true});
        }
    }

    prevDate(){
        switch (this.type){
            case 1 :
                let _d = this.startDate.subtract(1, 'days');
                this.startDate = _d;
                this.endDate = _d.clone();
                this._moreThenNowDate();
                this.setShowDate( _d.format('YYYY-MM-DD') );
                break;
            case 2 :
                this.startDate = this.startDate.subtract(this.cycle,'days');
                this.endDate = this.startDate.clone().add(this.cycle -1,'days');
                this._moreThenNowDate();
                this.setShowDate(`${this.startDate.format('YYYY-MM-DD')} -- ${this.endDate.format('YYYY-MM-DD')}`);
                break;
            case 3 :
                let _d2 = this.startDate.subtract(1,'months');
                this.startDate = _d2;
                this.endDate = _d2.clone().endOf('month');
                this._moreThenNowDate();
                this.setShowDate(this.startDate.format('YYYY-MM'));
                break;
        }
    }

    nextDate(){
        switch (this.type){
            case 1 :
                let _d = this.startDate.add(1, 'days');
                this.startDate = _d;
                this.endDate = _d.clone();
                this._moreThenNowDate();
                this.setShowDate( _d.format('YYYY-MM-DD') );
                break;
            case 2 :
                this.startDate = this.startDate.add(this.cycle,'days');
                this.endDate = this.startDate.clone().add(this.cycle -1,'days');
                this._moreThenNowDate();
                this.setShowDate(`${this.startDate.format('YYYY-MM-DD')} -- ${this.endDate.format('YYYY-MM-DD')}`);
                break;
            case 3 :
                let _d2 = this.startDate.add(1,'months');
                this.startDate = _d2;
                this.endDate = _d2.clone().endOf('month');
                this._moreThenNowDate();
                this.setShowDate(this.startDate.format('YYYY-MM'));
                break;
        }
    }

    setShowDate(str){
        this.setState({showDate:str});
        this.props.closeModal && this.props.closeModal();
        this.props.onDateChange && this.props.onDateChange(this.startDate.format('YYYYMMDD'),this.endDate.format('YYYYMMDD'));
    }

    render() {
        return (
            <View style={[estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow,estyle.padding]}>
                    <TouchableOpacity style={[estyle.fxCenter,estyle.paddingHorizontal]} onPress={() => this.prevDate()}>
                        <View>
                            <IconCaretLeft color={Env.color.text}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fx1,estyle.fxCenter]} onPress={()=>{this.props.changeModal && this.props.changeModal() }} >
                        <Text  style={[estyle.text]}>{this.state.showDate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fxCenter ,estyle.paddingHorizontal]} onPress={() =>{ this.state.canNext && this.nextDate() } }>
                        <View>
                            <IconCaretRight color={this.state.canNext ? Env.color.text : Env.color.note }/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}