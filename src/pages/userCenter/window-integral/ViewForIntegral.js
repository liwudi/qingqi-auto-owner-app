/**
 * Created by liwd on 2017/6/13.
 */
import React, { Component } from 'react';
import {
    View,
} from 'react-native';


import Env from '../../../utils/Env';
const estyle = Env.style;

class ViewForIntegral extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <View style={[estyle.borderBottom,estyle.fxRow, estyle.fxRowCenter, estyle.cardBackgroundColor]}>
                {this.props.children}
            </View>
        )
    }
}
export default ViewForIntegral;

