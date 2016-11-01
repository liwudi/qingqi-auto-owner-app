/**
 * Created by cryst on 2016/10/17.
 */
import {TimePickerAndroid} from 'react-native';

const formatTime = (hour, minute) => {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
};

const open = async (options={is24Hour:true}, selectFun=function () {},closeFun=function(){}) => {
    try {
        const {action, minute, hour} = await TimePickerAndroid.open(options);
        if (action === TimePickerAndroid.timeSetAction) {
            selectFun(hour, minute);
            //console.info('选择的时间为:'+this._formatTime(hour,minute));
        } else if (action === TimePickerAndroid.dismissedAction) {
            closeFun();
            //console.info('选择器关闭取消');
        }
    } catch ({code, message}) {
        console.info('错误信息:'+message);
    }
};

export default open;