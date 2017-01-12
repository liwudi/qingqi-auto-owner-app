/**
 * Created by ligj on 2016/10/10.
 */

import commonAndroid from '../components/CommonModule';
import { BackAndroid, Alert, NativeModules } from 'react-native';

export function addEventSystemBack(bindFun) {
    BackAndroid.addEventListener('hardwareBackPress', () => bindFun(BackAndroid.exitApp));
}
export function logOutKefu(accountId) {
    commonAndroid.logOutKefu(accountId);
}
export function startKefuActivity(accountId,userId,type,token) {
    commonAndroid.startKefuActivity(accountId,userId,type,token);
}


export const pushModule = NativeModules.MarbarPushModule;