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
export default class GoodsInfoItem extends Component {

    renderLength = () => {
        let data = this.props.data,
            hasValue = data.carLengthMin || data.carLengthMax,
            hasSplit = data.carLengthMin && data.carLengthMax,
            showView = hasValue || data.carStructRequire,
            view = <View/>;
        if (showView) {
            view = <View style={[estyle.fxRow, estyle.fxCenter, {
                backgroundColor: '#45AB72',
                paddingHorizontal: 10 * Env.font.base,
                paddingVertical: 5 * Env.font.base
            }, estyle.marginRight]}>
                {data.carStructRequire ? <Text style={styles.textWhite}>{data.carStructRequire}</Text> : <Text/>}
                <Text style={styles.textWhite}>
                    <Text> </Text>
                    {data.carLengthMin || ''}
                    {hasSplit && '-'}
                    {data.carLengthMax || ''}
                    米
                </Text>
            </View>
        }
        return view;

    }
    renderWeight = () => {
        let data = this.props.data,
            hasValue = data.goodsWeight || data.goodsWeightMax,
            hasSplit = data.goodsWeight && data.goodsType,
            showView = hasValue || data.carStructRequire,
            view = <View/>;
        if (hasValue) {
            view = <View style={[estyle.fxRow, estyle.fxCenter, {
                backgroundColor: '#F6A512',
                paddingHorizontal: 10 * Env.font.base,
                paddingVertical: 5 * Env.font.base
            }, estyle.marginRight]}>
                {data.goodsType ? <Text style={styles.textWhite}>{data.goodsType}</Text> : <Text/>}
                <Text style={styles.textWhite}>
                    <Text> </Text>
                    {data.goodsWeight || ''}
                    {hasSplit && '-'}
                    {data.goodsWeightMax || ''}
                    吨
                </Text>
            </View>
        }
        return view;


    }

    render() {
        let data = this.props.data;
        return (
            <ViewForRightArrow {...this.props} style={[estyle.cardBackgroundColor]}>
                <View style={[estyle.fxRow, {alignItems: 'flex-start'}]}>
                    <View style={[estyle.fxCenter]}>
                        <Text style={[styles.textBlue, estyle.marginFontBottom]}>{`${data.fromCity}`}</Text>
                        {data.fromRegion ?
                            <Text style={[estyle.note, estyle.marginFontBottom]}>{data.fromRegion}</Text> : <Text/>}
                    </View>

                    <Text style={[{color: Env.color.main}]}>————</Text>


                    <View style={estyle.fxCenter}>
                        <Text style={[styles.textBlue, estyle.marginFontBottom]}>{`${data.toCity}`}</Text>
                        {data.toRegion ? <Text style={[estyle.note, estyle.marginFontBottom]}>{data.toRegion}</Text> : <Text/>}
                    </View>

                    <Text style={[estyle.note, {
                        color: Env.color.text,
                        textAlign: 'right'
                    }, estyle.fx1]}>{data.releaseTime}</Text>
                </View>


                <View style={[estyle.fxRow]}>
                    {this.renderWeight()}
                    {this.renderLength()}
                </View>

                <View style={[estyle.fxRow, estyle.fxCenter, estyle.paddingTop]}>
                    <Text numberOfLines={1} style={[estyle.note, estyle.fx1]}><IconLocationMarker
                        size={Env.font.base * 30}/><Text> </Text>{data.fromAddress}</Text>
                    <Text> </Text>
                    <Text style={[estyle.note, {color: Env.color.text}]}>信息来源：{data.dataSources}</Text>
                </View>
            </ViewForRightArrow>
        )
    }
}
const styles = StyleSheet.create({
    textBlue: {
        fontSize: Env.font.articleTitle,
        color: Env.color.main
    },
    textWhite: {
        color: '#ffffff',
        fontSize: Env.font.note
    }
});