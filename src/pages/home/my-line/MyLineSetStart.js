/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View
} from 'react-native';
import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import LabelInput  from '../../../components/LabelInput';
import ConfirmButton from '../../../components/ConfirmButton';

export default class MyLineSetStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start: {
				startPointName:'',
				startCityCode:'',
				startPointPos:'',
				startPointDes:''
			}
		};
	}

	save() {
		this.props.router.pop({
			startPointName: this.state.start.startPointName,
			startCityCode: this.state.start.startCityCode,
			startPointPos: this.state.start.startPointPos,
			startPointDes: this.state.start.startPointDes
		});
	}

	render() {
		return (
			<View>
				<TopBanner {...this.props} title="设置起点"/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='输入城市名称'
					ref="start"
					onChangeText={start => this.setState({start:{startPointName:start,startCityCode:'1',startPointPos:'1',startPointDes:'起点'}})}/>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small" onPress={this.save.bind(this)}>保存</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}