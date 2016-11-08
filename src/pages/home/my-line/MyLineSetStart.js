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
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Toast from '../../../components/Toast';
import {modifyRoute,routeInfo} from '../../../services/LineService';

export default class MyLineSetStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start: {
				startPointName:'沈阳',
				startCityCode:'1',
				startPointPos:'1',
				startPointDes:'沈阳'
			}
		};
	}

	save() {
		if (this.props.edit) {
			let opts={};
			let routeId = this.props.routeId;
			routeInfo(routeId)
				.then((data)=>{
					opts = data;
					console.log(opts)
					opts.routeId = routeId;
					opts.startPointName = this.state.start.startPointName;
					opts.startCityCode = this.state.start.startCityCode;
					opts.startPointPos = this.state.start.startPointPos;
					opts.startPointDes = this.state.start.startPointDes;
					modifyRoute(opts)
						.then(()=>{
							Toast.show('设置成功', Toast.SHORT);
							this.props.router.pop({startPointName: opts.startPointName});
						})
						.catch((e)=>{
							Toast.show(e.message, Toast.SHORT);
						})
				})
				.catch((e)=>{
					Toast.show(e.message, Toast.SHORT);
				})
		} else {
			this.props.router.pop({
				startPointName: this.state.start.startPointName,
				startCityCode: this.state.start.startCityCode,
				startPointPos: this.state.start.startPointPos,
				startPointDes: this.state.start.startPointDes
			});
		}
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
				<ViewForRightArrow onPress={() => {this.save()}}>
					<Text>沈阳</Text>
				</ViewForRightArrow>
			</View>
		);
	}
}