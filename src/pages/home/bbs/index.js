/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View ,TouchableOpacity, Text } from 'react-native';

import TopBanner from '../../../components/TopBanner';

import WebView from '../../../components/WebView';

import Env from '../../../utils/Env';

const styles = Env.style;



class Bbs extends Component {
    constructor(props){
        super(props);
        let userStore = props.userStore.userInfo;

        this.state = {
            uri: `http://61.161.238.158:8071/mapbar/yqlt.php?token=${encodeURIComponent(userStore.token)}&phone=${encodeURIComponent(userStore.phone)}`,
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
                    {...this.props}
                    title={"卡友论坛"}
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

export default connect(function (stores) {
    return {userStore: stores.userStore}
})(Bbs);