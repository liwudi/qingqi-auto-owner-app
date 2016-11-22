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
import {IconUser} from '../../components/Icons';
import ConfirmButton from '../../components/ConfirmButton';
import ViewForRightArrow from '../../components/ViewForRightArrow';
import { readAllCarMessageForId } from '../../services/PushService';
import MessageCarLocation from './MessageCarLocation';
const estyle = Env.style;

class MessageListCar extends Component {
	render() {
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title={this.props.carNumber}/>
				<PageList
					ref="list"
					style={estyle.fx1}
					renderRow={(row) => {
						console.info(row)
                        row.message =  row.message || {};
                        let messageDetail = row.messageDetail || {};
                        return <ViewForRightArrow onPress={() => {
                        	this.props.router.push(MessageCarLocation, {nav: row.message.CustomContent});
						}}>
								<View style={[estyle.padding,estyle.fxRow,estyle.borderBottom,estyle.cardBackgroundColor]}>
									<View style={estyle.fxCenter}>
										<Image
											style={{borderRadius:100,width:50,height:50,borderWidth:4 * Env.font.base,
												borderColor:'#85C7E7',}}
											source={require('../../assets/images/icon-1.png')}
										/>
									</View>
									<View style={[estyle.marginLeft,estyle.fx1]}>
										<View style={[estyle.fxRow]}>
											<View style={estyle.fx1}>
												<Text style={[estyle.articleTitle]}>{messageDetail.carStatus}</Text>
											</View>
											<Text style={[estyle.text,estyle.marginLeft]}>{messageDetail.happenTime}</Text>
										</View>
										<View style={[estyle.fxRow, estyle.fxRowCenter]}>
											<IconUser/>
											<Text style={[estyle.note, {color: Env.color.text}]}>{messageDetail.mainDriverName}</Text>
											<IconUser color={Env.color.main} style ={estyle.marginLeft}/>
											<Text style={[estyle.note, {color: Env.color.text}]}>{messageDetail.subDriverName}</Text>
										</View>
										<View>
											<Text>{messageDetail.position}</Text>
										</View>
									</View>
								</View>
							</ViewForRightArrow>

                    }}
					fetchData={() => {
                        return readAllCarMessageForId(this.props.carId).then(rs => {
                        	return {
                                list : Object.assign([], rs).reverse(),
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