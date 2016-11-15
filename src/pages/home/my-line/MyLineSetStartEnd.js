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
import ListTitle from '../../../components/ListTitle';
import BorderButton from '../../../components/BorderButton';
import { queryCity } from '../../../services/LineService';
import PageSectionList from '../../../components/PageSectionList';


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


	componentWillMount() {
	}

	onRefresh() {
	}

	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title={this.props.title || '设置起点'}/>
				<LabelInput
					style = {[estyle.borderBottom]}
					placeholder='输入城市名称'
					ref="searchKey"
					onChangeText={searchKey => {this.setState({searchKey:searchKey})}}/>
				<PageSectionList
					style={estyle.fx1}
					reInitField={[this.state.searchKey]}
					getSectionData={(list) => {
						let rs = {};
						list.forEach(item => {
							if(item.fletter){
								rs[item.fletter] = item.subList || [];
							}
						})
						return rs;
					}}
					renderSectionHeader={(sectionData, sectionId) => {
						return <ListTitle title={sectionId}/>
					}}
					renderRow={(row) => {
						return (
							<TouchableOpacity style={[estyle.borderBottom, estyle.cardBackgroundColor, this.props.style]}>
								<View style={[estyle.margin, estyle.fxRow]}>
									<Text style={[estyle.text, estyle.fx1, {textAlign: 'left'}]}>{row.cname}</Text>
									<BorderButton
										style={{marginLeft: 10 * Env.font.base}}
										onPress={() => {
											this.props.select({
                                                pointName: row.cname,
                                                cityCode: row.cid,
                                                pointPos: '1',
                                                pointDes: row.cname,
                                                radius:'100'
                                            });
											this.props.router.pop();
                                        }}
									>选择</BorderButton>
								</View>
							</TouchableOpacity>
						)
					}}
					fetchData={() => {
						if(global.myLineCityList){
							return Promise.resolve(global.myLineCityList);
						}else{
                            return queryCity(this.state.searchKey).then(rs => {
                                global.myLineCityList = rs;
                                return rs;
                            })
						}

					}}
				/>
			</View>
		)
	}
}