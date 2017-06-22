/**
 * Created by liwd on 2017/6/21.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Env from '../../../utils/Env';
const estyle = Env.style;
import TopBanner from '../../../components/TopBanner';


import { queryScoreExplain } from "../../../services/AccumulateService";
class IntegralMallPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={[estyle.fx1,estyle.containerBackgroundColor]}>
                <TopBanner
                    {...this.props}
                    title="积分商城"
                />
                <View style={[estyle.fx1,estyle.fxCenter]}>
                    <Text style={[estyle.articleTitle]}>开发中，敬请期待！</Text>
                </View>
            </View>
        )
    }
}
export default IntegralMallPage;
const styles = StyleSheet.create({

});