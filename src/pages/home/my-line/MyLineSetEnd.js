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
import Toast from '../../../components/Toast';
import {addRoute} from '../../../services/LineService';

export default class MyLineSetStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start: {
				startPointName:'',
				startCityCode:'',
				startPointPos:'',
				startPointDes:''
			},
			end: {
				endPointName:'',
				endCityCode:'',
				endPointPos:'',
				endPointDes:''
			}
		};
	}

	save() {
		let opts = {
			startPointName: this.props.start.startPointName,
			startCityCode: this.props.start.startCityCode,
			startPointPos: this.props.start.startPointPos,
			startPointDes: this.props.start.startPointDes,
			endPointName: this.state.end.endPointName,
			endCityCode: this.state.end.endCityCode,
			endPointPos: this.state.end.endPointPos,
			endPointDes: this.state.end.endPointDes
		};
		addRoute(opts)
			.then((data)=>{
				console.log(data)
				Toast.show('添加成功', Toast.SHORT);
				this.props.router.pop({routeId:data.routeId,endPointName: opts.endPointName});
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
		// this.props.router.pop({end:this.state.end});
	}

	render() {
		return (
			<View>
				<TopBanner {...this.props} title="设置终点"/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='输入城市名称'
					ref="end"
					onChangeText={end => this.setState({end:{endPointName:end,endCityCode:'2',endPointPos:'2',endPointDes:'终点'}})}/>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small" onPress={this.save.bind(this)}>保存</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}