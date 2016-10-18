/**
 * Created by cryst on 2016/10/18.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import TopBanner from '../../components/TopBanner';

import Env from '../../utils/Env';
const estyle = Env.style;
export default class HomePage extends Component {
    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner title="搜索列表"/>
            </View>
        )
    }
}