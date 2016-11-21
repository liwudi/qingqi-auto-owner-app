/**
 * Created by cryst on 2016/11/15.
 */
/**
 * Created by ligj on 2016/10/9.
 * Edit by yaocy on 2016/11/3
 */
import React, { Component,PropTypes } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Env from '../../../utils/Env';
import TopBanner from '../../../components/TopBanner';
import PageList from '../../../components/PageList';
import {queryCarCondition} from '../../../services/MonitorService';
import StatusItem from './components/StatusItem';
const estyle = Env.style;
export default class CarStatus extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={estyle.fx1}>
                <TopBanner {...this.props} title="车牌号"/>
                <PageList
                    style={estyle.fx1}
                    renderRow={(row) => {
                        return <StatusItem data={row} />;
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        return queryCarCondition(pageNumber,pageSize);
                    }}
                />
            </View>
        );
    }
}