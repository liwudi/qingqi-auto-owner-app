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

export default class MyLineSetMaxSpeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maxSpeed: this.props.maxSpeed || '0'
		};
	}
	save() {
		this.props.submit(this.state.maxSpeed);
		this.props.router.pop();
	}
	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="设置最高车速"/>
				<View  style={[estyle.fxRowCenter]}>
					<LabelInput
						style = {[estyle.borderBottom]}
						placeholder='输入最高车速'
						ref="maxSpeed"
						defaultValue={this.props.maxSpeed || '0'}
						onChangeText={maxSpeed => this.setState({maxSpeed:maxSpeed})}/>
					<View style={[estyle.marginBottom, estyle.fxRow, estyle.paddingHorizontal]}>
						<Text style={[estyle.note, estyle.fx1]}>&nbsp;</Text>
					</View>
					<ConfirmButton size="large" onPress={this.save.bind(this)}>保存</ConfirmButton>
				</View>
			</View>
		);
	}
}