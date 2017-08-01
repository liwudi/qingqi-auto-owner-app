/**
 * Created by linyao on 2017/7/28.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import moment from 'moment';

import DateHeader from './DateHeader';
import { IconCheckMark,IconCaretDown} from './Icons';
import Env from '../utils/Env';
import SubmitButton from './SubmitButton';
import DatePicker from './picker/DatePicker';
import Toast from './Toast';
const estyle = Env.style;
const basefont = Env.font.base;

export default class DateCyclePicker extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cycleType : props.cycleType || 1,
            startDate : null,
            endDate : null,
            startDateShow: '开始时间',
            endDateShow: '结束时间',
            height: 100,
            modal: false
        }
    }

    selectCycle(type){
        this.setState({cycleType : type});
    }


    //日期选择器
    datePicker(t) {
        let initDate = moment.isMoment(this.state[t]) ? this.state[t] :  moment() ;
        DatePicker.open(
            {
                date: initDate.toDate(),
                maxDate: new Date()
            }
        )
            .then((obj) => {
                if (obj.action !== DatePicker.dismissedAction) {
                    let selectDate = new Date(obj.year,obj.month,obj.day), dt = {} ;
                    dt[t] = moment(selectDate);
                    dt[t+'Show'] = moment(selectDate).format('YYYY-MM-DD');
                    this.setState(dt);
                }
            }).catch()
    }
    closeModal(){
        this.setState({
            modal : false
        })
    }

    submitDate(){
        if(this.state.startDate && this.state.endDate){
            let cycle = this.state.endDate.diff(this.state.startDate,'day');
            if(cycle < 0 ){
                console.log(cycle);
                console.log(this.state.startDate.format('YYYY-MM-DD'));
                Toast.show('结束时间不能小于开始时间',Toast.SHORT);
            }else {
                this.dateHeader.resetDate(2,cycle+1,this.state.startDate.clone(),this.state.endDate.clone());
            }
        }else {
            Toast.show('请选择开始时间与结束时间',Toast.SHORT);
        }
    }

    render(){
        return(
            <View style={[estyle.containerBackgroundColor,{overflow:'hidden',height: (this.state.modal ? Env.screen.height  : 80 *basefont),width:Env.screen.width},{...this.props.style}]}>
                <DateHeader ref={(dateHeader)=>{this.dateHeader = dateHeader}}
                            changeModal={()=>{ this.setState({modal: !this.state.modal}) }}
                            closeModal={()=>{this.closeModal()}}
                            onDateChange={(start,end)=>{this.props.onDateChange(start,end)}}
                />
                <View style={[estyle.cardBackgroundColor,estyle.marginTop]}>
                    <TouchableOpacity style={[estyle.fxRow , estyle.paddingHorizontal,estyle.borderBottom]}
                                      onPress={()=>{this.selectCycle(1); this.dateHeader.resetDate(1) }}
                    >
                        <Text style={[estyle.articleTitle,{ color:Env.color.text }, estyle.fx1,estyle.paddingVertical]}>日</Text>
                        {
                            this.state.cycleType === 1 ?
                                <View style={[estyle.fxCenter]}><IconCheckMark size={50*basefont} color={'#00c732' } /></View> : null

                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fxRow , estyle.paddingHorizontal,estyle.borderBottom]}
                                      onPress={()=>{this.selectCycle(2); this.dateHeader.resetDate(2,7)}}
                    >
                        <Text style={[estyle.articleTitle,{ color:Env.color.text }, estyle.fx1,estyle.paddingVertical]}>周</Text>
                        {
                            this.state.cycleType === 2 ?
                                <View style={[estyle.fxCenter]}><IconCheckMark size={50*basefont} color={'#00c732' } /></View> : null

                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fxRow , estyle.paddingHorizontal,estyle.borderBottom]}
                                      onPress={()=>{this.selectCycle(3);this.dateHeader.resetDate(3)}}
                    >
                        <Text style={[estyle.articleTitle,{ color:Env.color.text }, estyle.fx1,estyle.paddingVertical]}>月</Text>
                        {
                            this.state.cycleType === 3 ?
                                <View style={[estyle.fxCenter]}><IconCheckMark size={50*basefont} color={'#00c732' } /></View> : null

                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fxRow , estyle.paddingHorizontal,estyle.borderBottom]}
                                      onPress={()=>{this.selectCycle(4)}}
                    >
                        <Text style={[estyle.articleTitle,{ color:Env.color.text }, estyle.fx1,estyle.paddingVertical]}>自定义</Text>
                        {
                            this.state.cycleType === 4 ?
                                <View style={[estyle.fxCenter]}><IconCheckMark size={50*basefont} color={'#00c732' } /></View> : null

                        }
                    </TouchableOpacity>
                </View>
                {
                    this.state.cycleType === 4 ?
                        <View style={estyle.fx1}>
                            <View style={[estyle.fxRow,estyle.marginTop]}>
                                <View style={[estyle.fx1,estyle.paddingHorizontal]}>
                                    <TouchableOpacity style={[estyle.cardBackgroundColor,estyle.fxRow,estyle.fxCenter,estyle.paddingHorizontal]}
                                                      onPress={()=>{ this.datePicker('startDate') }}
                                    >
                                        <Text style={[estyle.note,estyle.fx1,estyle.paddingVertical]}>{this.state.startDateShow}</Text>
                                        <View><IconCaretDown  color={Env.color.note} /></View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[estyle.fx1,estyle.paddingHorizontal]}>
                                    <TouchableOpacity style={[estyle.cardBackgroundColor,estyle.fxRow,estyle.fxCenter,estyle.paddingHorizontal]}
                                                      onPress={()=>{ this.datePicker('endDate') }}
                                    >
                                        <Text style={[estyle.note,estyle.fx1,estyle.paddingVertical]}>{this.state.endDateShow}</Text>
                                        <View><IconCaretDown color={Env.color.note} /></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[estyle.padding,estyle.marginVertical]} >
                                <SubmitButton onPress={()=>{ this.submitDate() }}>完成</SubmitButton>
                            </View>
                        </View> : null
                }
            </View>
        )
    }
}