/**
 * Created by ligj on 2016/9/29.
 */
import Server from '../service-config/ServerConfig';
import Common from './Common'
const loginUrl = `${Server.WD_SERVICE}ssoapi/user/login`;

export function sendModifyMobileSendCode(){
	return new Promise((resolve, reject) => {
		//模拟登录成功
		setTimeout(() => {
			resolve({username:1111});
		},2000);
		//模拟登录失败
		// setTimeout(() => {
		// 	reject({message:'密码错误'});
		// },2000);
	});
}


export function login(username, password) {

	return new Promise((resolve, reject) => {
		//模拟登录成功
		setTimeout(() => {
				resolve({username:1111});
		},2000);
		//模拟登录失败
		// setTimeout(() => {
		// 	reject({message:'密码错误'});
		// },2000);
	});

	// return fetch(loginUrl,{
	// 	method: 'POST',
	// 	headers: {
	// 		"Content-Type": "application/json;charset=UTF-8"
	// 	},
	// 	body: JSON.stringify({
	// 		"loginName": username,
	// 		"autoLogin": 1,
	// 		"captcha": "",
	// 		"password": password,
	// 		"product": "webUser"
	// 	})
	// })
	// 	.then(rs => rs.json())
	// 	.then(rs => {
// 			if(rs.code === 200){
// 				return rs.data;
// 			} else {
// 				return Promise.reject(rs);
// 			}
	// 	})
	// 	.catch(e => {
	// 		console.log(e)
	// 		return Promise.reject(e);
	// 	});
}

//添加/编辑车辆-评价ID
export function addCar(opts){
	return new Promise((resolve, reject) => {
		let url = 'addCar';
	});
}

//车主端司机查询接口
export function queryDriver(page_number, page_size, keyWord){
	return new Promise((resolve, reject) => {
		let url = 'queryDriver';
	});
}

//车主端添加司机
export function addDriver(name,phone) {
	return new Promise((resolve, reject) => {
		let url = 'addDriver';
	});
}

//删除司机-司机ID
export function delDriver(driverId) {
	return new Promise((resolve, reject) => {
		let url = 'delDriver';
	});
}

//快捷登录
export function fastLogin(phone, name) {
	return new Promise((resolve, reject) => {
		let url = 'fastLogin';
	});
}

//用户注册
export function register(opts) {
	return new Promise((resolve, reject) => {
		let url = 'register';
	});
}

//修改用户信息
export function modifyUserInfo(name,phone) {
	return new Promise((resolve, reject) => {
		let url = 'modifyUserInfo';
	});
}

//车辆查询（从TDS系统获取车辆数据）
export function getCarList(opts) {
	return new Promise((resolve, reject) => {
		let url = 'getCarList';
	});
}

//用户信息查询
export function getUserInfo() {
	return new Promise((resolve, reject) => {
		let url = 'getUserInfo';
	});
}