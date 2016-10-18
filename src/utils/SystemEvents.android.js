/**
 * Created by ligj on 2016/10/10.
 */

import { BackAndroid, Alert } from 'react-native';

export function addEventSystemBack(isCanBack, goBack) {
	BackAndroid.addEventListener('hardwareBackPress', function() {
		if (isCanBack()) {
			goBack();
			return true;
		} else {
			Alert.alert(
				'提示',
				'是否要退出应用？',
				[
					{text: '确定', onPress: () => {
						BackAndroid.exitApp();
					}},
					{text: '取消', onPress: () => console.log('Cancel Pressed!')}
				]
			)
		}
		return true;
	});
}