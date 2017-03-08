/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 * Edit by wangyang  on 2016/11/3
 *
 * 我的司机编辑
 */
import React, {Component} from "react";
import {Text, View, TextInput, Alert, TouchableOpacity} from "react-native";
import Env from "../../../utils/Env";
import TopBanner from "../../../components/TopBanner";
import LabelInput from "../../../components/LabelInput";
import SubmitButton from "../../../components/SubmitButton";
import { IconTrash } from '../../../components/Icons';
import PhoneInput from '../../../components/Inputs/Phone';
import Toast from '../../../components/Toast';
import {modifyDriver, deleteDriver} from "../../../services/MyDriverService";

const getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
}

const estyle = Env.style;

export default class MyDriverEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
			...this.props.nav
		};
    }

	componentDidMount() {
        if (this.state.registerStatus === 1) {
            this.props.alert("提示", `用户【${this.props.nav.name}】已经注册为APP用户，不可以编辑`);
        }
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
                    Toast.show('删除成功', Toast.SHORT);
                    setTimeout(() => {
                        this.toListPage();
                    },1000);
                }
            )
            .catch(
                (reason) => {
                    Toast.show(reason.message, Toast.SHORT);
                }
            );
    }
	/**
	 * 移除xxx司机
	 */
	delete () {
        this.props.alert('提示',
			`是否从车队中删除【${this.props.nav.name}】司机？`,
			[
				{text: '确定', onPress: this._delete.bind(this)},
				{text: '取消'}
			]
		);
	}

    call () {
        this.props.callTo(this.state.phone);
    }

	_modify(){
        if (LabelInput.Validate(this.refs)) {

            if(getBLen(this.state.name) > 14){
                Toast.show('姓名不能超过7个汉字或14个字符', Toast.SHORT);
                return;
            }

            this.setState({doing: true});
            modifyDriver(this.state, this.props.nav.phone)
                .then(() => {
                    Toast.show('保存成功', Toast.SHORT);
                    setTimeout(() => {
                        this.toListPage();
                    }, 1000);
                })
                .catch((reason) => {
                    Toast.show(reason.message, Toast.SHORT);
                    this.setState({doing: false});
                });
        }
    }

	/**
	 * 修改xxx司机
	 */
	modify () {
		if (this.state.registerStatus === 1) {
            this.props.alert("提示", `用户【${this.props.nav.name}】已经注册为APP用户，不可以编辑`);
			return;
		}
		if (!PhoneInput.Validate(this.refs)) {
			return;
		}
		this.props.alert('提示',
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
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="编辑司机"
				   rightView={
					   <TouchableOpacity style={estyle.topBtn} onPress={() => this.delete()}>
						   <IconTrash color="#FFF" size={Env.font.base * 40}/>
					   </TouchableOpacity>
				   }
				/>
				<View  style={[estyle.fxRowCenter]}>
                    <LabelInput
                        style = {[estyle.borderBottom]}
                        placeholder='请输入司机姓名'
                        label="姓名"
                        labelSize="3"
                        ref="name"
						maxLength={14}
                        defaultValue={this.state.name}
                        onChangeText={name => this.setState({name})}
                        validates={[{require:true, msg:"请输入司机姓名。"}]}
						editable={this.state.registerStatus !== 1}
					/>
                    <PhoneInput
                        style = {[estyle.borderBottom]}
                        placeholder='请填写司机手机号'
                        label="电话"
                        labelSize="3"
                        defaultValue={this.state.phone}
                        ref="phone"
                        onChangeText={phone => this.setState({phone})}
						require={true}
						editable={this.state.registerStatus !== 1}
                    />
					<View style={[estyle.paddingVertical,estyle.fxRow]} >
						<SubmitButton size="middle" style={[estyle.marginRight]} onPress={() => this.call()}>呼叫</SubmitButton>
						<SubmitButton size="middle" doing={this.state.doing} onPress={() => this.modify()}><Text>保存</Text></SubmitButton>
					</View>
				</View>
			</View>
		);
	}
}