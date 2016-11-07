/**
 * Created by ligj on 2016/10/9.
 */
import React, { Component } from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import {connect} from 'react-redux';

import { userDetail } from '../../services/UserService';
import RequestService, { setToken } from '../../service-config/RequestService';
import {UserActions, TYPES} from '../../actions/index';

import Login from '../user/Login';
import HomeRouter from '../HomeRouter';
// import HomeRouter from '../userCenter/account-config/AccountHome';

import Env from '../../utils/Env';

class Guide2 extends Component {
	constructor(props){
		super(props);
		this.state = {
			alertActive: false
	}

	}
	async componentDidMount(){
		global.storage.load({
			key: 'token',
			autoSync: false,
		})
		.then((rs) => {
			let token = rs.token;
			if(token){
				global.token = token;
				setToken(token);
				this.props.dispatch(UserActions.checkToken(
					() => {
						this.props.router.replace(HomeRouter)
					},
					() => {
						this.props.router.replace(Login)
					})
				);
			}
		})
		.catch((e) => {
			this.props.router.replace(Login)
		});


	}
	toPage = (component) => {
		this.props.router.push(component);
	}

	render(){
		return (
			<View>
				<Image style={{width:Env.screen.width,height:Env.screen.height}} source={require('../../assets/images/startup.png')}/>
			</View>

		)
	}
}

export default connect(function (stores) {
	return {userStore: stores.userStore}
})(Guide2);

const styles = StyleSheet.create({

});