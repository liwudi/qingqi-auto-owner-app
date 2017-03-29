/**
 * Created by yaocy on 2016/11/2.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Env from '../../../../utils/Env';

const estyle = Env.style;
export default class MyLineItem extends Component {

    render() {
        let data = this.props.data;
        // console.info(data)
        return (
            <TouchableOpacity {...this.props} style={[estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow, estyle.fxCenter]}>
                    <Text
                        style={[estyle.fx1,styles.textBlue,{textAlign:'left'}]}>{ !(data.startPointName || data.endPointName) ? '无线路车辆' : `${data.startPointName}——${data.endPointName}`}</Text>
                    <View style={[estyle.fx1,estyle.fxRow ,estyle.fxCenter]}>
                        {
                            (data.startPointName || data.endPointName) ?
                                <View style={[estyle.fxRow]}>
                                    <Text onPress={() => {this.props.bgPress && this.props.bgPress();}}>线路标杆：</Text>
                                    <Text style={[estyle.fx1,styles.standard]}>{data.carId && data.carCode ? data.carCode : '去设定' }</Text>
                                </View> : <View/>
                        }
                    </View>
                </View>
                <View style={[estyle.fxRow]}>
                    <View style={[estyle.fx1,estyle.paddingRight,estyle.paddingTop]}>
                        <Text style={[estyle.note]}>总油耗：{data.totalOilwear}L</Text>
                        <Text style={[estyle.note]}>平均油耗：{data.avgOilwear}L/100KM</Text>
                        {/*<Text style ={[estyle.note]}>线路标杆：<Text style={styles.textBlue}>{data.carCode}</Text></Text>*/}
                    </View>
                    <View style={[estyle.fx1,estyle.paddingRight,estyle.paddingTop]}>
                        <Text style={[estyle.note]}>承运车辆数：{data.totalCarNum}辆</Text>
                        <Text style={[estyle.note]}>活跃车辆数：{data.activeCarNum}辆</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    textBlue: {
        fontSize: Env.font.articleTitle,
        color: Env.color.main
    },
    standard: {
        fontSize: Env.font.note,
        color: Env.color.main
    }
});