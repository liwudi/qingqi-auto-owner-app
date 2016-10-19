/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/19
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
	StyleSheet,
	Image
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import LabelInput from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';
import * as Icons from '../../../components/Icons';
const estyle = Env.style;
export default class MyDriverAdd extends Component {
	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="添加司机"/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='请输入司机姓名'
						label="姓名"
						labelSize="3"
					/>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='请填写司机手机号'
						label="电话"
						labelSize="3"
					/>
					<ConfirmButton style={[estyle.marginVertical]} size="large" onPress={() => this.onLogin()}><Text>保存</Text></ConfirmButton>
					<View style ={[estyle.fxRow,estyle.padding]}>
						<View>
							<Image
								style={{borderRadius:100,width:60,height:60,borderWidth:4 * Env.font.base,
									borderColor:'#85C7E7',}}
								source={require('../../../assets/images/icon-1.png')}
							/>
						</View>
						<View style = {{flex:1}}>
							<View style={{justifyContent:'center',marginLeft:20 * Env.font.base,flex:1}}>
								<Text style={[styles.textBlue,styles.colorFFF]}>手机联系人</Text>
								<Text style={[styles.note,styles.colorFFF]}>添加手机通讯录中的司机</Text>
							</View>
						</View>
						<View style={[estyle.padding,estyle.fxRow]}><Icons.IconUser /><Text style={styles.noteBlue}>推荐</Text></View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	},
	text:{
		fontSize:Env.font.text,
		color:Env.color.text
	},
	textBlue:{
		fontSize:Env.font.text,
		color:Env.color.main
	},
	note:{
		fontSize:Env.font.note,
		color:Env.color.note
	},
	noteBlue:{
		fontSize:Env.font.note,
		color:Env.color.main
	}
});