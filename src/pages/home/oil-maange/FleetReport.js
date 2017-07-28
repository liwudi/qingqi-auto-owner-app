/**
 * Created by kangyr on 2017/7/28.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
const estyle = Env.style;

export default class FleetReport extends Component {
    render() {
        return (
            <View style={[estyle.cardBackgroundColor,estyle.fx1]}>
                <TopBanner {...this.props} title="车队运营报表"/>
            </View>
        )
    }
}