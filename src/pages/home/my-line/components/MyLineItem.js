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
import ViewForRightArrow from '../../../../components/ViewForRightArrow';

const estyle = Env.style;
export default class MyLineItem extends Component {
    
    render() {
        let data = this.props.data;
       // console.info(data)
        return (
            <ViewForRightArrow {...this.props} style={[estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow, estyle.fxCenter]}>
                    <Text style={[estyle.fx1,styles.textBlue]}>{`${data.stName}————${data.etName}`}</Text>
                </View>
                <View style={[estyle.fx1,estyle.paddingRight,estyle.paddingTop]}>
                    <View>
                        <Text style ={[estyle.note]}>承运车辆数：{data.sumCount}辆</Text>
                        <Text style ={[estyle.note]}>活跃车辆数：{data.acitveCount}辆</Text>
                    </View>
                </View>
            </ViewForRightArrow>
        )
    }
}
const styles = StyleSheet.create({
    textBlue:{
        fontSize:Env.font.articleTitle,
        color:Env.color.main
    }
});