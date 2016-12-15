/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou 2016/10/24 车辆消息详情
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image
} from 'react-native';

import TopBanner from '../../components/TopBanner';
import PageList from '../../components/PageList';
import Env from '../../utils/Env';
import {IconUser, IconLocationMarker} from '../../components/Icons';
import ConfirmButton from '../../components/ConfirmButton';
import ViewForRightArrow from '../../components/ViewForRightArrow';
import { readAllCarMessageForId } from '../../services/PushService';
import MessageCarLocation from './MessageCarLocation';
import { setCurrentActivePage } from '../../actions/MessageActions';


const estyle = Env.style;

class MessageListCar extends Component {

	constructor(props){
		super(props);
        this.props.dispatch(setCurrentActivePage({carId: props.carId}));
	}

    componentWillReceiveProps(nextProps){
        console.log('CarListMessage componentWillReceiveProps');
		setTimeout(() => this.refs.list.reInitFetch(), 50);
    }

    render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title={this.props.carNumber} doBack={() => {
                    this.props.dispatch(setCurrentActivePage({carId: ''}));
					this.props.doBack();
				}}/>
				<PageList
					ref="list"
					style={estyle.fx1}
					renderRow={(row) => {
                        row.message =  row.message || {};
                        let messageDetail = row.messageDetail || {};
                        return <ViewForRightArrow style={estyle.cardBackgroundColor} onPress={() => {
                        	this.props.router.push(MessageCarLocation, {nav: row.message.CustomContent});
						}}>
								<View style={[estyle.fxRow]}>
									<View style={estyle.fxCenter}>
										<Image
											style={{borderRadius:100,width:60,height:60}}
											source={require('../../assets/images/message-type-1.png')}
										/>
									</View>
									<View style={[estyle.marginLeft,estyle.fx1]}>
										<View style={[estyle.fxRow]}>
											<View style={estyle.fx1}>
												<Text style={[estyle.articleTitle]}>{messageDetail.carStatus}</Text>
											</View>
											<Text style={[estyle.note,estyle.marginLeft]}>{messageDetail.happenTime}</Text>
										</View>
										<View style={[estyle.fxRow, estyle.fxRowCenter]}>
											<IconUser color='#FEBEBE'/><Text> </Text>
											<Text style={[estyle.note, estyle.marginRight,{color: Env.color.text}]}>{messageDetail.mastDriver || '无'}</Text>

											<IconUser color='#C4DFFE'/><Text> </Text>
											<Text style={[estyle.note, {color: Env.color.text}]}>{messageDetail.slaveDriver || '无'}</Text>
										</View>
										<View style={[estyle.fx1,estyle.fxRow]}>
											<IconLocationMarker color='#FED57E' size={Env.font.base * 30}/>
											<Text> </Text>
											<Text style={[estyle.marginFont,estyle.paddingRight,{color: Env.color.text}]}>{messageDetail.position || '未获取到位置信息'}</Text>

										</View>
									</View>
								</View>
							</ViewForRightArrow>

                    }}
					fetchData={() => {
                        return readAllCarMessageForId(this.props.carId).then(rs => {
                        	return {
                                list : Object.assign([], rs).reverse(),
                                pageTotal:1
							}
						});
                    }}
				/>

				<View style={[estyle.fxRow,estyle.cardBackgroundColor,estyle.fxCenter]}>
					<View style={estyle.padding}>
						<ConfirmButton size="small">联系司机</ConfirmButton>
					</View>
				</View>
			</View>
		);
	}
}

export default connect(function (stores) {
    return {messageStore: stores.messageStore}
})(MessageListCar);