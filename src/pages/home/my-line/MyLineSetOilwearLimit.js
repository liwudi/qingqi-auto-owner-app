/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import LabelInput  from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';
import Toast from '../../../components/Toast';
import {modifyRoute,routeInfo} from '../../../services/LineService';

export default class MyLineSetOilwearLimit extends Component {
	constructor(props) {
		super(props);
		this.state = {
            oilwearLimit: props.oilwearLimit
		};
	}
	save() {
        if(!/^[\d.]+$/.test(this.state.oilwearLimit) || +this.state.oilwearLimit > 999999){
            Toast.show('总油耗需在于0-999999之间', Toast.SHORT);
            return;
        }
        this.props.submit((+this.state.oilwearLimit).toFixed(1));
        this.props.router.pop();
	}
	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="设置总油耗"/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='输入总油耗限制'
						ref="oilwearLimit"
						keyboardType="numeric"
						maxLength={10}
						defaultValue={this.props.oilwearLimit}
						onChangeText={oilwearLimit => this.setState({oilwearLimit})}/>
					<View style={[estyle.marginBottom, estyle.fxRow, estyle.paddingHorizontal]}>
						<Text style={[estyle.note, estyle.fx1]}>&nbsp;</Text>
					</View>
					<ConfirmButton size="large" onPress={this.save.bind(this)}>保存</ConfirmButton>
				</View>
			</View>
		);
	}
}