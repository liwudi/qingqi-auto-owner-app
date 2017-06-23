/**
 * Created by liwd on 2017/6/13.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import Env from '../../../utils/Env';
import {driverCarList, setCurrentCar} from '../../../services/AppService';
import Button from "../../../components/widgets/Button";
import TaskItem from './TaskItem';
import TaskTitle from "./TaskTitle";
const estyle = Env.style;
import { queryLongTermTaskList } from "../../../services/AccumulateService";
class TaskLong extends Component{
    constructor(props){
        super(props);
        this.state = {
            longTermTaskList:[]
        }
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.getQueryLongTermTaskListData();
        },1000);
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    getQueryLongTermTaskListData(){
        queryLongTermTaskList(1).then((data)=>{
            this.setState({
                longTermTaskList:data
            })
        }).catch(error=>{
            console.log(error);
        })
    }
    render(){
        return(
            <View  style={[estyle.marginTop]}>
                {
                    this.state.longTermTaskList.length ?
                        <View>
                            <TaskTitle title="长期任务"/>
                            {
                                this.state.longTermTaskList.map((item,index)=>{
                                    return (
                                        <TaskItem ruleName={item.ruleName} vip={this.props.vip} key={index} type="长期任务" taskId={item.taskId} title={item.taskType} note={item.taskBrief} text={item.signFlg} score={item.score} onClick={(param)=>{this.props.onClick(param)}}/>
                                    )
                                })
                            }
                        </View>
                        : null
                }
            </View>
        )
    }
}

export default TaskLong;
