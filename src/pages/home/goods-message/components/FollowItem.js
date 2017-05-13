/**
 * Created by linyao on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import Env from '../../../../utils/Env';
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
import {IconLocationMarker}  from '../../../../components/Icons';
const estyle = Env.style;
const basefont = Env.font.base;
export default class FollowItem extends Component {

    renderLength = () => {
        let data = this.props.data,view;
        if(!data.carModel && !data.carLength){
            view = <View/> ;
        }else {
            view = <View style={[estyle.fxRow, estyle.fxCenter, styles.textWhileBox, {
                backgroundColor: '#45AB72'}, estyle.marginRight]}>
                {data.carModel && data.carModel !== '0' ? <Text style={styles.textWhite}>{data.carModel}</Text> : <Text/>}
                {
                    data.carLength && data.carLength !== '0' ?
                        <Text style={styles.textWhite}>
                            <Text> </Text>
                            {data.carLength}
                            米
                        </Text>
                        : <Text/>
                }
            </View>;
        }
        return view;
    };

    render() {
        let data = this.props.data;
        return (
            <ViewForRightArrow {...this.props} style={[estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow, {alignItems: 'flex-start'},estyle.fxRowCenter]}>
                    <View style={[estyle.fxCenter]}>
                        <Text style={[styles.textBlue, ]}>{`${data.startAddressName}`}</Text>
                    </View>

                    <Text style={[{color: Env.color.main}]}>————</Text>


                    <View style={estyle.fxCenter}>
                        <Text style={[styles.textBlue, ]}>{`${data.endAddressName}`}</Text>
                    </View>
                    <View style={[styles.goodsNum,estyle.fxCenter,estyle.marginLeft]}>
                        <Text style={[estyle.note,{color:'#fff'}]}>{data.goodsNum}</Text>
                    </View>
                </View>

                <View style={[estyle.fxRow,estyle.marginTop,  {flexWrap: 'wrap'}]}>
                    {this.renderLength()}
                </View>

               {/* <View style={[estyle.fxRow, estyle.fxCenter, estyle.paddingTop]}>
                    <Text numberOfLines={1} style={[estyle.note, estyle.fx1]}><IconLocationMarker
                        size={Env.font.base * 30}/><Text> </Text>{data.fromAddress}</Text>
                    <Text> </Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>信息来源：{data.dataSources}</Text>
                </View>*/}
            </ViewForRightArrow>
        )
    }
}
const styles = StyleSheet.create({
    textBlue: {
        fontSize: Env.font.articleTitle,
        color: Env.color.main
    },
    textWhileBox: {
        paddingHorizontal: 10 * Env.font.base,
        height: Env.font.base * 16 + Env.font.note,
        marginVertical: Env.font.base * 5
    },
    textWhite: {
        color: '#ffffff',
        fontSize: Env.font.note
    },
    goodsNum:{
        width : 40 * basefont,
        height: 40 * basefont,
        borderRadius : 40 * basefont,
        backgroundColor:'red'
    }
});