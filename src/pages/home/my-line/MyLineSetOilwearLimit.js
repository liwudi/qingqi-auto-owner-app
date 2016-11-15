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
			oilwearLimit: ''
		};
	}
	save() {
        this.props.submit(this.state.oilwearLimit);
        this.props.router.pop();
	}
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="设置总油耗"/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='输入总油耗限制'
					ref="oilwearLimit"
					onChangeText={oilwearLimit => this.setState({oilwearLimit:oilwearLimit})}/>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small" onPress={this.save.bind(this)}>保存</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}