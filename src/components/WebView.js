/**
 * Created by ligj on 2016/10/25.
 */
/**
 * Created by ligj on 2016/10/20.
 */
import React, { Component } from 'react';
import { View, WebView , TouchableOpacity, Text } from 'react-native';
import * as Icons from './Icons';

import TopBanner from './TopBanner';

import Env from '../utils/Env';

const styles = Env.style;

export default class News extends Component {

    static defaultProps = {
        showBanner : true
    };

    constructor(props){
        super(props);
        this.state = {
            uri: this.props.uri,
            page: {}
        }
    }

    doBack(){
        if(this.state.page.canGoBack){
            this.setState({
                uri: `javascript:window.history.back();var a = '${Math.random()}'`
            })
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

    render(){
        const _renderButton = () => {
            return (
                <View style={[styles.fxRow]}>
                    <TouchableOpacity onPress={() => this.props.doBack()}>
                        <Text ><Icons.IconArrowLeft color="#FFF" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onClose()}>
                        <Text ><Icons.IconClose color="#FFF" /></Text>
                    </TouchableOpacity>
                </View>
            )
        };
        return (
            <View  style={{flex:1}}>
                { this.props.showBanner ? <TopBanner
                    leftShow={true}
                    leftView={_renderButton()}
                    doBack={this.doBack.bind(this)}
                    title={this.state.page.title}
                /> : null}
                <WebView
                    onNavigationStateChange={(page) => {
                        page.loading === false && this.onPageChange(page)
                    }}
                    style={{flex:1}}
                    source={{uri: this.state.uri}}
                />
            </View>
        )
    }
}