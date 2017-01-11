/**
 * Created by ligj on 2016/10/10.
 */

export function addEventSystemBack(bindFun) {
}


export const pushModule = {
    getDeviceId: () => {
        return Promise.resolve({deviceId:'test-ios'});
    }
};