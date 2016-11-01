/**
 * Created by linyao on 2016/10/21.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Text,
    View,
    TextInput
} from 'react-native';

import { AddCarAction, TYPES} from '../../../actions/index';
import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import AddCarList from './AddCarList';
import AddCarVinAdd from './AddCarVinAdd';
const estyle = Env.style;

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceNo:'',
            identityCard:'',
            //todo 接口问题非必传
            vinCode:'123'
        };
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    //查询到车辆信息去添加车辆列表
    toList(info){
        this.props.router.replace(AddCarList,{carInfo: info});
    }
    //未查询到车辆信息去填写Vin码页
    toVin(info){
        this.props.router.replace(AddCarVinAdd,{carInfo: info});
    }

    nextStep () {
        if (LabelInput.Validate(this.refs)) {
            this.props.dispatch(AddCarAction.getCarList(this.state, this.toList.bind(this),this.toVin.bind(this)));
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <LabelInput
                    style={[estyle.marginTop, estyle.borderBottom]}
                    ref="invoiceNo"
                    label="购车发票号"
                    labelSize={5}
                    onChangeText={invoiceNo => this.setState({invoiceNo})}
                    placeholder="请输入购车发票号"
                    validates={[
                        {require:true, msg:"请输入购车发票号"}
                    ]}
                />

                <LabelInput
                    style={[estyle.borderBottom]}
                    ref="identityCard"
                    label="证件码"
                    labelSize={5}
                    onChangeText={identityCard => this.setState({identityCard})}
                    placeholder="请输入购车发票上的身份证号或组织机构代码"
                    validates={[
                        {require:true, msg:"请输入购车发票上的身份证号或组织机构代码"}
                    ]}
                />
                <View style={[estyle.fxRow, estyle.padding]}>
                    <Text style={[estyle.text]}>&nbsp;</Text>
                </View>
{/*
                <Text style={[estyle.note, {color:Env.color.main, textAlign: 'right'}, estyle.padding]}>我购买的二手车</Text>
*/}
                <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton size="large" onPress={this.nextStep.bind(this)}>下一步</ConfirmButton>
                </View>
            </View>
        );
    }
}


export default connect(function (stores) {
    return {addCarStore: stores.TDSStore}
})(AddCar);