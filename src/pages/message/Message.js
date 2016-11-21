/**
 * Created by ligj on 2016/10/9.
 * Edit by zhaidongyou 2016/10/21
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import TopBanner from '../../components/TopBanner';
import CarListMessage from './CarListMessage';
import PersonalMessage from './PersonalMessage';
import TabNavigator from '../../components/TabNavigator';
import Env from '../../utils/Env';

class Message extends Component {
	constructor(props){
		super(props);
		this.state = {
            tabs : [
                {
                    title:'车队消息',
                    component: CarListMessage
                },
                {
                    title:'个人消息',
                    component: PersonalMessage,
                    sign: this.props.messageStore.messageList.PersonalMessageUnread.count
                }
            ]
		}
	}

    componentWillReceiveProps(nextProps){
        if(nextProps.messageStore.messageList.PersonalMessageUnread.count != this.props.messageStore.messageList.PersonalMessageUnread.count){
        	let tabsState = this.state.tabs;
            tabsState[1].sign = nextProps.messageStore.messageList.PersonalMessageUnread.count;
        	this.setState({
                tabs: tabsState
			})
		}
    }

	render() {
		return (
			<View  style ={styles.body}>
				<TopBanner {...this.props} title="消息中心" leftShow={false}/>
				<TabNavigator {...this.props} tabs={this.state.tabs}/>
			</View>
		);
	}
}
export default connect(function (stores) {
    return {messageStore: stores.messageStore}
})(Message);

const styles = StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Env.color.bg
	}
});