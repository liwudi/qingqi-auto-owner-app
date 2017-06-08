/**
 * Created by ligj on 2016/10/25.
 */
/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import { View , TouchableOpacity, Text, WebView } from 'react-native';
import * as Icons from './Icons';

import TopBanner from './TopBanner';

import Env from '../utils/Env';

const estyle = Env.style;
const basefont = Env.font.base;


export default class News extends Component {

    static defaultProps = {
        showBanner : true
    };

    constructor(props){
        super(props);
        this.state = {
            uri: this.props.uri,
            page: {},
            title: this.props.title || '卡友论坛'
        }
    }

    doBack(){
        if(this.state.page.canGoBack){
            //向webview发送后退操作
            this.refs.webview.injectJavaScript("history.back();");
        }else{
            this.props.doBack();
        }
    }

    onClose(){
        this.props.doBack();
    }

    onPageChange(page){
        this.setState({page});
        this.props.onPageChange && this.props.onPageChange(page);
    }

    onBridgeMessage(message){
        // const { webviewbridge } = this.refs;
        //
        // switch (message) {
        //     case "hello from webview":
        //         webviewbridge.sendToBridge("hello from react-native");
        //         break;
        //     case "got the message inside webview":
        //         console.log("we have got a message from webview! yeah");
        //         break;
        // }
    }

    render(){

        const injectScript = `
                (function () {
                    
                  }());
`;

        const _renderButton = () => {
            return <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                    <TouchableOpacity style={[estyle.fxCenter,{height:basefont * 80,width:basefont * 70, }]} onPress={() => this.doBack()}>
                        <Text ><Icons.IconArrowLeft color="#FFF" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[estyle.fxCenter,{height:basefont * 80,width:basefont * 70,}]} onPress={() => this.onClose()}>
                        <Text><Icons.IconClose color="#FFF" size={basefont*75} /></Text>
                    </TouchableOpacity>
                </View>;
        };
        return (
            <View  style={[estyle.fx1]}>
                { this.props.showBanner ? <TopBanner
                    {...this.props}
                    leftShow={true}
                    leftView={_renderButton()}
                    doBack={this.doBack.bind(this)}
                    title={this.state.title}
                /> : null}
                <WebView
                    ref="webview"
                    onNavigationStateChange={(page) => {
                        this.onPageChange(page)
                    }}
                    style={{flex:1}}
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    source={{uri: this.state.uri}}
                    injectedJavaScript={injectScript}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                />
            </View>
        )
    }
}