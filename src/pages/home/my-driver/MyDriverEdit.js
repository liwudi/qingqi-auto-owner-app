/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 * Edit by wangyang  on 2016/11/3
 *
 * 我的司机编辑
 */
import React, {Component} from "react";
import {Text, View, TextInput, ToastAndroid, Alert, TouchableOpacity} from "react-native";
import Env from "../../../utils/Env";
import TopBanner from "../../../components/TopBanner";
import LabelInput from "../../../components/LabelInput";
import SubmitButton from "../../../components/SubmitButton";
import PhoneInput from "../../../components/Inputs/Phone";
import { IconTrash } from '../../../components/Icons';

import {modifyDriver, deleteDriver} from "../../../services/MyDriverService";

const estyle = Env.style;

export default class MyDriverEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
			...this.props.nav
		};
    }

	componentDidMount() {
	}

	/**
	 * 跳转到列表页面
	 */
	toListPage () {
		this.props.refresh();
		this.props.router.pop();
	}


	_delete(){
        deleteDriver(this.props.nav.phone)
            .then(
                () => {
                    ToastAndroid.show('删除成功', ToastAndroid.SHORT);
                    setTimeout(() => {
                        this.toListPage();
                    },1000);
                }
            )
            .catch(
                (reason) => {
                    ToastAndroid.show(reason.message, ToastAndroid.SHORT);
                }
            );
    }
	/**
	 * 移除xxx司机
	 */
	delete () {
		Alert.alert('提示',
			`是否从车队中删除【${this.props.nav.name}】司机？`,
			[
				{text: '确定', onPress: this._delete.bind(this)},
				{text: '取消'}
			]
		);
	}

	call () {
		Alert.alert("提示", `【todo】呼叫${this.state.phone}`);
	}

	_modify(){
        modifyDriver(this.state, this.props.nav.phone)
            .then(() => {
                ToastAndroid.show('保存成功', ToastAndroid.SHORT);
                setTimeout(() => {
                    this.toListPage();
                },1000);
            })
            .catch((reason) => {
                ToastAndroid.show(reason.message, ToastAndroid.SHORT);
            });
    }

	/**
	 * 修改xxx司机
	 */
	modify () {
		if (this.state.registerStatus === 1) {
			Alert.alert("提示", `用户【${this.state.name}】已经注册为APP用户，不可以编辑`);
			return;
		}
		if (!PhoneInput.Validate(this.refs)) {
			return;
		}
		Alert.alert('提示',
			`是否保存？`,
			[
				{text: '确定',
					onPress: this._modify.bind(this)
				},
				{text: '取消'}
			]
		);
	}

	render() {
		return (
			<View>
				<TopBanner {...this.props} title="编辑司机"
				   rightView={<IconTrash onPress={() => this.delete()}
										 color="#FFF" size={Env.font.base * 36} />}
				/>
				<View  style={[estyle.fxRowCenter]}>
                    <LabelInput
                        style = {[estyle.borderBottom]}
                        placeholder='请输入司机姓名'
                        label="姓名"
                        labelSize="3"
                        ref="name"
                        defaultValue={this.state.name}
                        onChangeText={name => this.setState({name})}
                        validates={[{require:true, msg:"请输入司机姓名。"}]}
                    />
                    <LabelInput
                        style = {[estyle.borderBottom]}
                        placeholder='请填写司机手机号'
                        label="电话"
                        labelSize="3"
                        defaultValue={this.state.phone}
                        ref="phone"
                        onChangeText={phone => this.setState({phone})}
                        validates={[{require:true, msg:"请填写司机手机号。"}]}
                    />
					<View style={[estyle.paddingVertical]} >
						<SubmitButton onPress={() => this.modify()}><Text>保存</Text></SubmitButton>
					</View>
				</View>
			</View>
		);
	}
}