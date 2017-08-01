/**
 * Created by linyao on 2017/7/26.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';

import ViewForRightArrow from '../../../../components/ViewForRightArrow';
import Env from '../../../../utils/Env';
import {Star_i} from '../../../../components/Icons';
import warning from '../../../../assets/images/warning.png';
const estyle = Env.style;
const basefont = Env.font.base;

export default class MyInfoItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let state = this.props.state;
        let isReviewed, rightIcon, disabled;
        return (
            <ViewForRightArrow onPress={this.props.onPress}>
                <View style={[estyle.fxRow, estyle.fxCenter]}>
                    <Text style={[estyle.fx1, estyle.text]}>{this.props.title}</Text>
                    {
                        this.props.rightDom
                    }
                </View>
            </ViewForRightArrow>
        )
    }
}
