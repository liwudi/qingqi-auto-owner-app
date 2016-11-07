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
import {modifyRoute} from '../../../services/LineService';

export default class MyLineSetPass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passbyPoints: ''
		};
	}
	save() {
		modifyRoute({routeId:this.props.routeId, passbyPoints:this.state.passbyPoints})
			.then(()=>{
				Toast.show('添加成功', Toast.SHORT);
				this.props.router.pop({line:this.props.routeId});
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
	}
	render() {
		return (
			<View>
				<TopBanner {...this.props} title="设置起点"/>
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