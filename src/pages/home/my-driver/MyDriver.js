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
import ConfirmButton from '../../../components/ConfirmButton';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import PageList from '../../../components/PageList';
import Env from '../../../utils/Env';
import {queryDriver} from '../../../services/MyDriverService';
import Item from './components/MyDriverItem';
import NoDriver from './components/NoDriver';
import MyDriverAdd from './MyDriverAdd';
import * as Icons from '../../../components/Icons';
import LabelInput from '../../../components/LabelInput';

const estyle = Env.style;
export default class MyDriver extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing : false,
			isSearch : false,
			// driverId : '',
			// name: '',
			// phone: '',
			keyWord: ''
		};
	}

	finaliy() {
		this.setState({isRefreshing: false});
		this.setState({isSearch: false});
	}

	fetchData() {
		this.setState({isRefreshing: true});
		queryDriver(null,null,this.state.keyWord)
			.then((data)=>{
				console.info('--------------------')
				console.info(data)
				this.setState({data});}
			)
			.catch(()=>{
				this.finaliy();
			})
			.finally(()=>{
				this.finaliy();
			});
	};

	onRefresh() {
		this.fetchData();
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
		this.fetchData();
		this.setState({keyWord: ''});
	}

	componentWillMount() {
		this.fetchData();
	}

	addDriver() {
		this.props.router.push(MyDriverAdd);
	}

	//加载Item，司机列表
	itemList(dtoList){
		return dtoList.map((item, idx) => {
			return <Item router={this.props.router} data={item}/>;
		})
	}

	//加载字母View
	renderList() {
		let data = this.state.data;
		return data.list.map((item, idx) => {
			return <View>
				<View style={[estyle.padding]}>
					<Text style={estyle.text}>{item.key}</Text>
				</View>
				{this.itemList(item.dtoList)}
			</View>
		})
	}

	renderView() {
		if(this.state.data) {
			return this.state.data.list.length ? this.renderList() : <NoDriver/>;
		}
		return <View/>;
	}

	renderSearchView() {
		if(this.state.isSearch) {
			return <ViewForRightArrow rightIcon={Icons.IconSearch} onPress={this.doSearch.bind(this)}>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='请输入司机姓名或手机号'
					label="搜索"
					labelSize="3"
					ref="keyWord"
					onChangeText={keyWord => this.setState({keyWord})}/>
			</ViewForRightArrow>;
		}
	}

	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner 
					{...this.props} 
					title="我的司机" 
					rightView={(<Icons.IconSearch color='#FFF' onPress={this.onSearch.bind(this)}/>)}
				/>
				{this.renderSearchView()}
				<View style={[estyle.fx1]}>
					<PageList
						style={estyle.fx1}
						renderRow={(row) => {
							return <View>
										<View style={[estyle.padding]}>
											<Text style={estyle.text}>{row.key}</Text>
										</View>
										{this.itemList(row.dtoList)}
									</View>
						}}
						fetchData={(pageNumber, pageSize) => {
							return queryDriver(pageNumber,pageSize,this.state.keyWord)
						}}
					/>
					
				</View>
				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small" onPress={this.addDriver.bind(this)}>添加司机</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}