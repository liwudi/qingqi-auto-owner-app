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
                <View style={[estyle.fxCenter]}><Text style={styles.textBlue}>{data.stName}●----------------------●{data.etName}</Text></View>
                <View style={[estyle.fxRow]}>
                    <View style={[estyle.paddingRight,estyle.text,estyle.paddingTop]}>
                        <Text style ={{textAlign:'right'}}>承运车辆数：{data.sumCount}辆</Text>
                        <Text style ={{textAlign:'right'}}>活跃车辆数：{data.acitveCount}辆</Text>
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