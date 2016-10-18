/**
 * Created by cryst on 2016/10/16.
 */
import { ToastAndroid } from 'react-native';
const checkRequire = (value, msg) =>  {
    if(typeof msg === 'undefined' || value) {
        return true;
    }
    ToastAndroid.show(msg, ToastAndroid.SHORT);
    return false;
};

const checkPattern = (value, pattern) =>  {
    if(typeof pattern === 'undefined') return true;
    if(pattern.value.test(value)) return true;
    ToastAndroid.show(pattern.msg, ToastAndroid.SHORT);
    return false;
};
const checkData = (v) =>  {
    let value = v.value,
        require = v.require,
        pattern = v.pattern;
    return checkRequire(value, require) && checkPattern(value, pattern);
};
export default {
    vd: (data) => {
        for(let k in data) {
            let r = checkData(data[k]);
            if(!r) return;
        }
        return true;
    }
}