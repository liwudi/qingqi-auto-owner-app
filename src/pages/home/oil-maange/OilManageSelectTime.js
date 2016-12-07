/**
 * Created by linyao on 2016/11/18.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,DatePickerAndroid,
    ToastAndroid
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import OilManageSetMark from './OilManageSetMark';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import ConfirmButton from '../../../components/ConfirmButton';
import Env from '../../../utils/Env';
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
        )
            .then((obj) => {
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
/*        let start=this.state.beginDate.split('.')[0]+this.state.beginDate.split('.')[1]+this.state.beginDate.split('.')[2],
            end=this.state.endDate.split('.')[0]+this.state.endDate.split('.')[1]+this.state.endDate.split('.')[2];
        if(end - start < 0){
            ToastAndroid.show('结束时间不能小于开始时间', ToastAndroid.SHORT);
        }else if(end - start >6){
            ToastAndroid.show('时间区间不能大于7天', ToastAndroid.SHORT);
        }else {*/
        let sl = 7 * 24 * 60 * 60 * 1000; //七天的时间间隔，单位：ms
        console.info(this.state.beginDate)
        console.info(this.state.endDate)
        let start_ = this.state.beginDate.split('.'), end_ = this.state.endDate.split('.');
        let start = new Date(...start_).getTime(), end = new Date(...end_).getTime();
        if(end < start){
            ToastAndroid.show('结束时间不能小于开始时间', ToastAndroid.SHORT);
        }else if(end - start >= sl){
            ToastAndroid.show('时间区间不能大于7天', ToastAndroid.SHORT);
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