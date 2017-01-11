/**
 * Created by ligj on 2016/10/10.
 */

import { BackAndroid, Alert, NativeModules } from 'react-native';

export function addEventSystemBack(bindFun) {
	BackAndroid.addEventListener('hardwareBackPress', () => bindFun(BackAndroid.exitApp));
}

export const pushModule = NativeModules.MarbarPushModule;