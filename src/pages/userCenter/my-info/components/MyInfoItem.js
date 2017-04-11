/**
 * Created by linyao on 2017/4/11.
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
const estyle = Env.style;

export default class MyInfoItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let state = this.props.state;
        let isReviewed, rightIcon, disabled;
        isReviewed = state == 4;
        if (this.props.isPhoto) {
            rightIcon = state == 2 ? null : undefined;
            disabled = (state == 2);
        } else {
            rightIcon = state == 2 || state == 4 ? null : undefined;
            disabled = (state == 2 || state == 4);
        }
        if (this.props.onlyRead) {
            disabled = true
        }
        return (
            <ViewForRightArrow disabled={disabled} onPress={this.props.onPress} rightIcon={rightIcon}>
                <View style={[estyle.fxRow, estyle.fxCenter]}>
                    <Star_i color={ isReviewed ? Env.vector.star.color.highlight : Env.color.note }
                            style={[estyle.marginRight]}/>
                    <Text style={[estyle.fx1, estyle.text]}>{this.props.title}</Text>
                    {
                        this.props.rightDom
                    }
                    {
                        this.props.isWarn ?
                            <Image source={warning}
                                   style={[{width: 40 * basefont, height: 40 * basefont}, estyle.marginLeft]}/> : null
                    }
                </View>
            </ViewForRightArrow>
        )
    }
}
