/**
 * Created by linyao on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import Toast from '../../../components/Toast';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import SubmitButton from '../../../components/SubmitButton';
import SetStartEnd from './SetStartEnd';
import SetCarModelLength from './SetCarModelLength';
import {addFollowLine} from '../../../services/AppService';
const estyle = Env.style;
const basefont = Env.font.base;

export  default class AddFollowLine extends Component {
    constructor(props) {
        super(props);
        let current = {code: '', level: 1},
            query = {code: '0', level: 1},
            info = {
                current: {...current}, query: {...query}
            };

        this.startInfo = [{...info}];
        this.endInfo = [{...info}];
        this.state = {
            startName: '',
            endName: '',
            options: {
                startPoint: '0',//行政区码，传 0 时为不限
                startLevel: 1,
                endPoint: '0', //行政区码，传 0 时为不限
                endLevel: 1,
                carModel: '',
                carLength: ''
            },
            locationAddress: ''
        };
    }

    goToCarModelLength = () => {
        this.props.router.push(SetCarModelLength, {
            carModel: this.state.options.carModel,
            carLength: this.state.options.carLength,
            set: (obj) => {
                this.setState({
                    options: Object.assign(this.state.options, obj),
                    random: Math.random()
                });
            }
        });
    }

    setStartEnd(isStart) {
        let title = isStart ? '选择始发地' : '选择目的地',
            tag = isStart ? 'start' : 'end';
        this.props.router.push(SetStartEnd, {
            locationAddress: isStart ? this.state.locationAddress : '',
            title: title,
            info: this[`${tag}Info`],
            set: (obj) => {
                console.info('list --------- list')
                console.info(obj.length)
                console.info(obj)

                let key = obj.length - 1,
                    current = obj[key].current;
                tag = obj.tag || tag;
                delete obj.tag;
                this[`${tag}Info`] = obj;

                this.setState({
                    [`${tag}Name`]: current.name,
                    options: Object.assign(this.state.options, {
                        [`${tag}Point`]: current.code,
                        [`${tag}Level`]: current.level
                    }),
                    random: Math.random()
                });
            }
        });
    }

    renderCarModelLength() {
        let model = this.state.options.carModel,
            length = this.state.options.carLength,
            emptyEl = <Text style={[estyle.note]}>点击选择车型车长</Text>,
            mEl = null,
            lEl = null;
        if(model || length) {
            emptyEl = null;
            model && (mEl = <Text style={[estyle.note]}>{`${model}`}</Text>)
            length && (lEl=<Text style={[estyle.note]}>{`${length}米`}</Text>)
        }


        return <View style={[estyle.fxCenter,estyle.fxRow]}>{emptyEl && emptyEl}{mEl && mEl}{lEl && lEl}</View>;
    }

    save(){
        if(this.state.doing) return;
        this.setState({doing:true},()=>{
            addFollowLine(this.state.options)
                .then(()=>{
                    Toast.show('添加成功',Toast.SHORT);
                    this.props.callBack();
                    this.props.router.pop();
                })
                .catch((err)=>{Toast.show(err.message,Toast.SHORT)})
                .finally(()=>{this.setState({doing:false})})
        });
    }

    render(){
        return(
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="添加线路"/>
                <View style={[estyle.fx1,estyle.marginTop]}>
                    <ViewForRightArrow onPress={() => {this.setStartEnd(true)}}>
                        <View style={[estyle.fxRow]}>
                            <Text style={[estyle.text]}>始发地：</Text>
                            <Text style={[estyle.note]}>{this.state.startName ||'点击选择始发地'}</Text>
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress={() => {this.setStartEnd()}}>
                        <View style={[estyle.fxRow]}>
                            <Text style={[estyle.text]}>目的地：</Text>
                            <Text style={[estyle.note]}>{this.state.endName ||'点击选择目的地'}</Text>
                        </View>
                    </ViewForRightArrow>
                    <ViewForRightArrow onPress={this.goToCarModelLength}>
                        <View style={[estyle.fxRow]}>
                            <Text style={[estyle.text]}>车型车长：</Text>
                            {this.renderCarModelLength()}
                        </View>
                    </ViewForRightArrow>
                    <View style={[estyle.padding]}/>
                    <View style={[estyle.fxCenter]}>
                        <SubmitButton doing={this.state.doing} size="large" onPress={() => {this.save()}}>添加</SubmitButton>
                    </View>
                </View>
            </View>
        )
    }
}