/**
 * Created by liwd on 2017/6/13.
 */
import React, { Component } from 'react';
import {
    View,
} from 'react-native';


import Env from '../../../utils/Env';
const estyle = Env.style;

class TaskCenter extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (

            <View style={[estyle.fx1,estyle.marginVertical,estyle.fxCenter]}>
                {this.props.children}
            </View>

        )
    }
}
export default TaskCenter;