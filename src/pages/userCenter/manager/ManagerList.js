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
import { IconPlus } from "../../../components/Icons";
import ManagerEdit from "./ManagerEdit";
import ManagerAdd from "./ManagerAdd";
import {getManagerList} from "../../../services/MotorcadeManagerService";

const estyle = Env.style;

export default class ManagerList extends Component {

	/**
	 * 跳转到添加页面
	 */
	toAddPage () {
		this.props.router.push(ManagerAdd,{
			refresh: () => {
                this.refs.list.reInitFetch()
            }
        });
	}

	/**
	 * 跳转到编辑页面
	 */
	toEditPage (props) {
		this.props.router.push(ManagerEdit, {
            nav: props,
			refresh: () => {
				this.refs.list.reInitFetch()
			}
		});
	}

	render() {
		const topRightView= () => {
			return (
				<TouchableOpacity style={{marginRight:Env.font.base * 10}} onPress={() => {this.toAddPage()}}>
					<IconPlus color="#FFF" size={Env.font.base * 40}/>
				</TouchableOpacity>
			)
		};
		return (
			<View style={[estyle.fx1, estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="车队管理员" rightView={ topRightView()}/>
				<PageList
					ref="list"
					style = {estyle.fx1}
					renderRow = {
						(row) => {
							return (
								<TouchableOpacity onPress={() => this.toEditPage(row)} style={[estyle.borderBottom, estyle.cardBackgroundColor]}>
									<View style={[estyle.margin, estyle.fxRow]}>
										<Text style={[estyle.text, {textAlign: 'left'}]}>{row.name}</Text>
										<Text style={[estyle.fx1,estyle.text,{textAlign: 'right', color: Env.color.note}]}>{row.phone}</Text>
										<Text style={[estyle.note,estyle.marginLeft]}>{row.registerStatus == 1 ? '已添加' : '未使用'}</Text>
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