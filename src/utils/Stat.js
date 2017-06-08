/**
 * Created by admin on 2017/5/15.
 */
import React from 'react';
import { NativeModules } from 'react-native';

import Env from './Env';

const Stat = Env.isAndroid ? NativeModules.Stat : null;

export default StatEnhance = (ComponsedComponent) => class extends React.Component {

    constructor(props) {
        super(props);
        this.className = ComponsedComponent.name;
    }

    componentDidMount() {
        console.log('onPageStart',this.className );
        //Stat && Stat.onPageStart(this.className );
    }

    componentWillUnmount() {
        console.log('onPageEnd',this.className );
        //Stat && Stat.onPageEnd(this.className );
    }

    render() {
        return <ComponsedComponent {...this.props} {...this.state} />;
    }
};

/**
 * eventId，事件id，值为自定义字符串，不能为空，不能为空字符串，长度不能大于50（大于50时，截取长度为50的前半部分）
 * eventLabel，事件名称，值为自定义字符串，不能为空，不能为空字符串，长度不能大于50（大于50时，截取长度为50的前半部分）
 * */
export function umengEvent(eventId,eventLabel) {
    //Stat && Stat.onEvent(eventId,eventLabel)
}