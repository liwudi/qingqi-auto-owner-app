/**
 * Created by linyao on 2017/5/4.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View ,TouchableOpacity, Text } from 'react-native';

import WebView from '../../components/WebView';

import Env from '../../utils/Env';

const estyle = Env.style;

class BannerWebView extends Component {
    constructor(props){
        super(props);
        this.state = {
            uri: `${this.props.uri}?_rid=${Math.random()}`,
            page:{}
        }
    }

    render(){

        return (
            <View  style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <WebView
                    ref="webView"
                    showBanner={true}
                    title={this.props.title}
                    {...this.props}
                    uri = {this.state.uri}
                    onPageChange={(page) => {
                        this.setState({page});
                    }}
                />
            </View>
        )
    }
}

export default connect(function (stores) {
    return {userStore: stores.userStore}
})(BannerWebView);