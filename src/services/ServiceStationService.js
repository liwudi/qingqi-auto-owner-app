/**
 * Created by ligj on 2016/9/29.
 */

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}stationManage/`;

const defaultPage = Server.defaultPage;

function makeUrl(path) {
	return serviceUrl + path;
}

//范围下拉列表
export function areaCondition(page_number, page_size, page_total){
	return RequestService.get(
		makeUrl('areaCondition'),
		{
			page_number: page_number || 1,
			page_size: page_size || 10
		}
	);
}

//类型下拉列表
export function typeCondition(page_number, page_size, page_total){
	return RequestService.get(
		makeUrl('typeCondition'),
		{
			page_number: page_number || 1,
			page_size: page_size || 10
		}
	);
}

//服务站列表查询
export function queryStation(page_number=defaultPage.page_number, page_size=defaultPage.page_size,opts){
	console.info(arguments)
	return RequestService.get(
		makeUrl('queryStation'),
		Object.assign({},opts,{page_number: page_number, page_size: page_size})
	);
}

//服务站详情-服务站ID
export function stationDetail(stationId){
	return RequestService.get(
		makeUrl('stationDetail'),
		{stationId: stationId}
	);
}

//服务预约
export function serviceOrder(opts){
	return RequestService.post(
		makeUrl('serviceOrder'),
		opts
	);
}

//预约列表查询
export function orderList(page_number, page_size, userId){
	//todo
	return Promise.resolve({
		"page_number": 1,
		"page_size": 20,
		"page_total": 10,
		"list": [
			{
				"stationId": 1,
				"orderId": 123,
				"stationName": "北京顺义4S店",
				"orderTime": "2016-10-09 14:30",
				"typeList": [
					{
						"name": "常规保养"
					}
				]
			},{
				"stationId": 1,
				"orderId": 123,
				"stationName": "北京顺义4S店",
				"orderTime": "2016-10-09 14:30",
				"typeList": [
					{
						"name": "常规保养"
					}
				]
			}
		]
	});

	// return RequestService.get(
	// 	makeUrl('orderList'),
	// 	{
	// 		page_number: page_number || 1,
	// 		page_size:page_size || 20,
	// 		userId:userId || 1
	// 	}
	// );
}

//预约详情-预约ID
export function orderDetail(orderId){
	//todo
	return new Promise.resolve({
		"orderId": "abc",
		"userId": 123,
		"userName": "张三",
		"phone": 13912345678,
		"time": "2016-10-09 14:30",
		"type": [
			{
				"type": "常规保养"
			},
			{
				"type": "发动机"
			}
		],
		"content": "洗车"
	});

	return RequestService.get(
		makeUrl('orderDetail'),
		{orderId: orderId}
	);
}

//预约删除-预约ID
export function delOrder(orderId){
	return RequestService.get(
		makeUrl('delOrder'),
		{orderId: orderId}
	);
}

//服务评价
export function serviceRated(opts){
	return RequestService.post(
		makeUrl('serviceRated'),
		opts
	);
}

//评价查询
export function queryRated(page_number, page_size, page_total, userId, stationId){
	return RequestService.get(
		makeUrl('queryRated'),
		{
			page_number: page_number || 1,
			page_size:page_size || 20,
			userId:userId,
			stationId:stationId
		}
	);
}

//评价查询-评价ID
export function delRated(rateId){
	return RequestService.get(
		makeUrl('delRated'),
		{rateId: rateId}
	);
}