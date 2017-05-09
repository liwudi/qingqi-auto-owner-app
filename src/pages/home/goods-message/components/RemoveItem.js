/**
 * Created by linyao on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Env from '../../../../utils/Env';
import ViewForRightArrow from '../../../../components/ViewForRightArrow';
import {IconTimesCirle}  from '../../../../components/Icons';
const estyle = Env.style;
const basefont = Env.font.base;
export default class RemoveItem extends Component {

    renderLength = () => {
        let data = this.props.data,view;
        view = <View style={[estyle.fxRow, estyle.fxCenter, styles.textWhileBox, {
            backgroundColor: '#45AB72'}, estyle.marginRight]}>
            {data.carModel ? <Text style={styles.textWhite}>{data.carModel}</Text> : <Text/>}
            {
                data.carLength ?
                    <Text style={styles.textWhite}>
                        <Text> </Text>
                        {data.carLength}
                        米
                    </Text>
                    : <Text/>
            }
        </View>;
        return view;

    }

    render() {
        let data = this.props.data;
        return (
            <ViewForRightArrow style={[estyle.cardBackgroundColor]}
                               rightView={
                                   <TouchableOpacity onPress={this.props.onPress}>
                                       <IconTimesCirle/>
                                   </TouchableOpacity>
                               }
            >
                <View style={[estyle.fxRow, {alignItems: 'flex-start'},estyle.fxRowCenter]}>
                    <View style={[estyle.fxCenter]}>
                        <Text style={[styles.textBlue, ]}>{`${data.startAddressName}`}</Text>
                    </View>

                    <Text style={[{color: Env.color.main}]}>————</Text>

                    <View style={estyle.fxCenter}>
                        <Text style={[styles.textBlue, ]}>{`${data.endAddressName}`}</Text>
                    </View>
                </View>

                <View style={[estyle.fxRow,estyle.marginTop, {flexWrap: 'wrap'}]}>
                    {this.renderLength()}
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
    textWhileBox: {
        paddingHorizontal: 10 * Env.font.base,
        height: Env.font.base * 16 + Env.font.note,
        marginVertical: Env.font.base * 5
    },
    textWhite: {
        color: '#ffffff',
        fontSize: Env.font.note
    },
});