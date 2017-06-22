/**
 * Created by liwd on 2017/6/13.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Env from '../../../utils/Env';
const estyle = Env.style;

class TaskTitle extends Component{
    render(){
        return (
            <View>
                <Text style={[estyle.marginLeft, estyle.paddingLeft, styles.borderLeft, {color: Env.color.main,fontSize:Env.font.articleTitle}]}>{this.props.title}</Text>
            </View>
        )
    }
}
export default TaskTitle;
const styles = StyleSheet.create({
    borderLeft:{
        borderLeftWidth:3,
        borderLeftColor:Env.color.main,
    }
});