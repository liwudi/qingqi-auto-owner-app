/**
 * Created by cryst on 2016/10/16.
 * edit by zhaidongyou on 2016/10/17
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ListView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import * as Icons from '../../../components/Icons';
import  Env from '../../../utils/Env';
const estyle = Env.style;
export default class MyInfoDriveType extends Component {
    goTo(page){
        this.props.router.push(page);
    }
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C3'
            ])
        };
    }

    save(){

    }

    renderListView(rowData, arg2, idx) {
        return <ViewForRightArrow
            rightIcon={rowData == 'B2' ? Icons.IconCheckMark :null}
            iconSize={Env.font.navTitle}
            iconColor={Env.color.main}
            onPress={() => this.save(rowData)}
        >
            <View style={[estyle.fx1]}>
                <Text style={[estyle.text,estyle.fx1]}>{rowData}</Text>
            </View>
        </ViewForRightArrow>;
    }
    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="选择驾驶证类型"/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderListView.bind(this)}/>
            </View>
        );
    }
}