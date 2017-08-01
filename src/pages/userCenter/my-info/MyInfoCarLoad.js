/**
 * Created by linyao on 2017/4/28.
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
import SubmitButton from '../../../components/SubmitButton';
import Toast from '../../../components/Toast';

class MyInfovehicleLoad extends Component {
    constructor(props){
        super(props);
        this.state = {
            doing: false
        };
    }

    componentDidMount() {
        this.setState({vehicleLoad: this.props.data.vehicleLoad});
    }

    onSave() {
        if (LabelInput.Validate(this.refs)) {
            if(this.state.vehicleLoad <= 1000){
                if(this.props.data.vehicleLoad === this.state.vehicleLoad) {
                    this.props.router.pop();
                    return;
                }
                this.setState({doing:true});
                if(this.props.successFun){
                    this.props.successFun({vehicleLoad:this.state.vehicleLoad})
                        .then(()=>{
                            this.props.router.pop();
                        })
                        .catch((err)=>{
                            Toast.show(err.message,Toast.SHORT);
                        })
                        .finally(()=>{
                            this.setState({doing:false});
                        })
                }
            }else {
                Toast.show('可输入最大载重999吨，允许2位小数',Toast.SHORT);
            }
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="载重"/>
                <View  style={[estyle.fxRowCenter]}>
                    <LabelInput
                        ref="vehicleLoad"
                        style={[estyle.marginTop, estyle.borderBottom]}
                        onChangeText={(cload) => {
                            this.setState({vehicleLoad:cload.toUpperCase()});
                        }}
                        defaultValue={this.props.data.vehicleLoad}
                        secureTextEntry={true}
                        placeholder='请输入车辆载重(吨)'
                        label="载重"
                        autoCapitalize="characters"
                        labelSize="3"
                        maxLength={8}
                        validates={[
                            {require:true, msg: '请输入有效车厢载重'},
                            {pattern:/^\d{1,3}(\.\d{0,2})?$/, msg:'可输入最大载重999吨，允许2位小数'}
                        ]}
                    />
                    <View style={[estyle.fxRow, estyle.padding]}>
                        <Text style={[estyle.text]}>&nbsp;</Text>
                    </View>
                    <SubmitButton size="large"
                                  doing={this.state.doing}
                                  onPress={() => this.onSave()}>保存</SubmitButton>
                </View>
            </View>
        );
    }
}

const basefont = Env.font.base;
const estyle = Env.style;
const styles=StyleSheet.create({

});

export default MyInfovehicleLoad