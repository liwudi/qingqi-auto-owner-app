/**
 * Created by ligj on 2016/10/9.
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
import {addRoute,routeInfo,modifyRoute,queryCity} from '../../../services/LineService';

export default class MyLineSetStart extends Component {
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
					opts.endPointName = item.cname;
					opts.endCityCode = item.cid;
					opts.endPointPos = '1';
					opts.endPointDes = item.cname;
					modifyRoute(opts)
						.then(()=>{
							Toast.show('设置成功', Toast.SHORT);
							this.props.router.pop({endPointName: opts.endPointName});
						})
						.catch((e)=>{
							Toast.show(e.message, Toast.SHORT);
						})
				})
				.catch((e)=>{
					Toast.show(e.message, Toast.SHORT);
				})
		}else {
			let opts = {
				startPointName: this.props.start.startPointName,
				startCityCode: this.props.start.startCityCode,
				startPointPos: this.props.start.startPointPos,
				startPointDes: this.props.start.startPointDes,
				endPointName: item.cname,
				endCityCode: item.cid,
				endPointPos: '1',
				endPointDes: item.cname
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
				<TopBanner {...this.props} title='设置终点'/>
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