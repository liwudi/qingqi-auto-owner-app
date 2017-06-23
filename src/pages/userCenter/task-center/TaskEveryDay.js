/**
 * Created by liwd on 2017/6/13.
 */
import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import Env from '../../../utils/Env';

import TaskItem from './TaskItem';
import TaskTitle from "./TaskTitle";
const estyle = Env.style;
import { queryDayTaskList } from "../../../services/AccumulateService";
class TaskEveryDay extends Component{
    constructor(props){
        super(props);
        this.state = {
            dayTaskList:[]
        }
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.getQueryDayTaskListData();
        },1000);
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    getQueryDayTaskListData(){
        queryDayTaskList(1).then((data)=>{
            this.setState({
                dayTaskList:data
            })
        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        return(
            <View>
                {
                    this.state.dayTaskList.length > 0 ?
                        <View>
                            <TaskTitle title="每日任务"/>
                            {
                                this.state.dayTaskList.map((item,index)=>{
                                    return (
                                        <TaskItem ruleName={item.ruleName} vip={this.props.vip} key={index} type="每日任务"  totalNum={item.totalNum} finishNum={item.finishNum}  taskId={item.taskId} title={item.taskType} note={item.taskBrief} signFlg={item.signFlg} score={item.score} onClick={(param)=>{this.props.onClick(param)}}/>
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

export default TaskEveryDay;
