/**
 * Created by liwd on 2017/6/13.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    View,
} from 'react-native';


import Env from '../../../utils/Env';
const estyle = Env.style;

class IntegralMall extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (

            <View style={[estyle.fx1,estyle.paddingVertical,estyle.fxCenter,estyle.borderRight]}>
                {this.props.children}
            </View>

        )
    }
}
export default IntegralMall;