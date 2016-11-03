/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou  on 2016/10/19
 * Edit by wangyang  on 2016/10/31
 *
 * 车队管理员列表
 */

import React, {Component} from "react";
import {Text, View, TouchableOpacity, ToastAndroid, Image} from "react-native";
import Env from "../../../utils/Env";
import PageList from "../../../components/PageList";
import TopBanner from "../../../components/TopBanner";
import * as Icons from "../../../components/Icons";
import ManagerEdit from "./ManagerEdit";
import ManagerAdd from "./ManagerAdd";
import {getManagerList} from "../../../services/MotorcadeManagerService";

const estyle = Env.style;

export default class ManagerList extends Component {

	/**
	 * 跳转到添加页面
	 */
	toAddPage () {
		this.props.router.push(ManagerAdd);
	}

	/**
	 * 跳转到编辑页面
	 */
	toEditPage (props) {
		this.props.router.push(ManagerEdit, props);
	}

	render() {
		const topRightView= () => {
			return (
				<View>
					{/*<Icons.IconPlus/>*/}
					<Icons.IconUser onPress={() => {this.toAddPage()}}>新增</Icons.IconUser>
				</View>
			)
		};
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="管理员列表" rightView={ topRightView()}/>
				<PageList
					style = {estyle.fx1}
					renderRow = {
						(row) => {
							return (
								<TouchableOpacity onPress={() => this.toEditPage(row)}>
									<View style = {[estyle.fxRow,estyle.borderBottom,estyle.padding]} >
										<Image
											style={{borderRadius:100,width:25,height:25,borderWidth:4 * Env.font.base, borderColor:'#85C7E7',}}
											source={require('../../../assets/images/icon-1.png')}
										/>
										<Text style = {[estyle.text,estyle.paddingLeft]}>{row.name}</Text>
										<Text style = {[estyle.paddingLeft,{flex:1}]}>{row.phone}</Text>
										<Text style = {[estyle.note,{color:Env.color.auxiliary}]}>{row.registerStatus===1 ? '已添加' : '未使用'}</Text>
									</View>
								</TouchableOpacity>
							)
						}
					}
					fetchData = {
						(pageNumber, pageSize) => getManagerList(null, pageNumber, pageSize)
					}
				/>
			</View>
		);
	}
}