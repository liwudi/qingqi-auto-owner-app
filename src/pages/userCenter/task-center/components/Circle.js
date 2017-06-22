/**
 * Created by liwd on 2017/6/14.
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

class Circle extends Component{
    render(){
        return (
            <View style={[styles.baseCircle,this.props.style]}></View>
        )
    }
}
export default Circle;
const styles = StyleSheet.create({
    baseCircle:{
        backgroundColor:Env.color.line,
        width:Env.font.base * 30,
        height:Env.font.base * 30,
        borderRadius:Env.font.base * 15,
        borderColor:Env.color.note,
        borderWidth:Env.font.base,
    },
});