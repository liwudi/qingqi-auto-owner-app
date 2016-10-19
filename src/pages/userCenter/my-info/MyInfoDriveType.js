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
import MyInfo from './MyInfo';
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
            ]),
            active: '' //range, type, distance
        };
    }
    renderListView(rowData, arg2, idx) {
        return <ViewForRightArrow style={styles.item}>
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.text,{flex:1}]} onPress={() => this.goTo(MyInfo)}>{rowData}</Text>
            </View>
        </ViewForRightArrow>;
    }
    render() {
        return (
            <View>
                <TopBanner {...this.props} title="选择驾驶类型"/>
                <ListView
                    style={[estyle.paddingHorizontal, estyle.cardBackgroundColor]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderListView.bind(this)}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Env.color.bg
    },
    item:{
        paddingTop:20 * Env.font.base,
        paddingBottom:20 * Env.font.base,
        paddingLeft:30 * Env.font.base,
        // paddingBottom:30 * Env.font.base,
        borderBottomWidth:1 * Env.font.base,
        borderColor:'#e5e5e5',
        backgroundColor:'#FFF'
    },
    text:{
        fontSize:Env.font.text,
        color:Env.color.text
    }
});