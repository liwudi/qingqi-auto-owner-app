/**
 * Created by ligj on 2016/11/14.
 */
import React, {Component} from "react";
import {Text, View, TextInput, ToastAndroid, Image, Alert, ListView, RefreshControl} from "react-native";
import Env from "../../utils/Env";
import TopBanner from "../../components/TopBanner";

import {getContacts} from '../../components/Contacts';

import ListTitle from '../../components/ListTitle';
import BorderButton from '../../components/BorderButton';

const estyle = Env.style;

export default class SelectForContacts extends Component {

    static propTypes = {
        select: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            ds,
            refreshing: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            getContacts().then(rs => {
                this.setState({
                    ds: this.state.ds.cloneWithRowsAndSections(rs),
                    refreshing: false
                })
            }).catch(e => {
                console.log(e);
                this.setState({
                    refreshing: false
                })
            });
        }, 400);
    }

    render() {
        return (
            <View style={[estyle.fx1, estyle.containerBackgroundColor]}>
                <TopBanner {...this.props} title="选择联系人"/>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={Env.refreshCircle.colors}
                            progressBackgroundColor={Env.refreshCircle.bg}
                        />
                    }
                    dataSource={this.state.ds}
                    renderSectionHeader={(sectionData, sectionId) => {
                        return <ListTitle title={sectionId}/>
                    }}
                    renderRow={(row) => {
                        return <View>
                            {row.phoneNumbers.map((phone, key) => <View key={key}
                                                                        style={[estyle.borderBottom, estyle.cardBackgroundColor, this.props.style]}>
                                <View style={[estyle.margin, estyle.fxRow]}>
                                    <Text style={[estyle.text, {textAlign: 'left'}]}>{row.name}</Text>
                                    <Text style={[estyle.fx1, estyle.text, {
                                        textAlign: 'right',
                                        color: Env.color.note
                                    }]}>{phone}</Text>
                                    <BorderButton
                                        style={{marginLeft: 10 * Env.font.base}}
                                        onPress={() => {
                                            this.props.select(row.name, phone);
                                            this.props.router.pop({select: {name: row.name, phone}});
                                        }}
                                    >选择</BorderButton>
                                </View>
                            </View>)}
                        </View>
                    }}
                />
            </View>
        );
    }
}