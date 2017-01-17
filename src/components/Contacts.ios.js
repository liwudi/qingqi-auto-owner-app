/**
 * Created by ligj on 2016/11/10.
 */

import {
    NativeModules
} from 'react-native';

async function _getContactInfo(select, error){
    try{
        var events = await NativeModules.RNBridgeModule.getContactInfo('name');
        select(events.name, events.phoneNumber);

    }catch(e){
        //error()
        console.log(e);
        //this.setState({events: e.message});
    }
}

export function getContacts(select, error) {
    _getContactInfo(select, error)
}