/**
 * Created by yaocy on 2016/11/2.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import Env from '../../../../utils/Env';

const estyle = Env.style;
export default class MyLineItem extends Component {
    
    render() {
        let data = this.props.data;
       // console.info(data)
        return (
            <View style={[estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow, estyle.fxCenter]}>
                    <Text style={[estyle.fx1,styles.textBlue,{textAlign:'right'}]}>{data.stName}</Text>
                    <Text style={[styles.textBlue,{marginRight:10,marginLeft:10}]}>●-----------------------------●</Text>
                    <Text style={[estyle.fx1,styles.textBlue]}>{data.etName}</Text></View>
                <View style={[estyle.fxRow]}>
                    <View style={[estyle.fx1,estyle.paddingRight,estyle.paddingTop,estyle.fxCenter]}>
                        <View>
                            <Text style ={[estyle.note]}>承运车辆数：{data.sumCount}辆</Text>
                        </View>
                    </View>
                    <View style={[estyle.fx1,estyle.paddingRight,estyle.paddingTop,estyle.fxCenter]}>
                        <View>
                            <Text style ={[estyle.note]}>活跃车辆数：{data.acitveCount}辆</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    textBlue:{
        fontSize:Env.font.articleTitle,
        color:Env.color.main
    }
});