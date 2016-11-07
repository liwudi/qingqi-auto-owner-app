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

export default class MyLineSetPass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passbyPoints: ''
		};
	}
	save() {
		let opts={};
		routeInfo(this.props.routeId)
			.then((data)=>{
				opts = data;
				opts.routeId = this.props.routeId;
				opts.passbyPoints = [{"point_name": '\"'+this.state.passbyPoints + '\"',"city_code":"021","point_pos":"路过1_pos","point_des":"路过1_des","radius":"100"}]
				modifyRoute(opts)
					.then(()=>{
						Toast.show('添加成功', Toast.SHORT);
						this.props.router.pop({pass:this.state.passbyPoints});
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
				<TopBanner {...this.props} title="设置途经点"/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='输入城市名称'
					ref="passbyPoints"
					onChangeText={passbyPoints => this.setState({passbyPoints:passbyPoints})}/>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small" onPress={this.save.bind(this)}>保存</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}