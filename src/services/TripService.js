/**
 * Created by linyao on 2016/10/18.
 */

const userId = '1';
import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';
const serviceUrl = `${Server.QINGQI}tripAnalysis/`;

function makeUrl(path) {
    return serviceUrl + path;
}

//月行程数据查询接口
export function queryTripByMonth(month){
    return RequestService.get(
        makeUrl('queryTripByMonth'),
        {
            month: month
        }
    );
}
//查询指定日期的行程列表接口
export function queryTripByDay(page_number,page_size,day){
    console.info(arguments)
    return RequestService.get(
        makeUrl('queryTripByDay'),
        {
            page_number:page_number || 1,
            page_size:page_size || 20,
            day:day,
            userId: '20'
        }
    );
}
//查询行程详细信息接口
export function queryTripInfo(tripId){
    return RequestService.get(
        makeUrl('queryTripInfo'),
        {
            tripId: tripId
        }
    );
}

//查询昨日平均油耗信息接口
export function queryYesterdayAvgOilWear(){
    return RequestService.get(
        makeUrl('queryYesterdayAvgOilWear'),
        {
            userId: '20'
        }
    );
}

//查询昨日平均油耗排行榜信息接口
export function queryYesterdayAvgOilWearRanking() {
    return RequestService.get(
        makeUrl('queryYesterdayAvgOilWearRanking'),
        {
            userId: '20'
        }
    )
}

//查询当月平均油耗信息接口
export function queryMonthAvgOilWear(){
    return RequestService.get(
        makeUrl('queryMonthAvgOilWear'),
        {
            userId: '20'
        }
    );
}

//查询当月平均油耗排行榜信息接口
export function queryMonthAvgOilWearRanking() {
    return RequestService.get(
        makeUrl('queryMonthAvgOilWearRanking'),
        {
            userId: '20'
        }
    )
}