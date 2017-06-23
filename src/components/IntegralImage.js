/**
 * Created by liwd on 2017/6/13.
 */
import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';
import Env from '../utils/Env';
const estyle = Env.style;
export default class IntegralImage extends Component{
    render(){
        return (
            <View style={[estyle.largeHeight,estyle.fxCenter,estyle.cardBackgroundColor]}>
                <Image style={[estyle.largeHeight, {width:Env.screen.width}]} source={require('../assets/images/integral.png')}/>
            </View>
        )
    }
}