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


import user from '../user/index'
import Login from '../user/Login';
import QuickLogin from '../user/QuickLogin';
import SaveTrueName from '../user/SaveTrueName';
import Reg from '../user/Reg';
import RegSuccess from '../user/RegSuccess';
import RegCheckCode from '../user/RegCheckCode';
import ServiceProvision from '../user/ServiceProvision';
import FindPassword from '../user/FindPassword';
import FindPasswordCheckCode from '../user/FindPasswordCheckCode';
import FindPasswordNewPassword from '../user/FindPasswordNewPassword';

import AddCar from '../userCenter/add-car/AddCar';
import AddCarSelectCar from '../userCenter/add-car/AddCarSelectCar';
import AddCarForVin from '../userCenter/add-car/AddCarForVin';
import AddCarForVinStep2 from '../userCenter/add-car/AddCarForVinStep2';
import AddCarForInvoiceNo from '../userCenter/add-car/AddCarForInvoiceNo';
import AddCarForVinUploadInvoiceNo from '../userCenter/add-car/AddCarForVinUploadInvoiceNo';
import WhereisVin from '../userCenter/add-car/WhereisVin';

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
                <Text style={{fontSize:18,color:'red'}}>注册登录相关</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(user)}}>0、登录</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(Login)}}>1、手机密码登录</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(QuickLogin)}}>2、手机快捷登录</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(SaveTrueName)}}>3、输入真实姓名（快捷登录未填写姓名）</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(Reg)}}>4、注册</Text>
                <Text  {...this.props} onPress={() => {this.toPage(RegSuccess)}}>4.1、注册-成功</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(RegCheckCode)}}>5、注册（填写验证码）</Text>
                <Text  {...this.props} onPress={() => {this.toPage(ServiceProvision)}}>6、服务条款</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPassword)}}>7、找回密码</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPasswordCheckCode)}}>8、找回密码-填写短信验证码</Text>
                <Text  style={styles.over} {...this.props} onPress={() => {this.toPage(FindPasswordNewPassword)}}>9、找回密码-输入新密码</Text>
                <Text> </Text>
                <Text style={{fontSize:18,color:'red'}}>添加车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCar)}}>1、添加一手车</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>2、添加一手车-选择车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForInvoiceNo)}}>3、添加一手车-找回车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarSelectCar)}}>4、添加一手车-添加未关联车辆</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVin)}}>5、添加二手车（VIN）</Text>
                <Text {...this.props} onPress={() => {this.toPage(WhereisVin)}}>6、VIN码在哪里页面</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVinStep2)}}>7、添加二手车-已有车主-找回</Text>
                <Text {...this.props} onPress={() => {this.toPage(AddCarForVinUploadInvoiceNo)}}>8、添加二手车-无车主-申请车主身份-上传发票</Text>


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