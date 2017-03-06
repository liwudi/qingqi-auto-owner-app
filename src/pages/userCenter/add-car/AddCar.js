/**
 * Created by linyao on 2016/10/21.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Text,
    View,
    TextInput,TouchableOpacity,Keyboard
} from 'react-native';

import { AddCarAction, TYPES} from '../../../actions/index';
import TopBanner from '../../../components/TopBanner';
import SubmitButton from '../../../components/SubmitButton';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import AddCarList from './AddCarList';
import ListTitle from '../../../components/ListTitle';
import AddCarVinAdd from './AddCarVinAdd';
const estyle = Env.style, pattern = Env.pattern;

import Toast from '../../../components/Toast';


class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doing: false,
            invoiceNo:'',
            identityCard:''
        };
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    //查询到车辆信息去添加车辆列表
    toList(info){
        this.setState({
            doing: false
        });
        this.props.router.push(AddCarList,{carInfo: info});
    }
    //未查询到车辆信息去填写Vin码页
    toVin(info){
        this.setState({
            doing: false
        });
        //this.props.router.push(AddCarVinAdd,{carInfo: info});
        Toast.show('你填写的信息没有查到关联车辆，请确认信息是否填写正确。', Toast.LONG);
    }

    nextStep () {
        if (LabelInput.Validate(this.refs)) {
            Keyboard.dismiss();
            this.setState({
                doing: true
            });
            this.props.dispatch(AddCarAction.getCarList(this.state, this.toList.bind(this),this.toVin.bind(this)));
        }
    }
    componentWillUnmount() {
        this.props.nav && this.props.nav.backRender && this.props.nav.backRender();
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <ListTitle title="请提供购车发票中的如下信息："/>
                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="invoiceNo"
                    label="发票号"
                    labelSize={3}
                    onChangeText={invoiceNo => this.setState({invoiceNo})}
                    placeholder="8位购车发票号码"
                    keyboardType="phone-pad"
                    maxLength={8}
                    validates={[
                        {require: true, msg:"请输入8位购车发票号码"},
                        {pattern: /^\d{8}$/, msg: '发票号码格式错误'}
                    ]}
                />

                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="identityCard"
                    label="证件号"
                    labelSize={3}
                    onChangeText={identityCard => this.setState({identityCard})}
                    placeholder="身份证号或组织机构代码"
                    keyboardType="ascii-capable"
                    validates={[
                        {require: true, msg:"请输入购车发票上的身份证号或组织机构代码"},
                        {pattern: /^[A-Za-z0-9]{8,19}$/, msg: '身份证号或组织机构代码格式错误'}
                    ]}
                />
                <View style={[estyle.fxRow, estyle.padding]}>
                    <Text style={[estyle.text]}>&nbsp;</Text>
                </View>
                <View style={[estyle.fxRowCenter]}>
                    <SubmitButton doing={this.state.doing} size="large" onPress={this.nextStep.bind(this)}>下一步</SubmitButton>
                </View>
            </View>
        );
    }
}


export default connect(function (stores) {
    return {addCarStore: stores.TDSStore}
})(AddCar);