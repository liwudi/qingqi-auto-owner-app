/**
 * Created by yaocy on 2016/10/31.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

import Env from '../../../../utils/Env';
const estyle = Env.style;
export default class MyDriverItem extends Component {
    
    render() {
        let data = this.props.data;
       // console.info(data)
        return (
            <View style={[estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor,estyle.padding]}>
                <View style={estyle.fxCenter}>
                    <Image
                        style={{borderRadius:100,width:40,height:40,borderWidth:4 * Env.font.base,borderColor:'#85C7E7',}}
                        source={require('../../../../assets/images/icon-1.png')}
                    />
                </View>
                <View style={[estyle.fxColumnCenter,estyle.marginLeft]}>
                    <Text style={estyle.text}>{data.name||"无"}</Text>
                </View>
                <View style={[estyle.fxColumnCenter,estyle.marginLeft,estyle.fx1]}>
                    <Text style={estyle.note}>{data.phone||"无"}</Text>
                </View>
            </View>
        )
    }
}
