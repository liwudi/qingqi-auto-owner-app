/**
 * Created by cryst on 2016/11/15.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import PageList from '../../../components/PageList';
import CarItem from './components/CarItem';
//import a from '../../../assets/images/driver.png'
export default class CarStatus extends Component {
    state = {
        key: ''
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title={this.props.nav.carCode}/>
                <PageList
                    style={estyle.fx1}
                    reInitField={[this.state.key]}
                    renderRow={(row) => {
                        return <CarItem data={row} />
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        let list = new Array(5);
                        list.fill({
                            "travelStatus": 1,
                            "carStatus": "水温过高",
                            "realtimeOil": 8.5,
                            "realtimeSpeed": 88.8,
                            "todayLen": 88.8,
                            "position": "辽宁省沈阳市华航大厦",
                            "slaveDriver": "李四",
                            "mastDriver": "张三",
                            "lat": 118.8,
                            "lon": 88.8,
                            "carCode": "辽A88888",
                            "carId ": 888888,
                            imgurl: '../../../../assets/images/driver.png'
                        });
                        return Promise.resolve({list: list});
                    }}
                />
            </View>
        );
    }
}