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
			maxSpeed: ''
		};
	}
	save() {
		let opts={};
		routeInfo(this.props.routeId)
			.then((data)=>{
				opts = data;
				opts.routeId = this.props.routeId;
				opts.maxSpeed =this.state.maxSpeed;
				modifyRoute(opts)
					.then(()=>{
						Toast.show('设置成功', Toast.SHORT);
						this.props.router.pop({maxSpeed:this.state.maxSpeed + 'Km/h'});
					})
					.catch((e)=>{
						Toast.show(e.message, Toast.SHORT);
					})
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
	}
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="设置最高车速"/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='输入最高车速'
					ref="maxSpeed"
					onChangeText={maxSpeed => this.setState({maxSpeed:maxSpeed})}/>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small" onPress={this.save.bind(this)}>保存</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}