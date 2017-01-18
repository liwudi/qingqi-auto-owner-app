/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 * Edit by yaocy on 2016/10/31
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    Platform
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import LabelInput from '../../../components/LabelInput';
import SubmitButton from '../../../components/SubmitButton';
import * as Icons from '../../../components/Icons';
import {addDriver} from '../../../services/MyDriverService';
import SelectForContacts from '../../contacts/SelectForContacts';
import PhoneInput from '../../../components/Inputs/Phone';
import { getContacts } from '../../../components/Contacts';

import Toast from '../../../components/Toast';

const getBLen = function (str) {
    if (str == null) return 0;
    if (typeof str != "string") {
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
}

const estyle = Env.style;
export default class MyDriverAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            doing: false
        };
    }

    static Validate = LabelInput.Validate;
    validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    addDriver() {
        if (LabelInput.Validate(this.refs)) {

            if (getBLen(this.state.name) > 14) {
                Toast.show('姓名不能超过7个汉字或14个字符', Toast.SHORT);
                return;
            }

            this.setState({doing: true});
            addDriver(this.state)
                .then(() => {
                    Toast.show('添加成功', Toast.SHORT);
                    this.timer = setTimeout(() => {
                        this.props.refresh();
                        this.props.router.pop();
                    }, 500)
                })
                .catch((e) => {
                    Toast.show(e.message, Toast.SHORT);
                    this.setState({doing: false});
                })
        }
    }

    /**
     * 组件销毁时调用
     */
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    toAddForContacts() {
        Env.isAndroid ?
            this.props.router.push(SelectForContacts,
                {
                    select: (name, phone) => {
                        this.setState({
                            name, phone
                        })
                    }
                })
            :
            getContacts((name, phone) => {
                this.setState({
                    name, phone
                })
            });
    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="添加司机"/>
                <TouchableOpacity onPress={this.toAddForContacts.bind(this)}
                                  style={[estyle.fxRow,estyle.fxRowCenter,estyle.padding,estyle.cardBackgroundColor]}>
                    <Icons.IconAddressBook color={'#FFB30F'} size={Env.font.base * 60}/>
                    <View style={estyle.fx1}>
                        <View style={{justifyContent:'center',marginLeft:20 * Env.font.base,flex:1}}>
                            <Text style={[{fontSize:Env.font.text, color:Env.color.main}]}>手机联系人</Text>
                            <Text style={[{fontSize:Env.font.note, color:Env.color.note}]}>添加手机通讯录中的司机</Text>
                        </View>
                    </View>
                    <View style={[estyle.padding,estyle.fxRow]}><Icons.IconFire size={Env.font.base * 30}
                                                                                color="red"/><Text
                        style={{fontSize:Env.font.note, color:Env.color.main}}>推荐</Text></View>
                </TouchableOpacity>


                <View style={[estyle.fxRowCenter,estyle.marginTop]}>
                    <LabelInput
                        style={[estyle.borderBottom]}
                        placeholder='请输入司机姓名'
                        label="姓名"
                        value={this.state.name}
                        ref="name"
                        maxLength={14}
                        onChangeText={name => this.setState({name})}
                        validates={[{require:true, msg:"请输入司机姓名。"}]}
                    />
                    <PhoneInput
                        style={[estyle.borderBottom]}
                        placeholder='请填写司机手机号'
                        label="电话"
                        value={this.state.phone}
                        ref="phone"
                        onChangeText={phone => this.setState({phone})}
                        require={true}
                    />
                    <View style={[estyle.fxRow, estyle.padding]}>
                        <Text style={[estyle.text]}>&nbsp;</Text>
                    </View>

                    <View style={[estyle.paddingVertical]}>
                        <SubmitButton doing={this.state.doing} onPress={() => this.addDriver()}>保存</SubmitButton>
                    </View>
                </View>
            </View>
        );
    }
}
