/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou 2016/10/18
 * Edit by wangyang 2016/10/31
 *
 * 车队管理员添加
 */
import React, {Component} from "react";
import {Text, View, TextInput, ToastAndroid, Image, Alert, ListView, RefreshControl} from "react-native";
import Env from "../../../utils/Env";
import TopBanner from "../../../components/TopBanner";
import PhoneInput from "../../../components/Inputs/Phone";
import ManagerList from "./ManagerList";
import {addManager} from "../../../services/MotorcadeManagerService";

import { getContacts } from '../../../components/Contacts';

import ListTitle from '../../../components/ListTitle';
import BorderButton from '../../../components/BorderButton';

const estyle = Env.style;

export default class ManagerAddForContacts extends Component {

	constructor(props){
		super(props);

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2
		});

		this.state = {
			ds,
			refreshing: true
		}
	}

	componentDidMount(){
		setTimeout(() => {
			getContacts().then(rs => {
				this.setState({
					ds : this.state.ds.cloneWithRowsAndSections(rs),
					refreshing:false
				})
			}).catch(e => {
				console.log(e);
				this.setState({
					refreshing:false
				})
			});
		},400);
	}

	/**
	 * 跳转到列表页面
	 */
	toListPage() {
		this.props.router.replace(ManagerList);
	}

	submit() {
		if (!PhoneInput.Validate(this.refs)) {
			return;
		}
		Alert.alert('提示',
			'是否添加这个管理员？',
			[
				{text: '确定',
					onPress: () => {
						addManager(this.state)
							.then(() => {
								ToastAndroid.show('添加成功', ToastAndroid.SHORT);
								setTimeout(() => {
									this.toListPage();
								},1000);
							})
							.catch((reason) => {
								ToastAndroid.show(reason.message, ToastAndroid.SHORT);
							})
					}
				},
				{text: '取消'}
			]);
	}

	render() {
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="选择联系人"/>
				<ListView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
							colors={Env.refreshCircle.colors}
							progressBackgroundColor={Env.refreshCircle.bg}
						/>
					}
					dataSource={this.state.ds}
					renderSectionHeader={(sectionData, sectionId) => {
						return <ListTitle title={sectionId}/>
					}}
					renderRow={(row) => {
						return (
							<View style={[estyle.borderBottom, estyle.cardBackgroundColor, this.props.style]}>
								<View style={[estyle.margin, estyle.fxRow]}>
									<Text style={[estyle.text, {textAlign: 'left'}]}>{row.name}</Text>
									<Text style={[estyle.fx1,estyle.text,{textAlign: 'right', color: Env.color.note}]}>{row.phoneNumbers.join(',')}</Text>
									<BorderButton style={{marginLeft:10 * Env.font.base}}>选择</BorderButton>
								</View>
							</View>
						)
					}}
				/>
			</View>
		);
	}
}