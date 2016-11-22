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
        console.info('999999999999999999999999990')
        console.info(this.props.nav)
    }

    doBack() {
        this.props.nav.doBack();
        this.props.router.pop();
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title={this.props.nav.carCode} onPress={()=>{this.doBack()}}/>
                <PageList
                    style={estyle.fx1}
                    renderRow={(row) => {
                        return <StatusItem data={row} />;
                    }}
                    fetchData={(pageNumber, pageSize) => {
                        return queryCarCondition(pageNumber,pageSize, this.props.nav.carId);
                    }}
                />
            </View>
        );
    }
}