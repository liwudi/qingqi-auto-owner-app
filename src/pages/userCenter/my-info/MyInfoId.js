/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/17
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import MyInfo from './MyInfo';
import ConfirmButton from '../../../components/ConfirmButton';
export default class MyInfoId extends Component {
    goTo(page){
        this.props.router.push(page);
    }
    render() {
        return (
            <View sytle={estyle.body}>
                <TopBanner {...this.props} title="身份证"/>
                <View style = {[estyle.fxRowCenter]}>
                    <LabelInput
                        style = {[estyle.borderBottom]}
                        label="身份证"
                        placeholder='请输入18位身份证号码'
                        labelSize={3}
                    />
                    <ConfirmButton style={{marginTop:10}} type="large" onPress = {() => this.goTo(MyInfo)}><Text>保存</Text></ConfirmButton>
                </View>


            </View>
        );
    }
}
const estyle = Env.style;