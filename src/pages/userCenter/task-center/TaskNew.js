/**
 * Created by liwd on 2017/6/13.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import Env from '../../../utils/Env';
import TaskItem from "./TaskItem";
import TaskTitle from "./TaskTitle";
const estyle = Env.style;
import { queryNewbieTaskList } from "../../../services/AccumulateService";
class TaskNew extends Component{
    constructor(props){
        super(props);
        this.state = {
            newbieTaskList:[]
        }
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.getQueryNewbieTaskListData();
        },1000);
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    getQueryNewbieTaskListData(){
        queryNewbieTaskList(1).then((data)=>{
            this.setState({
                newbieTaskList:data
            })
        }).then(error=>{
            console.log(error)
        })
    }
    render(){
        return(
            <View style={[estyle.marginTop]}>
                {
                    this.state.newbieTaskList.length > 0 ?
                        <View>
                            <TaskTitle title="新手任务"/>
                            {
                                this.state.newbieTaskList.map((item,index)=>{
                                    return (
                                        <TaskItem ruleName={item.ruleName} vip={this.props.vip} key={index} type="新手任务" taskId={item.taskId} title={item.taskType} note={item.taskBrief} score={item.score} onClick={(param)=>{this.props.onClick(param)}}/>
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

export default TaskNew;
