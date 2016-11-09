/**
 * Created by yaocy on 2016/11/2.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	ListView,
	RefreshControl,
	TouchableOpacity
} from 'react-native';
import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';
import LabelInput  from '../../../components/LabelInput';
import ListItem from '../../../components/ListItem';
import ConfirmButton from '../../../components/ConfirmButton';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Toast from '../../../components/Toast';
import {modifyRoute,routeInfo, queryCity} from '../../../services/LineService';
export default class SettingStName extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			data:[],
			searchKey: ''
		};
	}

	save(item) {
		if (this.props.edit) {
			let opts={};
			let routeId = this.props.routeId;
			routeInfo(routeId)
				.then((data)=>{
					opts = data;
					console.log(opts)
					opts.routeId = routeId;
					opts.startPointName = item.cname;
					opts.startCityCode = item.cid;
					opts.startPointPos = '1';
					opts.startPointDes = item.cname;
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
				startPointName: item.cname,
				startCityCode: item.cid,
				startPointPos: '1',
				startPointDes: item.cname
			});
		}
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
			return <TouchableOpacity>
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
				<TopBanner {...this.props} title='设置起点'/>
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
		)
	}
}