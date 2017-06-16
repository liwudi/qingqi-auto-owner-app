/**
 * Created by ligj on 2016/10/18.
 */
import { ToastAndroid } from 'react-native';
let Toast = {
    ...ToastAndroid
};

Toast.show = function (msg, length) {
    if(msg && !global._LoginOut){
        ToastAndroid.show.apply(ToastAndroid, arguments);
    }
}
export default Toast;