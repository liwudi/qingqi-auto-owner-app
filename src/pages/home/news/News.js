/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import { View ,TouchableOpacity, Text } from 'react-native';

import TopBanner from '../../../components/TopBanner';

import WebView from '../../../components/WebView';

import Env from '../../../utils/Env';

const styles = Env.style;

export default class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            uri: 'http://219.146.249.190:10106/',
            page:{}
        }
    }

    doBack(){
        this.refs.webView.doBack();
    }

    render(){

        return (
            <View  style={{flex:1}}>
                <TopBanner
                    leftShow={this.state.page.canGoBack || false}
                    title={"推荐"}
                    doBack={this.doBack.bind(this)}
                />
                <WebView
                    ref="webView"
                    showBanner={false}
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