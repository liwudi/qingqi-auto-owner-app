/**
 * Created by linyao on 2017/5/3.
 */
import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';

import TopBanner from '../../../components/TopBanner';
import Env from '../../../utils/Env';
import ViewForRightArrow from '../../../components/ViewForRightArrow';
import SubmitButton from '../../../components/SubmitButton';
import {IconClose} from '../../../components/Icons';
import {getCarGangCarLength} from '../../../services/AppService';
import Toast from '../../../components/Toast';

class MyInfoCarGangLength extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carLength: this.props.data ? this.props.data.carLength : null,
            tabHeight: 0,
            carLengthList: []
        };
    }

    componentDidMount() {
        getCarGangCarLength()
            .then((data) => {
                this.setState({carLengthList: data.list});
            })
            .catch((e) => {
                Toast.show(e.messsage, Toast.SHORT);
            })
    }

    onSave() {
        if (this.props.data.carLength === this.state.carLength) {
            this.props.router.pop();
            return;
        }
        this.setState({doing: true});
        if (this.props.successFun) {
            this.props.successFun({carLength: this.state.carLength})
                .then(() => {
                    this.props.router.pop();
                })
                .catch((err) => {
                    Toast.show(err.message, Toast.SHORT);
                })
                .finally(() => {
                    this.setState({doing: false});
                })
        }
    }

    open() {
        this.setState({tabHeight: 600 * basefont})
    }

    close() {
        this.setState({tabHeight: 0})
    }

    typeListRender() {
        return (
            this.state.carLengthList.map((item, index) => {
                return <TouchableOpacity key={index} style={[estyle.paddingVertical,estyle.fxCenter,{height:100 * basefont,width:220*basefont}]}
                                         onPress={()=>{this.setState({ carLength:item.name }); this.close(); }}
                >
                    <Text style={[estyle.text,{color: item.name===this.state.carLength ? Env.color.main: Env.color.text }]}>{item.name}</Text>
                </TouchableOpacity>
            })
        )
    }

    render() {
        return (
            <View style={[estyle.containerBackgroundColor, estyle.fx1]}>
                <TopBanner {...this.props} title="车厢长"/>
                <ScrollView style={[estyle.fx1]}>
                    <ViewForRightArrow style={[estyle.marginTop]} onPress={this.open.bind(this)}>
                        <View style={[estyle.fxRow,estyle.fxRowCenter]}>
                            <Text style={[estyle.text]}>车厢长</Text>
                            <Text style={[estyle.fx1]}></Text>
                            <Text style={[estyle.text]}>{this.state.carLength}</Text>
                        </View>
                    </ViewForRightArrow>
                    <View style={[estyle.marginTop,estyle.fxCenter]}>
                        <SubmitButton size="large"
                                      doing={this.state.doing}
                                      onPress={() => this.onSave()}>保存</SubmitButton>
                    </View>
                </ScrollView>
                <View style={[estyle.padding,{height:this.state.tabHeight}]}>
                    <View style={[estyle.fxRow,estyle.padding,estyle.borderBottom]}>
                        <TouchableOpacity onPress={this.close.bind(this)}>
                            <IconClose color={Env.color.note}/>
                        </TouchableOpacity>
                        <View style={[estyle.fx1,estyle.fxCenter]}>
                            <Text style={[estyle.text]}>请选择车型</Text>
                        </View>
                    </View>
                    <ScrollView style={[estyle.fx1]} >
                        <View style={[estyle.fx1, estyle.fxRow,estyle.fxRowCenter,{overflow: 'hidden', flexWrap:'wrap'}]}>
                            {this.typeListRender()}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const basefont = Env.font.base;
const estyle = Env.style;
const styles = StyleSheet.create({});

export default MyInfoCarGangLength