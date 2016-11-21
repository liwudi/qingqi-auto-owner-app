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
            beginDate: this.props.beginDate || '',
            endDate: this.props.endDate || ''
        }
    }
    datePicker(type) {
        DatePickerAndroid.open(
            {
                date: type == 'start' ?
                this.state.beginDate ? new Date(this.state.beginDate.split('.')[0],this.state.beginDate.split('.')[1] -1,this.state.beginDate.split('.')[2]): new Date()
                    :
                this.state.endDate ? new Date(this.state.endDate.split('.')[0],this.state.endDate.split('.')[1] -1,this.state.endDate.split('.')[2]) : new Date()
            }
        )
            .then((obj) => {
                if (obj.action !== DatePickerAndroid.dismissedAction) {
                    if (type == 'start') {
                        this.setState({beginDate: obj.year + '.' + (obj.month+1) + '.' + obj.day,
                            beginDate_: obj.year + '.' + obj.month + '.' + obj.day
                        });
                    } else if (type == 'end') {
                        this.setState({endDate: obj.year + '.' + (obj.month+1) + '.' + obj.day,
                            endDate_: obj.year + '.' + obj.month + '.' + obj.day
                        });
                    }
                }
            }).catch()
    }
    goBack(){
        let start=this.state.beginDate.split('.')[0]+this.state.beginDate.split('.')[1]+this.state.beginDate.split('.')[2],
            end=this.state.endDate.split('.')[0]+this.state.endDate.split('.')[1]+this.state.endDate.split('.')[2];
        if(end - start < 0){
            ToastAndroid.show('结束时间不能小于开始时间', ToastAndroid.SHORT);
        }else if(end - start >6){
            ToastAndroid.show('时间区间不能大于7天', ToastAndroid.SHORT);
        }else {
            this.props.update({
                beginDate: this.state.beginDate_,
                endDate: this.state.endDate_

            });
            this.props.router.pop();
        }
    }

    render() {
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="自定义时间"
                />
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
                                   size="large" onPress={() => {this.goBack()} }><Text>确认</Text></ConfirmButton>
                </View>
            </View>
        );
    }
}