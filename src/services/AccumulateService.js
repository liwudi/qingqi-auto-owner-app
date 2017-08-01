/**
 * Created by liwd on 2017/6/20.
 */
import Server from '../service-config/ServerConfig';
import RequestService,{ getToken } from '../service-config/RequestService';
let serviceUrl = `${Server.ACCUMULATE}`;
const upLoadServiceUrl=`${Server.UPLOAD_SERVICE}fsevice/uploadFile`;


function makeUrl(path) {
    return serviceUrl + path;
}

//查询当天未完成的积分任务数
export function queryUnfinishScoreTaskNum(){
    return RequestService.get(
        makeUrl('queryUnfinishScoreTaskNum'),
        {
            distId: 1
        }
    );

    // return Promise.resolve({
    //     "taskNum" : "12",
    //     "scoreTotal" : "2000",
    // })
}


//查询本月积分明细列表

export function queryScoreInfoList(){
    return RequestService.get(
        makeUrl('queryScoreInfoList')
    );

    // return Promise.resolve({
    //     "scoreTotal" : "283",
    //     "scoreUse" : "34",
    //     "list":[{
    //         "taskName":"签到",
    //         "taskTime":"2017-5-30",
    //         "score" : "5"
    //     },{
    //         "taskName":"分享",
    //         "taskTime":"2017-5-30",
    //         "score" : "5"
    //     },{
    //         "taskName":"添加车辆",
    //         "taskTime":"2017-5-30",
    //         "score" : "50"
    //     }]
    // })
}

//查询积分规则说明
export function queryScoreExplain(id){
    return RequestService.get(
        makeUrl('queryScoreExplain'),
        {
            scoreRuleId:id
        }
    );
    // return Promise.resolve({
    //     "scoreExplain" : ["我是规则1","我是规则2"],
    // })
}

//查询积分logo
export function queryScoreLogoList(distId){
    return RequestService.get(
        makeUrl('queryScoreLogoList'),
        {
            distId:distId
        }
    );
}

//查询每日任务列表
export function queryDayTaskList(distId){
    return RequestService.get(
        makeUrl('queryDayTaskList'),
        {
            distId:distId,
        }
    );

    // return Promise.resolve([
    //     {
    //         taskId:1,
    //         taskName:"签到",
    //         score:20,
    //         totalNum:20,
    //         finishNum:5,
    //         signFlg:2,
    //         taskBrief:1
    //     },{
    //         taskId:1,
    //         taskName:"签到",
    //         score:20,
    //         totalNum:20,
    //         finishNum:5,
    //         signFlg:2,
    //         taskBrief:1
    //     }
    // ])
}

//查询新手任务列表
export function queryNewbieTaskList(distId){
    return RequestService.get(
        makeUrl('queryNewbieTaskList'),
        {
            distId:distId,
        }
    );

    // return Promise.resolve([
    //     {
    //         taskId:1,
    //         taskName:"资料认证",
    //         score:20,
    //         taskBrief:1
    //     }
    // ])
}

//查询长期任务列表
export function queryLongTermTaskList(distId){
    return RequestService.get(
        makeUrl('queryLongTermTaskList'),
        {
            distId:distId,
            appType:2
        }
    );

    // return Promise.resolve([
    //     {
    //         taskId:1,
    //         taskName:"添加车辆",
    //         score:20,
    //         totalNum:20,
    //         finishNum:5,
    //         signFlg:2,
    //         taskBrief:1
    //     },{
    //         taskId:1,
    //         taskName:"服务预约",
    //         score:20,
    //         totalNum:20,
    //         finishNum:5,
    //         signFlg:2,
    //         taskBrief:1
    //     },{
    //         taskId:1,
    //         taskName:"服务评价",
    //         score:20,
    //         totalNum:20,
    //         finishNum:5,
    //         signFlg:2,
    //         taskBrief:1
    //     }
    // ])
}


//查询签到列表
export function querySignList(){
    return RequestService.get(
        makeUrl('querySignList'),
        {
            distId:1
        }
    );

    // return Promise.resolve(
    //     {
    //         nextScore:1,
    //         vipFlg :1,
    //         multiple :2,
    //         List:[{
    //             days:"第一天",
    //             score:2,
    //             signFlg:1
    //         },{
    //             days:"第二天",
    //             score:3,
    //             signFlg:1
    //         },{
    //             days:"第三天",
    //             score:4,
    //             signFlg:2
    //         },{
    //             days:"第四天",
    //             score:5,
    //             signFlg:2
    //         },{
    //             days:"第五天",
    //             score:6,
    //             signFlg:2
    //         },{
    //             days:"第六天",
    //             score:7,
    //             signFlg:2
    //         }]
    //     }
    // )
}


//签到
export function sign(distId){
    return RequestService.get(
        makeUrl('sign'),
        {
            distId:distId
        }
    );

    // return Promise.resolve({
    //     tag:1
    // })
}

//完成任务
export function finishTask(taskId){
    return RequestService.get(
        makeUrl('finishTask'),
        {
            taskId:taskId
        }
    );

    // return Promise.resolve({
    //     tag:1
    // })
}

//查询是否为会员日/特殊日期
export function queryIsVipDate(){
    return RequestService.get(
        makeUrl('queryIsVipDate'),
        {
            distId:1
        }
    );

    // return Promise.resolve({
    //     tag:1
    // })
}
