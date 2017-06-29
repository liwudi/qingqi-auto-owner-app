/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View ,TouchableOpacity, Text } from 'react-native';

import { getAppVersion } from '../../../services/UpdateService';

import WebView from '../../../components/WebView';

import Env from '../../../utils/Env';

import ServerConfig from '../../../service-config/ServerConfig'

const estyle = Env.style;



class Bbs extends Component {
    constructor(props){
        super(props);
        let userStore = props.userStore.userInfo;

        // console.log(`${ServerConfig.BBS_PAGE}?token=${encodeURIComponent(userStore.token)}&phone=${encodeURIComponent(userStore.phone)}&userName=${encodeURIComponent(userStore.name)}`)
        this.state = {
            uri: `${ServerConfig.BBS_PAGE}?token=${encodeURIComponent(userStore.token)}&phone=${encodeURIComponent(userStore.phone)}&userName=${encodeURIComponent(userStore.name)}&appVersion=${getAppVersion().versionCode}&appType=${getAppVersion().appType}`,
            // uri: `http://kayouforum.hqzl.cn/yqlt.php?phone=admin&token=sdfasdfasd&appVersion=10021`,
            // uri: `http://kayouforum.hqzl.cn/mobile.php`,
            page:{}
        }
    }

    doBack(){
        this.refs.webView.doBack();
    }

    render(){

        return (
            <View  style={[estyle.fx1,estyle.containerBackgroundColor]}>
                {/*<TopBanner
                    {...this.props}
                    title={"卡友论坛"}
                />*/}
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