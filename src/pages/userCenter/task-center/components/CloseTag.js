/**
 * Created by liwd on 2017/6/15.
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

class CloseTag extends Component{
    render(){
        return (
            <TouchableOpacity onPress={()=>this.props.onClick()}>
                <View style={[{width:Env.font.base*50,height:Env.font.base*50,backgroundColor:Env.color.note,borderRadius:Env.font.base*25,position:"relative"},estyle.fxCenter]}>
                    <View style={[{backgroundColor:"#fff",width:Env.font.base*40,height:Env.font.base*6,position:"absolute"},{transform:[{rotate:"45deg"}]}]}></View>
                    <View style={[{backgroundColor:"#fff",width:Env.font.base*6,height:Env.font.base*40,position:"absolute"},{transform:[{rotate:"45deg"}]}]}></View>
                </View>
            </TouchableOpacity>
        )
    }
}
export default CloseTag;
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