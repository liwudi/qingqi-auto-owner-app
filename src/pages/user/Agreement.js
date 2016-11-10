/**
 * Created by cryst on 2016/11/9.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    WebView
} from 'react-native';

import TopBanner from '../../components/TopBanner';
import ListItem from '../../components/ListItem';
import Env from '../../utils/Env';
import Server from '../../service-config/ServerConfig'
const estyle = Env.style;
export default class Agreement extends Component {
    state = {
        uri: Server.WEB_PAGE + 'agreement.html' + Math.random()
    };

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="服务条款和隐私政策"/>
                <WebView
                    ref="webView"
                    showBanner={false}
                    uri = {this.state.uri}
                />
            </View>
        );
    }
}

