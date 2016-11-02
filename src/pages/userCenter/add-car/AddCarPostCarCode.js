/**
 * Created by linyao on 2016/10/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,ToastAndroid
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ConfirmButton from '../../../components/ConfirmButton';
import LabelInput from '../../../components/LabelInput';
import Env from '../../../utils/Env';
import AddCarList from './AddCarList';
import { addCar } from '../../../services/AppService';
const estyle = Env.style;

export default class AddCarPostCarCode extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            carId: '123',
            carNumber: '',
            type: 1,
            flag: 0
        };
        this.info=this.props.carInfo;
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);
    

    nextStep () {
        if (LabelInput.Validate(this.refs)) {
            addCar(this.state)
                .then(()=>{
                    ToastAndroid.show('添加成功', ToastAndroid.SHORT);
                    this.timer=setTimeout(()=>{
                        this.props.router.replace(AddCarList,{carInfo: this.info});
                    },500)
                })
                .catch((e)=>{
                    ToastAndroid.show(e.message, ToastAndroid.SHORT);
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
                    labelSize={5}
                    onChangeText={carNumber => this.setState({carNumber})}
                    placeholder="请输入添加车辆车牌号"
                    validates={[
                        {require:true, msg:"车牌号为你的车队管理的重要标识,为方便您的车队管理,请输入车牌号。"}
                    ]}
                />
                <View style={[estyle.fxRowCenter,estyle.marginTop]}>
                    <ConfirmButton onPress={this.nextStep.bind(this)} size="large" >确认</ConfirmButton>
                </View>
            </View>
        );
    }
}