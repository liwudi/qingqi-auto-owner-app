/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	RefreshControl,
	TouchableOpacity
} from 'react-native';
import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import LabelInput  from '../../../components/LabelInput';
import ListItem from '../../../components/ListItem';
import Toast from '../../../components/Toast';
import {modifyRoute,routeInfo,queryCity} from '../../../services/LineService';

export default class MyLineSetPass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			data:[],
			searchKey: ''
		};
	}

	save(item) {
		let opts={};
		let arry= this.props.pass || [];
		arry.push({pointName:item.cname,cityCode:item.cid,pointPos:'1',pointDes:item.cname,radius:'100'})
		// opts.passbyPoints = "[{\"point_name\": '\"'"+ item.cname + "'\"',\"city_code\":'\"'" + item.cid + "'\"',\"point_pos\":\"1\",\"point_des\":\"" + item.cname + "\",\"radius\":\"100\"}]";
		// opts.passbyPoints = arry;
		// this.props.router.pop({pass:opts.passbyPoints,routeId:'1'});
		routeInfo(this.props.routeId)
			.then((data)=>{
				opts = data;
				opts.routeId = this.props.routeId;
				opts.passbyPoints = JSON.stringify(arry);
				modifyRoute(opts)
					.then(()=>{
						Toast.show('添加成功', Toast.SHORT);
						this.props.router.pop({pass:arry});
					})
					.catch((e)=>{
						Toast.show(e.message, Toast.SHORT);
					})
			})
			.catch((e)=>{
				Toast.show(e.message, Toast.SHORT);
			})
	}

	finaliy() {
		this.setState({isRefreshing: false});
	}

	fetchData() {
		this.setState({isRefreshing: true});
		queryCity(this.state.searchKey)
			.then((data)=>{
				this.setState({data:data});
				console.log(this.state.data)
			})
			.catch(this.finaliy.bind(this))
			.finally(this.finaliy.bind(this));
	};

	componentWillMount() {
		this.fetchData();
	}

	onRefresh() {
		this.fetchData();
	}

	listItem(subList) {
		return subList.map((item, idx) => {
			return <TouchableOpacity onPress={() => {
                            this.save(item);
                        }}>
				<ListItem left={item.cname}/>
			</TouchableOpacity>
		})
	}

	renderList() {
		let data = this.state.data;
		return data.map((item, idx) => {
			return <View>
				<View style={[estyle.padding]}>
					<Text style={estyle.text}>{item.fletter}</Text>
				</View>
				{this.listItem(item.subList)}
			</View>
		})

	}

	render() {
		return (
			<View style={estyle.fx1}>
				<TopBanner {...this.props} title="设置途经点"/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='输入城市名称'
					ref="searchKey"
					onChangeText={searchKey => {this.setState({searchKey:searchKey});this.onRefresh()}}/>
				<ScrollView style={estyle.fx1}
							refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={Env.refreshCircle.colors}
                                    progressBackgroundColor={Env.refreshCircle.bg}
                                />
                            }>
					{this.renderList()}
				</ScrollView>
			</View>
		);
	}
}