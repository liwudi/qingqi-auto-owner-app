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
import {setCurrentActivePage} from '../../actions/MessageActions';

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
                    sign: this.props.messageStore.PersonalMessageUnread.count
                }
            ]
		}
	}

    setCurrentPage = (index) => {
        this.props.dispatch(setCurrentActivePage({message:index}));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.messageStore.PersonalMessageUnread.count != this.props.messageStore.PersonalMessageUnread.count){
        	let tabsState = this.state.tabs;
            tabsState[1].sign = nextProps.messageStore.PersonalMessageUnread.count;
        	this.setState({
                tabs: tabsState
			})
		}
    }

	render() {
        console.log(this.props.activePageStore)
		return (
			<View style={[estyle.fx1,estyle.containerBackgroundColor]}>
				<TopBanner {...this.props} title="消息中心" leftShow={false}/>
				<TabNavigator {...this.props} tabs={this.state.tabs} onChangeTab={(index) => {
					this.setCurrentPage(index);
				}}/>
			</View>
		);
	}
}
export default connect(function (stores) {
    return {
    	messageStore: stores.messageStore,
		activePageStore: stores.activePageStore
    }
})(Message);