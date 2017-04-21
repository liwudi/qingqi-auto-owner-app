/**
 * Created by linyao on 2017/4/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

import Env from '../../../../utils/Env';
import {IconUser,IconFlag} from '../../../../components/Icons'
const estyle = Env.style;

export default class ManageCarItem extends Component {
    render() {
        let list= this.props.data;
        return (
            <View style={[estyle.fxRow,estyle.borderBottom,estyle.padding,estyle.cardBackgroundColor]}>
                <View style={estyle.fx1}>
                    <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                        <Text style={[estyle.articleTitle]}>{list.carCode}</Text>
                        <Text> </Text>
                        {list.isStandard == 1 && <IconFlag style={{color: 'red'}} size={Env.font.base * 30}/>}
                    </View>
                    <View style={[estyle.fxRow, estyle.fxRowCenter,estyle.paddingTop]}>
                        <IconUser color='#FEBEBE'/><Text> </Text>
                        <Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{list.mainDriver || '无'}</Text>
                        <IconUser color='#C4DFFE'/><Text> </Text>
                        <Text style={[estyle.note, {color: Env.color.text}]}>{list.subDriver || '无'}</Text>
                    </View>
                    <View style={[estyle.fxRow,estyle.paddingTop]}>
                        <View style={[estyle.fxRow]}>
                            <Text style={[estyle.note]}>平均油耗：</Text><Text style={{color: Env.color.main}}>{list.avgOilwear || 0}L/100km</Text>
                        </View>
                        <View style={[estyle.fxRow,estyle.marginLeft]}>
                            <Text style={[estyle.note]}>平均速度：</Text><Text style={{color: Env.color.main}}>{list.avgSpeed || 0}km/h</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}