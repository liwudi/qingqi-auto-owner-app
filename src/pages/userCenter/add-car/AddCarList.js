/**
 * Created by ligj on 2016/10/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,ToastAndroid
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import PageList from '../../../components/PageList';
import Button from '../../../components/BorderButton';
import Env from '../../../utils/Env';
import { getCarList } from '../../../services/UserService';
import AddCarFind from  './AddCarFind';
import AddCarPostCarCode from './AddCarPostCarCode';
const estyle = Env.style;

export default class AddCar extends Component {
    constructor(props) {
        super(props);
        let nowDate = new Date();
        this.state = {
            carInfo: this.props.carInfo,
            date : `${nowDate.getFullYear()}年${nowDate.getMonth()+1}月${nowDate.getDate()}日`
        };
    }


    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    nextStep (type) {
        if(type == 'add'){
            this.props.router.push(AddCarPostCarCode,{carInfo: this.state.carInfo});
        }else if(type == 'forback'){
            this.props.router.push(AddCarFind,{carInfo: this.state.carInfo});
        }
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="添加车辆"/>
                <PageList
                    style={estyle.fx1}
                    renderRow={(row) => {
						let dom=<View style={[estyle.paddingVertical,estyle.borderBottom, estyle.fxRow, estyle.fx1]}>
                                    <View style={[ estyle.paddingLeft, estyle.fx1]}>
                                         <Text style={[estyle.text, {color:Env.color.main}]}>{row.carType}</Text>
                                         <Text style={[estyle.note]}>{'VIN : '+ row.vin}</Text>
                                    </View>
                                    <View style={[estyle.fxCenter, estyle.paddingHorizontal]}>
                                         {
                                            (()=>{
                                                if(row.status == 0){
                                                    return <Button onPress={this.nextStep.bind(this,'add')}>添加</Button>;
//                                                    return <Button onPress={this.nextStep.bind(this,'add')} style={[styles.size, styles.btn, {borderColor: 'rgb(255,156,0)'}]}><Text style={[estyle.note, {color:'rgb(255,156,0)'}]}>添加</Text></Button>
                                                }else if(row.status == 1){
                                                    return <Button onPress={this.nextStep.bind(this,'forback')} style={[{borderWidth:0}]}>已添加</Button>;
{/*
                                                    <View style={[estyle.fxCenter, styles.size, {borderColor:Env.color.main}]}><Text style={[estyle.note, {color:Env.color.main}]}>已添加</Text></View>
*/}
                                                }else {
{/*
                                                    return <Button onPress={this.nextStep.bind(this,'forback')} style={[styles.size, styles.btn, {borderColor:'rgb(255,30,30)'}]}><Text style={[estyle.note, {color:'rgb(255,30,30)'}]}>去找回</Text></Button>
*/}
                                                    return <Button color="#ff0000" onPress={this.nextStep.bind(this,'forback')}>去找回</Button>;

                                                }
                                            })()
                                         }
                                    </View>
                                </View>
                        return dom;       

					}}
                    fetchData={(pageNumber, pageSize) => {
						return getCarList(this.state.carInfo)
					}}
                    reInitField={[this.state.date]}
                />
            </View>
        );
    }
}
