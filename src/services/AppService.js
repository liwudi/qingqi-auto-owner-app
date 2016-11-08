/**
 * Created by linyao on 2016/10/17.
 */

import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}tocapp/`;

/************************测试数据id**************************/
const userId = '1';
/************************************************************/
const defaultPage = Server.defaultPage;
function makeUrl(path) {
    return serviceUrl + path;
}

//当前车队信息查询接口
export function carTeamInfo(){
    return RequestService.get(
        makeUrl('carTeamInfo')
    );
}

//车辆详情查询接口
export function carInfo(carId){
    //todo
    return Promise.resolve({
        "routeId": 666,
        "routeInfo": "北京-德州-济南-青岛",
        "subDriver": "张四维",
        "subDriverId": 666,
        "subDriverPhoneNum": 13913913913,
        "mainDriver": "梁大大",
        "mainDriverid": 666,
        "mainDriverPhoneNum": 13913913913,
        "speed": 89,
        "carCode": "京N23456",
        "adminList": [
            {
                "userNnme": "张三",
                "phoneNum": 13913913913
            }
        ]
    });
    return RequestService.get(
        makeUrl('carInfo'),
        {
            carId:1,
            userId:userId
        }
    );
}

//车辆详情参数查询接口
export function carParameter(carId){
    //todo
    return Promise.resolve({
        "modelName": "起重机",
        "vin": "Vin23",
        "gearBoxModel": "变速箱型号",
        "engineModel": "发动机型号",
        "rearxleAratio": "后桥速比",
        "tireModel": "轮胎型号"
    })
    return RequestService.get(
        makeUrl('carParm'),
        {
            carId:1,
            userId:20
        }
    );
}

//车辆删除路线接口
export function delCarRoute(carId){
    return RequestService.get(
        makeUrl('delCarRoute'),
        {
            carId:carId
        }
    );
}

//路线车辆列表查询接口
export function routeCarList(page_number,page_size,routeId){
    return RequestService.get(
        makeUrl('routeCarList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            routeId:routeId
        }
    );
}

//添加路线接口
export function addRoute(obj){
    return RequestService.post(
        makeUrl('addRoute'),
        obj
    );
}

//更新路线
export function modifyRoute(obj){
    return RequestService.post(
        makeUrl('modifyRoute'),
        obj
    );
}

//删除路线-路线唯一标识ID
export function deleteRoute(routeId){
    return RequestService.get(
        makeUrl('deleteRoute'),
        {
            routeId:routeId
        }
    );
}

//查询线路列表
export function queryRouteList(page_number, page_size){
    return RequestService.get(
        makeUrl('queryRouteList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20
        }
    );
}

//车辆路线设置状态查询接口
export function queryRouteAddCarList(page_number, page_size, searchKey){
    return RequestService.get(
        makeUrl('queryRouteAddCarList'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            searchKey:searchKey
        }
    );
}

//路线详情接口-线路ID
export function routeInfo(routeId){
    return RequestService.get(
        makeUrl('routeInfo'),
        {
            routeId:routeId
        }
    );
}
//今日营运统计接口
export function queryOperateStatisToday(){
    return RequestService.get(
        makeUrl('queryOperateStatisToday')
    );
}

//区间油耗日统计接口
export function statisOilwearByDay(beginDate,endDate){
    return RequestService.get(
        makeUrl('statisOilwearByDay'),
        {
            beginDate:beginDate,
            endDate:endDate
        }
    );
}

//路线油耗详情统计接口
export function statisRouteOilwearByDay(page_number, page_size, statisDate){
    return RequestService.get(
        makeUrl('statisRouteOilwearByDay'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            statisDate:statisDate,
            userId:userId
        }
    );
}

//单线路车辆油耗列表统计接口01040603
export function statisOilwearForOneRoute(page_number, page_size,routeId,statisDate){
    return RequestService.get(
        makeUrl('statisOilwearForOneRoute'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            routeId:routeId,
            statisDate:statisDate,
            userId:userId
        }
    );
}

//行程路线标杆设置接口
export function standardMark(obj){
    return RequestService.post(
        makeUrl('standardMark'),
        obj
    );
}

//获取车辆信息（保养）接口
export function queryMaintainReminder(){
    return RequestService.get(
        makeUrl('queryMaintainReminder'),{
            userId: 2
        }
    );
}

//更新车辆保养信息（点击已保养）
export function carMaintained(){
    return RequestService.get(
        makeUrl('carMaintained'),{
            userId: 2
        }
    );
}

//体检故障解决措施接口
export function faultSolutionInfo(faultCode){
    return RequestService.get(
        makeUrl('faultSolutionInfo'),
        {
            faultCode:faultCode
        }
    );
}

//立即体检接口
export function phyExam(){
    return RequestService.get(
        makeUrl('phyExam')
    );
}

//获取上一次体检结果
export function queryLastPhyExamResult( ){
    return RequestService.get(
        makeUrl('queryLastPhyExamResult')
    );
}

//删除标杆
export function deleteStandard(routeId){
    return RequestService.post(
        makeUrl('deleteStandard'),
        {
            routeId:routeId
        }
    );
}

//查看标杆
export function viewStandard(routeId){
    return RequestService.get(
        makeUrl('viewStandard'),
        {
            routeId:routeId
        }
    );
}

//路线-某天-车辆列表接口
export function routeDayCarList(routeId,day){
    return RequestService.get(
        makeUrl('routeDayCarList'),
        {
            routeId:routeId,
            day:day
        }
    );
}

//司机消息查询
export function queryDriverMess(page_number,page_size,id,type){
    return RequestService.get(
        makeUrl('queryDriverMess'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            id:id,
            type:type
        }
    );
}

//标记已读
export function markReadmessage(obj){
    return RequestService.post(
        makeUrl('markReadmessage'),
        obj
    );
}
//车主消息查询
export function queryCarOwnerMessage(page_number,page_size,userId){
    return RequestService.get(
        makeUrl('queryCarOwnerMessage'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            userId:userId
        }
    );
}


//里程按天统计接口
export function statisMileageByDay(page_number, page_size, page_total, statisDate){
    return RequestService.get(
        makeUrl('statisMileageByDay'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            statisDate:statisDate
        }
    );
}

//紧急电话配置-查询(按照Sort降序排列)【app用，查询carType】
export function queryUrgentCall(page_number=defaultPage.page_number, page_size=defaultPage.page_size, type ){
    return RequestService.get(
        makeUrl('queryUrgentCall'),
        {
            page_number:page_number,
            page_size:page_size,
            type:type,
            name:1
        }
    );
}
//司机端-我的车辆列表
export function driverCarList(page_number = defaultPage.page_number) {
    return RequestService.get(
        makeUrl('driverCarList'),
        {page_number: page_number, userId: 3}
    );
}
//司机端-我的车辆列表
export function setCurrentCar(carId) {
    return RequestService.get(
        makeUrl('setCurrentCar'),{
            carId: carId,
            userId: userId
        }
    );
}

