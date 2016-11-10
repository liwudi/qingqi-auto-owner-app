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
import Toast from '../../../components/Toast';
import {modifyRoute,routeInfo, queryCity} from '../../../services/LineService';
export default class SettingStName extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			isRefreshing: false,
			ds,
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
				this.setState({
					ds: this.state.ds.cloneWithRows(data)
				});
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

	renderList(row) {
		return <View>
			<View style={[estyle.padding]}>
				<Text style={estyle.text}>{row.fletter}</Text>
			</View>
			{this.listItem(row.subList)}
		</View>
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
				<ListView style={estyle.fx1}
						  refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={Env.refreshCircle.colors}
                                    progressBackgroundColor={Env.refreshCircle.bg}
                                />
                            }
						  dataSource={this.state.ds}
						  renderRow={(row) => this.renderList(row)}
				/>
			</View>
		)
	}
}