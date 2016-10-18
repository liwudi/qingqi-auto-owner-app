/**
 * Created by cryst on 2016/10/18.
 */
import React, {Component} from 'react';
import {View, Text, Navigator, ScrollView, StyleSheet} from 'react-native';

import ConfirmButton from '../../components/ConfirmButton';
import CancelButton from '../../components/CancelButton';


import LabelInput from '../../components/LabelInput';
import PhoneChkCodeInput from '../../components/Inputs/PhoneChkCode';


import TopBanner from '../../components/TopBanner';
import Alert from '../../components/Modals/Alert';

export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertActive: false
        }

    }

    toPage = (component) => {
        this.props.router.push(component);
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#eee'}}>
                <View>
                    <Text style={{fontSize: 18, color: 'red'}}>组件</Text>
                    <Text></Text>
                    <ConfirmButton size="large">大号按钮</ConfirmButton>
                    <Text/>
                    <ConfirmButton size="middle" disabled="true">中号按钮</ConfirmButton>
                    <Text/>
                    <ConfirmButton size="small">小号按钮</ConfirmButton>
                    <Text/>
                    <CancelButton size="middle">中号取消按钮</CancelButton>
                    <Text/>
                    <PhoneChkCodeInput
                        style={{marginTop:5}}
                        onChangeText={value => this.setFromData('code', value)}
                        labelSize={3}
                    />
                    <LabelInput style={{marginTop:5}} label="密码" type="password" placeholder="输入密码"/>
                    <LabelInput style={{marginTop:5,marginBottom:5}}
                                label="手机"
                                placeholder="输入手机号"
                                rightView={<ConfirmButton size="small" onPress={(()=>{this.setState({alertActive:true})}).bind(this)}>获取验证码</ConfirmButton>}/>
                    <ConfirmButton size="small" onPress={(()=>{this.setState({alertActive:true})}).bind(this)}>淘宝风格alert弹窗</ConfirmButton>
                    <Alert visible={this.state.alertActive} contentType="input" placeholder="自定义内容" onClose={(()=>{this.setState({alertActive:false})}).bind(this)}>是否关闭?</Alert>
                    <TopBanner title="topbanner" leftTitle/>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    over: {
        color: 'green',
        fontSize: 18
    },
    modify: {
        color: 'orange',
        fontSize: 22
    },
    add: {
        color: 'blue',
        fontSize: 22
    }
});