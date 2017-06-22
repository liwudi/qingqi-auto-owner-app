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

class SignButton extends Component{
    render(){
        return (
            <TouchableOpacity style={[...this.props.style,estyle.fxCenter]} onPress={()=>{ this.props.onClick && this.props.onClick()}}>
                    {this.props.children}
            </TouchableOpacity>
        )
    }
}
export default SignButton;
const styles = StyleSheet.create({
    buttonBaseBG:{
        backgroundColor:Env.color.integralButtonBg,
    },
});