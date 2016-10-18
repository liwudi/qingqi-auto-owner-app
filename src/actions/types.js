/**
 * Created by ligj on 2016/9/27.
 */

//用户登录、注销相关
export const LOGGED_IN 	= 'LOGGED_IN';//
export const LOGGED_OUT = 'LOGGED_OUT';//退出登录
export const LOGGED_ERROR = 'LOGGED_ERROR'//登录错误
export const LOGGED_DOING = 'LOGGED_DOING';//登录中

//修改手机号，发送验证码状态
export const MODIFY_MOBILE_SEND_CODE_ING = 'MODIFY_MOBILE_SEND_CODE_ING';//发送中
export const MODIFY_MOBILE_SEND_CODE_TIMEOUT = 'MODIFY_MOBILE_SEND_CODE_TIMEOUT';//倒计时
export const MODIFY_MOBILE_SEND_CODE_DONE = 'MODIFY_MOBILE_SEND_CODE_DONE';//倒计时完成
export const MODIFY_MOBILE_SEND_CODE_ERROR = 'MODIFY_MOBILE_SEND_CODE_ERROR';//发送失败