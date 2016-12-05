/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou on 2016/10/25
 * Edit by yaocy on 2016/10/31
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ListTitle from '../../../components/ListTitle';
import Env from '../../../utils/Env';
import {queryDriver} from '../../../services/MyDriverService';
import MyDriverEdit from './MyDriverEdit';
import PageSectionList from '../../../components/PageSectionList';
import MyDriverAdd from './MyDriverAdd';
import { IconPlus, IconSearch } from '../../../components/Icons';
import LabelInput from '../../../components/LabelInput';

const estyle = Env.style;
export default class MyDriver extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSearch : false,
			keyWord: ''
		};
	}

	onSearch() {
		if (this.state.isSearch) {
			this.setState({isSearch:false});
		} else {
			this.setState({isSearch:true});
		}
	}

	doSearch() {
		this.setState({isSearch: false});
	}

	editDriver(data) {
		this.props.router.push(MyDriverEdit,{
			nav:data,
            refresh: () => {
                this.refs.list.reInitFetch();
            }
		});
	}

	addDriver() {
		this.props.router.push(MyDriverAdd);
	}

	renderSearchView() {
		if(this.state.isSearch) {
			return <LabelInput
				style = {[estyle.borderBottom]}
				placeholder='请输入司机姓名或手机号'
				label="搜索"
				labelSize="3"
				ref="keyWord"
				onChangeText={keyWord => this.setState({keyWord:keyWord})}/>;
		}
	}

	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner
					{...this.props}
					title="我的司机"
					rightView={
						<TouchableOpacity
							style={{marginRight:Env.font.base * 10}}
							onPress={() => {
								this.props.router.push(MyDriverAdd, {
									refresh: () => {
										this.refs.list.reInitFetch();
									}
								})
							}}
						>
							<IconPlus color="#FFF" size={Env.font.base * 40}/>
						</TouchableOpacity>
					}
				/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='请输入司机姓名或手机号'
					labelSize="0"
					ref="key"
					rightView={<IconSearch color={Env.color.note}/>}
					onChangeText={(keyWord) => {this.setState({keyWord})}}/>
				<View style={[estyle.fx1]}>
					<PageSectionList
						ref="list"
						style={estyle.fx1}
						reInitField={[this.state.keyWord]}
						getSectionData={(list) => {
							let rs = {};
							list.forEach(item => {
								if(item.key){
									rs[item.key] = item.dtoList || [];
								}
							})
							return rs;
						}}
						renderSectionHeader={(sectionData, sectionId) => {
							return <ListTitle title={sectionId}/>
						}}
						pageSize={1000}
						renderRow={(row) => {
							return (
								<TouchableOpacity onPress={() => this.editDriver(row)} style={[estyle.borderBottom, estyle.cardBackgroundColor, this.props.style]}>
									<View style={[estyle.margin, estyle.fxRow]}>
										<Text style={[estyle.text, {textAlign: 'left'}]}>{row.name}</Text>
										<Text style={[estyle.fx1,estyle.text,{textAlign: 'right', color: Env.color.note}]}>{row.phone}</Text>
										<Text style={[estyle.note,estyle.marginLeft]}>{row.registerStatus == 1 ? '已经注册' : '等待接受'}</Text>
									</View>
								</TouchableOpacity>
							)
						}}
						fetchData={(pageNumber, pageSize) => {
							return queryDriver(pageNumber,pageSize,this.state.keyWord)
						}}
					/>

				</View>
			</View>
		);
	}
}