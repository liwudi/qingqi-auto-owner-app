/**
 * Created by linyao on 2016/10/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import { addCar } from '../../../services/AppService';
import Toast from '../../../components/Toast';
import MyCar from '../../home/my-car/MyCar';
const estyle = Env.style;

export default class AddCarPostCarCode extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            carId: this.props.carInfo.id,
            carNumber: '',
            type: '0',
            flag: '0'
        };
        this.info=this.props.carInfo;
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);
    

    nextStep () {
        if (LabelInput.Validate(this.refs)) {
            addCar(this.state)
                .then(()=>{
                    Toast.show('添加成功', Toast.SHORT);
                    this.props.router.popN(3);
                    this.props.router.replace(MyCar);
                })
                .catch((e)=>{
                    Toast.show(e.message, Toast.SHORT);
                })
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <LabelInput
                    style={[estyle.marginTop, estyle.borderBottom]}
                    ref="carNumber"
                    label="车牌号"
                    labelSize={3}
                    maxLength={10}
                    onChangeText={carNumber => this.setState({carNumber})}
                    placeholder="请输入添加车辆车牌号"
                    validates={[
                        {require:true, msg:"车牌号为你的车队管理的重要标识,为方便您的车队管理,请输入车牌号。"}
                    ]}
                />
                <View style={[estyle.fxRow, estyle.padding]}>
                    <Text style={[estyle.text]}>&nbsp;</Text>
                </View>
                <View style={[estyle.fxRowCenter]}>
                    <ConfirmButton onPress={this.nextStep.bind(this)} size="large" >确认</ConfirmButton>
                </View>
            </View>
        );
    }
}