/**
 * Created by ligj on 2016/9/29.
 */

import Server from '../service-config/ServerConfig';
import RequestService,{getToken}  from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}servicestation/`;

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
export function newWo(opts){
    let user=getToken().userId;
	return RequestService.post(
		makeUrl('newWo'),
		Object.assign({},{repairId:user},opts)
	);
}

//预约列表查询
export function orderList( ){
	return RequestService.get(
		makeUrl('wo/queryWo')
	);
}
//取消预约
export function orderCancel(woCode,reason){
    return RequestService.get(
        makeUrl('wo/cancelWo'),
		{
			woCode:woCode,
			reason:reason
		}
    );
}
//确认服务完成
export function orderOver(woCode){
    return RequestService.get(
        makeUrl('wo/confirmWo'),
        {
            woCode:woCode
        }
    );
}
//服务评价
export function orderConfir(woCode,score,content){
    return RequestService.get(
        makeUrl('orderProcess/rateAdd'),
        {
            woCode:woCode,
            score:score,
            content:content
        }
    );
}

//预约详情-预约ID
export function orderDetail(orderId){
	return RequestService.get(
		makeUrl('wo/getWo'),
		{woCode: orderId}
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
export function queryRated(page_number, page_size,stationId,flag,woCode){
    let user=getToken().userId;
	return RequestService.get(
		makeUrl('queryRated'),
		{
			page_number: page_number || 1,
			page_size:page_size || 2,
			stationId:stationId,
			flag: flag,
            driverId:user,
            woCode:woCode
		}
	);
}


//服务预约
export function getPosition(woCode){
	return RequestService.get(
		makeUrl('wo/getPostion'),
		{woCode: woCode}
	);
}

//催单接口
export function urgeWo(woCode){
    return RequestService.get(
        makeUrl('wo/urgeWo'),
        {woCode: woCode}
    );
}
//删除评论
export function delRated(rateId){
    return RequestService.get(
        makeUrl('delRated'),
        {rateId: rateId}
    );
}
