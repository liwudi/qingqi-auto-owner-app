/**
 * Created by ligj on 2016/9/23.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet
} from 'react-native';

import { UserActions } from '../../../actions/index';
import Toast from '../../../components/Toast';
import TopBanner from '../../../components/TopBanner';
import LabelInput from '../../../components/LabelInput';
import SubmitButton from '../../../components/SubmitButton';
import { modifyUserInfo } from '../../../services/UserService';
import HomeRouter from '../../HomeRouter';

class ModifyTrueName extends Component {
	constructor(props){
		super(props);
		this.userInfo = props.userStore.userInfo;
        this.state = {
            doing: false
        };
	}

	componentWillReceiveProps(nextProps){
		this.userInfo = nextProps.userStore.userInfo;
	}

	static Validate = LabelInput.Validate;
	validate = (isShowTip = true) => this.refs.textInput.validate(isShowTip);

    componentWillMount() {
        this.setState({name: this.userInfo.name});
    }
	onSave() {
		if (LabelInput.Validate(this.refs)) {
		    if(this.userInfo.name === this.state.name) {
                this.props.router.pop();
		        return;
            }
            this.setState({doing: true});
			modifyUserInfo(this.state.name).then(()=>{
				this.props.dispatch(UserActions.getUserDetail());
                Toast.show('姓名保存成功', Toast.SHORT);
                setTimeout(() => {
                    this.toPage();
                },1000);
            }).catch((e)=>{
                Toast.show(e.message, Toast.SHORT);
            }).finally(()=>{
                this.setState({doing: false});
            });
		}
	}
	toPage() {
		if(this.props.router.navigator.getCurrentRoutes().length === 1) {
			this.props.router.resetTo(HomeRouter);
		} else {
			this.props.router.pop();
		}
	}
	render() {
		return (
			<View style={[estyle.containerBackgroundColor, estyle.fx1]}>
				<TopBanner {...this.props} title="设置姓名" doBack={() => {
					Toast.show('请输入姓名', Toast.SHORT);
				}}/>
                <View  style={[estyle.fxRowCenter]}>
					<LabelInput
						ref="name"
						style={[estyle.marginTop, estyle.borderBottom]}
						onChangeText={name => {
							this.setState({name});
						}}
						defaultValue={this.userInfo.name}
						secureTextEntry={true}
						placeholder='请输入姓名'
						label="姓名"
						validates={[
							{require:true, msg: '请输入姓名'}
						]}
						maxLength={14}
					/>
					<View style={[estyle.marginBottom, estyle.fxRow, estyle.paddingHorizontal]}>
						<Text style={[estyle.note, estyle.fx1, {textAlign:'left'}]}>最长7个汉字，或14个字节</Text>
					</View>
					<SubmitButton size="large"
								  doing={this.state.doing}
                                   onPress={() => this.onSave()}>保存</SubmitButton>
				</View>
			</View>
		);
	}
}


export default connect(function(stores) {
	return { userStore: stores.userStore }
})(ModifyTrueName);